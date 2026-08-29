import type { Oturum } from "./tipler";

/* İçerik, Scrum.org "Professional Scrum Master — AI Essentials" sınavının
   hazırlık sayfasındaki dört bilgi alanına ve orada listelenen kaynaklara
   dayanıyor: AI for Scrum Masters · Effective AI Prompting · AI Security and
   Ethics · AI Theory and Primer.
   Kaynak: scrum.org/assessments/preparing-professional-scrum-master-ai-essentials */

export const oturum1: Oturum = {
  numara: 1,
  ad: "AI'ın Scrum içindeki yeri",
  slaytlar: [
    /* ---- 00:00 · Açılış ve kurulum ---- */
    {
      id: "s1-kapak",
      blok: "Açılış ve kurulum",
      tip: "kapak",
      ust: "Scrum + AI · Kurum İçi Eğitim",
      baslik: "AI'ın Scrum içindeki yeri",
      alt: "Birinci oturum · 60 dakika",
      meta: "Slaytlar kendi cihazınızda akar. İlerletme eğitmende.",
      not: "Katılım beklenen düzeye ulaşana kadar bu slaytta bekle. Sağ üstteki bağlı sayacını izle.",
    },
    {
      id: "s1-nasil-calisir",
      blok: "Açılış ve kurulum",
      tip: "madde",
      baslik: "Eğitim nasıl işliyor",
      giris: "Oturum tamamen çevrim içi. Bu sayfa ekran paylaşımının yerini alıyor.",
      maddeler: [
        { ana: "Slaytlar sizin ekranınızda", alt: "Ekran paylaşımını beklemiyorsunuz; eğitmen ilerlettikçe sizinki de ilerliyor." },
        { ana: "Değerlendirmeler aynı sayfada", alt: "Ayrı bir uygulama veya bağlantı yok; aynı sekmede kalıyorsunuz." },
        { ana: "Bağlantı koparsa", alt: "Sayfayı yenileyin. Aynı adla, kaldığınız yerden devam edersiniz." },
        { ana: "Soru sormak için", alt: "Toplantı sohbetine yazabilir veya söz isteyebilirsiniz; her blok sonunda duruluyor." },
        { ana: "Serbest gezinme açık", alt: "Galeriden istediğiniz bloğa geçebilirsiniz; eğitmenin konumu kartta işaretli kalır." },
      ],
      not: "İki dakikayı geçme. Amaç teknik sorunları burada bitirmek. Bağlı sayısı katılımcı sayısını tutuyor mu, kontrol et.",
    },
    {
      id: "s1-hedefler",
      blok: "Açılış ve kurulum",
      tip: "madde",
      baslik: "Bu eğitimin sonunda",
      giris: "İki oturumun sonunda katılımcılardan beklenen kazanımlar:",
      maddeler: [
        { ana: "Scrum çerçevesini tarif edebilmek", alt: "Üç sorumluluk, beş olay, üç artefakt ve bunların neden var olduğu." },
        { ana: "AI kavramlarını doğru adlandırabilmek", alt: "Model, token, bağlam, halüsinasyon, RAG, ajanlı AI." },
        { ana: "AI'ı Scrum olaylarında somut olarak kullanabilmek", alt: "Hangi olayda, hangi girdiyle, hangi çıktıyı beklemek gerektiği." },
        { ana: "Etkili istem (prompt) yazabilmek", alt: "Bağlamı kurmak, formatı belirlemek, çıktıyı değerlendirmek." },
        { ana: "Sorumlu kullanım sınırlarını bilmek", alt: "Hangi verinin aktarılmayacağı ve kararın kimde kaldığı." },
      ],
      not: "Hedefleri yüksek sesle oku. Yönetici odadaysa eğitimin çıktısının ölçülebilir olduğunu burada göstermiş olursun.",
    },
    {
      id: "s1-kapsam",
      blok: "Açılış ve kurulum",
      tip: "tablo",
      baslik: "Eğitimin kapsamı nereye dayanıyor",
      sutunlar: ["Bilgi alanı", "Karşılığı olan bloklar", "Oturum"],
      satirlar: [
        ["AI Theory and Primer", "AI temelleri ve sınırları", "1"],
        ["AI for Scrum Masters", "Scrum olaylarında AI · Canlı uygulama", "1"],
        ["Effective AI Prompting", "Etkili istem yazımı", "2"],
        ["AI Security and Ethics", "Veri güvenliği ve sorumlu kullanım", "2"],
      ],
      not: "Bu dört alan Scrum.org'un Professional Scrum Master — AI Essentials sınavının bilgi alanları. Eğitim keyfi bir derleme değil; sertifikasyona hazırlık isteyen olursa yönlendirebileceğin bir çerçeve var. Uzun anlatma, bir cümle yeter.",
    },

    /* ---- 00:04 · Ön değerlendirme ---- */

    {
      id: "b-roller",
      blok: "Roller değişiyor",
      tip: "bolum",
      numara: "02",
      baslik: "Roller değişiyor",
      ozet: "Unvanlar birleşiyor. Peki Scrum Master nerede duruyor?",
      not: "Ayraç. Beş saniye dur, blok adını söyle, geç. Katılımcı nerede olduğunu bilsin diye var.",
    },
    {
      id: "s1-roller",
      blok: "Roller değişiyor",
      tip: "roller",
      baslik: "Roller birleşiyor",
      giris: "Yazılım ekiplerindeki unvanlar birleşiyor. Gartner'ın öngörüsü: 2029'a kadar kuruluşların %60'ı küçük ekiplere geçecek — bugün bu oran %15.",
      sutunlar: ["Bugün", "Birleşiyor", "2029"],
      gruplar: [
        {
          son: "Product Engineers",
          dallar: [
            { ara: "Product Engineers", kaynaklar: ["Product Manager", "Software Engineer"] },
            { ara: "Experience Design", kaynaklar: ["Designer / UX", "QA / Test"] },
          ],
        },
        {
          son: "Forward-Deployed Engineers",
          dallar: [
            { ara: "AI Requirements Analyst", kaynaklar: ["Business Analyst"] },
            { ara: "Forward-Deployed Eng.", kaynaklar: ["Service Delivery Lead", "Architect"] },
          ],
        },
        {
          son: "AI Platform Team",
          dallar: [
            { ara: "AI Agent Ops", kaynaklar: ["Platform Engineer", "DevOps / SRE"] },
            { ara: "AI Engineers", kaynaklar: ["Data Scientist", "ML Engineer"] },
          ],
        },
      ],
      yalniz: {
        ad: "Scrum Master",
        not: "Bu satırdan hiçbir yere çizgi çıkmıyor. Peki bu ne demek?",
        sonraGrup: 0,
      },
      kaynak: "Kaynak: Gartner, \"Gartner Predicts 60% of Organizations Will Adopt Smaller Software Engineering Teams by 2029\", 7 Temmuz 2026 · Aliyah Camacho. Şema Gartner'ın rol birleşme sunumundan uyarlanmıştır.",
      not: "Eğitimin asıl açılışı bu. 30 saniye sessiz kal, okusunlar. Sonra sor: \"bu tabloda eksik olan ne?\" — sen söyleme, oda bulsun. Sen cevaplama; cevabı oturumun sonunda onlar verecek.",
    },

    {
      id: "s1-alinti-gartner",
      blok: "Roller değişiyor",
      tip: "alinti",
      metin: "AI yazılım mühendisliğini yeniden şekillendiriyor. Rolleri yeniden tanımlıyor, ekipleri yeniden kuruyor ve daha az değil, daha çok yazılım mühendisi talebi yaratıyor.",
      kisi: "Aliyah Camacho, Principal Analyst",
      kaynak: "Gartner · 7 Temmuz 2026",
      not: "Bir önceki slayt korkuyu masaya koydu, bu slayt onu kaynakla yatıştırıyor. Yavaş oku. Ekleyebileceğin ikinci cümle: küçük ekip bir maliyet kısma taktiği değil, yeniden yapılandırma. Ve Gartner'ın açık uyarısı: AI'a güvenip junior kadroları kesen kuruluşlar yetenek hattını zayıflatır — yönetici odadaysa bu cümleyi söyle.",
    },

    /* ---- 00:08 · Scrum çerçevesi ---- */

    {
      id: "b-tez",
      blok: "Scrum çerçevesi",
      tip: "bolum",
      numara: "03",
      baslik: "Scrum çerçevesi",
      ozet: "Üç sorumluluk, beş olay, üç artefakt — ve hepsinin altındaki ampirizm.",
      not: "Ayraç. Beş saniye dur, blok adını söyle, geç. Katılımcı nerede olduğunu bilsin diye var.",
    },
    {
      id: "s1-tez",
      blok: "Scrum çerçevesi",
      tip: "vurgu",
      metin: "AI Scrum'ın yerine geçmez. Scrum'ın döngüsünü hızlandırır.",
      kaynak: "Eğitimin temel tezi",
      not: "Yavaş oku. Eğitimin tamamı bu cümlenin etrafında kuruluyor; ikinci oturumun son sorusu da bu.",
    },
    {
      id: "s1-ampirizm",
      blok: "Scrum çerçevesi",
      tip: "madde",
      baslik: "Scrum ampirizme dayanır",
      giris: "Planı baştan doğru kurmaya değil, gerçekle karşılaşıp düzeltmeye güvenir.",
      maddeler: [
        { ana: "Şeffaflık", alt: "İş görünür olmalı. Görünmeyen iş gözden geçirilemez." },
        { ana: "Gözden geçirme", alt: "Düzenli aralıklarla gerçek çıktıya bakılır, plana değil." },
        { ana: "Uyarlama", alt: "Bakılan şey yanlışsa yön değişir. Sprint bunun için kısa tutulur." },
      ],
      not: "AI üçünü de hızlandırabilir ama hiçbirinin yerine geçemez — sonraki blokların zemini bu.",
    },
    {
      id: "s1-uc-bes-uc",
      blok: "Scrum çerçevesi",
      tip: "tablo",
      baslik: "Üç sorumluluk, beş olay, üç artefakt",
      sutunlar: ["Sorumluluklar", "Olaylar", "Artefaktlar"],
      satirlar: [
        ["Product Owner", "Sprint", "Product Backlog"],
        ["Scrum Master", "Sprint Planning", "Sprint Backlog"],
        ["Geliştiriciler", "Daily Scrum", "Increment"],
        ["", "Sprint Review", ""],
        ["", "Sprint Retrospective", ""],
      ],
      not: "Hızlı geç. Bilenler için hatırlatma, bilmeyenler için harita. Ayrıntı bir sonraki slaytta.",
    },
    {
      id: "s1-sorumluluklar",
      blok: "Scrum çerçevesi",
      tip: "tablo",
      baslik: "Üç sorumluluk ne yapar",
      sutunlar: ["Sorumluluk", "Neyin hesabını verir", "Karar yetkisi"],
      satirlar: [
        [
          "Product Owner",
          "Ürünün değerini artırmak; Product Backlog'un görünür ve sıralı olması",
          "Neyin yapılacağına ve sıraya karar verir",
        ],
        [
          "Scrum Master",
          "Çerçevenin doğru işlemesi; engellerin kaldırılması",
          "Sürece dair karar verir, işin içeriğine değil",
        ],
        [
          "Geliştiriciler",
          "Her Sprint'te kullanılabilir bir artış (Increment) üretmek",
          "İşin nasıl yapılacağına birlikte karar verir",
        ],
      ],
      not: "Yönetici odadaysa üçüncü satırda dur: 'nasıl' kararı ekipte. Bu, ikinci oturumdaki çalışma anlaşmasının da temeli.",
    },

    /* ---- 00:20 · AI temelleri ve sınırları ---- */

    {
      id: "b-katmanlar",
      blok: "AI temelleri ve sınırları",
      tip: "bolum",
      numara: "04",
      baslik: "AI temelleri ve sınırları",
      ozet: "Kavramlar, üç temel sınır ve dört aşamalı yetkinlik çerçevesi.",
      not: "Ayraç. Beş saniye dur, blok adını söyle, geç. Katılımcı nerede olduğunu bilsin diye var.",
    },
    {
      id: "s1-katmanlar",
      blok: "AI temelleri ve sınırları",
      tip: "katman",
      baslik: "AI kavramlarının katmanları",
      giris: "Günlük konuşmada hepsine \"AI\" deniyor. Aslında biri diğerinin içinde.",
      katmanlar: [
        { ad: "Makine öğrenmesi", aciklama: "Veriden örüntü çıkarır. Kural yazılmaz, örnek verilir." },
        { ad: "Derin öğrenme", aciklama: "Çok katmanlı sinir ağları. Görüntü, ses ve dilde sıçramayı bu yaptı." },
        { ad: "Üretken AI", aciklama: "Yeni içerik üretir: metin, kod, görsel. ChatGPT ve Claude bu katmanda." },
        { ad: "Ajanlı AI", aciklama: "Üretmekle kalmaz; araç kullanır ve adım adım iş yürütür." },
      ],
      not: "Jira ve benzeri araçlardaki AI özellikleri çoğunlukla üçüncü katmanda. Dördüncüsü yeni ve daha az öngörülebilir — bunu vurgula.",
    },
    {
      id: "s1-olgunluk",
      blok: "AI temelleri ve sınırları",
      tip: "olgunluk",
      baslik: "Dördüncü halka daha yolun başında",
      giris: "Ajanlı AI'ın nerede olduğunu bilmek, satıcı sunumlarını kalibre etmenin en pratik yolu.",
      asamalar: [
        "Tetikleyici",
        "Beklenti zirvesi",
        "Hayal kırıklığı",
        "Aydınlanma",
        "Verimlilik platosu",
      ],
      noktalar: [
        { ad: "İnsan-ajan çalışma alanı", x: 9, ufuk: "yakin" },
        { ad: "Alana özgü ajanlar", x: 15, ufuk: "orta" },
        { ad: "Ajan geliştirme platformu", x: 19, ufuk: "orta" },
        { ad: "Ajanlı AI yönetişimi", x: 23, ufuk: "orta", one: true },
        { ad: "Ajanlı AI güvenliği", x: 26, ufuk: "orta", one: true },
        { ad: "Çok ajanlı sistemler", x: 29, ufuk: "orta" },
        { ad: "Ajanlı AI", x: 32, ufuk: "uzak", one: true },
        { ad: "AI kodlama ajanları", x: 35, ufuk: "orta" },
        { ad: "Model Context Protocol", x: 39, ufuk: "orta" },
      ],
      kaynak: "Kaynak: Gartner, \"Hype Cycle for Agentic AI\", 15 Nisan 2026 · Rajesh Kandaswamy. Konumlar kendi görselimize aktarılmıştır.",
      not: "İki cümle: (1) eğride görünen her şey henüz beklenti zirvesinde — aydınlanma yamacında veya platoda hiçbir şey yok. (2) Ajanlı AI'ın kendisi platodan 5–10 yıl uzakta. Asıl vurgu koyu iki madde: yönetişim ve güvenlik de olgunlaşmamış. Bu, ikinci oturumdaki çalışma anlaşmasının gerekçesi — sizi koruyacak araç gelene kadar sizi koruyacak tek şey ekibin kendi anlaşması. Bu cümleyi burada kur, blok 12'de geri çağır.",
    },
    {
      id: "s1-sozluk",
      blok: "AI temelleri ve sınırları",
      tip: "kartlar",
      baslik: "Ortak sözlük",
      giris: "Referans slaydı. Hızlı geçiyoruz; galeriden geri dönüp bakabilirsiniz.",
      kartlar: [
        { ust: "Token", ana: "Modelin metni böldüğü en küçük parça", alt: "Ücret ve uzunluk sınırları bunun üzerinden hesaplanır" },
        { ust: "Bağlam penceresi", ana: "Modelin aynı anda görebildiği toplam metin", alt: "Sprint geçmişiniz oraya konmadıysa model onu bilmez" },
        { ust: "İstem (prompt)", ana: "Modele verdiğiniz talimat ve bağlamın tamamı", alt: "İkinci oturumun ilk bloğu bunun üstüne kurulu" },
        { ust: "Halüsinasyon", ana: "Modelin bilmediğini de özgüvenle uydurması", alt: "Her çıktının doğrulanma gerekçesi" },
        { ust: "RAG", ana: "Yanıt üretmeden önce güvenilir kaynaktan bilgi getirme", alt: "Kurumsal dokümanla çalışmanın doğru yolu" },
        { ust: "İnce ayar", ana: "Modeli kendi verinizle yeniden eğitmek", alt: "Pahalı; çoğu ihtiyaç için RAG yeterli" },
        { ust: "Ajan", ana: "Araç kullanıp çok adımlı iş yürüten AI", alt: "Denetim ihtiyacı en yüksek kullanım biçimi" },
      ],
      not: "Ezber slaydı değil, referans. Hızlı geç; halüsinasyon ve RAG kartlarında birer cümle dur.",
    },
    {
      id: "s1-llm-nasil",
      blok: "AI temelleri ve sınırları",
      tip: "madde",
      baslik: "Dil modeli neden yanılır",
      giris: "Sınırlarını anlamak için mekanizmayı bilmek gerekiyor. Üç nedeni var.",
      maddeler: [
        { ana: "Eğitim verisi karışıktır", alt: "İnternetin tamamıyla eğitilir; doğru bilgi de yanlış bilgi ve toplumsal önyargı da o veride vardır." },
        { ana: "Amacı doğruluk değil, olasılıktır", alt: "Gelişmiş bir otomatik tamamlama gibi çalışır: en olası devamı üretir. Doğru çıkması çoğu zaman bunun yan ürünüdür." },
        { ana: "Tasarımı doğruyu yanlıştan ayırmaz", alt: "Yalnızca doğru veriyle eğitilse bile, örüntüleri beklenmedik biçimde birleştirip yeni bir yanlış üretebilir." },
      ],
      not: "Kaynak: MIT Sloan, \"When AI Gets It Wrong\". 'Veri tabanından çekmiyor, tahmin ediyor' cümlesini iki kez söyle — sonraki iki slaytın gerekçesi bu.",
    },
    {
      id: "s1-llm-yapar",
      blok: "AI temelleri ve sınırları",
      tip: "ikili",
      baslik: "Nerede güçlü, nerede zayıf",
      sol: {
        baslik: "Güvenilir olduğu işler",
        etiket: "Girdi sizde",
        ton: "olumlu",
        maddeler: [
          "Dönüştürmek — dağınık notu yapılandırılmış metne çevirmek",
          "Özetlemek — uzun girdiden ana hatları çıkarmak",
          "Taslak üretmek — boş sayfayı doldurmak",
          "Alternatif çoğaltmak — aynı işi beş farklı biçimde denemek",
        ],
      },
      sag: {
        baslik: "Doğrulama gerektiren işler",
        etiket: "Girdi modelde",
        ton: "olumsuz",
        maddeler: [
          "Olgu ve rakam üretmek — kaynağı yoksa uydurabilir",
          "Kurumsal bilgi hatırlamak — sizin verinizi bilmez",
          "Güncel olay aktarmak — eğitim verisi bir tarihte durur",
          "Kendi hatasını fark etmek — emin olmadığını söylemez",
        ],
      },
      not: "Sol sütunun ortak özelliği: girdi sizde olduğu için çıktıyı doğrulayabiliyorsunuz. Sağ sütunda bu imkân yok — asıl risk orada.",
    },
    {
      id: "s1-llm-sinir",
      blok: "AI temelleri ve sınırları",
      tip: "madde",
      baslik: "Üç temel sınır",
      giris: "İkinci oturumdaki iki atölye de bu üç sınırın üstüne kuruluyor.",
      maddeler: [
        { ana: "Bilmediğini bilmez", alt: "Emin olmadığında da aynı özgüvenle yazar. Uydurmanın teknik adı halüsinasyon." },
        { ana: "Sınırsız bağlam tutmaz", alt: "Kendisine ne verilirse onu görür. Sprint'inizin geçmişini bilmez." },
        { ana: "Kurumsal verinizi bilmez", alt: "Müşterinizi, sözleşmenizi, ekip anlaşmalarınızı bilmez. Siz söylemedikçe." },
      ],
      not: "Üç maddeyi ikinci oturumun atölyelerinde tek tek geri çağıracaksın. Burada tohumu at, ayrıntıya girme.",
    },
    {
      id: "s1-4d",
      blok: "AI temelleri ve sınırları",
      tip: "tablo",
      baslik: "AI yetkinliğinin dört aşaması",
      sutunlar: ["Aşama", "Ne yapıyorsunuz", "Kendinize sorun"],
      satirlar: [
        ["Delegasyon", "Hedefi siz koyarsınız; AI'ı kullanıp kullanmayacağınıza, ne zaman kullanacağınıza karar verirsiniz", "Bu iş gerçekten devredilebilir mi?"],
        ["Tarif", "Hedefi modele işe yarar çıktı üretecek biçimde anlatırsınız", "Model bu işi yapmak için neyi bilmiyor?"],
        ["Muhakeme", "Çıktının işe yarayıp yaramadığını değerlendirirsiniz", "Bu çıktı neyi kaçırmış olabilir?"],
        ["Sahiplenme", "AI ile ürettiğiniz işin sorumluluğunu üstlenirsiniz", "Bu çıktıyı imzalayabilir miyim?"],
      ],
      not: "Kaynak: 4D AI Fluency çerçevesi (Delegation · Description · Discernment · Diligence). Bu tablo eğitimin omurgası: ikinci oturumun her bloğu bu dört aşamadan birine denk geliyor. İstem yazımı tarif, çıktı değerlendirme muhakeme, veri güvenliği sahiplenme. Bunu şimdi söyle, ikinci oturumda hatırlat.",
    },

    /* ---- 00:34 · Bilgi kontrolü 1 ---- */

    /* ---- 00:39 · Scrum olaylarında AI ---- */

    {
      id: "b-olaylar",
      blok: "Scrum olaylarında AI",
      tip: "bolum",
      numara: "05",
      baslik: "Scrum olaylarında AI",
      ozet: "Hangi olayda ne, hangi aşamada, hangi araçla.",
      not: "Ayraç. Beş saniye dur, blok adını söyle, geç. Katılımcı nerede olduğunu bilsin diye var.",
    },
    {
      id: "s1-olaylar",
      blok: "Scrum olaylarında AI",
      tip: "tablo",
      baslik: "Scrum olaylarında AI'ın katkısı",
      sutunlar: ["Olay", "AI ne yapabilir", "Nerede kullanılır"],
      satirlar: [
        ["Product Backlog Refinement", "Büyük iş öğesini böler, kabul kriteri taslağı çıkarır", "Jira / ADO — iş öğesi açıklaması"],
        ["Sprint Planning", "Risk ve bağımlılık listesi çıkarır, sorulacak soruları üretir", "Sprint hedefi notu"],
        ["Daily Scrum", "Açık engelleri özetler, tekrarlayanı işaretler", "Pano yorumları"],
        ["Sprint Review", "Demo notu ve paydaş özeti yazar", "Sürüm notları"],
        ["Sprint Retrospective", "Not yığınını temaya indirger", "Retrospektif panosu"],
      ],
      not: "Her satırda bir cümle. Beş dakikada bitir; asıl mesaj sonraki slaytta.",
    },
    {
      id: "s1-asamalar",
      blok: "Scrum olaylarında AI",
      tip: "adim",
      baslik: "Asıl kazanç olayın içinde değil, çevresinde",
      giris: "Her olayı üç aşamada düşünün. İnsanlar AI'ı toplantının içine sokmaya çalışıyor; oysa en yüksek katkı hazırlıkta.",
      adimlar: [
        {
          ad: "Öncesi",
          aciklama: "Hazırlık. Katkının en yüksek olduğu aşama burası.",
          ornek: "Retrospektif: dağınık notları temaya indirger, tartışılacak üç başlık önerir",
        },
        {
          ad: "Sırasında",
          aciklama: "Geri planda kalır. Konuşan ekiptir.",
          ornek: "Retrospektif: konuşulanı not alır; yorum yapmaz, yön vermez",
        },
        {
          ad: "Sonrası",
          aciklama: "Toparlama ve takip.",
          ornek: "Retrospektif: aksiyon maddelerini biçimlendirir, bir sonrakine hatırlatma çıkarır",
        },
      ],
      kaynak: "Kaynak: Scrum.org, AI-Enhanced Scrum Events.",
      not: "En önemli slaytlardan biri. İki cümle: (1) asıl kazanç hazırlıkta, (2) hepsini birden değiştirmeyin — tek olayla başlayın, oturunca sonrakine geçin.",
    },
    {
      id: "s1-ornek-refinement",
      blok: "Scrum olaylarında AI",
      tip: "ikili",
      baslik: "Somut örnek — Refinement",
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
      id: "s1-olaylar-sinir",
      blok: "Scrum olaylarında AI",
      tip: "terazi",
      baslik: "Devredilebilir işler ve ekipte kalması gerekenler",
      giris: "Ayrım tek bir soruda: bu iş taslak üretmek mi, karar vermek mi?",
      solEtiket: "AI'a devredilebilir · taslak işi",
      sagEtiket: "Ekipte kalmalı · karar işi",
      ogeler: [
        { metin: "Metni biçimlendirmek ve yeniden yazmak", taraf: "sol" },
        { metin: "Neyin değerli olduğuna karar vermek", taraf: "sag" },
        { metin: "Uzun girdiden özet çıkarmak", taraf: "sol" },
        { metin: "Sprint hedefini taahhüt etmek", taraf: "sag" },
        { metin: "Kontrol listesi ve soru üretmek", taraf: "sol" },
        { metin: "Bir işin \"bitti\" olduğunu onaylamak", taraf: "sag" },
        { metin: "Aynı içeriği birden fazla biçimde denemek", taraf: "sol" },
        { metin: "Ekip içi anlaşmazlığı konuşmak", taraf: "sag" },
      ],
      not: "Sağ taraf eğitimin ahlaki merkezi. Acele etme. Scrum olayları denetleme ve uyarlama için var; AI girdi verir, kararı iş birliğiyle ekip verir.",
    },

    {
      id: "s1-araclar",
      blok: "Scrum olaylarında AI",
      tip: "tablo",
      baslik: "Rol bazında örnek araçlar",
      sutunlar: ["Rol", "Ağırlık merkezi nereye kayıyor", "Örnek araçlar"],
      satirlar: [
        [
          "Product Owner",
          "Backlog yöneticisinden ürün liderine. Zaman keşif, strateji ve paydaşta.",
          "Toplantı: Fireflies.ai · Otter.ai — Prototip: Uizard · v0.dev — Sunum: Gamma.app — Ses: NotebookLM",
        ],
        [
          "Scrum Master",
          "İnsan tarafına ve AI'ın yapamadıklarına. Hangi aracın ne yaptığını bilip ekibin sürecine yerleştirmek.",
          "Toplantı: Tactiq · Fathom — Atölye: Miro AI — Özet: NotebookLM",
        ],
        [
          "Geliştiriciler",
          "Araçları tanımlamak ve yapılandırmak; ajanların ürettiği işi gözden geçirip yönetmek.",
          "Kod: GitHub Copilot · Cursor — Arayüz: Figma AI · v0.dev — Test: Testim · Mabl — Dağıtım: Harness · CircleCI",
        ],
      ],
      not: "Kaynak: Scrum.org, \"Setup an AI-Powered Scrum Team (A Quick-Start Guide)\". ÖNEMLİ: bu liste örnek, tavsiye değil — kurumun onaylı araç listesi neyse o geçerli. Bu cümleyi mutlaka söyle, ikinci oturumdaki kuralla çelişmesin. Araç adlarını tek tek okuma; \"her satırda birkaç örnek var\" deyip geç.",
    },
    {
      id: "s1-sm-yeni-is",
      blok: "Scrum olaylarında AI",
      tip: "madde",
      baslik: "Scrum Master'ın çizgisi nereye gidiyor",
      giris: "Açılıştaki tabloda Scrum Master hiçbir kutuya bağlanmıyordu. Cevap birleşmek değil — işin ağırlık merkezinin kayması.",
      maddeler: [
        { ana: "İnsan tarafı", alt: "AI'ın yapamadığı her şey: gerilimi konuşmak, güveni kurmak, kararın ekipte kalmasını sağlamak." },
        { ana: "Araç manzarasını bilmek", alt: "Hangi araç ne yapıyor, hangisi bu ekibe girer, hangisi girmez." },
        { ana: "Kurmak ve birleştirmek", alt: "Aracı sürece yerleştirmek, işe yaramayanı çıkarmak. Tek olayla başlayıp genişletmek." },
        { ana: "Muhakemeyi öğretmek", alt: "Ekip AI çıktısını yargılamayı öğrenmezse hız kalite değil, daha hızlı hata üretir." },
      ],
      not: "İlk üç madde Scrum.org'un AI-Powered Scrum Team kılavuzundan, dördüncüsü bu eğitimin eklediği. Açılıştaki soruyu burada kapat: çizgisi yoktu çünkü birleşmiyor, yer değiştiriyor. Oturumun düğüm noktası — acele etme.",
    },

    /* ---- 00:54 · Canlı uygulama ---- */


    {
      id: "b-ozet",
      blok: "Özet ve kapanış",
      tip: "bolum",
      numara: "06",
      baslik: "Özet ve kapanış",
      ozet: "Üç madde ve ikinci oturuma köprü.",
      not: "Ayraç. Beş saniye dur, blok adını söyle, geç. Katılımcı nerede olduğunu bilsin diye var.",
    },
    {
      id: "s1-ozet",
      blok: "Özet ve kapanış",
      tip: "madde",
      baslik: "Birinci oturumun özeti",
      giris: "İkinci oturumda bu üç maddenin üstüne uygulama yapılacak.",
      maddeler: [
        { ana: "Scrum ampirizme dayanır", alt: "Şeffaflık, gözden geçirme, uyarlama. AI üçünü de hızlandırır, hiçbirinin yerine geçmez." },
        { ana: "Dil modelinin üç sınırı vardır", alt: "Bilmediğini bilmez, sınırsız bağlam tutmaz, kurumsal verinizi bilmez." },
        { ana: "Yetkinlik dört aşamalıdır", alt: "Delegasyon, tarif, muhakeme, sahiplenme. İkinci oturumda dördünü de uygulayacağız." },
      ],
      not: "Üç maddeyi tek tek oku. Katılımcılar ikinci oturuma bu üçüyle gelmeli.",
    },
    {
      id: "s1-kapanis",
      blok: "Özet ve kapanış",
      tip: "vurgu",
      metin: "İkinci oturumda bu uygulamayı siz yapacaksınız.",
      kaynak: "İkinci oturum · uygulama oturumu",
      not: "Tek cümle, sonra bitir. Ön hazırlık istenmediğini açıkça söyle.",
    },
  ],
};
