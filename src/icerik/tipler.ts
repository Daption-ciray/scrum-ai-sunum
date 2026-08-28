/** Slayt tipleri. Yeni bir görsel düzen gerekince buraya bir tip eklenir ve
 *  components/slaytlar/ altında karşılığı yazılır — başka yere dokunulmaz. */

export type SlaytGovde =
  /** Oturum açılış slaydı. */
  | { tip: "kapak"; ust: string; baslik: string; alt?: string; meta?: string }
  /** Bölüm ayracı: konuşmacıya da izleyiciye de "yeni blok" der. */
  | { tip: "bolum"; numara: string; baslik: string; ozet?: string }
  /** Klasik madde listesi. `alt` ikinci satır olarak küçük punto düşer. */
  | { tip: "madde"; baslik: string; giris?: string; maddeler: { ana: string; alt?: string }[] }
  /** Tek cümlelik büyük ifade. Tez cümleleri için. */
  | { tip: "vurgu"; metin: string; kaynak?: string }
  /** İki sütun karşılaştırma: zayıf vs iyi, önce vs sonra. */
  | { tip: "ikili"; baslik: string; sol: SutunIcerik; sag: SutunIcerik }
  /** İç içe geçen katmanlar: ML → derin öğrenme → üretken AI → ajanlı AI. */
  | { tip: "katman"; baslik: string; giris?: string; katmanlar: { ad: string; aciklama: string }[] }
  /** Tablo. Beş Scrum olayının AI karşılıkları gibi ızgara içerik için. */
  | { tip: "tablo"; baslik: string; sutunlar: string[]; satirlar: string[][] }
  /** Henüz içeriği yazılmamış blok. Sunum akışını bozmadan iskelette durur. */
  | { tip: "taslak"; baslik: string; not: string; beklenen?: string[] };

export type SutunIcerik = {
  baslik: string;
  etiket?: string;
  ton?: "notr" | "olumlu" | "olumsuz";
  maddeler: string[];
};

export type Slayt = {
  /** Kararlı kimlik. Sıralama değişse de sunucu notları ve quiz eşleşmesi bozulmaz. */
  id: string;
  /** Plandaki blok adı — sunucu panelinde ve ilerleme çubuğunda görünür. */
  blok: string;
  /** Sunucu notu. Sadece /sunucu ekranında görünür, katılımcı görmez. */
  not?: string;
} & SlaytGovde;

export type Oturum = {
  numara: 1 | 2;
  ad: string;
  slaytlar: Slayt[];
};
