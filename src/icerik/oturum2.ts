import type { Oturum } from "./tipler";

/* Bu oturum, birinci oturumda tanıtılan dört aşamalı AI yetkinliği
   çerçevesinin (delegasyon · tarif · muhakeme · sahiplenme) uygulama tarafı.
   İstem yazımı tarif, çıktı değerlendirme muhakeme, veri güvenliği
   sahiplenme aşamasına denk geliyor. */

export const oturum2: Oturum = {
  numara: 2,
  ad: "Uygulama oturumu",
  slaytlar: [
    /* ---- 00:00 · Tekrar ve bilgi kontrolü ---- */
    {
      id: "s2-kapak",
      blok: "İkinci oturum açılışı",
      tip: "kapak",
      ust: "Scrum + AI · Kurum İçi Eğitim",
      baslik: "Uygulama oturumu",
      alt: "İkinci oturum · 60 dakika",
      meta: "Bu oturumda konuşma süresinin çoğu sizde.",
      not: "Geç kalanlar için bir dakika bekle, sonra doğrudan bilgi kontrolüne geç. Oturumun yapısını bir cümleyle söyle: iki atölye, bir güvenlik bloğu, bir ortak anlaşma.",
    },

    /* ---- 00:05 · Atölye 1 — Kabul kriteri ---- */

    {
      id: "b-atolye1-giris",
      blok: "Etkili istem yazımı",
      tip: "bolum",
      numara: "08",
      baslik: "Etkili istem yazımı",
      ozet: "İstem bir cümle değil, kurduğunuz bağlam.",
      not: "Ayraç. Beş saniye dur, blok adını söyle, geç. Katılımcı nerede olduğunu bilsin diye var.",
    },
    {
      id: "s2-atolye1-giris",
      blok: "Etkili istem yazımı",
      tip: "vurgu",
      metin: "Aynı iş öğesi, iki farklı istem. Fark modelde değil, istemde.",
      kaynak: "Yetkinliğin tarif aşaması",
      not: "Bu cümle bloğun bütün öğretisi. Slaytı geçmeden önce bir kez daha söyle. Dört aşamadan tarif aşamasındayız — hatırlat.",
    },
    {
      id: "s2-baglam",
      blok: "Etkili istem yazımı",
      tip: "madde",
      baslik: "İstem bir cümle değil, kurduğunuz bağlamdır",
      giris: "Alanın dili \"istem mühendisliği\"nden \"bağlam mühendisliği\"ne kaydı. Sebebi basit: modelin bilmediğini siz vereceksiniz.",
      maddeler: [
        { ana: "Doğru bilgi", alt: "Ekip, ürün, kullanıcı, kısıt. Model bunları bilmiyor; eksik bilgi eksik çıktı olarak geri döner." },
        { ana: "Doğru format", alt: "Ham veri yığını yerine düzenli özet verin. Nasıl sunduğunuz, ne sunduğunuz kadar etkili." },
        { ana: "Doğru zaman", alt: "Her şeyi baştan yüklemeyin. Gerekeni gerektiği adımda verin; kalabalık bağlam sinyali boğar." },
        { ana: "Doğru araç", alt: "Kurumsal dokümanla çalışacaksanız modele belgeyi getirtin (RAG). Ezberinden yanıtlamasını istemeyin." },
      ],
      not: "Kaynak: \"The New Skill in AI is Not Prompting, It's Context Engineering\". Bir cümlede özetle: çöp girerse çöp çıkar. Katılımcıların çoğu tek satırlık istem yazıyor — asıl atlanan şey bağlam.",
    },
    {
      id: "s2-prompt-kalibi",
      blok: "Etkili istem yazımı",
      tip: "madde",
      baslik: "İstem kalıbı — oturumdan çıkan kart",
      giris: "Beş parça. Eksik olan her parça, çıktıda bir eksiklik olarak geri dönüyor.",
      maddeler: [
        { ana: "Rol", alt: "\"Deneyimli bir Product Owner gibi davran.\"" },
        { ana: "Bağlam", alt: "Ekip, ürün, kullanıcı, kısıt. En uzun parça bu olmalı; çoğu kişi burayı atlıyor." },
        { ana: "Format", alt: "\"Given/When/Then biçiminde, en fazla beş madde.\"" },
        { ana: "Sınır", alt: "\"Teknik çözüm önerme, sadece davranışı tarif et.\"" },
        { ana: "Dürüstlük çağrısı", alt: "\"Varsayım yaptığın yeri işaretle.\" En çok atlanan ve en çok işe yarayan madde." },
      ],
      not: "Bu kartı katılımcılar oturumdan sonra kullanacak. Beş parçayı tek tek oku; ikinci maddede dur ve önceki slayta bağla.",
    },

    {
      id: "s2-dod",
      blok: "Etkili istem yazımı",
      tip: "ikili",
      baslik: "Kabul kriteri ile Definition of Done aynı şey değil",
      sol: {
        baslik: "Kabul kriteri",
        etiket: "İş öğesine özel",
        ton: "notr",
        maddeler: [
          "Her iş öğesi için ayrı yazılır",
          "\"Bu özellik ne yaparsa doğru çalışmış olur?\"",
          "Product Owner ve Geliştiriciler birlikte netleştirir",
          "AI taslağını üretebilir",
        ],
      },
      sag: {
        baslik: "Definition of Done",
        etiket: "Ekibin tamamı için",
        ton: "olumlu",
        maddeler: [
          "Tüm iş öğeleri için ortak ve tektir",
          "\"Bu iş yayına çıkmaya hazır mı?\"",
          "AI ile üretiyorsanız yeni maddeler gerekir",
          "Örnek: insan incelemesi zorunlu, çıktı önyargı açısından kontrol edilmiş",
        ],
      },
      not: "Kaynak: Scrum.org, AI Impacts On Your Definition of Done. Anahtar cümle: ürünü kurma biçiminiz değiştiyse, Definition of Done'ınız da bunu yansıtmalı. Odaya sor: sizin DoD'nizde AI'la ilgili tek bir madde var mı?",
    },

    {
      id: "s2-dod-ai",
      blok: "Etkili istem yazımı",
      tip: "madde",
      baslik: "Definition of Done'a yedinci kategori",
      giris: "Klasik DoD altı beklenti kategorisinden oluşur: süreç, teknik, teslim, sektör standartları, kurum ve fonksiyonel olmayan gereksinimler. Ürünü AI ile kuruyorsanız yedincisi ekleniyor.",
      maddeler: [
        { ana: "Önyargı kontrolü", alt: "Çıktı önyargılı yanıt üretmiyor. Eğitim verisinden gelen önyargı ürüne geçmemeli." },
        { ana: "Adillik", alt: "Yanıtlar kullanıcı gruplarına göre farklılaşmıyor." },
        { ana: "İnsan incelemesi devrede", alt: "Kullanıcı talep ettiğinde bir insan çıktıyı inceleyebiliyor." },
        { ana: "Şifreli bağlantı", alt: "AI servislerine giden bağlantılar şifreli; hangi verinin nereye gittiği belli." },
        { ana: "Mevzuat uyumu", alt: "AB AI Yasası ve KVKK gibi düzenlemelere uygunluk, teslim öncesi kontrol listesinde." },
      ],
      not: "Kaynak: Scrum.org, \"AI Impacts On Your Definition of Done\". Anahtar cümle: ürünü kurma biçiminiz değiştiyse, Definition of Done'ınız da bunu yansıtmalı. Odaya sor: sizin DoD'nizde AI ile ilgili tek bir madde var mı? Cevap büyük ihtimalle hayır — bu slaytın çıktısı o boşluğun görülmesi. Üçüncü madde, veri güvenliği bloğundaki insan denetimi tablosuyla aynı şey; ileride oraya bağla.",
    },

    /* ---- 00:23 · AI çıktısını değerlendirme ---- */


    {
      id: "b-atolye2-ders",
      blok: "AI çıktısını değerlendirme",
      tip: "bolum",
      numara: "09",
      baslik: "AI çıktısını değerlendirme",
      ozet: "AI neyi görür, neyi göremez — ve yanlış çıktıya karşı ne yaparsınız.",
      not: "Ayraç. Beş saniye dur, blok adını söyle, geç. Katılımcı nerede olduğunu bilsin diye var.",
    },
    {
      id: "s2-atolye2-ders",
      blok: "AI çıktısını değerlendirme",
      tip: "ikili",
      baslik: "AI neyi gördü, neyi göremedi",
      sol: {
        baslik: "AI'ın bulduğu",
        etiket: "Sıklık",
        ton: "notr",
        maddeler: [
          "En çok tekrarlanan şikâyet",
          "Ortak kelimeler ve tema başlıkları",
          "Düzgün, sunulabilir bir özet",
        ],
      },
      sag: {
        baslik: "Ekibin bulması gereken",
        etiket: "Ağırlık",
        ton: "olumsuz",
        maddeler: [
          "Bir kez söylenmiş ama ağır olan şey",
          "Kimsenin yazmadığı, herkesin bildiği şey",
          "Notun arkasındaki ton ve gerilim",
        ],
      },
      not: "Ampirizmin neden yerini alamadığı tam olarak burada görülüyor. Bu slayt oturumun dönüm noktası; acele etme.",
    },
    {
      id: "s2-dogrulama",
      blok: "AI çıktısını değerlendirme",
      tip: "madde",
      baslik: "Yanlış çıktıya karşı dört savunma",
      giris: "Model doğruyu yanlıştan ayırmıyor. Ayırma işi sizde; bunun dört pratik yolu var.",
      maddeler: [
        { ana: "Çıktıyı eleştirel okuyun", alt: "Model düşünmüyor, muhakeme etmiyor. Değerlendirme insanın işi — akıcı yazılmış olması doğru olduğu anlamına gelmiyor." },
        { ana: "Kaynağı çeşitlendirin", alt: "Olgu ve rakamları bağımsız bir kaynaktan doğrulayın. Tek kaynak modelin kendisi olmasın." },
        { ana: "Belgeyi modele getirtin", alt: "Ezberinden yanıtlamasını istemek yerine güvenilir belgeden getirip yanıtlamasını isteyin (RAG). Doğruluk ölçülebilir biçimde artıyor." },
        { ana: "Gerekçesini isteyin", alt: "\"Adım adım nasıl vardığını yaz.\" Hatalı akıl yürütme çoğu zaman burada görünür hâle geliyor." },
      ],
      not: "Kaynak: MIT Sloan, When AI Gets It Wrong. Dördüncü madde en ucuz ve en etkili olanı; katılımcılardan bugün bir kez denemelerini iste.",
    },

    /* ---- 00:35 · Veri güvenliği ve sorumlu kullanım ---- */

    {
      id: "b-yapistirma",
      blok: "Sorumlu kullanım: güvenlik ve etik",
      tip: "bolum",
      numara: "10",
      baslik: "Sorumlu kullanım: güvenlik ve etik",
      ozet: "Ne aktarılmaz, önyargı nereden gelir, denetim kimde.",
      not: "Ayraç. Beş saniye dur, blok adını söyle, geç. Katılımcı nerede olduğunu bilsin diye var.",
    },
    {
      id: "s2-yapistirma",
      blok: "Sorumlu kullanım: güvenlik ve etik",
      tip: "madde",
      baslik: "AI araçlarına aktarılmayacak veriler",
      giris: "AI araçlarına ne verdiğinizi bir daha düşünün.",
      maddeler: [
        { ana: "Müşteri verisi", alt: "İsim, e-posta, sipariş, kayıt. Anonimleştirilmeden aktarılmaz." },
        { ana: "Kişisel veri", alt: "Çalışan bilgisi, performans notu, sağlık bilgisi. KVKK yükümlülüğü burada başlar." },
        { ana: "Sözleşme ve fiyat bilgisi", alt: "Gizlilik yükümlülüğü taşıyan her metin." },
        { ana: "İzinsiz kaynak kod", alt: "Kurum aracı onaylamadıysa kod da aktarılmaz." },
      ],
      not: "Liste kısa ve ezberlenebilir olsun; uzun politika metni kimsede kalmıyor. Bu dört maddeyi çalışma anlaşmasının ikinci maddesi olarak geri çağıracaksın.",
    },
    {
      id: "s2-guvenli",
      blok: "Sorumlu kullanım: güvenlik ve etik",
      tip: "ikili",
      baslik: "Yasak değil, yöntem",
      sol: {
        baslik: "Bunu yapmayın",
        etiket: "Risk",
        ton: "olumsuz",
        maddeler: [
          "Gerçek müşteri kaydını yapıştırmak",
          "Ekran görüntüsünü olduğu gibi yüklemek",
          "\"Nasılsa siliyorum\" diyerek denemek",
          "Onaylı olmayan bir araca kurumsal metin girmek",
        ],
      },
      sag: {
        baslik: "Bunu yapın",
        etiket: "Yöntem",
        ton: "olumlu",
        maddeler: [
          "İsimleri ve numaraları kurgu verilerle değiştirin",
          "Yapıyı koruyup içeriği örnek veriyle doldurun",
          "Metni kısaltın: modelin ihtiyacı olan kadarını verin",
          "Onaylı araç listesini bilmiyorsanız sorun",
        ],
      },
      not: "Bu slayt eğitimin en çok işe yarayan pratik çıktısı. Yasak listesi kimseyi durdurmuyor; alternatif yöntem durduruyor. Sağ sütunu yavaş oku.",
    },
    {
      id: "s2-onay",
      blok: "Sorumlu kullanım: güvenlik ve etik",
      tip: "tablo",
      baslik: "İnsan denetimi üç biçimde olur",
      sutunlar: ["Biçim", "Ne demek", "Nerede uygun"],
      satirlar: [
        [
          "İnsan döngü içinde",
          "Her çıktı yayına çıkmadan önce bir insan tarafından incelenir",
          "Müşteriye giden metin, kabul kriteri, sürüm notu",
        ],
        [
          "İnsan döngü üstünde",
          "Süreç kendi işler; insan izler ve gerektiğinde durdurur",
          "Tekrarlayan işleri yürüten ajanlar, otomatik özetler",
        ],
        [
          "İnsan komutada",
          "Sistemin bütününe ve nerede kullanılacağına insan karar verir",
          "Aracın seçimi, çalışma anlaşması, kapsam kararı",
        ],
      ],
      not: "Kaynak: Avrupa Komisyonu, Güvenilir AI Etik Kılavuzu. Üçünü de tarif et; ekip çoğunlukla birincisini düşünüyor, oysa asıl karar üçüncüsünde. Sonraki slayt bunun tek cümlelik hâli.",
    },
    {
      id: "s2-onyargi",
      blok: "Sorumlu kullanım: güvenlik ve etik",
      tip: "madde",
      baslik: "Önyargı nereden geliyor",
      giris: "Önyargı algoritmanın kendisinden değil, ona verilenden ve nasıl değerlendirildiğinden çıkıyor. Dört kaynağı var.",
      maddeler: [
        { ana: "Eğitim verisi", alt: "Temsil etmeyen, eksik ya da tarihsel olarak önyargılı veri. Model veriyi sorgulamaz, örüntüyü tekrar eder." },
        { ana: "Algoritma tasarımı", alt: "Hangi değişkene ağırlık verildiği bir tercih. Tercih yapan insandır." },
        { ana: "Vekil veri", alt: "Doğrudan sorulamayan bir şeyin yerine geçen değişken — posta kodu gelir yerine geçtiğinde ayrımcılık dolaylı yoldan girer." },
        { ana: "Değerlendirme", alt: "Model neye göre \"başarılı\" sayıldı? Yanlış ölçüt, önyargıyı başarı gibi gösterir." },
      ],
      not: "Kaynak: IBM, What Is Algorithmic Bias. Vurgulanacak asıl mekanizma geri besleme döngüsü: önyargılı çıktı bir sonraki kararın girdisi olunca sapma zamanla büyüyor. Korelasyon-nedensellik örneği hoş bir mola: köpekbalığı saldırısı ile dondurma satışı birlikte artar — ikisi de yaz aylarındadır, biri diğerinin sebebi değildir.",
    },
    {
      id: "s2-onyargi-nerede",
      blok: "Sorumlu kullanım: güvenlik ve etik",
      tip: "tablo",
      baslik: "Önyargı nerede ortaya çıkıyor",
      sutunlar: ["Alan", "Nasıl görünüyor"],
      satirlar: [
        ["İşe alım", "Geçmiş işe alım verisiyle eğitilen model, geçmişteki dengesizliği tekrar eder"],
        ["Sağlık", "Azınlık grupların veride az temsil edilmesi, teşhis doğruluğunu gruba göre düşürür"],
        ["Finansal hizmetler", "Kredi ve risk skorlarında dolaylı ayrımcılık"],
        ["Yüz tanıma", "Tanıma doğruluğu ten rengine ve cinsiyete göre değişir"],
        ["Fiyatlama", "Aynı ürün farklı kullanıcıya farklı fiyat"],
      ],
      not: "Kaynak: IBM. Listeyi hızlı geç, sonra asıl soruyu sor: bizim ürünümüzde bunun karşılığı ne? Bir dakika sessizlik bırak. Cevap gelmezse örnek ver — sizin ürününüzden bir tane hazırla.",
    },
    {
      id: "s2-cevre",
      blok: "Sorumlu kullanım: güvenlik ve etik",
      tip: "sayi",
      baslik: "Görünmeyen maliyet",
      giris: "\"Bulut bilişim\" deniyor ama donanım bulutta durmuyor. Sorumlu kullanımın bir de fatura tarafı var.",
      sayilar: [
        { deger: "460", birim: "TWh", aciklama: "Veri merkezlerinin 2022'deki küresel elektrik tüketimi — bir ülke olsaydı dünyada 11. sırada, Suudi Arabistan ile Fransa arasında" },
        { deger: "7-8", birim: "kat", aciklama: "Üretken AI eğitim kümesinin sıradan bir bilişim yüküne göre enerji tüketimi" },
        { deger: "2", birim: "litre", aciklama: "Her kilovat-saat için soğutmada harcanan su" },
      ],
      kaynak: "Kaynak: MIT News, \"Explained: Generative AI's environmental impact\", 17 Ocak 2025.",
      not: "Bu slayt suçlamak için değil, ölçek duygusu vermek için. Bağlanacak yer: gereksiz istem gereksiz maliyet. \"Her soruyu AI'a sormak zorunda değilsiniz\" cümlesini burada söyle. 2026 beklentisi 1.050 TWh — istersen ekle, ama üç rakam yeter.",
    },
    {
      id: "s2-guvenilir-ai",
      blok: "Sorumlu kullanım: güvenlik ve etik",
      tip: "tablo",
      baslik: "Güvenilir AI'ın yedi koşulu",
      sutunlar: ["Koşul", "Pratikte ne demek"],
      satirlar: [
        ["İnsan iradesi ve denetimi", "Kararı insan verir; denetim üç biçimden biriyle kurulur"],
        ["Teknik sağlamlık ve güvenlik", "Bir şey ters giderse geri dönüş planı var"],
        ["Mahremiyet ve veri yönetişimi", "Hangi veri nereye gidiyor, kim erişiyor"],
        ["Şeffaflık", "Karşısındakinin AI olduğunu insan bilir; sınırları söylenir"],
        ["Çeşitlilik ve ayrımcılık yapmama", "Haksız önyargı önlenir"],
        ["Toplumsal ve çevresel refah", "Etkisi kullanıcıyla sınırlı değil"],
        ["Hesap verebilirlik", "Sorumlu belli; iz sürülebilir"],
      ],
      not: "Kaynak: Avrupa Komisyonu, Güvenilir AI Etik Kılavuzu. Yedisini tek tek okuma — birinci ve sonuncuyu vurgula, gerisini \"çerçeve bu\" diye geç. Bu tablo çalışma anlaşmasının kontrol listesi olarak kullanılabilir; öyle söyle.",
    },
    {
      id: "s2-insan-onayi",
      blok: "Sorumlu kullanım: güvenlik ve etik",
      tip: "vurgu",
      metin: "AI taslak yazar. Kararı ekip verir.",
      kaynak: "Pazarlık konusu olmayan tek kural",
      not: "Çalışma anlaşmasının ilk maddesi bu olacak. Köprüyü burada kur ve doğrudan oylamaya geç.",
    },

    /* ---- 00:45 · Ekip çalışma anlaşması ---- */

    /* ---- 00:52 · Kapanış değerlendirmesi ---- */

    /* ---- 00:58 · Eylem planı ---- */

    {
      id: "b-eylem-plani",
      blok: "Eylem planı",
      tip: "bolum",
      numara: "11",
      baslik: "Eylem planı",
      ozet: "Kişi başı bir deney, iki Sprint sonra ölçüm.",
      not: "Ayraç. Beş saniye dur, blok adını söyle, geç. Katılımcı nerede olduğunu bilsin diye var.",
    },
    {
      id: "s2-eylem-plani",
      blok: "Eylem planı",
      tip: "madde",
      baslik: "Kişisel eylem planı",
      giris: "Herkes tek bir deney seçer. Üç alanı doldurun, sohbete yazın.",
      maddeler: [
        { ana: "Hangi olayda deneyeceğim", alt: "Tek bir olay seçin. Hepsini birden değiştirmek işe yaramıyor; biri oturunca sonrakine geçilir." },
        { ana: "İlk adımım ne", alt: "\"Önümüzdeki retrospektifin notlarını temaya indirgeteceğim\" gibi somut ve küçük." },
        { ana: "Nasıl ölçeceğim", alt: "İki Sprint sonra bakılacak tek bir gösterge: süre, madde sayısı ya da ekibin değerlendirmesi." },
      ],
      not: "Kaynak: Scrum.org, AI-Enhanced Scrum Events — küçük başla, öğrendikçe genişlet. Herkesten tek cümle iste; sohbete yazsınlar, sen topla. İki Sprint sonra kısa bir takip toplantısı öner.",
    },
    {
      id: "s2-taahhut",
      blok: "Eylem planı",
      tip: "vurgu",
      metin: "Kişi başı bir deney. İki Sprint sonra ölçüm.",
      kaynak: "Eğitimin tek çıktısı",
      not: "Son slayt. Teşekkür et, çalışma anlaşmasının metnini bugün göndereceğini söyle ve bitir.",
    },
  ],
};
