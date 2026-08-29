import {
  durumuOku,
  katilimciBildir,
  katilimcilariOku,
  paylasimliDepo,
} from "@/lib/depo";
import { yoneticiMi } from "@/lib/anahtar";

export const dynamic = "force-dynamic";

/**
 * Tek uçtan iki iş: katılımcı "buradayım" der ve güncel durumu alır.
 * Yoklama başına iki istek yerine bir istek — 15 kişilik odada fark ediyor.
 */
export async function GET(istek: Request) {
  const q = new URL(istek.url).searchParams;
  const id = q.get("id");
  const ad = q.get("ad");

  if (id && ad) {
    // Bildirim başarısız olsa da durum dönmeli; oturum bunun için durmaz.
    await katilimciBildir(id.slice(0, 64), ad.slice(0, 40)).catch(() => {});
  }

  const [durum, katilimcilar] = await Promise.all([durumuOku(), katilimcilariOku()]);
  const yonetici = yoneticiMi(istek);

  return Response.json(
    {
      durum,
      bagli: katilimcilar.length,
      paylasimli: paylasimliDepo,
      ...(yonetici
        ? { adlar: katilimcilar.map((k) => k.ad).sort((a, b) => a.localeCompare(b, "tr")) }
        : {}),
    },
    { headers: { "cache-control": "no-store" } },
  );
}
