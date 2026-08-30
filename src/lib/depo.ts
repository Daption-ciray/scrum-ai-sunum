import { BASLANGIC, CANLI_ESIGI, type Durum, type Katilimci } from "./durum";

/* =============================================================================
   DEPO — iki modu var.

   1) Upstash Redis (UPSTASH_REDIS_REST_URL + TOKEN tanımlıysa)
      Vercel'de doğru olan bu. Her sunucusuz çağrı aynı durumu görür.

   2) Bellek (değişkenler yoksa)
      Yerel geliştirmede tek süreç olduğu için sorunsuz çalışır.
      Vercel'de her çağrı başka bir örneğe düşebileceği için katılımcılar
      senkron olmaz. Yayına almadan önce Upstash eklenmeli — /api/durum
      yanıtındaki `paylasimli: false` bunu sunucu panelinde uyarı olarak gösterir.
   ============================================================================= */

const DURUM_ANAHTARI = "sunum:durum";
/* DİKKAT — bu anahtarın tipi değişti: eskiden HASH, şimdi ZSET.
   Eski sürümün çalıştığı bir Redis'e bağlanırsanız ilk okumada
   "WRONGTYPE" alırsınız. Çözüm: anahtarı bir kez silin
   (sunucu panelinden "Katılımcıları temizle" bunu yapıyor). */
const KATILIMCI_ANAHTARI = "sunum:katilimcilar";
const ATILAN_ANAHTARI = "sunum:atilan";
/** Atölye gönderimleri: `sunum:istem:<slaytId>` hash'i, alan = katılımcı id. */
const ISTEM_ANAHTARI = "sunum:istem";
/** Sunucunun en iyi/en kötü işaretleri: `sunum:istem-secim:<slaytId>`. */
const SECIM_ANAHTARI = "sunum:istem-secim";
/** Quiz gönderimleri: `sunum:quiz:<slaytId>` hash'i, alan = katılımcı id. */
const QUIZ_ANAHTARI = "sunum:quiz";

/** Atılan kimlik bu süre boyunca geri giremez. Kalıcı yasak değil —
 *  istemcinin durumu görüp çıkış yapmasına yetecek kadar. */
const ATILMA_SURESI = 60;

/** ZSET üyesi `id` ve `ad`ı birlikte taşıyor; isimlerde geçmeyecek bir ayraç. */
const AYRAC = "\u0001";

/* İki isimlendirme birden destekleniyor.
   Vercel Marketplace üzerinden kurulan Upstash, eski @vercel/kv adlarını
   veriyor: KV_REST_API_URL / KV_REST_API_TOKEN. Upstash'i doğrudan kendi
   panelinden kurarsanız UPSTASH_REDIS_REST_* adlarını alırsınız. Hangisi
   doluysa o kullanılıyor; boş string tanımlıysa yok sayılıyor. */
const dolu = (d?: string) => (d && d.trim() ? d.trim() : undefined);
const URL_ = dolu(process.env.KV_REST_API_URL) ?? dolu(process.env.UPSTASH_REDIS_REST_URL);
const TOKEN = dolu(process.env.KV_REST_API_TOKEN) ?? dolu(process.env.UPSTASH_REDIS_REST_TOKEN);

export const paylasimliDepo = Boolean(URL_ && TOKEN);

async function redis<T = unknown>(komut: (string | number)[]): Promise<T> {
  const yanit = await fetch(URL_!, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(komut),
    cache: "no-store",
  });
  if (!yanit.ok) throw new Error(`Redis ${yanit.status}: ${await yanit.text()}`);
  const govde = (await yanit.json()) as { result: T };
  return govde.result;
}

