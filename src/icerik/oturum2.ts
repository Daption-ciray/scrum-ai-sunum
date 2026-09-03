import type { Oturum } from "./tipler";

/* Duyuruda ikinci oturum için verilen söz: Daily Scrum ve Sprint Planning
   süreçlerinin öncesi, sırası ve sonrası olarak üç aşamada ele alınması;
   AI'ın katkı sağlayabileceği alanlarla birlikte ekip içi iletişimin ön
   planda tutulması gereken noktalar; ve veri güvenliği ile sorumlu kullanım
   ilkeleriyle kapanış. Blok sırası bu cümleyi birebir takip ediyor.

   Oturum ayrıca birinci oturumda tanıtılan dört aşamalı AI yetkinliği
   çerçevesinin (delegasyon · tarif · muhakeme · sahiplenme) uygulama tarafı:
   etkinlik bloklarında delegasyon, çıktı değerlendirmede muhakeme, güvenlik ve
   çalışma anlaşmasında sahiplenme. */

export const oturum2: Oturum = {
  numara: 2,
  ad: "Etkinliklerde AI, güvenlik ve ortak anlaşma",
  slaytlar: [
    /* ---- 00:00 · İkinci oturum açılışı ---- */

    {
      id: "s2-kapak",
      blok: "İkinci oturum açılışı",
      tip: "kapak",
      ust: "Scrum + AI · Kurum İçi Eğitim",
      baslik: "Etkinliklerde AI",
      alt: "İkinci oturum · 60 dakika",
      meta: "Sprint Planning ve Daily Scrum — öncesi, sırası, sonrası.",
      not: "Geç kalanlar için bir dakika bekle. Oturumun yapısını bir cümleyle söyle: iki etkinlik derinlemesine, çıktı değerlendirme, güvenlik ve etik, sonunda ekip çalışma anlaşması. Duyuruda vaat edilen sıra bu — aynen bu sırayla gidiyoruz.",
    },
    {
      id: "s2-asamalar",
      blok: "İkinci oturum açılışı",
      tip: "adim",
      baslik: "Her etkinliği üç aşamada düşünün",
      giris: "Bu oturumun tamamı bu üç aşama üzerinden ilerleyecek: önce Sprint Planning, sonra Daily Scrum. İnsanlar AI'ı toplantının içine sokmaya çalışıyor; oysa en yüksek katkı hazırlıkta.",
      adimlar: [
        {
          ad: "Öncesi",
          aciklama: "AI'ın en çok işe yaradığı yer burası: hazırlık.",
          ornek: "Planning'de eksik kabul kriterlerini çıkarır · Daily'de panoda dünden bugüne ne değiştiğini özetler",
        },
        {
          ad: "Sırasında",
          aciklama: "AI geri çekilir, konuşan ekiptir.",
          ornek: "Planning'de yalnızca konuşulanı not alır, tahmine karışmaz · Daily'de hiç açılmaz",
        },
        {
          ad: "Sonrası",
          aciklama: "Konuşulanlar yazıya geçer.",
          ornek: "Planning'de Sprint Hedefi taslağını yazar · Daily'de engel kaydını biçimlendirir",
        },
      ],
      kaynak: "Kaynak: Scrum.org, AI-Enhanced Scrum Events.",
      not: "Oturumun haritası. İki cümle: (1) asıl kazanç hazırlıkta, (2) hepsini birden değiştirmeyin — tek etkinlikle başlayın, oturunca sonrakine geçin. Sonraki iki blok bu üç sütunu Sprint Planning ve Daily Scrum için tek tek dolduracak.",
    },

    /* ---- 00:03 · Sprint Planning'de AI ---- */

    {
      id: "b-planning",
      blok: "Sprint Planning'de AI",
      tip: "bolum",
      numara: "07",
      baslik: "Sprint Planning'de AI",
      ozet: "Öncesi, sırası, sonrası — ve her aşamada hangi araç.",
      not: "Ayraç. Beş saniye dur, blok adını söyle, geç. Katılımcı nerede olduğunu bilsin diye var.",
    },
    {
      id: "s2-planning-akis",
      blok: "Sprint Planning'de AI",
      tip: "adim",
      baslik: "Sprint Planning — üç aşama",
      giris: "Planning iki soruya cevap arar: bu Sprint neden değerli, ve ne yapılacak. AI ikinci sorunun hazırlığını taşır; birincisine karışmaz.",
      adimlar: [
        {
          ad: "Öncesi",
          aciklama: "Backlog öğeleri toplantıya hazır gelsin — AI'ın en çok işe yaradığı aşama bu.",
          ornek: "Üst sıradaki öğelerde eksik kabul kriteri, tanımsız hata durumu ve bağımlılık listesi çıkarılır; sorulacak sorular önceden hazırlanır",
        },
        {
          ad: "Sırasında",
          aciklama: "AI geri çekilir; tahmin de taahhüt de ekibindir.",
          ornek: "Konuşulanı not alır. Efor tahminine, kapasiteye ve Sprint Hedefi'nin cümlesine karışmaz",
        },
        {
          ad: "Sonrası",
          aciklama: "Karar verilmiş olan yazıya geçer.",
          ornek: "Sprint Hedefi taslağını biçimlendirir, Sprint Backlog kırılımını önerir, açık kalan soruları listeler",
        },
      ],
      kaynak: "Kaynak: Scrum.org, AI-Enhanced Scrum Events.",
      not: "Orta aşamada dur. Sprint Hedefi bir taahhüttür; taahhüdü model veremez. Odaya sor: son Planning'inizde hedef cümlesini kim yazdı? Sonraki slayt aynı üç aşamayı araç araç açıyor.",
    },
    {
      id: "s2-planning-ornek",
      blok: "Sprint Planning'de AI",
      tip: "ikili",
      baslik: "Planning öncesi — somut örnek",
      sol: {
        baslik: "Ekipten çıkan ham iş öğesi",
        etiket: "Girdi",
        ton: "notr",
        maddeler: [
          "\"Kullanıcı şifresini sıfırlayabilsin.\"",
          "Kabul kriteri yok",
          "Hata durumları tanımsız",
          "Kimin için, hangi kanaldan belirsiz",
        ],
      },
      sag: {
        baslik: "AI taslağından sonra",
        etiket: "Çıktı",
        ton: "olumlu",
        maddeler: [
          "Given/When/Then biçiminde beş kriter",
          "Süresi dolmuş bağlantı senaryosu eklenmiş",
          "E-posta ve SMS kanalları ayrılmış",
          "İki varsayım açıkça işaretlenmiş",
        ],
      },
      not: "Sağdaki listeyi 'bitmiş iş' diye sunma. Ekibin doğrulaması gereken bir taslak; işaretlenmiş iki varsayım tam bunun için. İkinci oturumda bunu katılımcılar kendi cihazlarında yapacak.",
    },
    {
      id: "s2-planning-araclar",
      blok: "Sprint Planning'de AI",
      tip: "tablo",
      baslik: "Planning — hangi aşamada hangi araç, nasıl",
      sutunlar: ["Aşama", "Ne yapılır", "Araç ve nasıl kullanılır"],
      satirlar: [
        [
          "Öncesi",
          "Backlog öğesi hazır mı, denetle",
          "Jira / Azure DevOps içindeki AI — iş öğesi açıklamasını ver, \"eksik kabul kriterlerini ve bağımlılıkları listele\" de. Çıktıyı öğeye yorum olarak ekle, açıklamanın üstüne yazma.",
        ],
        [
          "Öncesi",
          "Sorulacak soruları çıkar",
          "ChatGPT · Copilot — birinci oturumdaki istem kalıbı: rol, bağlam, format, sınır, dürüstlük çağrısı. Ürün ve kısıtları elle yazın; model bunları bilmiyor.",
        ],
        [
          "Sırasında",
          "Konuşulanı kaydet",
          "Fireflies.ai · Otter.ai · Tactiq — toplantıya kaydedici olarak katılır. Kimse döküme bakmaz; sonrası için kayıt tutar.",
        ],
        [
          "Sırasında",
          "Ortak tahtayı toparla",
          "Miro AI — dağınık notları kümeler ve başlıklandırır. Kümeyi ekip onaylar, araç değil.",
        ],
        [
          "Sonrası",
          "Sprint Hedefi taslağı",
          "NotebookLM · ChatGPT — dökümü ver, \"tek cümlelik Sprint Hedefi taslağı çıkar\" de. Cümleyi ekip düzeltir ve sahiplenir.",
        ],
        [
          "Sonrası",
          "Sprint Backlog kırılımı",
          "Jira / ADO AI — görev kırılımı taslağı üretir. Kimin neyi alacağı kararı Developers'ta kalır.",
        ],
      ],
      not: "Araç adlarını tek tek okuma — \"her satırda bir örnek var\" de, üçüncü sütunun NASIL kısmını oku. ÖNEMLİ: bu liste örnek, tavsiye değil; kurumun onaylı araç listesi neyse o geçerli. Bu cümleyi söylemeden geçme, güvenlik bloğuyla çelişmesin.",
    },
    {
      id: "s2-dod",
      blok: "Sprint Planning'de AI",
      tip: "ikili",
      baslik: "Kabul kriteri ile Bitti Tanımı aynı şey değil",
      sol: {
        baslik: "Kabul kriteri",
        etiket: "İş öğesine özel",
        ton: "notr",
        maddeler: [
          "Her iş öğesi için ayrı yazılır",
          "\"Bu özellik ne yaparsa doğru çalışmış olur?\"",
          "Product Owner ve Developers birlikte netleştirir",
          "AI taslağını üretebilir",
        ],
      },
      sag: {
        baslik: "Bitti Tanımı (Definition of Done)",
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
      blok: "Sprint Planning'de AI",
      tip: "madde",
      baslik: "Bitti Tanımı'na yedinci kategori",
      giris: "Klasik Bitti Tanımı altı beklenti kategorisinden oluşur: süreç, teknik, teslim, sektör standartları, kurum ve fonksiyonel olmayan gereksinimler. Ürünü AI ile kuruyorsanız yedincisi ekleniyor.",
      maddeler: [
        { ana: "Önyargı kontrolü", alt: "Çıktı önyargılı yanıt üretmiyor. Eğitim verisinden gelen önyargı ürüne geçmemeli." },
        { ana: "Adillik", alt: "Yanıtlar kullanıcı gruplarına göre farklılaşmıyor." },
        { ana: "İnsan incelemesi devrede", alt: "Kullanıcı talep ettiğinde bir insan çıktıyı inceleyebiliyor." },
        { ana: "Şifreli bağlantı", alt: "AI servislerine giden bağlantılar şifreli; hangi verinin nereye gittiği belli." },
        { ana: "Mevzuat uyumu", alt: "AB AI Yasası ve KVKK gibi düzenlemelere uygunluk, teslim öncesi kontrol listesinde." },
      ],
      not: "Kaynak: Scrum.org, \"AI Impacts On Your Definition of Done\". Anahtar cümle: ürünü kurma biçiminiz değiştiyse, Definition of Done'ınız da bunu yansıtmalı. Odaya sor: sizin DoD'nizde AI ile ilgili tek bir madde var mı? Cevap büyük ihtimalle hayır — bu slaytın çıktısı o boşluğun görülmesi. Üçüncü madde, veri güvenliği bloğundaki insan denetimi tablosuyla aynı şey; ileride oraya bağla.",
    },

    /* ---- 00:18 · Daily Scrum'da AI ---- */

    {
      id: "b-daily",
      blok: "Daily Scrum'da AI",
      tip: "bolum",
      numara: "08",
      baslik: "Daily Scrum'da AI",
      ozet: "On beş dakika ekibin. AI dışarıda çalışır.",
      not: "Ayraç. Beş saniye dur, blok adını söyle, geç. Katılımcı nerede olduğunu bilsin diye var.",
    },
    {
      id: "s2-daily-akis",
      blok: "Daily Scrum'da AI",
      tip: "adim",
      baslik: "Daily Scrum — üç aşama",
      giris: "Daily bir durum raporu değil; Developers'ın günlük planını kurduğu on beş dakika. Bu blokta orta aşama diğer ikisinden farklı: AI kapalı.",
      adimlar: [
        {
          ad: "Öncesi",
          aciklama: "Scrum Master beş dakika harcar, ekip on beş dakika kazanır.",
          ornek: "Panoda son 24 saatte değişen öğeler ve iki günden uzun süredir kımıldamayanlar özetlenir; tekrar eden engel işaretlenir",
        },
        {
          ad: "Sırasında",
          aciklama: "AI kapalı. Konuşan ekiptir; toplantıda kimse pano ya da özet okumaz.",
          ornek: "Ekran paylaşımı yok, kaydedici yok. On beş dakika yalnızca Developers'ın konuşması",
        },
        {
          ad: "Sonrası",
          aciklama: "Konuşulan engel yazıya geçer.",
          ornek: "Engel kaydı güncellenir; metni AI biçimlendirir, sahibini ve tarihini insan yazar",
        },
      ],
      kaynak: "Kaynak: Scrum.org, AI-Enhanced Scrum Events.",
      not: "Bloğun can alıcı noktası orta aşama. Duyuruda \"ekip içi iletişimin ön planda tutulması gereken noktalar\" denen yer tam burası — cümleyi aynen kullan. Odaya sor: Daily'nizde kim pano okuyor? Çoğu ekipte Daily bir rapora dönüşmüş durumda; AI bunu hızlandırırsa toplantı büsbütün rapora döner.",
    },
    {
      id: "s2-daily-araclar",
      blok: "Daily Scrum'da AI",
      tip: "tablo",
      baslik: "Daily — hangi aşamada hangi araç, nasıl",
      sutunlar: ["Aşama", "Ne yapılır", "Araç ve nasıl kullanılır"],
      satirlar: [
        [
          "Öncesi",
          "Dünden bugüne değişeni özetle",
          "Jira / ADO pano sorgusu + AI özeti — \"son 24 saatte durum değiştiren öğeler ve iki günden uzun süredir aynı sütunda duranlar\". Daily'ye beş dakika kala çalıştırılır.",
        ],
        [
          "Öncesi",
          "Tekrar eden engeli işaretle",
          "ChatGPT · Copilot — son üç Daily'nin engel notlarını ver, \"tekrar eden temaları çıkar\" de. Aynı engel üçüncü kez görünüyorsa Scrum Master'ın işi başlıyor.",
        ],
        [
          "Sırasında",
          "Araç yok",
          "Kaydedici bile değil. Daily'nin çıktısı bir döküm değil, ekibin günlük planı. Bu satır bilerek boş.",
        ],
        [
          "Sonrası",
          "Engel kaydını güncelle",
          "Jira / ADO — engeller madde madde girilir. AI cümleyi biçimlendirir; sahibi, tarihi ve önceliği insan koyar.",
        ],
        [
          "Sonrası",
          "Duran işi görünür kıl",
          "Pano otomasyonu — üç günden uzun süredir aynı sütunda duran öğe için otomatik hatırlatma. Şeffaflığı insan hatırlamasına bırakmaz.",
        ],
      ],
      not: "Üçüncü satırda dur ve sessiz kal. Tabloda bilerek boş bırakılmış tek hücre o; mesajın tamamı orada. Araç adları örnek — kurumun onaylı listesi geçerli.",
    },
    {
      id: "s2-daily-iletisim",
      blok: "Daily Scrum'da AI",
      tip: "terazi",
      baslik: "Devredilebilir işler ve ekipte kalması gerekenler",
      giris: "Ayrım tek bir soruda: bu iş taslak üretmek mi, karar vermek mi?",
      solEtiket: "AI'a devredilebilir · taslak işi",
      sagEtiket: "Ekipte kalmalı · karar işi",
      ogeler: [
        { metin: "Metni biçimlendirmek ve yeniden yazmak", taraf: "sol" },
        { metin: "Neyin değerli olduğuna karar vermek", taraf: "sag" },
        { metin: "Uzun girdiden özet çıkarmak", taraf: "sol" },
        { metin: "Sprint Hedefi'ni taahhüt etmek", taraf: "sag" },
        { metin: "Kontrol listesi ve soru üretmek", taraf: "sol" },
        { metin: "Bir işin \"bitti\" olduğunu onaylamak", taraf: "sag" },
        { metin: "Aynı içeriği birden fazla biçimde denemek", taraf: "sol" },
        { metin: "Ekip içi anlaşmazlığı konuşmak", taraf: "sag" },
      ],
      not: "Sağ taraf eğitimin ahlaki merkezi. Acele etme. Scrum etkinlikleri gözlem ve adaptasyon için var; AI girdi verir, kararı iş birliğiyle ekip verir.",
    },

    /* ---- 00:30 · AI çıktısını değerlendirme ---- */

    /* ---- Canlı araç denemesi ---- */

    {
      id: "b-arac",
      blok: "Canlı araç denemesi",
      tip: "bolum",
      numara: "09",
      baslik: "Canlı araç denemesi",
      ozet: "İki araç, iki dakikalık gösterim. Amaç aracı öğretmek değil, çıktının nasıl bir şey olduğunu görmek — sonraki blok tam olarak o çıktıyı değerlendirmeyi anlatıyor.",
      not: "Ayraç. Beş saniye dur, blok adını söyle, geç.",
    },

    {
      id: "s2-arac-gamma",
      blok: "Canlı araç denemesi",
      tip: "adim",
      baslik: "Gamma — dağınık nottan sunuma",
      giris: "Ekranı paylaşıp canlı yapacağım; siz izleyin, linkler slaytta kalıyor. Amaç aracı satmak değil, üç aşamanın burada da geçerli olduğunu görmek.",
      adimlar: [
        {
          ad: "Öncesi — girdiyi siz hazırlarsınız",
          aciklama: "Araç sizin bilmediğiniz bir şeyi bilmiyor. Ne kadar bağlam verirseniz o kadar az uyduruyor.",
          ornek: "Sprint Review gündemi: bu sprintte biten üç iş öğesi, açılan iki engel, bir sonraki Sprint Hedefi taslağı — ham not olarak yapıştırılır",
        },
        {
          ad: "Sırasında — yapıyı o kurar, kararı siz verirsiniz",
          aciklama: "Başlıkları, sırayı ve düzeni öneriyor. Öneriyi kabul etmek zorunda değilsiniz; sunum sizin adınıza çıkıyor.",
          ornek: "Çıkan taslakta hangi başlık gereksiz, hangi rakam yanlış yerde — canlı olarak birlikte bakacağız",
        },
        {
          ad: "Sonrası — çıktı gözden geçirilmeden paylaşılmaz",
          aciklama: "Sunumu paydaşa gönderen kişi içeriğin sahibidir. Aracın ürettiği cümleyi okumadan göndermek, imzasız belge göndermektir.",
          ornek: "Rakamlar panodan doğrulanır, uydurulmuş bir başarı cümlesi varsa silinir",
        },
      ],
      baglantilar: [{ ad: "gamma.app", url: "https://gamma.app/" }],
      ornekIstem:
        "Deneyimli bir Scrum Master gibi davran. BAĞLAM: 6 kişilik bir yazılım ekibiyiz, iki haftalık Sprint'ler yapıyoruz ve ekip yapay zeka araçlarını yeni kullanmaya başlıyor. GÖREV: ekip içi 10 dakikalık bir bilgilendirme sunumu taslağı hazırla. Konu: Sprint Planning ve Daily Scrum'da yapay zekayı sorumlu şekilde kullanmak. BİÇİM: en fazla 6 bölüm, her bölümde en fazla 4 madde ve bir somut örnek. SINIR: araç reklamı yapma, teknik kurulum anlatma, Scrum Kılavuzu'nda olmayan bir sorumluluk uydurma. DÜRÜSTLÜK: ekibimiz hakkında varsaydığın şeyleri sonda ayrı bir başlıkta listele.",
      kaynak: "Ücretsiz hesapla denenebiliyor. Bugün açıp tek bir deneme yapmanız yeterli.",
      not: "İki dakika. Girdi metnini ÖNCEDEN hazırla ve panoya kopyalamış ol — canlıda yazmaya kalkarsan blok şişer. Çıkan sunumu güzel bulsalar bile bir yanlışını göstermeden geçme; bu bloğun işi hayranlık değil, ölçü.",
    },

    {
      id: "s2-arac-v0",
      blok: "Canlı araç denemesi",
      tip: "adim",
      baslik: "v0 — cümleden tıklanabilir ekrana",
      giris: "Bir iş öğesini tarif eden cümleyi çalışan bir arayüz taslağına çeviriyor. Refinement'ta \"biz bunu aynı mı anlıyoruz\" sorusunu somutlaştırmak için.",
      adimlar: [
        {
          ad: "Öncesi — iş öğesini cümleye dökün",
          aciklama: "Girdi bir istem: rol, bağlam, format, sınır. Birinci oturumdaki beş parçalı kalıp aynen geçerli.",
          ornek: "\"Bireysel bankacılık uygulaması için şifre sıfırlama ekranı: e-posta girişi, doğrulama kodu, yeni şifre. Kurumsal ton, sade.\"",
        },
        {
          ad: "Sırasında — taslak çıkar, tartışma başlar",
          aciklama: "Çıkan ekran doğru değil, TARTIŞILABİLİR. Değeri de bu: ekip aynı şeyi konuşmaya başlıyor.",
          ornek: "\"Doğrulama kodu ekranı eksik\", \"hata durumu yok\" — bunlar aslında kabul kriteri; toplantıda konuşulmayan şey burada görünür oluyor",
        },
        {
          ad: "Sonrası — taslak üretim değildir",
          aciklama: "Çıkan kod tasarım değil, konuşma malzemesi. Erişilebilirlik, güvenlik ve gerçek veri akışı hâlâ ekibin işi.",
          ornek: "Ekrandan çıkan kabul kriterleri Sprint Backlog'a yazılır; kodun kendisi çöpe gidebilir, konuşma kalır",
        },
      ],
      baglantilar: [{ ad: "v0.app", url: "https://v0.app/" }],
      ornekIstem:
        "Bir Scrum ekibi için \"Daily Scrum hazırlık\" ekranı tasarla. BAĞLAM: 6 kişilik yazılım ekibi, iki haftalık Sprint, pano verisi Jira'dan geliyor. Ekran Daily'den önce iki dakika bakılmak için. EKRAN: en üstte Sprint Hedefi tek cümle; altında üç sütun — dün değişen iş öğeleri, bugün planlananlar, açık engeller. Her engelin yanında sahibi ve kaç gündür açık olduğu görünsün. SINIR: gerçek veri bağlama, yalnızca örnek veriyle göster. Grafik ekleme, sade ve kurumsal kalsın. DÜRÜSTLÜK: eksik bıraktığın veya varsaydığın alanları ekranın altında not olarak yaz.",
      kaynak: "Ücretsiz hesapla denenebiliyor; günlük birkaç istem hakkı var, bir ekran taslağı için fazlasıyla yeter.",
      not: "İki dakika. İstemi önceden hazırla. Odaya sor: \"bu ekranda ilk gözünüze çarpan eksik ne?\" — gelen cevaplar zaten kabul kriteri, bunu yüksek sesle söyle. Kodun üretime gitmeyeceğini net söyle, yoksa yazılım ekibi savunmaya geçiyor.",
    },

    {
      id: "b-atolye2-ders",
      blok: "AI çıktısını değerlendirme",
      tip: "bolum",
      numara: "10",
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
          "Bir kez söylenmiş ama önemli olan şey",
          "Kimsenin yazmadığı, herkesin bildiği şey",
          "Notun arkasındaki ton ve gerilim",
        ],
      },
      not: "Deneyselliğin neden yerini alamadığı tam olarak burada görülüyor. Bu slayt oturumun dönüm noktası; acele etme.",
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

    /* ---- 00:39 · Sorumlu kullanım: güvenlik ve etik ---- */

    {
      id: "b-yapistirma",
      blok: "Sorumlu kullanım: güvenlik ve etik",
      tip: "bolum",
      numara: "11",
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
      id: "s2-maskeleme",
      blok: "Sorumlu kullanım: güvenlik ve etik",
      tip: "kartlar",
      baslik: "Peki o veriye gerçekten ihtiyacınız varsa",
      giris: "Bir önceki slayt neyi yapıştırmayacağınızı söylüyor. Ama bazen iş gerçekten o veriyle ilgili. Cevap vazgeçmek değil, maskelemek: modelin işini yapması için çoğu zaman gerçek değere değil, verinin BİÇİMİNE ihtiyacı var.",
      kartlar: [
        {
          ust: "REDAKSİYON",
          ana: "Değeri tamamen çıkarıp yerine etiket koymak",
          alt: "\"Ahmet Yılmaz aradı\" → \"[MÜŞTERİ] aradı\". En basit ve en güvenli yol. Geri dönüşü yok — hangi müşteri olduğunu sonra bilemezsiniz.",
        },
        {
          ust: "TAKMA AD",
          ana: "Tutarlı ama anlamsız bir karşılık vermek",
          alt: "Aynı kişi metin boyunca hep \"MÜŞTERİ_7\". Model ilişkileri görebilir; eşleme tablosu sizde kalır, araca gitmez.",
        },
        {
          ust: "GENELLEŞTİRME",
          ana: "Değeri aralığa çevirmek",
          alt: "\"34 yaşında, Kadıköy\" → \"30-39 yaş, İstanbul\". Analiz için çoğu zaman yeterli, kimliği tekilleştirmiyor.",
        },
        {
          ust: "SENTETİK ÖRNEK",
          ana: "Gerçeğe benzeyen ama uydurma veri",
          alt: "Atölyede yaptığımız şey buydu: uydurma bir ekip, uydurma bir ürün. Taslak üretmek için gerçek veri neredeyse hiç gerekmiyor.",
        },
        {
          ust: "ÖNCE SOR",
          ana: "\"Bu iş gerçek veri olmadan yapılabilir mi?\"",
          alt: "Çoğu zaman cevap evet. Maskeleme tekniklerinden önce sorulacak soru bu; en güvenli veri, hiç göndermediğiniz veridir.",
        },
      ],
      not: "Beş kartı hızlı geç, son kartta dur. \"En güvenli veri hiç göndermediğiniz veridir\" cümlesi bu bloğun özeti. Odaya sor: geçen hafta AI'a yapıştırdığınız bir şey vardı; maskelenmiş hâliyle de aynı işi görür müydü? Cevap neredeyse her zaman evet. Dördüncü kart atölyeye geri bağlanıyor — orada kimse gerçek veri kullanmadı ve çıktılar yine iyiydi.",
    },
    {
      id: "s2-guardrail",
      blok: "Sorumlu kullanım: güvenlik ve etik",
      tip: "adim",
      baslik: "Guardrail — kural nerede uygulanır",
      giris: "Guardrail, modele giden ve modelden gelen şeyi sınırlayan kontrol. Üç yerde durur ve üçü farklı işler yapar. Kurumunuz bunları kuruyorsa siz görmezsiniz; kurmuyorsa üçünün de yerini insan doldurur.",
      adimlar: [
        {
          ad: "Girdide",
          aciklama: "Modele ulaşmadan önce durdurur.",
          ornek: "Kişisel veri tespiti ve engelleme · istem enjeksiyonu filtresi · kapsam dışı isteği reddetme",
        },
        {
          ad: "Model tarafında",
          aciklama: "Modelin hareket alanını daraltır.",
          ornek: "Sistem talimatı · izinli araç listesi · erişebileceği belge kümesinin sınırlanması",
        },
        {
          ad: "Çıktıda",
          aciklama: "Yanıt kullanıcıya gitmeden önce denetler.",
          ornek: "Kişisel veri sızıntısı taraması · zararlı içerik filtresi · biçim doğrulama · kaynak kontrolü",
        },
      ],
      not: "Anahtar cümle: guardrail kurulu değilse üçünün de yerini İNSAN doldurur — girdide siz maskelersiniz, model tarafında istemle sınırlarsınız, çıktıda siz doğrularsınız. Beş parçalı kalıptaki \"sınır\" maddesi aslında elle kurulmuş bir model tarafı guardrail'ı; bu bağı kur. Olgunluk eğrisini hatırlat: agentic AI güvenliği ve yönetişimi henüz zirvede, yani bu araçlar iki-beş yıl uzakta. O yüzden şimdilik yük insanda ve çalışma anlaşmasında.",
    },
    {
      id: "s2-cerceve",
      blok: "Sorumlu kullanım: güvenlik ve etik",
      tip: "katman",
      baslik: "Bu kurallar nereden geliyor",
      giris: "Sorumlu kullanım bir görüş değil. Dışarıda başlayıp masanıza kadar daralan bir zincir var — ve en içteki halkayı siz yazacaksınız.",
      katmanlar: [
        {
          ad: "OECD AI İlkeleri · 2019, 2024'te güncellendi",
          aciklama: "AI konusundaki ilk hükümetler arası standart. Beş değer ilkesi: kapsayıcı büyüme ve refah · insan hakları ve demokratik değerler (adillik ve mahremiyet dahil) · şeffaflık ve açıklanabilirlik · sağlamlık, emniyet ve güvenlik · hesap verebilirlik. Türkiye dahil OECD üyeleri ve ortak ülkeler benimsedi.",
        },
        {
          ad: "AB Güvenilir AI Etik Kılavuzu",
          aciklama: "Aynı ilkeleri yedi somut koşula çeviriyor — bu blokta göreceğiniz tablo oradan. İnsan denetiminin üç biçimi de buradan geliyor.",
        },
        {
          ad: "Mevzuat · AB AI Yasası, KVKK",
          aciklama: "İlke burada yükümlülüğe dönüşüyor. Bitti Tanımı'na eklediğimiz \"mevzuat uyumu\" maddesinin dayanağı bu halka.",
        },
        {
          ad: "Kurumun onaylı araç ve veri kuralları",
          aciklama: "Hangi aracı kullanabileceğinizi belirleyen halka. Eğitimde geçen araç adları örnek; bağlayıcı olan burası.",
        },
        {
          ad: "Ekibin çalışma anlaşması",
          aciklama: "En içteki halka — ve tek, sizin yazacağınız halka. Dışarıdaki dört halka \"ne\" diyor; bunu ekibinizin günlük işine çeviren metin yok. Son blokta birlikte yazacağız.",
        },
      ],
      kaynak: "Kaynak: OECD AI Principles (oecd.org/en/topics/ai-principles) · Avrupa Komisyonu, Güvenilir AI Etik Kılavuzu.",
      not: "Bu slaydın işi otorite kurmak. Yönetici odadaysa asıl hedef kitle o. Söylenecek cümle: bunlar bizim tercihimiz değil, 2019'da imzalanmış hükümetler arası bir standardın uzantısı — 2023 itibarıyla 70'ten fazla ülkede bin ayrı politika girişimi bu ilkeleri izliyor. Beş ilkeyi tek tek okuma, halkaları oku. ASIL VURGU en içteki halka: dışarıdaki dördü \"ne\" diyor ama hiçbiri sizin Daily'nizde AI'ın açık mı kapalı mı olduğunu söylemiyor. O boşluk son bloğun tamamı.",
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
          "Tekrarlayan işleri yürüten agent'lar, otomatik özetler",
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
        { deger: "460", birim: "TWh", etki: "elektrik", aciklama: "Veri merkezlerinin 2022'deki küresel elektrik tüketimi — bir ülke olsaydı dünyada 11. sırada, Suudi Arabistan ile Fransa arasında" },
        { deger: "7-8", birim: "kat", aciklama: "Üretken AI eğitim kümesinin sıradan bir bilişim yüküne göre enerji tüketimi" },
        { deger: "2", birim: "litre", etki: "su", aciklama: "Her kilovat-saat için soğutmada harcanan su" },
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

    /* ---- 00:53 · Ekip çalışma anlaşması ---- */

    {
      id: "b-anlasma",
      blok: "Ekip çalışma anlaşması",
      tip: "bolum",
      numara: "12",
      baslik: "Ekip çalışma anlaşması",
      ozet: "Eğitimin amacı buydu: ortak ve yazılı bir yaklaşım.",
      not: "Ayraç. Beş saniye dur, blok adını söyle, geç. Eğitimin duyurusunda \"ortak bir yaklaşım oluşturmak\" yazıyordu — bu blok o sözün karşılığı, bunu söyle.",
    },
    {
      id: "s2-anlasma",
      blok: "Ekip çalışma anlaşması",
      tip: "kartlar",
      baslik: "Ortak yaklaşım — beş başlık",
      giris: "Eğitimin amacı buydu: AI'ı bilinçli ve tutarlı kullanmak için ekibin üzerinde anlaştığı bir metin. Aşağıdakiler başlangıç başlıkları; cümleleri ekip kendi yazar.",
      kartlar: [
        {
          ust: "NEREDE",
          ana: "Hangi etkinlikte AI açık, hangisinde kapalı",
          alt: "Örnek: Planning ve Refinement öncesinde açık, Daily Scrum'ın içinde kapalı. Kararın ekipte kalması gereken yerleri isim isim yazın.",
        },
        {
          ust: "NE VERİLİR",
          ana: "Hangi veri araca girer, hangisi girmez",
          alt: "Müşteri adı, kişisel veri, sözleşme metni ve kaynak kod dışarı çıkmaz. Şüphedeyseniz sormadan yapıştırmayın.",
        },
        {
          ust: "KİM ONAYLAR",
          ana: "AI çıktısı kimin onayıyla işe girer",
          alt: "Taslak AI'dan, karar insandan. Onaylayan kişi adını koyar; \"AI öyle demişti\" bir gerekçe değildir.",
        },
        {
          ust: "NASIL İŞARETLENİR",
          ana: "AI ile üretilen içerik nasıl belli olur",
          alt: "İş öğesi yorumunda tek satır yeter: taslak AI ile üretildi, gözden geçiren kim. Şeffaflık Scrum'ın ilk ayağı.",
        },
        {
          ust: "NE ZAMAN BAKILIR",
          ana: "Anlaşma ne sıklıkta gözden geçirilir",
          alt: "Her Retrospektif'te tek soru: bu anlaşma işe yaradı mı? Yaramayan madde silinir, eksik madde eklenir.",
        },
      ],
      not: "Bu slayt eğitimin çıktısı. Beş başlığı oku, sonra ekiplere söyle: bu sayfayı kendi Retrospektif'inizde açın. Üçüncü kart güvenlik bloğundaki insan denetimi tablosuyla, birinci kart Daily bloğundaki 'AI kapalı' satırıyla aynı şeyi söylüyor — ikisine de geri bağla.",
    },
    {
      id: "s2-anlasma-nasil",
      blok: "Ekip çalışma anlaşması",
      tip: "madde",
      baslik: "Anlaşma nasıl yapılır",
      giris: "Bu eğitimden sonra ekibinizle on beş dakika. Daha uzunu gerekmiyor.",
      maddeler: [
        { ana: "Beş başlığı sırayla açın", alt: "Her başlık için tek cümle yazın. Uzun metin okunmuyor, okunmayan anlaşma uygulanmıyor." },
        { ana: "Anlaşamadığınız yeri not edin", alt: "Orada karar vermeye çalışmayın. Anlaşmazlık bir sonraki Retrospektif'in gündemi olur." },
        { ana: "Metni ekibin gördüğü yere koyun", alt: "Wiki'nin derinine değil, panonun üstüne. Görünmeyen anlaşma yok sayılır." },
        { ana: "Retrospektif'te tek soruyla açın", alt: "\"Bu anlaşma işe yaradı mı?\" Yaramayan maddeyi silin — yaşamayan kural güveni aşındırır." },
      ],
      not: "Kapanışa köprü. Ekiplere şunu söyle: bu anlaşmayı yazmadan eğitim yarım kalır. Bir sonraki blok kişisel eylem planı; bu blok ekibin, o blok bireyin.",
    },

    /* ---- 00:58 · Eylem planı ---- */

    {
      id: "b-eylem-plani",
      blok: "Eylem planı",
      tip: "bolum",
      numara: "13",
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
        { ana: "Hangi etkinlikte deneyeceğim", alt: "Tek bir etkinlik seçin. Hepsini birden değiştirmek işe yaramıyor; biri oturunca sonrakine geçilir." },
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
