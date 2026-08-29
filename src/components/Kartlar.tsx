import type { CSSProperties } from "react";
import type { Slayt } from "@/icerik/tipler";
import k from "./kartlar.module.css";

/** Kart dizisi — sözlük ve referans içeriği için. Tablodan okunur. */
export function Kartlar({ slayt }: { slayt: Extract<Slayt, { tip: "kartlar" }> }) {
  return (
    <div className={k.sarma}>
      <h2 className={k.baslik}>{slayt.baslik}</h2>
      {slayt.giris && <p className={k.giris}>{slayt.giris}</p>}

      <div className={k.izgara}>
        {slayt.kartlar.map((kart, i) => (
          <div
            key={kart.ana}
            className={k.kart}
            style={{ "--g": `${i * 0.09}s` } as CSSProperties}
          >
            <span className={`etiket ${k.ust}`}>{kart.ust}</span>
            <span className={k.ana}>{kart.ana}</span>
            {kart.alt && <span className={k.alt}>{kart.alt}</span>}
          </div>
        ))}
      </div>

      {slayt.kaynak && <p className={k.kaynak}>{slayt.kaynak}</p>}
    </div>
  );
}
