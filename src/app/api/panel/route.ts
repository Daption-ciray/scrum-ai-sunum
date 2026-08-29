import { durumuOku, katilimcilariOku, paylasimliDepo } from "@/lib/depo";
import { yoneticiMi } from "@/lib/anahtar";

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

  return Response.json(
    {
      durum,
      bagli: katilimcilar.length,
      paylasimli: paylasimliDepo,
      katilimcilar: katilimcilar
        .map((k) => ({ id: k.id, ad: k.ad }))
        .sort((a, b) => a.ad.localeCompare(b.ad, "tr")),
    },
    { headers: { "cache-control": "no-store" } },
  );
}
