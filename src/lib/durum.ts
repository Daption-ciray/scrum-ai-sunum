/** Sunumun paylaşılan durumu. Sunucu yazar, herkes okur. */
export type Durum = {
  oturum: 1 | 2;
  /** Aktif oturumdaki slayt indeksi. */
  slayt: number;
  /** Perde: ekran karartılır. Ara verirken veya dikkat sizde olsun istediğinizde. */
  perde: boolean;
  /**
   * Sunucunun açtığı en yüksek oturum. 1 iken ikinci oturum katılımcıda
   * KİLİTLİ: galeride görünür ama girilemez. Oyunlardaki kilitli bölüm gibi.
   *
   * Neden ayrı alan: `oturum` sunucunun o anki yeri. Sunucu ikinci oturumu
   * açıp birinciye geri dönerse kilit yeniden kapanmamalı — bir kez açılan
   * açık kalır. `sifirla` komutu başa alıyor.
   */
  acilan: 1 | 2;
  /** Her değişiklikte artar. İstemci bunu karşılaştırıp gereksiz render etmez. */
  surum: number;
  zaman: number;
};

export const BASLANGIC: Durum = {
  oturum: 1,
  slayt: 0,
  perde: false,
  acilan: 1,
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
