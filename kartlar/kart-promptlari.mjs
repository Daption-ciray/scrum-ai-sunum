/**
 * 14 blok kartının promptları.
 *
 * Metinler İngilizce: görsel modelleri İngilizce promptta belirgin şekilde
 * daha iyi sonuç veriyor. Blok adları Türkçe kalıyor, onlar sadece etiket.
 *
 * Kart görseli galeride en fazla ~300 px genişlikte görünüyor; bu yüzden
 * motifler tek ve büyük. Kalabalık kompozisyon o boyutta lekeye dönüşüyor.
 */

export const OTURUM1 = "#3A3FD1"; // indigo — Salı
export const OTURUM2 = "#D6295E"; // koyu pembe — Perşembe

/**
 * Görsel modelleri hex kodunu yok sayıyor — ilk denemede 14 kartın 14'ü de
 * gri çıktı (doygunluk ~0.01). Renk adına uyuyorlar. Hex yukarıda tema.css
 * ile aynı kaldığını göstermek için duruyor, prompta aşağıdaki adlar giriyor.
 */
const VURGU_ADI = { 1: "vivid indigo blue", 2: "vivid crimson pink" };

/** Serinin tamamını bir arada tutan ortak stil. Her prompta ekleniyor.
 *
 *  "Akış" yönüne geçerken bu blok baştan yazıldı. Eski seri karanlık boşlukta
 *  parlayan çizgilerdi; açık zeminli temada o kartlar ekranda kara kutu gibi
 *  duruyordu. Yeni dil kâğıt üzerine mürekkep: düz vektör, eşit kalınlık,
 *  gölge yok, parıltı yok.
 *
 *  Model olumsuz komutları zayıf tutuyor ("no glow" tek başına yetmiyor), bu
 *  yüzden asıl yükü olumlu ifadeler taşıyor: "on off-white paper", "flat
 *  vector ink". Zemin birkaç kez tekrar ediliyor, kasıtlı.                  */
export const ORTAK_STIL = [
  "Abstract minimal diagram printed on plain off-white paper.",
  "Flat vector ink lines of even weight, solid filled dots as nodes,",
  "generous white space, centered composition, editorial technical-diagram",
  "aesthetic.",
  "No text, no letters, no numbers, no logos, no people, no faces.",
  "No dark background, no glow, no neon, no light emission, no gradient,",
  "no shading, no drop shadow, no 3D render, no perspective, no reflection.",
].join(" ");

/** Motifler — sırayla blok 01…14. */
export const KARTLAR = [
  {
    no: 1,
    ad: "Bağlan ve ısın",
    oturum: 1,
    motif:
      "Many thin threads converging from all edges of the frame into a single solid filled dot at the center.",
  },
  {
    no: 2,
    ad: "Nabız yoklaması",
    oturum: 1,
    motif:
      "A field of scattered small solid dots gradually organizing itself into three rising vertical bars, like a live poll result forming.",
  },
  {
    no: 3,
    ad: "Scrum'ı 12 dakikada",
    oturum: 1,
    motif:
      "A single closed circular loop built from three separate arcs that flow into one another endlessly, each arc ending in a small arrowhead.",
  },
  {
    no: 4,
    ad: "AI aslında ne",
    oturum: 1,
    motif:
      "Four concentric rings nested one inside another, each inner ring drawn with a thicker stroke than the one surrounding it, suggesting layers within layers.",
  },
  {
    no: 5,
    ad: "İlk yarış",
    oturum: 1,
    motif:
      "Four separate horizontal ruled strokes stacked one above the other with clear empty gaps between them, each stroke ending in a solid dot at its right tip; the second stroke from the top reaches much further right than the other three.",
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
      "One horizontal line enters from the left edge and meets a hollow triangle outline standing at the center; from the right side of the triangle a fan of five thin lines spreads outward and apart, like a spectrum. The triangle is an outline only, never filled.",
  },
  {
    no: 8,
    ad: "Salı'dan ne kaldı",
    oturum: 2,
    motif:
      "Scattered tilted square outlines drifting inward from the edges and snapping into a clean aligned ring at the center.",
  },
  {
    no: 9,
    ad: "Atölye 1 — Kabul kriteri",
    oturum: 2,
    motif:
      "One solid origin dot on the left from which two paths diverge: an upper path that is broken, dashed and erratic, and a lower path that is smooth, continuous and evenly punctuated by solid dots.",
  },
  {
    no: 10,
    ad: "Atölye 2 — Retro teması",
    oturum: 2,
    motif:
      "Three tight round clusters of tiny solid dots arranged in a triangle formation, seen flat and straight on, and one lone solid dot far away in the upper right corner, clearly outside all three clusters. Flat graphic composition with no ground plane and no perspective.",
  },
  {
    no: 11,
    ad: "Neyi asla yapıştırma",
    oturum: 2,
    motif:
      "One thick dashed horizontal line straight across the middle of the frame. Above the line, small solid dots fall downward and pile up against it. Below the line the paper is completely empty.",
  },
  {
    no: 12,
    ad: "AI çalışma anlaşması",
    oturum: 2,
    motif:
      "Five overlapping ring outlines arranged in a circle so that each one interlocks with its neighbours, a single solid dot at the shared center.",
  },
  {
    no: 13,
    ad: "Final",
    oturum: 2,
    motif:
      "Three vertical bars of different heights standing side by side on one shared horizontal baseline, drawn as plain flat rectangles in outline, the middle bar clearly the tallest; directly above the middle bar sits one solid dot ringed by two concentric circles. Strictly two-dimensional, drawn like a bar chart on paper, seen perfectly straight on, with no thickness and no side faces.",
  },
  {
    no: 14,
    ad: "Taahhüt",
    oturum: 2,
    motif:
      "One solid seed dot at the center with six concentric rings radiating outward, each ring drawn thinner than the one inside it.",
  },
];

/** Bir kartın tam promptunu kurar. */
export function promptKur(kart) {
  const renk = VURGU_ADI[kart.oturum];
  return [
    // Renk ve zemin cümlesi başta: model ilk sözcüklere daha çok ağırlık veriyor.
    `Flat vector line diagram drawn in ${renk} ink on plain off-white paper.`,
    kart.motif,
    ORTAK_STIL,
    `Every line, dot and mark is ${renk} — nothing is any other hue.`,
    `The background is plain off-white paper, almost white, evenly lit,`,
    `with no texture and no vignette.`,
  ].join(" ");
}

/** Dosya adı — galeri bu adları bekliyor, değiştirmeyin. */
export function dosyaAdi(kart) {
  return `blok-${String(kart.no).padStart(2, "0")}.jpg`;
}