/* --- bellek modu: HMR'de sıfırlanmasın diye globalThis üzerinde ------------ */
type Bellek = {
  durum: Durum;
  katilimcilar: Map<string, Katilimci>;
  /** id → atılmanın biteceği zaman damgası. */
  atilan: Map<string, number>;
  /** slaytId → (katılımcı id → istem). */
  istemler: Map<string, Map<string, Istem>>;
  /** slaytId → sunucunun işaretleri. */
  secimler: Map<string, Secim>;
  /** slaytId → (`id\u0001soru` → cevap). */
  quizler: Map<string, Map<string, QuizCevabi>>;
};
const g = globalThis as unknown as { __sunumBellek?: Partial<Bellek> };
/**
 * Alanlar tek tek tamamlanıyor, nesnenin tamamı bir kerede kurulmuyor.
 * HMR'de eski şekliyle kalmış bir nesne globalThis üzerinde duruyor olabilir;
 * yeni bir alan eklendiğinde o nesne `undefined` alanla hayatta kalır ve
 * ilk kullanımda çöker. Yerelde provanın ortasında yaşanacak en gereksiz hata.
 */
function bellek(): Bellek {
  const b = (g.__sunumBellek ??= {});
  b.durum ??= { ...BASLANGIC };
  b.katilimcilar ??= new Map();
  b.atilan ??= new Map();
  b.istemler ??= new Map();
  b.secimler ??= new Map();
  b.quizler ??= new Map();
  return b as Bellek;
}

/* --- durum ---------------------------------------------------------------- */

export async function durumuOku(): Promise<Durum> {
  if (!paylasimliDepo) return { ...bellek().durum };
  const ham = await redis<string | null>(["GET", DURUM_ANAHTARI]);
  if (!ham) return { ...BASLANGIC };
  try {
    return { ...BASLANGIC, ...(JSON.parse(ham) as Partial<Durum>) };
  } catch {
    return { ...BASLANGIC };
  }
}

export async function durumuYaz(yeni: Durum): Promise<Durum> {
  const kayit: Durum = { ...yeni, surum: yeni.surum + 1, zaman: Date.now() };
  if (!paylasimliDepo) {
    bellek().durum = kayit;
    return kayit;
  }
  await redis(["SET", DURUM_ANAHTARI, JSON.stringify(kayit)]);
  return kayit;
}

/* --- katılımcılar ---------------------------------------------------------
   HASH değil sıralı küme (ZSET): üye = `id\u0001ad`, skor = son görülme anı.

   Neden: eskiden her yoklamada `HGETALL` çekiliyor ve 75 kişilik listenin
   tamamı istemciye kadar gidiyordu — sadece bir sayı göstermek için. 75
   kişide saatte ~1,2 GB Redis trafiği demekti. ZSET'te sayı `ZCOUNT` ile
   tek komut ve birkaç bayt; tam liste yalnızca sunucu paneline gidiyor.

   İsim ZSET üyesinin içinde: ayrı bir hash tutmak yazma başına ikinci bir
   komut demekti. Bedeli, birinin adını değiştirmesi hâlinde eski kaydın
   canlılık penceresi dolana kadar (20 sn) sayımda kalması. Kabul edilebilir.
   ============================================================================ */

function uyeCoz(uye: string): { id: string; ad: string } | null {
  const i = uye.indexOf(AYRAC);
  if (i < 0) return null;
  return { id: uye.slice(0, i), ad: uye.slice(i + 1) };
}

/** Katılımcı "buradayım" der. Atılmışsa kaydedilmez ve `false` döner. */
export async function katilimciBildir(id: string, ad: string): Promise<boolean> {
  const simdi = Date.now();

  if (!paylasimliDepo) {
    const b = bellek();
    if ((b.atilan.get(id) ?? 0) > simdi) return false;
    b.katilimcilar.set(id, { id, ad, son: simdi });
    return true;
  }

  const atildi = await redis<number>(["EXISTS", `${ATILAN_ANAHTARI}:${id}`]);
  if (atildi === 1) return false;
  await redis(["ZADD", KATILIMCI_ANAHTARI, simdi, id + AYRAC + ad]);
  return true;
}

/** Yalnızca sayı. Katılımcı yoklamasının kullandığı yol — yanıt birkaç bayt. */
export async function katilimciSay(): Promise<number> {
  const esik = Date.now() - CANLI_ESIGI;
  if (!paylasimliDepo) {
    return [...bellek().katilimcilar.values()].filter((k) => k.son >= esik).length;
  }
  return await redis<number>(["ZCOUNT", KATILIMCI_ANAHTARI, esik, "+inf"]);
}

