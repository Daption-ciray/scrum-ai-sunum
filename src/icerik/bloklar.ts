import { bloklar } from "./index";

export type BlokOzeti = {
  /** 1..14 — galeride kartın üstünde görünen numara. */
  no: number;
  ad: string;
  /** Plandaki dakika. Galeride çizginin uzunluğu buradan geliyor. */
  sure: number;
  oturum: 1 | 2;
  /** Bloğun ilk slaytının, kendi oturumu içindeki indeksi. */
  slayt: number;
  adet: number;
};

/** Blok süreleri eğitim planından.
 *  Yoruma alınmış satırlar: o bloğun slaytları `beklemede.ts` içinde park
 *  edildi, blok akışta görünmüyor. Geri koyunca yorumu kaldırın. Slayt sayısıyla değil, gerçek dakikayla.
 *  Anahtarlar `oturum1.ts` / `oturum2.ts` içindeki `blok` alanlarıyla birebir
 *  aynı olmalı; eşleşmeyen blok sessizce 5 dakikaya düşer. */
const SURELER: Record<string, number> = {
  // Oturum 1 — toplam 60 dk
  "Açılış ve kurulum": 4,
  // park edildi: "Roller değişiyor": 4,
  "Scrum çerçevesi": 12,
  "AI temelleri ve sınırları": 14,
  // park edildi: "Bilgi kontrolü 1": 5,
  "Scrum olaylarında AI": 15,
  "Özet ve kapanış": 6,
  // Oturum 2 — toplam 60 dk
  "İkinci oturum açılışı": 5,
  "Etkili istem yazımı": 18,
  "AI çıktısını değerlendirme": 12,
  "Sorumlu kullanım: güvenlik ve etik": 16,
  // park edildi: "Ekip çalışma anlaşması": 7,
  // park edildi: "Kapanış değerlendirmesi": 6,
  "Eylem planı": 2,
};

/** Galeride görünen kısa ad — blok adı uzun olduğunda kartta taşmasın. */
const KISA_AD: Record<string, string> = {
  "AI temelleri ve sınırları": "AI temelleri",
  "Sorumlu kullanım: güvenlik ve etik": "Güvenlik ve etik",
  "AI çıktısını değerlendirme": "Çıktıyı değerlendirme",
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
