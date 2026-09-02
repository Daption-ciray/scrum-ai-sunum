import type { CSSProperties } from "react";
import type { Slayt } from "@/icerik/tipler";
import a from "./adimlar.module.css";

/** Sıralı adımlar — numaralı, birbirine bağlı, sırayla beliren. */
export function Adimlar({ slayt }: { slayt: Extract<Slayt, { tip: "adim" }> }) {
  return (
    <div className={a.sarma}>
      <h2 className={a.baslik}>{slayt.baslik}</h2>
      {slayt.giris && <p className={a.giris}>{slayt.giris}</p>}

      <ol className={a.dizi}>
        {slayt.adimlar.map((ad, i) => (
          <li
            key={ad.ad}
            className={a.adim}
            style={{ "--g": `${i * 0.22}s` } as CSSProperties}
          >
            <span className={`sayi ${a.no}`}>{String(i + 1).padStart(2, "0")}</span>
            <span className={a.ad}>{ad.ad}</span>
            <span className={a.aciklama}>{ad.aciklama}</span>
            {ad.ornek && <span className={a.ornek}>{ad.ornek}</span>}
          </li>
        ))}
      </ol>

      {slayt.baglantilar && slayt.baglantilar.length > 0 && (
        <div className={a.baglantilar}>
          {slayt.baglantilar.map((b) => (
            <a
              key={b.url}
              className={`etiket ${a.baglanti}`}
              href={b.url}
              target="_blank"
              /* Yeni sekme zorunlu: aynı sekmede açılırsa katılımcı sunumdan
                 düşer ve geri dönene kadar slaytları kaçırır. */
              rel="noopener noreferrer"
            >
              {b.ad} ↗
            </a>
          ))}
        </div>
      )}

      {slayt.kaynak && <p className={a.kaynak}>{slayt.kaynak}</p>}
    </div>
  );
}