/** Tam liste. Yalnızca sunucu paneli çağırıyor; katılımcıya asla gitmiyor. */
export async function katilimcilariOku(): Promise<Katilimci[]> {
  const simdi = Date.now();
  const esik = simdi - CANLI_ESIGI;

  if (!paylasimliDepo) {
    return [...bellek().katilimcilar.values()].filter((k) => k.son >= esik);
  }

  // Süresi geçmişleri aynı çağrıda temizliyoruz: yalnızca sunucu paneli
  // buraya geldiği için maliyeti oturum başına birkaç yüz komut.
  await redis(["ZREMRANGEBYSCORE", KATILIMCI_ANAHTARI, "-inf", `(${esik}`]).catch(() => {});

  const uyeler = await redis<string[] | null>([
    "ZRANGEBYSCORE", KATILIMCI_ANAHTARI, esik, "+inf", "WITHSCORES",
  ]);
  if (!uyeler) return [];

  const liste: Katilimci[] = [];
  for (let i = 0; i < uyeler.length; i += 2) {
    const c = uyeCoz(uyeler[i]);
    if (c) liste.push({ ...c, son: Number(uyeler[i + 1]) || simdi });
  }
  return liste;
}

/** Bir katılımcının oturumunu kapatır: kaydı silinir, kısa süre geri giremez. */
export async function katilimciyiAt(id: string): Promise<void> {
  if (!paylasimliDepo) {
    const b = bellek();
    b.katilimcilar.delete(id);
    b.atilan.set(id, Date.now() + ATILMA_SURESI * 1000);
    return;
  }
  const uyeler = await redis<string[] | null>(["ZRANGE", KATILIMCI_ANAHTARI, 0, -1]);
  const silinecek = (uyeler ?? []).filter((u) => uyeCoz(u)?.id === id);
  if (silinecek.length > 0) {
    await redis(["ZREM", KATILIMCI_ANAHTARI, ...silinecek]);
  }
  await redis(["SET", `${ATILAN_ANAHTARI}:${id}`, "1", "EX", ATILMA_SURESI]);
}

export async function katilimcilariTemizle(): Promise<void> {
  if (!paylasimliDepo) {
    const b = bellek();
    b.katilimcilar.clear();
    b.atilan.clear();
    return;
  }
  await redis(["DEL", KATILIMCI_ANAHTARI]);
}


/* --- atölye: istem gönderimleri -------------------------------------------
   Cevaplar gibi ayrı bir anahtarda tutuluyor, durumun içinde değil: durumu
   sunucu yazar, istemi katılımcı; aynı kayda iki taraf dokunursa biri
   diğerinin üstüne yazar.

   `HSETNX` — ilk gönderim geçerli. Puanı görüp düzeltip tekrar göndermek yok;
   sıralama böyle anlamını koruyor. */

export type Istem = { id: string; ad: string; metin: string };
/** Sunucunun işaretleri. Katılımcı id'si tutuluyor, metin değil. */
export type Secim = { iyi?: string; kotu?: string };

const ISTEM_SINIRI = 2000;

/** Kabul edildiyse true, bu kişi daha önce göndermişse false. */
export async function istemYaz(
  slaytId: string,
  id: string,
  ad: string,
  metin: string,
): Promise<boolean> {
  const kayit: Istem = { id, ad, metin: metin.trim().slice(0, ISTEM_SINIRI) };
  if (!paylasimliDepo) {
    const harita = bellek().istemler.get(slaytId) ?? new Map<string, Istem>();
    bellek().istemler.set(slaytId, harita);
    if (harita.has(id)) return false;
    harita.set(id, kayit);
    return true;
  }
  const sonuc = await redis<number>([
    "HSETNX", `${ISTEM_ANAHTARI}:${slaytId}`, id, JSON.stringify(kayit),
  ]);
  return sonuc === 1;
}

