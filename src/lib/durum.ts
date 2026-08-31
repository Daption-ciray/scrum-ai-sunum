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
  /**
   * Atölye slaytında gönderim açık mı. Sunucu açar, sunucu kapatır.
   * Kapalıyken metin kutusu kilitli — herkesin aynı anda yazması ve aynı
   * anda durması için. Slayta gelmek tek başına açmıyor; sunucu hazır
   * olduğunda basıyor.
   */
  istemAcik: boolean;
  /**
   * Quizde aktif soru indeksi. -1 = henüz başlamadı, soru sayısına eşit veya
   * büyük = bitti. Sorular tek tek geliyor; katılımcı yalnızca bunu görüyor.
   */
  quizSoru: number;
  /** Aktif soru cevaplanabilir mi. Sunucu açar, sunucu kapatır. */
  quizAcik: boolean;
  /**
   * Aktif sorunun açıldığı an. Geri sayımın çıpası bu.
   *
   * İstemci bu değerin DEĞİŞTİĞİNİ görünce kendi 20 saniyesini başlatıyor —
   * sunucunun damgasından fark hesaplamıyor. Sebebi saat kayması: katılımcının
   * cihaz saati birkaç saniye ileri veya geri olabilir ve kimse sayaç yüzünden
   * soru kaybetmemeli. Kayma en fazla bir yoklama turu (2 sn) kadar.
   */
  quizAcildi: number;
  /** Her değişiklikte artar. İstemci bunu karşılaştırıp gereksiz render etmez. */
  surum: number;
  zaman: number;
};

export const BASLANGIC: Durum = {
  oturum: 1,
  slayt: 0,
  perde: false,
  acilan: 1,
  istemAcik: false,
  quizSoru: -1,
  quizAcik: false,
  quizAcildi: 0,
  surum: 0,
  zaman: 0,
};

/** Atılan katılımcı bu kadar saniye geri giremez. Kalıcı yasak değil.
 *  Hem sunucu (işareti bu süreyle yazıyor) hem istemci (geri sayımı bununla
 *  gösteriyor) okuduğu için burada duruyor — `depo.ts` sunucu tarafı. */
export const ATILMA_SURESI = 30;

/** Soru başına cevaplama süresi. On soruda toplam 200 saniye. */
export const SORU_SURESI = 20_000;
/** Ağ gecikmesi payı: sunucu bu kadar geç gelen cevabı da kabul ediyor. */
export const SURE_TOLERANSI = 2_000;

export type Katilimci = { id: string; ad: string; son: number };

/** Bu süre boyunca haber vermeyen katılımcı "bağlı" sayılmaz. */
export const CANLI_ESIGI = 20_000;

export type DurumYaniti = {
  durum: Durum;
  bagli: number;
  /** Depo gerçekten paylaşımlı mı? false ise Vercel'de senkron çalışmaz. */
  paylasimli: boolean;
};
