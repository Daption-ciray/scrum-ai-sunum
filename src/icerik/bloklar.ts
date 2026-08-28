import { bloklar } from "./index";

export type BlokOzeti = {
  /** 1..14 — galeri kart görselinin numarası da bu. */
  no: number;
  ad: string;
  /** Plandaki dakika. Galeride çizginin uzunluğu buradan geliyor. */
  sure: number;
  oturum: 1 | 2;
  /** Bloğun ilk slaytının, kendi oturumu içindeki indeksi. */
  slayt: number;
  adet: number;
  gorsel: string;
};

/** Blok süreleri akış planından. Slayt sayısıyla değil, gerçek dakikayla. */
const SURELER: Record<string, number> = {
  "Bağlan ve ısın": 4,
  "Nabız yoklaması": 4,
  "Scrum'ı 12 dakikada": 12,
  "AI aslında ne": 14,
  "İlk yarış": 5,
  "Beş olayda AI": 15,
  "Canlı demo": 6,
  "Salı'dan ne kaldı": 5,
  "Atölye 1": 18,
  "Atölye 2": 12,
  "Neyi asla yapıştırmayacaksın": 10,
  "Ekip AI çalışma anlaşması": 7,
  Final: 6,
  Taahhüt: 2,
};

/** Galeride görünen kısa ad — slayt başlığı uzun olduğunda kartta taşmasın. */
const KISA_AD: Record<string, string> = {
  "Neyi asla yapıştırmayacaksın": "Neyi asla yapıştırma",
  "Ekip AI çalışma anlaşması": "AI çalışma anlaşması",
  "Atölye 1": "Atölye 1 — Kabul kriteri",
  "Atölye 2": "Atölye 2 — Retro teması",
};

let onbellek: BlokOzeti[] | null = null;

/** İki oturumun bütün blokları, tek sırada. Galeri bunun üzerinden çalışıyor. */
export function tumBloklar(): BlokOzeti[] {
  if (onbellek) return onbellek;
  const liste: BlokOzeti[] = [];
  ([1, 2] as const).forEach((o) => {
    bloklar(o).forEach((b) => {
      const no = liste.length + 1;
      liste.push({
        no,
        ad: KISA_AD[b.ad] ?? b.ad,
        sure: SURELER[b.ad] ?? 5,
        oturum: o,
        slayt: b.baslangic,
        adet: b.adet,
        gorsel: `/kartlar/blok-${String(no).padStart(2, "0")}.jpg`,
      });
    });
  });
  onbellek = liste;
  return liste;
}

/** Sunucunun bulunduğu yer hangi bloğa denk geliyor? */
export function blokBul(oturum: 1 | 2, slayt: number): number {
  const liste = tumBloklar();
  for (let i = liste.length - 1; i >= 0; i--) {
    const b = liste[i];
    if (b.oturum === oturum && slayt >= b.slayt) return i;
  }
  return liste.findIndex((b) => b.oturum === oturum);
}
