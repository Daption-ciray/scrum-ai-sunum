import { durumuOku, katilimciSay, paylasimliDepo } from "@/lib/depo";
import { quizKalanHesapla } from "@/lib/durum";

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
    { durum: { ...durum, quizKalan: quizKalanHesapla(durum) }, bagli, paylasimli: paylasimliDepo },
    {
      headers: {
        /* ÜÇ BAŞLIK, ÜÇÜ DE GEREKLİ — ve `dynamic = "force-dynamic"` YOK.

           ÖLÇÜLDÜ (1 Eylül 2026, production): route `force-dynamic` iken
           yanıttaki `cache-control` başlığı kenarda `public`e indirgeniyordu,
           `s-maxage` düşüyordu. Sonuç: 75 eşzamanlı istekte CDN isabeti %0-1,
           yani her katılımcının her yoklaması fonksiyona VE Redis'e iniyordu
           — dakikada ~7.500 komut, 60 dakikalık oturumda ~450.000. Upstash'in
           aylık 500K sınırı tek oturumda biterdi.

           `Vercel-CDN-Cache-Control` yalnızca Vercel'in kenarını hedefliyor ve
           framework tarafından ezilmiyor; `CDN-Cache-Control` diğer CDN'ler
           için; `cache-control` ise tarayıcı için (0 = tarayıcı saklamasın,
           bayat slayt gösterilmesin).

           swr GERİ EKLENMEYECEK: `stale-while-revalidate=4` ölçüldüğünde slayt
           geçişi katılımcıya medyan 3,9 saniyede ulaşıyordu. `stale-if-error`
           kalsın — origin tökezlerse oda donmasın. */
        "cache-control": "public, max-age=0, must-revalidate",
        "cdn-cache-control": "public, s-maxage=1, stale-if-error=10",
        "vercel-cdn-cache-control": "public, s-maxage=1, stale-if-error=10",
      },
    },
  );
}
