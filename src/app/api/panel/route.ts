import {
  durumuOku,
  istemleriOku,
  katilimcilariOku,
  paylasimliDepo,
  quizCevaplariOku,
  secimOku,
} from "@/lib/depo";
import { yoneticiMi } from "@/lib/anahtar";
import { slaytAl } from "@/icerik";
import { PARCA_ADI, istemPuanla } from "@/lib/istemPuan";
import { hakemVar } from "@/lib/hakem";
import { CEVAPLAR } from "@/icerik/cevaplar";

export const dynamic = "force-dynamic";

/**
 * Sunucu panelinin ucu. Katılımcı ucundan ayrı tutuldu: burada isim listesi
 * var ve bu yanıt ASLA önbelleklenmemeli. Aynı uçtan servis edilseydi
 * CDN bir sunucu yanıtını katılımcılara dağıtabilirdi.
 */
export async function GET(istek: Request) {
  if (!yoneticiMi(istek)) {
    return Response.json({ hata: "Sunucu anahtarı geçersiz." }, { status: 401 });
  }

  const [durum, katilimcilar] = await Promise.all([durumuOku(), katilimcilariOku()]);

  /* Atölye verisi yalnızca ilgili slayttayken okunuyor. Her yoklamada
     HGETALL çekmek 75 kişilik odada gereksiz Redis trafiği demek. */
  const slayt = slaytAl(durum.oturum, durum.slayt);
  const atolyeId =
    slayt?.tip === "atolye"
      ? slayt.id
      : slayt?.tip === "karsilastirma"
        ? slayt.kaynakSlayt
        : null;

  let atolye: {
    slaytId: string;
    secim: { iyi?: string; kotu?: string };
    istemler: { id: string; ad: string; metin: string; puan: number; parcalar: string[] }[];
  } | null = null;

  if (atolyeId) {
    const [istemler, secim] = await Promise.all([istemleriOku(atolyeId), secimOku(atolyeId)]);
    atolye = {
      slaytId: atolyeId,
      secim,
      istemler: istemler
        .map((i) => {
          const { puan, parcalar } = istemPuanla(i.metin);
          // Panelde ham anahtar değil okunur ad görünsün.
          return { ...i, puan, parcalar: parcalar.map((x) => PARCA_ADI[x]) };
        })
        // Yüksekten alçağa: sunucu en üstteki üçe ve en alttaki üçe bakıyor.
        .sort((a, b) => b.puan - a.puan),
    };
  }

  /* Quiz dağılımı yalnızca quiz slaytındayken okunuyor — atölyedeki gerekçe.
     Sunucu doğru cevabı ve kaç kişinin hangi şıkka gittiğini görüyor;
     katılımcı hiçbirini görmüyor, bu uç zaten sunucuya özel. */
  let quiz: {
    slaytId: string;
    soruSayisi: number;
    /** Aktif sorudaki cevap sayısı. */
    cevaplayan: number;
    /** Bütün sorulardaki doğru şık indeksleri. */
    dogru: number[];
    /** dagilim[soru][sik] = o şıkkı seçen kişi sayısı. */
    dagilim: number[][];
  } | null = null;

  if (slayt?.tip === "quiz") {
    const cevaplar = await quizCevaplariOku(slayt.id);
    quiz = {
      slaytId: slayt.id,
      soruSayisi: slayt.sorular.length,
      cevaplayan: cevaplar.filter((c) => c.soru === durum.quizSoru).length,
      dogru: CEVAPLAR[slayt.id] ?? [],
      dagilim: slayt.sorular.map((s, si) =>
        s.secenekler.map(
          (_, ki) => cevaplar.filter((c) => c.soru === si && c.sik === ki).length,
        ),
      ),
    };
  }

  return Response.json(
    {
      durum,
      quiz,
      bagli: katilimcilar.length,
      paylasimli: paylasimliDepo,
      atolye,
      /* Değerlendirme anahtarı tanımlı mı — panel düğmeyi ona göre gösteriyor. */
      hakemVar,
      katilimcilar: katilimcilar
        .map((k) => ({ id: k.id, ad: k.ad }))
        .sort((a, b) => a.ad.localeCompare(b.ad, "tr")),
    },
    { headers: { "cache-control": "no-store" } },
  );
}
