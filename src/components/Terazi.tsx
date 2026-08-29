import type { CSSProperties } from "react";
import type { Slayt } from "@/icerik/tipler";
import t from "./terazi.module.css";

/**
 * Tek eksen, iki uç. `ikili` iki ayrı kart gösteriyor; bu tek bir sürekli
 * eksen — öğeler ortadaki çizgiden sağa veya sola dallanıyor. Aynı içerik
 * için farklı bir okuma: karşılaştırma değil, ağırlık.
 */
export function Terazi({ slayt }: { slayt: Extract<Slayt, { tip: "terazi" }> }) {
  return (
    <div className={t.sarma}>
      <h2 className={t.baslik}>{slayt.baslik}</h2>
      {slayt.giris && <p className={t.giris}>{slayt.giris}</p>}

      <div className={t.uclar}>
        <span className={`etiket ${t.uc}`}>{slayt.solEtiket}</span>
        <span className={`etiket ${t.uc} ${t.ucSag}`}>{slayt.sagEtiket}</span>
      </div>

      <ul className={t.eksen}>
        {slayt.ogeler.map((o, i) => (
          <li
            key={o.metin}
            className={`${t.oge} ${o.taraf === "sag" ? t.sag : t.sol}`}
            style={{ "--g": `${i * 0.12}s` } as CSSProperties}
          >
            <span className={t.kutu}>{o.metin}</span>
          </li>
        ))}
      </ul>

      {slayt.kaynak && <p className={t.kaynak}>{slayt.kaynak}</p>}
    </div>
  );
}
