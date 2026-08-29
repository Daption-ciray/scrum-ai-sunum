import { durumuOku, katilimciSay, paylasimliDepo } from "@/lib/depo";

export const dynamic = "force-dynamic";

/**
 * Katılımcı yoklamasının tek uğrak yeri: slayt durumu ve bağlı sayısı.
 *
 * Burada kişiye özel HİÇBİR ŞEY dönmüyor — isim listesi yok, kimlik yok.
 * Bu bilinçli: yanıt herkes için birebir aynı olduğu için CDN'de bir saniye
 * önbelleklenebiliyor. 75 kişi iki saniyede bir sorduğunda isteklerin
 * neredeyse tamamı kenardan karşılanıyor, fonksiyon saniyede bir kez
 * çalışıyor. Yanıta kişiye özel bir alan eklerseniz bu önbelleği kaldırın,
 * yoksa bir katılımcının verisi başkasına servis edilir.
 *
 * "Buradayım" bildirimi ayrı uçta (/api/buradayim) — o önbelleklenemez.
 */
export async function GET() {
  const [durum, bagli] = await Promise.all([durumuOku(), katilimciSay()]);

  return Response.json(
    { durum, bagli, paylasimli: paylasimliDepo },
    {
      headers: {
        // 1 sn taze, 4 sn bayat servis edilirken arkada tazeleniyor.
        // Slayt senkronu zaten saniyeler mertebesinde; bu gecikme fark etmiyor.
        "cache-control": "public, s-maxage=1, stale-while-revalidate=4",
      },
    },
  );
}
