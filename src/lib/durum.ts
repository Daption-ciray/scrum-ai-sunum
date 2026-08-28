/** Sunumun paylaşılan durumu. Sunucu yazar, herkes okur. */
export type Durum = {
  oturum: 1 | 2;
  /** Aktif oturumdaki slayt indeksi. */
  slayt: number;
  /** Perde: ekran karartılır. Ara verirken veya dikkat sizde olsun istediğinizde. */
  perde: boolean;
  /** Her değişiklikte artar. İstemci bunu karşılaştırıp gereksiz render etmez. */
  surum: number;
  zaman: number;
};

export const BASLANGIC: Durum = {
  oturum: 1,
  slayt: 0,
  perde: false,
  surum: 0,
  zaman: 0,
};

export type Katilimci = { id: string; ad: string; son: number };

/** Bu süre boyunca haber vermeyen katılımcı "bağlı" sayılmaz. */
export const CANLI_ESIGI = 20_000;

export type DurumYaniti = {
  durum: Durum;
  bagli: number;
  /** Depo gerçekten paylaşımlı mı? false ise Vercel'de senkron çalışmaz. */
  paylasimli: boolean;
};
