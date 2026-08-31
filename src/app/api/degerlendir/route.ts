import { durumuOku, istemleriOku } from "@/lib/depo";
import { yoneticiMi } from "@/lib/anahtar";
import { slaytAl } from "@/icerik";
import { istemPuanla } from "@/lib/istemPuan";
import { UC_SAYISI, hakemVar, hakemeSor } from "@/lib/hakem";

export const dynamic = "force-dynamic";

/**
 * Elekten geçen istemleri LLM hakeme yargılatır. YALNIZCA sunucu.
 *
 * Elek: anahtar kelime puanına göre en üstteki ve en alttaki birkaç istem.
 * 75 istemin tamamı gönderilmiyor — hem gereksiz hem yavaş; sunucunun
 * bakacağı yer zaten uçlar.
 *
 * Hata hâlinde 200 ve `notlar: null` dönüyor: panel anahtar kelime
 * sıralamasıyla çalışmaya devam etsin, oturum durmasın.
 */
export async function POST(istek: Request) {
  if (!yoneticiMi(istek)) {
    return Response.json({ hata: "Sunucu anahtarı geçersiz." }, { status: 401 });
  }
  if (!hakemVar) {
    return Response.json(
      { notlar: null, hata: "Değerlendirme anahtarı tanımlı değil." },
      { headers: { "cache-control": "no-store" } },
    );
  }

  const durum = await durumuOku();
  const slayt = slaytAl(durum.oturum, durum.slayt);
  const atolyeId =
    slayt?.tip === "atolye"
      ? slayt.id
      : slayt?.tip === "karsilastirma"
        ? slayt.kaynakSlayt
        : null;
  if (!atolyeId) {
    return Response.json({ hata: "Bu slaytta atölye yok." }, { status: 409 });
  }

  const istemler = await istemleriOku(atolyeId);
  if (istemler.length === 0) {
    return Response.json({ notlar: [] }, { headers: { "cache-control": "no-store" } });
  }

  const sirali = istemler
    .map((i) => ({ ...i, on: istemPuanla(i.metin).puan }))
    .sort((a, b) => b.on - a.on);

  // Uçlar. Liste kısaysa aynı istem iki uçta da çıkabilir; Map tekilleştiriyor.
  const secilen = new Map<string, { id: string; metin: string }>();
  for (const i of [...sirali.slice(0, UC_SAYISI), ...sirali.slice(-UC_SAYISI)]) {
    secilen.set(i.id, { id: i.id, metin: i.metin });
  }

  const { notlar, hata } = await hakemeSor([...secilen.values()]);
  return Response.json(
    // `hata` doluysa panel bunu ekranda gösteriyor: sunucu canlı oturumda
    // terminale bakamaz, neden olmadığını arayüzden görmeli.
    { notlar, hata, denenen: secilen.size },
    { headers: { "cache-control": "no-store" } },
  );
}
