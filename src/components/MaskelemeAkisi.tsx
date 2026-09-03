import type { CSSProperties } from "react";
import type { Slayt } from "@/icerik/tipler";
import m from "./maskeakis.module.css";

/**
 * Maskeleme akışı — üç katman, tek ekranda.
 *
 *   01 İSTEM      ham metin, hassas alanlar işaretli
 *   02 MASKELEME  soldan sağa yürüyen tarama çizgisi
 *   03 MODELE     yalnızca maskelenmiş hâl gidiyor
 *
 * Slaydın işi bir kuralı SÖYLEMEK değil GÖSTERMEK: bir önceki slayt
 * maskeleme tekniklerini sayıyor, bu slayt tekniğin uygulandığı anı
 * gözle görünür kılıyor. Katılımcının aklında kalan şey liste değil,
 * çizginin geçtiği yerde adın bloğa dönüşmesi.
 *
 * Tamamı CSS animasyonu. `requestAnimationFrame` KULLANILMIYOR: arka plan
 * sekmesinde rAF hiç çalışmıyor ve bu sitede bir kez donmuş bileşene yol
 * açtı (bkz. CLAUDE.md, `cevir` kartı).
 *
 * Hassas parçaların değişim gecikmesi, tarama çizgisinin o parçaya varış
 * anıyla elle hizalandı (`--gecikme`). Tam senkron değil, YAKIN: çizgi
 * değdikten hemen sonra değişiyor — insan gözü sebep-sonucu böyle okuyor.
 */
export function MaskelemeAkisi({
  slayt,
}: {
  slayt: Extract<Slayt, { tip: "maskeakis" }>;
}) {
  const [k1, k2, k3] = slayt.katmanlar ?? ["İstem", "Maskeleme", "Modele giden"];

  // Hassas parçalar metin boyunca nerede duruyor: tarama çizgisi soldan sağa
  // yürüdüğü için gecikme, parçanın sıradaki konumuna göre veriliyor.
  const toplam = slayt.parcalar.length;

  return (
    <div className={m.sarma}>
      <h2 className={m.baslik}>{slayt.baslik}</h2>
      {slayt.giris && <p className={m.giris}>{slayt.giris}</p>}

      <div className={m.katmanlar}>
        <div className={m.katman}>
          <span className={`etiket ${m.no}`}>01</span>
          <span className={`etiket ${m.katmanAd}`}>{k1}</span>
        </div>
        <div className={`${m.katman} ${m.katmanEtkin}`}>
          <span className={`etiket ${m.no}`}>02</span>
          <span className={`etiket ${m.katmanAd}`}>{k2}</span>
        </div>
        <div className={m.katman}>
          <span className={`etiket ${m.no}`}>03</span>
          <span className={`etiket ${m.katmanAd}`}>{k3}</span>
        </div>
      </div>

      <div className={m.sahne}>
        <p className={m.metin}>
          {slayt.parcalar.map((p, i) =>
            p.maske ? (
              <span
                key={`${p.metin}-${i}`}
                className={m.hassas}
                style={{ "--gecikme": `${1.6 + (i / toplam) * 3.4}s` } as CSSProperties}
              >
                <span className={m.acik}>{p.metin}</span>
                <span className={m.kapali} aria-hidden>
                  {p.maske}
                </span>
              </span>
            ) : (
              <span key={`${p.metin}-${i}`}>{p.metin}</span>
            ),
          )}
        </p>

        {/* Maskeleme servisi: soldan sağa yürüyen çizgi. */}
        <span className={m.tarama} aria-hidden />
      </div>

      <p className={m.sonuc}>
        <span className={m.ok} aria-hidden>
          ↓
        </span>
        {slayt.sonuc ?? "Modele yalnızca bu hâli gidiyor."}
      </p>

      {slayt.kaynak && <p className={m.kaynak}>{slayt.kaynak}</p>}
    </div>
  );
}
