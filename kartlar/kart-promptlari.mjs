/**
 * 14 blok kartının promptları.
 *
 * Metinler İngilizce: görsel modelleri İngilizce promptta belirgin şekilde
 * daha iyi sonuç veriyor. Blok adları Türkçe kalıyor, onlar sadece etiket.
 *
 * Kart görseli galeride en fazla ~300 px genişlikte görünüyor; bu yüzden
 * motifler tek ve büyük. Kalabalık kompozisyon o boyutta lekeye dönüşüyor.
 */

export const OTURUM1 = "#4FE3D4"; // turkuaz — Salı
export const OTURUM2 = "#FF9152"; // turuncu — Perşembe

/** Serinin tamamını bir arada tutan ortak stil. Her prompta ekleniyor. */
export const ORTAK_STIL = [
  "Abstract minimal geometric composition on a near-black background.",
  "Thin luminous wireframe lines, subtle volumetric haze, fine film grain,",
  "high contrast, generous negative space, centered composition,",
  "editorial technology aesthetic.",
  "No text, no letters, no numbers, no logos, no people, no faces.",
].join(" ");

/** Motifler — sırayla blok 01…14. */
export const KARTLAR = [
  {
    no: 1,
    ad: "Bağlan ve ısın",
    oturum: 1,
    motif:
      "Many thin luminous threads converging from all edges of the frame into a single bright node at the center.",
  },
  {
    no: 2,
    ad: "Nabız yoklaması",
    oturum: 1,
    motif:
      "A field of scattered glowing points gradually organizing itself into three rising vertical bars, like a live poll result forming.",
  },
  {
    no: 3,
    ad: "Scrum'ı 12 dakikada",
    oturum: 1,
    motif:
      "A single closed circular loop built from three separate luminous arcs that flow into one another endlessly, each arc ending in a small arrowhead.",
  },
  {
    no: 4,
    ad: "AI aslında ne",
    oturum: 1,
    motif:
      "Four concentric rings nested one inside another, each inner ring brighter than the one surrounding it, suggesting layers within layers.",
  },
  {
    no: 5,
    ad: "İlk yarış",
    oturum: 1,
    motif:
      "Four parallel horizontal light trails racing to the right at different speeds, one clearly ahead of the others, motion streaks fading behind each.",
  },
  {
    no: 6,
    ad: "Beş olayda AI",
    oturum: 1,
    motif:
      "Five slender vertical pillars of different heights, threaded together by one continuous line that passes through the top of each.",
  },
  {
    no: 7,
    ad: "Canlı demo",
    oturum: 1,
    motif:
      "A single bright beam entering from the left, passing through a triangular prism, and splitting into several ordered parallel lines on the right.",
  },
  {
    no: 8,
    ad: "Salı'dan ne kaldı",
    oturum: 2,
    motif:
      "Scattered tilted square fragments drifting inward from the edges and snapping into a clean aligned ring at the center.",
  },
  {
    no: 9,
    ad: "Atölye 1 — Kabul kriteri",
    oturum: 2,
    motif:
      "One bright origin point on the left from which two paths diverge: an upper path that is broken, dashed and erratic, and a lower path that is smooth, bright and evenly punctuated by nodes.",
  },
  {
    no: 10,
    ad: "Atölye 2 — Retro teması",
    oturum: 2,
    motif:
      "Loose particles gathering into three distinct circular clusters, with one single bright particle deliberately left outside all of them.",
  },
  {
    no: 11,
    ad: "Neyi asla yapıştırma",
    oturum: 2,
    motif:
      "A firm dashed horizontal boundary line across the frame; particles descending from above stop dead at the line and never cross it, the region below faintly filled.",
  },
  {
    no: 12,
    ad: "AI çalışma anlaşması",
    oturum: 2,
    motif:
      "Five overlapping rings arranged in a circle so that each one interlocks with its neighbours, a single bright point at the shared center.",
  },
  {
    no: 13,
    ad: "Final",
    oturum: 2,
    motif:
      "Three podium blocks of different heights seen head-on, the middle one tallest and brightest, a single glowing point with two halo rings floating above it.",
  },
  {
    no: 14,
    ad: "Taahhüt",
    oturum: 2,
    motif:
      "One bright seed point at the center with six concentric rings radiating outward, fading as they expand.",
  },
];

/** Bir kartın tam promptunu kurar. */
export function promptKur(kart) {
  const vurgu = kart.oturum === 1 ? OTURUM1 : OTURUM2;
  return [
    kart.motif,
    ORTAK_STIL,
    `Monochrome except for a single accent color ${vurgu}; the background stays near-black #0A0C0F.`,
  ].join(" ");
}

/** Dosya adı — galeri bu adları bekliyor, değiştirmeyin. */
export function dosyaAdi(kart) {
  return `blok-${String(kart.no).padStart(2, "0")}.jpg`;
}
