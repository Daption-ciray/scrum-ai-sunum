import { Fragment, type CSSProperties } from "react";
import type { Slayt } from "@/icerik/tipler";
import r from "./roller.module.css";

/**
 * Rol birleşme akışı — dört sahnede kendini kuruyor:
 *   1) bugünkü unvanlar belirir
 *   2) bağlantılar çizilir, ara kutular gelir
 *   3) son kutular gelir
 *   4) her şey soluklaşır, bağlanmayan kutu tek başına kalır
 *
 * Sahneler CSS gecikmeleriyle veriliyor; JS zamanlayıcı yok. Slaytın kendi
 * `key`'i slayt değişince değiştiği için animasyon her açılışta baştan
 * çalışıyor — sunucu geri gelip tekrar gösterebilir.
 *
 * `--g` her öğenin kendi gecikmesi. Sahne sınırları roller.module.css'te.
 */
export function RollerAkisi({ slayt }: { slayt: Extract<Slayt, { tip: "roller" }> }) {
  // Sol sütundaki kutular sırayla belirsin diye akan bir sayaç.
  let sira = 0;

  return (
    <div className={r.sarma}>
      <h2 className={r.baslik}>{slayt.baslik}</h2>
      {slayt.giris && <p className={r.giris}>{slayt.giris}</p>}

      <div className={r.sutunBasliklari} aria-hidden>
        {slayt.sutunlar.map((s) => (
          <span key={s} className={`etiket ${r.sutunBaslik}`}>
            {s}
          </span>
        ))}
      </div>

      <div className={r.akis}>
        {slayt.gruplar.map((grup, gi) => (
          <Fragment key={grup.son}>
          <div className={r.grup}>
            <div className={r.dallar}>
              {grup.dallar.map((dal) => (
                <div key={dal.ara} className={r.dal}>
                  <div className={r.kaynaklar}>
                    {dal.kaynaklar.map((k) => (
                      <span
                        key={k}
                        className={r.kutu}
                        style={{ "--g": `${(sira++ * 70) / 1000}s` } as CSSProperties}
                      >
                        {k}
                      </span>
                    ))}
                    <span className={r.parantez} aria-hidden />
                  </div>
                  <span className={`${r.kutu} ${r.ara}`}>{dal.ara}</span>
                </div>
              ))}
              <span className={`${r.parantez} ${r.parantezBuyuk}`} aria-hidden />
            </div>
            <span className={`${r.kutu} ${r.son}`}>{grup.son}</span>
          </div>

          {/* Bağlanmayan kutu listenin İÇİNDE, kendi sırasında.
              Ayracı yok — mesaj tam olarak bu boşluk. */}
          {gi === slayt.yalniz.sonraGrup && (
            <div className={`${r.grup} ${r.yalnizSatir}`}>
              <div className={r.dallar}>
                <div className={r.dal}>
                  <div className={r.kaynaklar}>
                    <span className={`${r.kutu} ${r.yalniz}`}>{slayt.yalniz.ad}</span>
                  </div>
                </div>
              </div>
              <span className={r.yalnizNot}>{slayt.yalniz.not}</span>
            </div>
          )}
          </Fragment>
        ))}
      </div>

      {slayt.kaynak && <p className={r.kaynak}>{slayt.kaynak}</p>}
    </div>
  );
}
