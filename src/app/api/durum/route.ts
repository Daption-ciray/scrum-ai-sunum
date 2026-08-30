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
        /* ÖLÇÜLDÜ: `stale-while-revalidate=4` ile slayt geçişi katılımcıya
           medyan 3,9 saniyede ulaşıyordu — CDN dört saniyeye kadar bayat
           içerik servis ediyor. Ekran paylaşımının gecikmesi zaten 2-5 sn;
           o gecikmeyi kaldırmak için yazılan sitede bu kabul edilemez.

           swr kaldırıldı: bayatlık en fazla 1 saniye. Fonksiyon yükü
           değişmiyor, `s-maxage=1` origin'i yine saniyede bir kez vuruyor
           (CDN istekleri birleştiriyor).

           `stale-if-error` bilerek duruyor: normal sürede bayat servis etmek
           yanlış, ama origin veya Redis tökezlerse oda donmasın diye on
           saniyeye kadar eski durumu göstermek doğru. */
        "cache-control": "public, s-maxage=1, stale-if-error=10",
      },
    },
  );
}
