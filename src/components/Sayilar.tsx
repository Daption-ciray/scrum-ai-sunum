import type { CSSProperties } from "react";
import type { Slayt } from "@/icerik/tipler";
import y from "./sayilar.module.css";

/**
 * Büyük rakam slaytı.
 *
 * Deste tablo ve madde listesinden ibaret kalınca tekdüzeleşiyor. Bu tip
 * ritmi kırmak için var: tek şey söyler, büyük söyler. Rakamlar sırayla
 * "sayarak" beliriyor — 8-bit skor ekranı hissi.
 */
export function Sayilar({ slayt }: { slayt: Extract<Slayt, { tip: "sayi" }> }) {
  return (
    <div className={y.sarma}>
      {slayt.baslik && <h2 className={y.baslik}>{slayt.baslik}</h2>}
      {slayt.giris && <p className={y.giris}>{slayt.giris}</p>}

      <div className={y.izgara} data-adet={slayt.sayilar.length}>
        {slayt.sayilar.map((s, i) => (
          <div
            key={s.aciklama}
            className={y.kutu}
            style={{ "--g": `${i * 0.18}s` } as CSSProperties}
          >
            <span className={y.deger}>
              {s.deger}
              {s.birim && <span className={y.birim}>{s.birim}</span>}
            </span>
            <span className={y.aciklama}>{s.aciklama}</span>
          </div>
        ))}
      </div>

      {slayt.kaynak && <p className={y.kaynak}>{slayt.kaynak}</p>}
    </div>
  );
}
