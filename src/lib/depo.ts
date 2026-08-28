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
const KATILIMCI_ANAHTARI = "sunum:katilimcilar";

const URL_ = process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

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
type Bellek = { durum: Durum; katilimcilar: Map<string, Katilimci> };
const g = globalThis as unknown as { __sunumBellek?: Bellek };
function bellek(): Bellek {
  if (!g.__sunumBellek) {
    g.__sunumBellek = { durum: { ...BASLANGIC }, katilimcilar: new Map() };
  }
  return g.__sunumBellek;
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

/* --- katılımcılar --------------------------------------------------------- */

export async function katilimciBildir(id: string, ad: string): Promise<void> {
  const kayit: Katilimci = { id, ad, son: Date.now() };
  if (!paylasimliDepo) {
    bellek().katilimcilar.set(id, kayit);
    return;
  }
  await redis(["HSET", KATILIMCI_ANAHTARI, id, JSON.stringify(kayit)]);
}

export async function katilimcilariOku(): Promise<Katilimci[]> {
  const simdi = Date.now();
  const canli = (k: Katilimci) => simdi - k.son < CANLI_ESIGI;

  if (!paylasimliDepo) {
    return [...bellek().katilimcilar.values()].filter(canli);
  }
  const duz = await redis<string[] | Record<string, string> | null>([
    "HGETALL",
    KATILIMCI_ANAHTARI,
  ]);
  if (!duz) return [];
  const degerler = Array.isArray(duz)
    ? duz.filter((_, i) => i % 2 === 1)
    : Object.values(duz);
  const liste: Katilimci[] = [];
  for (const d of degerler) {
    try {
      liste.push(JSON.parse(d) as Katilimci);
    } catch {
      /* bozuk kayıt: yok say */
    }
  }
  return liste.filter(canli);
}

export async function katilimcilariTemizle(): Promise<void> {
  if (!paylasimliDepo) {
    bellek().katilimcilar.clear();
    return;
  }
  await redis(["DEL", KATILIMCI_ANAHTARI]);
}
