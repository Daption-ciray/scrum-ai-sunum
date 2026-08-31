import type { Istem } from "./depo";

/* =============================================================================
   HAKEM — istemleri LLM'e yargılatan katman.

   Anahtar kelime puanı (istemPuan.ts) ELEME yapıyor, bu dosya YARGI yapıyor.
   75 istemin tamamı gönderilmiyor: elek iki ucu seçiyor,
   hakem yalnızca onlara bakıyor. Tek çağrı, ~10 istem.

   Neden TEK çağrıda hepsi: model istemleri BİRLİKTE görünce göreli yargı
   veriyor ve puanlar birbiriyle tutarlı çıkıyor. Ayrı ayrı sorulsaydı aynı
   istem farklı turlarda farklı puan alırdı.

   YEDEK ZORUNLU: bu dosyadaki her hata yolu `notlar: null` döndürür, atmaz.
   API çökerse atölye durmaz — panel anahtar kelime sıralamasıyla devam eder.
   Yönetici önünde tek hata noktası bırakılmıyor.

   SEBEP DE DÖNÜYOR. Eskiden yalnızca `null` vardı; sebep sunucu günlüğüne
   yazılıyordu ve canlı oturumda sunucunun terminali önünde olmuyor. Panelde
   "değerlendirilemedi" yazıp neden olmadığını söylememek, oturum ortasında
   sunucuyu karanlıkta bırakıyordu — kota mı doldu, model adı mı değişti,
   yavaş mı kaldı, ayırt edilemiyordu.

   Katılımcı ADI gönderilmiyor. Hakem yalnızca id ve metin görüyor.
   ============================================================================= */

const dolu = (d?: string) => (d && d.trim() ? d.trim() : undefined);
const ANAHTAR =
  dolu(process.env.GOOGLE_AI_API_KEY) ?? dolu(process.env.GEMINI_API_KEY);
/* Model adı ENV'den geçersiz kılınabiliyor: Google eski adları kapatınca
   (gemini-2.5-flash bu şekilde 404 vermeye başladı) kod değişikliği
   gerekmesin, tek satır ortam değişkeni yetsin.

   Varsayılan LITE ve bu bilinçli. ÖLÇÜLDÜ, 10 istemlik gerçek yükle:

   | model                 | süre      |
   |-----------------------|-----------|
   | gemini-3.6-flash      | 96–207 sn |
   | gemini-3.1-flash-lite | 4,0 sn    |
   | gemini-3.5-flash-lite | 1,4–2,8 sn|

   3.6-flash düşünen bir model; yanıt vermesi dakikaları buluyor ve 20
   saniyelik zaman aşımına HER SEFERİNDE takılıyordu — panelde
   "değerlendirilemedi" yazmasının sebebi buydu. Lite'a geçmenin puana
   bedeli yok: aynı sette kelime salatası 20, tam istem 95, boş istem 5
   aldı; sıralama ağır modelinkiyle birebir aynı çıktı. Sunucu 75 kişinin
   önünde üç dakika bekleyemez, zaten. */
const MODEL = dolu(process.env.HAKEM_MODEL) ?? "gemini-3.5-flash-lite";

/** Anahtar yoksa panel düğmeyi hiç göstermiyor. */
export const hakemVar = Boolean(ANAHTAR);

/** Uçlardan kaçar tane hakeme gitsin. */
export const UC_SAYISI = 5;
const ZAMAN_ASIMI = 20_000;

/** HTTP durumunu sunucunun okuyup ne yapacağını bilebileceği cümleye çevirir. */
function sebep(durum: number): string {
  if (durum === 404) return "model adı geçersiz, HAKEM_MODEL değişkenine bakın.";
  if (durum === 429) return "kota doldu, biraz bekleyin.";
  if (durum === 401 || durum === 403) return "anahtar geçersiz veya yetkisiz.";
  if (durum >= 500) return "Google tarafında geçici hata.";
  return "beklenmeyen yanıt.";
}

export type HakemNotu = { id: string; puan: number; gerekce: string };

/** Başarısızlıkta `notlar: null` ve panelde gösterilecek tek cümlelik sebep. */
export type HakemSonucu = { notlar: HakemNotu[] | null; hata?: string };

