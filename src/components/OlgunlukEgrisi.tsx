import type { CSSProperties } from "react";
import type { OlgunlukNoktasi, Slayt } from "@/icerik/tipler";
import o from "./olgunluk.module.css";

/* Çizim alanı. */
const EN = 100;
const BOY = 46;

/**
 * Olgunluk eğrisinin yüksekliği. Tek bir fonksiyon hem çizgiyi hem noktaları
 * konumlandırıyor — ikisi ayrı tanımlansa nokta eğrinin üstünde durmazdı.
 *
 * x: 0 (tetikleyici) → 100 (plato). Dönen değer 0 (taban) → 1 (zirve).
 * Şekil: hızlı yükselen zirve, çukur, yavaş yükselen plato.
 */
function egriY(x: number): number {
  if (x <= 30) {
    // Tetikleyiciden zirveye: yumuşak hızlanan tırmanış.
    const t = x / 30;
    return t * t * (3 - 2 * t);
  }
  if (x <= 55) {
    // Zirveden çukura düşüş.
    const t = (x - 30) / 25;
    return 1 - 0.82 * (t * t * (3 - 2 * t));
  }
  // Çukurdan platoya: yavaş ve istikrarlı toparlanma.
  const t = (x - 55) / 45;
  return 0.18 + 0.42 * (t * (2 - t));
}

const px = (x: number) => (x / 100) * EN;
const py = (x: number) => BOY - egriY(x) * (BOY - 4) - 2;

/** Eğriyi örnekleyip tek bir SVG yoluna çeviriyor. */
function yol(): string {
  const adimlar = 120;
  let d = `M ${px(0).toFixed(2)} ${py(0).toFixed(2)}`;
  for (let i = 1; i <= adimlar; i++) {
    const x = (i / adimlar) * 100;
    d += ` L ${px(x).toFixed(2)} ${py(x).toFixed(2)}`;
  }
  return d;
}

/**
 * Eğri üstünde ad değil NUMARA duruyor, adlar altındaki listede.
 *
 * Dokuz noktanın hepsi zirve bölgesinde (x 9–39) toplanıyor ve orada eğri
 * yatıklaştığı için etiketler hem yatayda hem dikeyde üst üste biniyordu.
 * Etiketi noktadan uzaklaştırmak da çözmedi: anlamlı ayrım için 100 px'ten
 * fazla kaydırmak gerekiyor, o da etiketin hangi noktaya ait olduğunu
 * belirsizleştiriyor. Numara + lejant, Gartner'ın kendi çözümü.
 *
 * Rozet iki yerde de aynı: dolgu olgunlaşma ufkunu, numara kimliği taşıyor.
 */
export function OlgunlukEgrisi({ slayt }: { slayt: Extract<Slayt, { tip: "olgunluk" }> }) {
  const sirali = [...slayt.noktalar].sort((a, b) => a.x - b.x);
  const gecikme = (i: number) => ({ "--g": `${1.1 + i * 0.09}s` }) as CSSProperties;

  return (
    <div className={o.sarma}>
      <h2 className={o.baslik}>{slayt.baslik}</h2>
      {slayt.giris && <p className={o.giris}>{slayt.giris}</p>}

      <div className={o.tuval}>
        <svg
          className={o.svg}
          viewBox={`0 0 ${EN} ${BOY}`}
          preserveAspectRatio="none"
          role="img"
          aria-label={`${slayt.baslik} — olgunluk eğrisi`}
        >
          <path className={o.egri} d={yol()} />
        </svg>

        {/* Numaralar SVG'nin dışında, yüzde konumla duruyor: metin ölçeği
            preserveAspectRatio="none" ile bozulmasın diye. */}
        {sirali.map((n, i) => (
          <span
            key={n.ad}
            className={`${o.nokta} ${o.rozet} ${o[n.ufuk]} ${n.one ? o.one : ""}`}
            style={{
              left: `${n.x}%`,
              top: `${(py(n.x) / BOY) * 100}%`,
              ...gecikme(i),
            }}
            aria-hidden
          >
            {i + 1}
          </span>
        ))}
      </div>

      <div className={o.asamalar} aria-hidden>
        {slayt.asamalar.map((a) => (
          <span key={a} className={`etiket ${o.asama}`}>
            {a}
          </span>
        ))}
      </div>

      {slayt.aciklama && <p className={o.okuma}>{slayt.aciklama}</p>}

      <ol className={o.liste}>
        {sirali.map((n, i) => (
          <li key={n.ad} className={`${o.oge} ${n.one ? o.one : ""}`} style={gecikme(i)}>
            <span className={`${o.rozet} ${o[n.ufuk]}`} aria-hidden>
              {i + 1}
            </span>
            <span>{n.ad}</span>
          </li>
        ))}
      </ol>

      <div className={o.lejant}>
        <span className={o.lejantOge}>
          <span className={`${o.kutucuk} ${o.yakin}`} aria-hidden /> 2 yıldan az
        </span>
        <span className={o.lejantOge}>
          <span className={`${o.kutucuk} ${o.orta}`} aria-hidden /> 2–5 yıl
        </span>
        <span className={o.lejantOge}>
          <span className={`${o.kutucuk} ${o.uzak}`} aria-hidden /> 5–10 yıl
        </span>
      </div>

      {slayt.kaynak && <p className={o.kaynak}>{slayt.kaynak}</p>}
    </div>
  );
}

export type { OlgunlukNoktasi };
