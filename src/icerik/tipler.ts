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
  /** İç içe geçen katmanlar: ML → derin öğrenme → üretken AI → agentic AI. */
  | {
      tip: "katman";
      baslik: string;
      giris?: string;
      katmanlar: { ad: string; aciklama: string }[];
      kaynak?: string;
    }
  /** Tablo. Beş Scrum etkinliğinin AI karşılıkları gibi ızgara içerik için. */
  | { tip: "tablo"; baslik: string; sutunlar: string[]; satirlar: string[][] }
  /** Sıralı adımlar. Süreç anlatan içerik tabloya sıkıştırılmasın. */
  | {
      tip: "adim";
      baslik: string;
      giris?: string;
      adimlar: { ad: string; aciklama: string; ornek?: string }[];
      kaynak?: string;
    }
  /** Tek eksen üzerinde iki uç. `ikili`den farkı: karşılaştırma değil, terazi. */
  | {
      tip: "terazi";
      baslik: string;
      giris?: string;
      solEtiket: string;
      sagEtiket: string;
      ogeler: { metin: string; taraf: "sol" | "sag" }[];
      kaynak?: string;
    }
  /** Kart dizisi. Sözlük ve referans içeriği tablodan daha okunur oluyor. */
  | {
      tip: "kartlar";
      baslik: string;
      giris?: string;
      kartlar: { ust: string; ana: string; alt?: string }[];
      kaynak?: string;
    }
  /** Doğrudan alıntı. Otorite cümleleri notta gömülü kalmasın. */
  | { tip: "alinti"; metin: string; kisi: string; kaynak?: string }
  /** Büyük rakam. Metin duvarları arasında nefes ve tokat — sayı konuşsun. */
  | {
      tip: "sayi";
      baslik?: string;
      giris?: string;
      sayilar: { deger: string; birim?: string; aciklama: string }[];
      kaynak?: string;
    }
  /** Rol birleşme akışı. Sahnelenerek açılıyor; bağlanmayan kutu asıl mesaj. */
  | {
      tip: "roller";
      baslik: string;
      giris?: string;
      sutunlar: [string, string, string];
      gruplar: RolGrubu[];
      /**
       * Hiçbir kutuya bağlanmayan unvan. Slaytın can alıcı noktası.
       * Akışın DIŞINDA değil, İÇİNDE duruyor: listede herkesle aynı sırada
       * ama hiçbir ayraca bağlanmıyor. Mesajın tamamı bu — dışarı alınırsa
       * "zaten ayrı bir şey" gibi görünüp etkisini kaybediyor.
       * `sonraGrup`: kaçıncı gruptan sonra araya girsin (0 tabanlı).
       */
      yalniz: { ad: string; not: string; sonraGrup: number };
      kaynak?: string;
    }
  /** Olgunluk eğrisi. Eğri kendini çizer, noktalar sonra oluşur. */
  | {
      tip: "olgunluk";
      baslik: string;
      giris?: string;
      /** Eğri üzerindeki aşama adları, soldan sağa. */
      asamalar: [string, string, string, string, string];
      /** Aşama adlarının altındaki tek satırlık okuma notu. Eğri sözlü
          anlatım olmadan yanlış okunuyor; bu satır o boşluğu kapatıyor. */
      aciklama?: string;
      noktalar: OlgunlukNoktasi[];
      kaynak?: string;
    }
  /** Tıklanınca metni "şifre çözülüyormuş" gibi hedefe dönüştüren kart.
      Kötü istem (kırmızı yüz) → etkili istem (yeşil yüz). */
  | {
      tip: "cevir";
      baslik: string;
      giris?: string;
      /** Kapalı yüz — kötü örnek. */
      on: { etiket: string; metin: string };
      /** Açılan yüz — düzeltilmiş örnek. */
      arka: { etiket: string; metin: string };
      /** Kartın altındaki yönlendirme. Boşsa "Karta tıklayın." yazar. */
      ipucu?: string;
      kaynak?: string;
    }
  /** Atölye: katılımcı metin kutusuna kendi istemini yazıp gönderiyor. */
  | {
      tip: "atolye";
      baslik: string;
      giris?: string;
      /** Katılımcıya verilen somut görev. Kutunun hemen üstünde duruyor. */
      gorev: string;
      /** Kutunun üstünde duran hatırlatma etiketleri — kalıbın parçaları.
          Katılımcı yazarken slayt değiştirip kalıba geri dönemiyor. */
      parcalar?: string[];
      yerTutucu?: string;
      /**
       * Kutunun ÜSTÜNDEKİ uyarı bandı. `ipucu` değil, çünkü bu metin
       * atlanamayacak bir şey söylüyor: katılımcının gerçek veri
       * yazabileceği tek an burası ve yazdığı metin hem ekranda görünüyor
       * hem de değerlendirme için dışarı gidiyor.
       */
      uyari?: string;
      ipucu?: string;
      kaynak?: string;
    }
  /** Atölye çıktısı: en iyi ve en kötü istem yan yana. */
  | {
      tip: "karsilastirma";
      baslik: string;
      giris?: string;
      /** İstemlerin toplandığı `atolye` slaydının id'si. */
      kaynakSlayt: string;
      /** Sunucunun canlı denemesi için önerilen araçlar. */
      araclar?: string[];
      kaynak?: string;
    }
  /** Çoktan seçmeli bilgi kontrolü. Doğru cevaplar `cevaplar.ts` içinde ve
      SUNUCUDA kalır — buraya yazmayın. */
  | {
      tip: "quiz";
      baslik: string;
      giris?: string;
      sorular: { soru: string; secenekler: string[] }[];
      kaynak?: string;
    }
  /** Oturum sonu sıralaması: quiz puanı + istem puanı. */
  | {
      tip: "siralama";
      baslik: string;
      giris?: string;
      /** Puanı toplanacak quiz slaytı. */
      quizSlayt: string;
      /** Puanı toplanacak atölye slaytı. */
      atolyeSlayt: string;
      kaynak?: string;
    }
  /** Henüz içeriği yazılmamış blok. Sunum akışını bozmadan iskelette durur. */
  | { tip: "taslak"; baslik: string; not: string; beklenen?: string[] };

export type RolGrubu = {
  /** Sağdaki tek kutu — birleşmenin son hâli. */
  son: string;
  /** Ortadaki ara kutular ve onları besleyen bugünkü unvanlar. */
  dallar: { ara: string; kaynaklar: string[] }[];
};

/** Bir teknolojinin eğri üzerindeki yeri ve olgunlaşma ufku. */
export type OlgunlukNoktasi = {
  ad: string;
  /** 0–100 arası yatay konum. 0 = tetikleyici, ~30 = zirve, 100 = plato. */
  x: number;
  /** Platoya kalan süre. Nokta biçimi bundan geliyor. */
  ufuk: "yakin" | "orta" | "uzak";
  /** Bu satırı öne çıkar — eğitimin argümanını taşıyanlar için. */
  one?: boolean;
};

export type SutunIcerik = {
  baslik: string;
  etiket?: string;
  ton?: "notr" | "olumlu" | "olumsuz";
  maddeler: string[];
};

export type Slayt = {
  /** Kararlı kimlik. Sıralama değişse de sunucu notlarının eşleşmesi bozulmaz. */
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
