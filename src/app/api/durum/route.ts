import { durumuOku, paylasimliDepo } from "@/lib/depo";
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
  /* TEK Redis komutu. Eskiden burada bir de `katilimciSay()` (ZCOUNT) vardı;
     katılımcı ekranındaki "kaç kişi bağlı" sayacını besliyordu. ÖLÇÜLDÜ:
     origin'e saniyede ~19 istek iniyor, yani o sayaç tek başına oturumda
     ~68.000 Redis komutu demekti. Sayı sunucu panelinde duruyor (orası
     zaten tam listeyi çekiyor); katılımcının ekranında bağlantı noktası
     kaldı, rakam kalktı. Bir dekorasyon için kotanın yarısı harcanmaz. */
  const durum = await durumuOku();

  return Response.json(
    { durum: { ...durum, quizKalan: quizKalanHesapla(durum) }, paylasimli: paylasimliDepo },
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

           TTL neden 2 saniye: 1 saniyede önbellek dolmadan boşalıyordu —
           ölçülen isabet %27, origin'e 38,7 istek/sn. 2 saniyede isabet
           yaklaşık ikiye katlanıyor ve slayt gecikmesi medyan ~1,9 sn'de
           kalıyor; ekran paylaşımının 2-5 saniyesinin hâlâ altında. Daha
           uzun TTL komut sayısını daha da düşürür ama bayat slayt riski
           büyür — asıl çözüm sunucu ilerlettiğinde önbelleği purge etmek,
           o eğitimden sonraki iş.

           swr GERİ EKLENMEYECEK: `stale-while-revalidate=4` ölçüldüğünde slayt
           geçişi katılımcıya medyan 3,9 saniyede ulaşıyordu. `stale-if-error`
           kalsın — origin tökezlerse oda donmasın. */
        "cache-control": "public, max-age=0, must-revalidate",
        "cdn-cache-control": "public, s-maxage=2, stale-if-error=10",
        "vercel-cdn-cache-control": "public, s-maxage=2, stale-if-error=10",
      },
    },
  );
}