const YONERGE = `Sen bir Scrum eğitiminde katılımcıların yazdığı yapay zeka istemlerini değerlendiren jürisin.

Bütün istemler AYNI görev için yazıldı: bir iş öğesi için kabul kriteri ürettirmek.
İş öğesi: "Kullanıcı şifresini sıfırlayabilsin."

Her istemi 0-100 arasında puanla. Ölçütler, ağırlık sırasıyla:
1. BAĞLAM — ekip, ürün, kullanıcı ve kısıtlar SOMUT mu, yoksa jenerik mi? Modelin kendiliğinden bilemeyeceği bilgi verilmiş mi? En ağırlıklı ölçüt bu.
2. ROL — modele bir bakış açısı verilmiş mi?
3. FORMAT — çıktının biçimi uygulanabilir şekilde belirtilmiş mi?
4. SINIR — neyin yapılmaması gerektiği söylenmiş mi?
5. DÜRÜSTLÜK — modelden varsayımlarını veya bilmediklerini işaretlemesi istenmiş mi?

Önemli:
- Kelime avlamaya puan verme. Doğru terimleri içeren ama anlamsız bir metin DÜŞÜK puan almalı.
- Farklı kelimelerle aynı işi yapan istem TAM puan almalı; ezber kalıp arama.
- Uzunluk tek başına erdem değil; dolu olmayan uzunluğu ödüllendirme.

Gerekçe TEK CÜMLE ve Türkçe olsun. Eğitmen odada yüksek sesle okuyacak, o yüzden somut ol: neyin iyi, neyin eksik olduğunu söyle. Kişiyi değil istemi değerlendir; kimseyi küçük düşürecek ifade kullanma.`;

/**
 * Elekten geçen istemleri puanlar. Hata hâlinde `null` — çağıran taraf
 * anahtar kelime sıralamasıyla devam eder.
 */
export async function hakemeSor(
  istemler: Pick<Istem, "id" | "metin">[],
): Promise<HakemSonucu> {
  if (!ANAHTAR) return { notlar: null, hata: "Değerlendirme anahtarı tanımlı değil." };
  if (istemler.length === 0) return { notlar: null };

  const iptal = new AbortController();
  const sayac = setTimeout(() => iptal.abort(), ZAMAN_ASIMI);

  try {
    const yanit = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: "POST",
        // Anahtar başlıkta, URL'de değil: sorgu dizesi günlüklere düşüyor.
        headers: { "content-type": "application/json", "x-goog-api-key": ANAHTAR },
        signal: iptal.signal,
        cache: "no-store",
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: YONERGE }] },
          contents: [
            {
              role: "user",
              parts: [{ text: JSON.stringify(istemler.map((i) => ({ id: i.id, istem: i.metin }))) }],
            },
          ],
          generationConfig: {
            // Düşük sıcaklık: aynı istem iki turda benzer puan alsın.
            temperature: 0.2,
            responseMimeType: "application/json",
            responseSchema: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  id: { type: "STRING" },
                  puan: { type: "INTEGER" },
                  gerekce: { type: "STRING" },
                },
                required: ["id", "puan", "gerekce"],
              },
            },
          },
        }),
      },
    );

    if (!yanit.ok) {
      const govde = (await yanit.text()).slice(0, 300);
      console.error("[hakem] yanıt", yanit.status, govde);
      return { notlar: null, hata: `${MODEL} ${yanit.status} döndü — ${sebep(yanit.status)}` };
    }

    const govde = (await yanit.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };
    const ham = govde.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!ham) return { notlar: null, hata: "Model boş yanıt döndürdü." };

    const cozulen = JSON.parse(ham) as HakemNotu[];
    if (!Array.isArray(cozulen)) return { notlar: null, hata: "Yanıt beklenen biçimde değil." };

    // Modelin uydurduğu id'ler elensin, puan aralığa sıkıştırılsın.
    const gecerli = new Set(istemler.map((i) => i.id));
    return {
      notlar: cozulen
        .filter((n) => gecerli.has(n.id))
        .map((n) => ({
          id: n.id,
          puan: Math.max(0, Math.min(100, Math.round(Number(n.puan) || 0))),
          gerekce: String(n.gerekce ?? "").slice(0, 400),
        })),
    };
  } catch (e) {
    console.error("[hakem] hata", e);
    const asim = (e as Error)?.name === "AbortError";
    return {
      notlar: null,
      hata: asim
        ? `Model ${ZAMAN_ASIMI / 1000} saniyede yanıt vermedi.`
        : "Değerlendirme servisine ulaşılamadı.",
    };
  } finally {
    clearTimeout(sayac);
  }
}
