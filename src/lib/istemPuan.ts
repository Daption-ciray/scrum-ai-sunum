/**
 * İstem puanlama — beş parçalı kalıba göre.
 *
 * Bu bir KALİTE ölçümü değil, KALIP KONTROLÜ. Ölçtüğü tek şey şu: katılımcı
 * az önce öğrendiği beş parçayı (rol · bağlam · format · sınır · dürüstlük
 * çağrısı) istemine koymuş mu? Sunucu paneli 75 istemi tek tek okuyamaz;
 * bu puan listeyi sıralayıp sunucunun en üstteki üç ile en alttaki üçe
 * bakmasını sağlıyor. Son söz her zaman sunucuda.
 *
 * Sunucuda kalır, istemciye inmez — katılımcı deseni görüp puan avlamasın.
 */

export type Parca = "rol" | "baglam" | "format" | "sinir" | "durustluk";

export const PARCA_ADI: Record<Parca, string> = {
  rol: "rol",
  baglam: "bağlam",
  format: "format",
  sinir: "sınır",
  durustluk: "dürüstlük",
};

/* Metin ÖNCE sadeleştiriliyor: küçük harfe çevrilip Türkçe işaretler
   düşürülüyor (ı→i, ğ→g, ş→s, ç→c, ö→o, ü→u). Desenler de bu yüzden
   işaretsiz yazılmış.

   Sebebi ölçüldü: "varsayım yaptığın yeri işaretle" dürüstlük parçasını
   tetikliyordu ama "varsayim yaptigin yeri isaretle" tetiklemiyordu. Türkçe
   klavyesi olmayan veya hızlı yazan katılımcı haksız yere puan kaybediyordu.
   Kapsam bilerek geniş: amaç kesin tespit değil, sıralama. */
const ISARETLER: Record<string, string> = {
  ı: "i", i: "i", ğ: "g", ş: "s", ç: "c", ö: "o", ü: "u",
  â: "a", î: "i", û: "u",
};

export function sadelestir(metin: string): string {
  return metin
    .toLocaleLowerCase("tr")
    .replace(/[ıiğşçöüâîû]/g, (h) => ISARETLER[h] ?? h);
}

const DESENLER: Record<Parca, RegExp[]> = {
  rol: [
    /gibi davran/, /rolunde/, /roluna burun/, /olarak davran/, /sen bir /,
    /deneyimli bir /, /kidemli /, /uzmani olarak/, /uzman bir /,
  ],
  /* Ünsüz yumuşaması: "ekip" ekli hâlde "ekibimiz" oluyor; köke kadar yazıp
     son ünsüzü sınıf içine alıyoruz. */
  baglam: [
    /eki[pb]/, /takim/, /urun/, /kullanici/, /musteri/, /kisi[td]/, /baglam/,
    /sprint/, /backlog/, /proje/, /paydas/, /is oge/, /hedef kitle/, /ekibi/,
  ],
  format: [
    /bicim/, /format/, /madde/, /given\s*\/?\s*when/, /tablo/, /liste/,
    /en fazla/, /en cok \d/, /baslik/, /kelimeyi gecme/, /punto/, /json/,
    /yapisinda/, /seklinde/, /sablon/, /sirayla/, /numaraland/,
  ],
  sinir: [
    /onerme\b/, /yazma\b/, /yapma\b/, /sadece/, /yalnizca/, /girme\b/,
    /ekleme\b/, /kacin/, /dahil etme/, /uzatma/, /kullanma\b/, /verme\b/,
    /disina cikma/, /kisa tut/, /girisme/,
  ],
  durustluk: [
    /varsayim/, /emin degil/, /emin olmadigin/, /bilmiyorsan/, /isaretle/,
    /belirt/, /kaynak goster/, /uydurma/, /bilmedigin/, /eksik bilgi/,
  ],
};

/** Bağlam tek kelimeyle kanıtlanmış sayılmıyor; en az bu kadar farklı iz. */
const BAGLAM_ESIGI = 2;

export type IstemPuani = {
  /** 0–100. 5 parça × 16 puan + uzunluktan en çok 20. */
  puan: number;
  parcalar: Parca[];
};

export function istemPuanla(metin: string): IstemPuani {
  const m = sadelestir(metin);
  const bulunan: Parca[] = [];

  for (const parca of Object.keys(DESENLER) as Parca[]) {
    const isabet = DESENLER[parca].filter((d) => d.test(m)).length;
    // Bağlam en az iki farklı izle kanıtlanmalı: "ürün" geçen her istem
    // bağlam kurmuş sayılırsa puan anlamını kaybediyor.
    const esik = parca === "baglam" ? BAGLAM_ESIGI : 1;
    if (isabet >= esik) bulunan.push(parca);
  }

  const uzunluk = metin.trim().length;

  /* DOLULUK — desen avlamaya karşı.
     "gibi davran ekip ürün format sadece varsayım" gibi 44 karakterlik bir
     kelime salatası beş parçayı da tetikliyor ve listenin tepesine çıkıyordu.
     Parça puanı metnin gerçekten dolu olmasıyla ölçekleniyor: 150 karakterin
     altında parçalar tam sayılmıyor. Beş parçayı 150 karakterin altında
     GERÇEKTEN kuran bir istem pratikte yok — tek başına bağlam o kadar yer
     tutuyor — o yüzden bu eşik dürüst isteme zarar vermiyor. */
  const doluluk = Math.min(1, uzunluk / 150);

  // Uzunluk bonusu bağlamın vekili: beş parçayı da yazan ama iki cümlede
  // bitiren istem, bağlamı gerçekten kuran istemin önüne geçmemeli.
  const uzunlukBonusu = Math.min(20, Math.round(uzunluk / 20));

  return {
    puan: Math.round(bulunan.length * 16 * doluluk) + uzunlukBonusu,
    parcalar: bulunan,
  };
}