/** Tüm gönderimler. YALNIZCA sunucu paneline gider — adlar burada. */
export async function istemleriOku(slaytId: string): Promise<Istem[]> {
  if (!paylasimliDepo) {
    return [...(bellek().istemler.get(slaytId)?.values() ?? [])];
  }
  const ham = await redis<Record<string, string> | null>([
    "HGETALL", `${ISTEM_ANAHTARI}:${slaytId}`,
  ]);
  if (!ham) return [];
  const liste: Istem[] = [];
  for (const deger of Object.values(ham)) {
    try {
      liste.push(JSON.parse(deger) as Istem);
    } catch {
      /* bozuk kayıt sessizce atlanır; bir kişinin istemi için oturum durmaz */
    }
  }
  return liste;
}

export async function secimOku(slaytId: string): Promise<Secim> {
  if (!paylasimliDepo) return { ...(bellek().secimler.get(slaytId) ?? {}) };
  const ham = await redis<string | null>(["GET", `${SECIM_ANAHTARI}:${slaytId}`]);
  if (!ham) return {};
  try {
    return JSON.parse(ham) as Secim;
  } catch {
    return {};
  }
}

export async function secimYaz(slaytId: string, secim: Secim): Promise<void> {
  if (!paylasimliDepo) {
    bellek().secimler.set(slaytId, secim);
    return;
  }
  await redis(["SET", `${SECIM_ANAHTARI}:${slaytId}`, JSON.stringify(secim)]);
}

/** Provadan sonra temiz sayfa: gönderimler ve işaretler birlikte silinir. */
export async function atolyeSifirla(slaytId: string): Promise<void> {
  if (!paylasimliDepo) {
    bellek().istemler.delete(slaytId);
    bellek().secimler.delete(slaytId);
    return;
  }
  await redis(["DEL", `${ISTEM_ANAHTARI}:${slaytId}`]);
  await redis(["DEL", `${SECIM_ANAHTARI}:${slaytId}`]);
}


/* --- quiz cevapları -------------------------------------------------------
   Sorular tek tek geliyor, cevaplar da soru bazında saklanıyor.

   Tek hash, bileşik alan: `<katılımcıId>\u0001<soruIndeksi>`. Soru başına ayrı
   anahtar da olabilirdi ama sıfırlama o zaman N tane DEL istiyor; tek hash
   tek DEL ile temizleniyor.

   `HSETNX` — ilk cevap geçerli. Şık değiştirip puan yükseltmek yok. */

export type QuizCevabi = { id: string; ad: string; soru: number; sik: number; zaman: number };

export async function quizCevapYaz(
  slaytId: string,
  kayit: QuizCevabi,
): Promise<boolean> {
  const alan = `${kayit.id}${AYRAC}${kayit.soru}`;
  if (!paylasimliDepo) {
    const harita = bellek().quizler.get(slaytId) ?? new Map<string, QuizCevabi>();
    bellek().quizler.set(slaytId, harita);
    if (harita.has(alan)) return false;
    harita.set(alan, kayit);
    return true;
  }
  const sonuc = await redis<number>([
    "HSETNX", `${QUIZ_ANAHTARI}:${slaytId}`, alan, JSON.stringify(kayit),
  ]);
  return sonuc === 1;
}

export async function quizCevaplariOku(slaytId: string): Promise<QuizCevabi[]> {
  if (!paylasimliDepo) return [...(bellek().quizler.get(slaytId)?.values() ?? [])];
  const ham = await redis<Record<string, string> | null>([
    "HGETALL", `${QUIZ_ANAHTARI}:${slaytId}`,
  ]);
  if (!ham) return [];
  const liste: QuizCevabi[] = [];
  for (const deger of Object.values(ham)) {
    try {
      liste.push(JSON.parse(deger) as QuizCevabi);
    } catch {
      /* bozuk kayıt atlanır */
    }
  }
  return liste;
}

export async function quizSifirla(slaytId: string): Promise<void> {
  if (!paylasimliDepo) {
    bellek().quizler.delete(slaytId);
    return;
  }
  await redis(["DEL", `${QUIZ_ANAHTARI}:${slaytId}`]);
}
