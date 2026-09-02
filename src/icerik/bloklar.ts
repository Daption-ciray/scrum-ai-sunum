import { bloklar } from "./index";

export type BlokOzeti = {
  /** 1..13 — galeride kartın üstünde görünen numara. */
  no: number;
  ad: string;
  /** Plandaki dakika. Galeride çizginin uzunluğu buradan geliyor. */
  sure: number;
  oturum: 1 | 2;
  /** Bloğun ilk slaytının, kendi oturumu içindeki indeksi. */
  slayt: number;
  adet: number;
};

/** Blok süreleri eğitim planından. Slayt sayısıyla değil, gerçek dakikayla.
 *  Anahtarlar `oturum1.ts` / `oturum2.ts` içindeki `blok` alanlarıyla birebir
 *  aynı olmalı; eşleşmeyen blok sessizce 5 dakikaya düşer.
 *
 *  Dağılım eğitim duyurusuna göre kuruldu: birinci oturum Scrum'ın temel
 *  ilkeleri ve üretken AI'ın çalışma mantığı, ikinci oturum Sprint Planning
 *  ve Daily Scrum'ın üç aşaması, kapanışta güvenlik ve ortak anlaşma. */
const SURELER: Record<string, number> = {
  // Oturum 1 — toplam 60 dk
  "Açılış ve kurulum": 3,
  "Roller değişiyor": 3,
  "Scrum çerçevesi": 8,
  "AI temelleri ve sınırları": 21,
  "Etkili istem yazımı": 18,
  "Özet ve kapanış": 7,
  // Oturum 2 — toplam 60 dk
  "İkinci oturum açılışı": 2,
  "Sprint Planning'de AI": 14,
  "Daily Scrum'da AI": 10,
  "Canlı araç denemesi": 8,
  "AI çıktısını değerlendirme": 8,
  "Sorumlu kullanım: güvenlik ve etik": 11,
  "Ekip çalışma anlaşması": 5,
  "Eylem planı": 2,
};

/** Galeride görünen kısa ad — blok adı uzun olduğunda kartta taşmasın. */
const KISA_AD: Record<string, string> = {
  "AI temelleri ve sınırları": "AI temelleri",
  "Sorumlu kullanım: güvenlik ve etik": "Güvenlik ve etik",
  "AI çıktısını değerlendirme": "Çıktıyı değerlendirme",
  "Sprint Planning'de AI": "Sprint Planning",
  "Daily Scrum'da AI": "Daily Scrum",
  "Ekip çalışma anlaşması": "Çalışma anlaşması",
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
