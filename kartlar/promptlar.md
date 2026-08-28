# Kart görselleri — fal.ai promptları

14 blok kartı için hazır promptlar. Şu an `public/kartlar/blok-01…14.jpg`
dosyaları Canvas ile üretilmiş durumda; fal'da üretip **aynı adlarla** üzerine
yazmanız yeterli, kodda hiçbir şey değişmiyor.

## Ayarlar

| | |
|---|---|
| Model | `fal-ai/flux/dev` (kalite) veya `fal-ai/flux/schnell` (hız/ucuz) |
| En-boy | **3:4** (dikey) — kart oranı bu |
| Çözünürlük | 768×1024 yeter; galeri kartı ekranda en fazla ~300 px geniş |
| Çıktı | `.jpg`, kalite ~90. Kart başına 100–150 KB'ı geçmesin |
| Dosya adı | `blok-01.jpg` … `blok-14.jpg` → `public/kartlar/` içine |

## Ortak stil (her promptun sonuna eklenecek)

```
Abstract minimal geometric composition on a near-black background (#0A0C0F).
Thin luminous wireframe lines, subtle volumetric haze, fine film grain,
high contrast, generous negative space, centered composition, editorial
technology aesthetic. No text, no letters, no numbers, no logos, no people.
```

**Renk:** blok 01–07 için turkuaz `#4FE3D4`, blok 08–14 için turuncu `#FF9152`.
Prompta `accent color <hex>, monochrome apart from the accent` diye ekleyin —
iki oturumun rengi galeride bilgi taşıyor, karışmasın.

## 14 motif

### Oturum 1 — turkuaz `#4FE3D4`

**01 · Bağlan ve ısın**
Many thin luminous threads converging from all edges into a single bright node at the center.

**02 · Nabız yoklaması**
A field of scattered glowing points gradually organizing itself into three rising vertical bars, like a live poll result forming.

**03 · Scrum'ı 12 dakikada**
A single closed circular loop built from three separate luminous arcs that flow into one another endlessly, each arc ending in a small arrowhead.

**04 · AI aslında ne**
Four concentric rings nested one inside another, each inner ring brighter than the one around it, suggesting layers within layers.

**05 · İlk yarış**
Four parallel horizontal light trails racing to the right at different speeds, one clearly ahead of the others, motion streaks fading behind each.

**06 · Beş olayda AI**
Five slender vertical pillars of different heights, threaded together by one continuous line that passes through the top of each.

**07 · Canlı demo**
A single bright beam entering from the left, passing through a triangular prism, and splitting into several ordered parallel lines on the right.

### Oturum 2 — turuncu `#FF9152`

**08 · Salı'dan ne kaldı**
Scattered tilted square fragments drifting inward from the edges and snapping into a clean aligned ring at the center.

**09 · Atölye 1 — Kabul kriteri**
One bright origin point on the left from which two paths diverge: an upper path that is broken, dashed and erratic, and a lower path that is smooth, bright and evenly punctuated by nodes.

**10 · Atölye 2 — Retro teması**
Loose particles gathering into three distinct circular clusters, with one single bright particle deliberately left outside all of them.

**11 · Neyi asla yapıştırma**
A firm dashed horizontal boundary line across the frame; particles descending from above stop dead at the line and never cross it, the region below faintly filled.

**12 · AI çalışma anlaşması**
Five overlapping rings arranged in a circle so that each one interlocks with its neighbours, a single bright point at the shared center.

**13 · Final**
Three podium blocks of different heights seen head-on, the middle one tallest and brightest, a single glowing point with two halo rings floating above it.

**14 · Taahhüt**
One bright seed point at the center with six concentric rings radiating outward, fading as they expand.

## Kontrol

Üretim bittikten sonra 14'ünü yan yana koyup bakın: **seri gibi mi duruyorlar?**
Biri diğerlerinden parlak, kalabalık veya farklı stilde çıktıysa onu tek başına
yeniden üretin. Galeride kartlar yan yana geldiği için tutarlılık tek tek
kalitenin önünde geliyor.
