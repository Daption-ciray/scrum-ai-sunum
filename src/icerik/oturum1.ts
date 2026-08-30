import type { Oturum } from "./tipler";

/* İçerik, Scrum.org "Professional Scrum Master — AI Essentials" sınavının
   hazırlık sayfasındaki dört bilgi alanına ve orada listelenen kaynaklara
   dayanıyor: AI for Scrum Masters · Effective AI Prompting · AI Security and
   Ethics · AI Theory and Primer.
   Kaynak: scrum.org/assessments/preparing-professional-scrum-master-ai-essentials

   Yapı eğitim duyurusuna göre kuruldu: birinci oturum önce Agile yaklaşımı ve
   Scrum'ın temel ilkelerini, ardından üretken yapay zekanın çalışma mantığını
   ve sınırlarını ele alıyor. Olayların aşama aşama işlenişi ikinci oturumda.
   Bu sıra keyfi değil — katılımcıya duyuruda verilen sözün karşılığı. */

export const oturum1: Oturum = {
  numara: 1,
  ad: "Scrum'ın temelleri ve üretken AI",
  slaytlar: [
    /* ---- 00:00 · Açılış ve kurulum ---- */

    {
      id: "s1-kapak",
      blok: "Açılış ve kurulum",
      tip: "kapak",
      ust: "Scrum + AI · Kurum İçi Eğitim",
      baslik: "Scrum'ın temelleri ve üretken AI",
      alt: "Birinci oturum · 60 dakika",
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
        { ana: "AI kavramlarını doğru adlandırabilmek", alt: "Model, token, bağlam, halüsinasyon, RAG, agentic AI." },
        { ana: "Sprint Planning ve Daily Scrum'da AI'ı somut olarak kullanabilmek", alt: "İki olay örnek vaka olarak işlenecek: hangi aşamada, hangi girdiyle, hangi araçla." },
        { ana: "Etkili istem (prompt) yazabilmek", alt: "Bağlamı kurmak, formatı belirlemek, çıktıyı değerlendirmek." },
        { ana: "Sorumlu kullanım sınırlarını bilmek", alt: "Hangi verinin aktarılmayacağı ve kararın kimde kaldığı." },
        { ana: "Ekip olarak ortak bir yaklaşımda anlaşmak", alt: "İkinci oturumun sonunda birlikte yazılacak çalışma anlaşması." },
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
        ["AI for Scrum Masters", "Roller değişiyor · Scrum çerçevesi · Sprint Planning ve Daily Scrum'da AI", "1 ve 2"],
        ["Effective AI Prompting", "Etkili istem yazımı · AI çıktısını değerlendirme", "1 ve 2"],
        ["AI Security and Ethics", "Sorumlu kullanım: güvenlik ve etik", "2"],
      ],
      not: "Bu dört alan Scrum.org'un Professional Scrum Master — AI Essentials sınavının bilgi alanları. Eğitim keyfi bir derleme değil; sertifikasyona hazırlık isteyen olursa yönlendirebileceğin bir çerçeve var. Uzun anlatma, bir cümle yeter.",
    },

    /* ---- 00:04 · Roller değişiyor ---- */

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

    /* ---- 00:11 · Scrum çerçevesi ---- */

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
      id: "s1-manifesto",
      blok: "Scrum çerçevesi",
      tip: "kartlar",
      baslik: "Agile Manifesto'dan Scrum'a",
      giris: "Scrum boşlukta doğmadı. 2001'de yazılan Agile Manifesto'nun dört değerini çalışan bir çerçeveye çeviriyor. Dördü de sağdakini değersiz saymıyor — soldakinin daha değerli olduğunu söylüyor.",
      kartlar: [
        {
          ust: "BİREYLER VE ETKİLEŞİMLER",
          ana: "süreçler ve araçlardan önce gelir",
          alt: "Scrum'daki karşılığı: olaylar birer toplantı değil, ekibin birlikte karar verdiği anlar. Bu eğitimin sınırı da burada yazıyor — AI bir araçtır.",
        },
        {
          ust: "ÇALIŞAN YAZILIM",
          ana: "kapsamlı dokümantasyondan önce gelir",
          alt: "Scrum'daki karşılığı: her Sprint'in sonunda kullanılabilir bir Increment. Ölçü rapor değil, çalışan ürün.",
        },
        {
          ust: "MÜŞTERİ İŞ BİRLİĞİ",
          ana: "sözleşme pazarlığından önce gelir",
          alt: "Scrum'daki karşılığı: Product Owner ve Sprint Review. Paydaş her Sprint'te masada, sonunda değil.",
        },
        {
          ust: "DEĞİŞİME YANIT",
          ana: "planı takip etmekten önce gelir",
          alt: "Scrum'daki karşılığı: Sprint kısa tutulur, Product Backlog'un sırası her an değişebilir.",
        },
      ],
      kaynak: "Kaynak: Manifesto for Agile Software Development, 2001 · agilemanifesto.org",
      not: "Scrum'a yeni olanlar için zemin, bilenler için hatırlatma. Birinci kartta dur: manifesto \"bireyler ve etkileşimler, süreçler ve ARAÇLARDAN önce gelir\" diyor. AI bir araç. Eğitimin tamamının sınırı 2001'de yazılmış — bu cümleyi söyle, ikinci oturumdaki 'Daily'de AI kapalı' kararı buradan çıkıyor. Dört kartı tek tek okuma; birinciyi oku, kalanı özetle.",
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

    /* ---- 00:24 · AI temelleri ve sınırları ---- */

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
        { ad: "Agentic AI", aciklama: "Üretmekle kalmaz; araç kullanır ve adım adım iş yürütür." },
      ],
      not: "Jira ve benzeri araçlardaki AI özellikleri çoğunlukla üçüncü katmanda. Dördüncüsü yeni ve daha az öngörülebilir — bunu vurgula.",
    },
    {
      id: "s1-olgunluk",
      blok: "AI temelleri ve sınırları",
      tip: "olgunluk",
      baslik: "Dördüncü halka daha yolun başında",
      giris: "\"AI her şeyi devraldı\" cümlesini duyduğunuzda bu eğriye bakın. Eğride görünen dokuz teknolojinin tamamı beklenti zirvesinde ya da öncesinde — aydınlanma yamacında veya verimlilik platosunda hiçbiri yok.",
      asamalar: [
        "Tetikleyici",
        "Beklenti zirvesi",
        "Hayal kırıklığı",
        "Aydınlanma",
        "Verimlilik platosu",
      ],
      aciklama:
        "Dikey eksen BEKLENTİYİ ölçüyor, yeteneği değil: düşüş teknolojinin gerilemesi değil, ilginin dağılmasıdır. Plato da \"herkes kullanıyor\" değil, \"ne alacağınızı önceden biliyorsunuz\" demektir.",
      noktalar: [
        { ad: "İnsan-agent çalışma alanı", x: 9, ufuk: "yakin" },
        { ad: "Alana özgü agent'lar", x: 15, ufuk: "orta" },
        { ad: "Agent geliştirme platformu", x: 19, ufuk: "orta" },
        { ad: "Agentic AI yönetişimi", x: 23, ufuk: "orta", one: true },
        { ad: "Agentic AI güvenliği", x: 26, ufuk: "orta", one: true },
        { ad: "Multi-agent sistemler", x: 29, ufuk: "orta" },
        { ad: "Agentic AI", x: 32, ufuk: "uzak", one: true },
        { ad: "AI kodlama agent'ları", x: 35, ufuk: "orta" },
        { ad: "Model Context Protocol", x: 39, ufuk: "orta" },
      ],
      kaynak: "Kaynak: Gartner, \"Hype Cycle for Agentic AI\", 15 Nisan 2026 · Rajesh Kandaswamy. Konumlar kendi görselimize aktarılmıştır.",
      not: "Bu slaydın işi \"Scrum öldü, AI aldı\" söylemini yatıştırmak — abartı olduğunu SÖYLEMEK yerine GÖSTERİYOR. Altındaki satırı mutlaka oku, eğri o cümle olmadan sistematik olarak yanlış anlaşılıyor. Ekleyebileceğin cümle: çukur, basının gittiği ve mühendisliğin başladığı yerdir — bugün kullandığınız her olgun teknoloji oradan geçti. İki cümle: (1) eğride görünen her şey henüz beklenti zirvesinde. (2) Agentic AI'ın kendisi platodan 5–10 yıl uzakta. Asıl vurgu koyu iki madde: yönetişim ve güvenlik de olgunlaşmamış. Bu, ikinci oturumdaki çalışma anlaşmasının gerekçesi — sizi koruyacak araç gelene kadar sizi koruyacak tek şey ekibin kendi anlaşması. Bu cümleyi burada kur, blok 12'de geri çağır.",
    },
    {
      id: "s1-hype-gercek",
      blok: "AI temelleri ve sınırları",
      tip: "sayi",
      baslik: "Beklenti ile bugün arasındaki fark",
      giris: "Üç rakam, iki bağımsız kaynak. Birincisi teknolojinin tavanı, ikincisi o tavana ne hızla yaklaşıldığı, üçüncüsü yolda ne kadarının düştüğü. Dikkat: ilk ikisi AYNI raporun içinde.",
      sayilar: [
        {
          deger: "70",
          birim: "%",
          aciklama: "Çalışan zamanının teknik olarak otomatikleştirilebilir kısmı — bugünkü teknolojiyle, üst uç (aralık %60–70)",
        },
        {
          deger: "0,6",
          birim: "%",
          aciklama: "Aynı raporun 2040'a kadar beklediği YILLIK işgücü verimliliği artışı — yine üst uç (aralık %0,1–0,6)",
        },
        {
          deger: "40",
          birim: "%+",
          aciklama: "2027 sonuna kadar iptal edilmesi beklenen agentic AI projesi",
        },
      ],
      kaynak: "Kaynak: McKinsey Global Institute, \"The Economic Potential of Generative AI\", Haziran 2023 (ilk iki rakam) · Gartner, \"Over 40% of Agentic AI Projects Will Be Canceled by End of 2027\", 25 Haziran 2025.",
      not: "Bu slaydın tek işi \"Scrum öldü, AI aldı\" söylemini rakamla yatıştırmak. ÖNEMLİ: ilk iki rakam farklı birimlerde ve bilerek yan yana — biri TAVAN (teknik olarak neyin otomatikleştirilebileceği), diğeri HIZ (o tavana yılda ne kadar yaklaşıldığı). İkisi de McKinsey'in aynı raporundan ve ikisi de aralığın İYİMSER ucu. Cümle şu: teknik tavan %70 ama en iyimser senaryoda bile yılda %0,6 ilerliyoruz — arada on yıllar var. Üçüncü rakam bunun sebebini veriyor: projelerin çoğu maliyet ve belirsiz değer yüzünden düşüyor. Biri sorarsa: McKinsey rakamları 2023 projeksiyonu, güncel değil; zaten iddia rakamın kendisi değil, iki rakam arasındaki mesafe. Roller slaytındaki Gartner alıntısıyla aynı şeyi söylüyor — \"daha az değil, daha çok mühendis\".",
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
        { ust: "İstem (prompt)", ana: "Modele verdiğiniz talimat ve bağlamın tamamı", alt: "Bu oturumun beşinci bloğu bunun üstüne kurulu" },
        { ust: "Halüsinasyon", ana: "Modelin bilmediğini de özgüvenle uydurması", alt: "Her çıktının doğrulanma gerekçesi" },
        { ust: "RAG", ana: "Yanıt üretmeden önce güvenilir kaynaktan bilgi getirme", alt: "Kurumsal dokümanla çalışmanın doğru yolu" },
        { ust: "İnce ayar", ana: "Modeli kendi verinizle yeniden eğitmek", alt: "Pahalı; çoğu ihtiyaç için RAG yeterli" },
        { ust: "Agent", ana: "Araç kullanıp çok adımlı iş yürüten AI", alt: "Denetim ihtiyacı en yüksek kullanım biçimi" },
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
      not: "Kaynak: 4D AI Fluency çerçevesi (Delegation · Description · Discernment · Diligence). Bu tablo eğitimin omurgası: ikinci oturumun her bloğu bu dört aşamadan birine denk geliyor. Eşleme şöyle: delegasyon → olay blokları (hangi olayda AI açık, hangisinde kapalı), tarif → bu oturumun beşinci bloğu (istem yazımı), muhakeme → AI çıktısını değerlendirme, sahiplenme → güvenlik bloğu ve ekip çalışma anlaşması. Bunu şimdi söyle, ikinci oturumda hatırlat.",
    },
    {
      id: "s1-olaylar",
      blok: "AI temelleri ve sınırları",
      tip: "tablo",
      baslik: "Peki bunlar Scrum'da nereye değiyor",
      sutunlar: ["Olay", "AI ne yapabilir", "Nerede kullanılır"],
      satirlar: [
        ["Product Backlog Refinement", "Büyük iş öğesini böler, kabul kriteri taslağı çıkarır", "Jira / ADO — iş öğesi açıklaması"],
        ["Sprint Planning", "Risk ve bağımlılık listesi çıkarır, sorulacak soruları üretir", "Sprint hedefi notu"],
        ["Daily Scrum", "Açık engelleri özetler, tekrarlayanı işaretler", "Pano yorumları"],
        ["Sprint Review", "Demo notu ve paydaş özeti yazar", "Sürüm notları"],
        ["Sprint Retrospective", "Not yığınını temaya indirger", "Retrospektif panosu"],
      ],
      not: "Bu tablo bilerek sınırlardan SONRA geliyor: katılımcı artık her satırı \"ama halüsinasyon görebilir, ama bağlamı bilmiyor\" filtresiyle okuyor. Bir cümleyle söyle: hepsi taslak üretimi, hiçbiri karar. İki satırı işaretle — Sprint Planning ve Daily Scrum; ikinci oturumun tamamı o ikisi. Üç dakikada bitir.",
    },
    {
      id: "s1-araclar",
      blok: "AI temelleri ve sınırları",
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
          "Araçları tanımlamak ve yapılandırmak; agent'ların ürettiği işi gözden geçirip yönetmek.",
          "Kod: GitHub Copilot · Cursor — Arayüz: Figma AI · v0.dev — Test: Testim · Mabl — Dağıtım: Harness · CircleCI",
        ],
      ],
      not: "Kaynak: Scrum.org, \"Setup an AI-Powered Scrum Team (A Quick-Start Guide)\". ÖNEMLİ: bu liste örnek, tavsiye değil — kurumun onaylı araç listesi neyse o geçerli. Bu cümleyi mutlaka söyle, ikinci oturumdaki kuralla çelişmesin. Araç adlarını tek tek okuma; \"her satırda birkaç örnek var\" deyip geç.",
    },
    {
      id: "s1-quiz-temeller",
      blok: "AI temelleri ve sınırları",
      tip: "quiz",
      baslik: "Bilgi kontrolü",
      giris: "On soru, tek tek geliyor. Buraya kadar konuştuğumuz her şey içinde. Şıkka tıkladığınız an kaydediliyor — değiştirilemiyor. Puanınız oturum sonundaki sıralamaya giriyor.",
      sorular: [
        {
          soru: "Agile Manifesto'nun ilk değeri neyi neyin önüne koyar?",
          secenekler: [
            "Süreçleri ve araçları, bireylerin önüne",
            "Bireyleri ve etkileşimleri, süreç ve araçların önüne",
            "Dokümantasyonu, çalışan yazılımın önüne",
            "Planı takip etmeyi, değişime yanıt vermenin önüne",
          ],
        },
        {
          soru: "Scrum'ın dayandığı ampirizm hangi üç ayağa oturur?",
          secenekler: [
            "Planlama, uygulama, raporlama",
            "Şeffaflık, gözden geçirme, uyarlama",
            "Hız, kalite, maliyet",
            "Analiz, tasarım, test",
          ],
        },
        {
          soru: "Sprint Backlog'un sahibi kimdir?",
          secenekler: [
            "Product Owner",
            "Scrum Master",
            "Geliştiriciler",
            "Paydaşlar",
          ],
        },
        {
          soru: "Gartner'ın öngörüsüne göre 2029'da kuruluşların yüzde kaçı küçük yazılım ekiplerine geçmiş olacak?",
          secenekler: ["%15", "%30", "%60", "%90"],
        },
        {
          soru: "AI katmanlarında üretken AI nerede durur?",
          secenekler: [
            "Makine öğrenmesinin tamamen dışında, ayrı bir alanda",
            "Derin öğrenmenin içinde ve agentic AI'ı kapsayan katmanda",
            "Makine öğrenmesinden önce gelen katmanda",
            "Agentic AI'ın dışında, onunla ilgisiz bir katmanda",
          ],
        },
        {
          soru: "\"Bağlam penceresi\" ne demektir?",
          secenekler: [
            "Modelin aynı anda görebildiği toplam metin",
            "Modelin eğitildiği veri miktarı",
            "Yanıtın en fazla kaç kelime olabileceği",
            "Modelin internete bağlı kaldığı süre",
          ],
        },
        {
          soru: "Bir dil modeli neden \"halüsinasyon\" görür?",
          secenekler: [
            "Eğitim verisinde o bilgi bulunmadığı için",
            "Amacı doğruluk değil, en olası devamı üretmek olduğu için",
            "Soru yeterince açık sorulmadığı için",
            "İnternete bağlı olmadığı için",
          ],
        },
        {
          soru: "Aşağıdakilerden hangisi modelin GÜVENİLİR olduğu iştir?",
          secenekler: [
            "Geçen çeyreğin satış rakamlarını hatırlamak",
            "Dağınık toplantı notunu yapılandırılmış özete çevirmek",
            "Sprint hedefini taahhüt etmek",
            "Bir işin \"bitti\" olduğunu onaylamak",
          ],
        },
        {
          soru: "Hype Cycle'ın dikey ekseni neyi ölçer?",
          secenekler: [
            "Teknolojinin yeteneğini",
            "Beklentiyi ve ilgiyi",
            "Benimseme oranını",
            "Yatırım miktarını",
          ],
        },
        {
          soru: "Dört aşamalı yetkinlik çerçevesinde \"muhakeme\" hangi soruya karşılık gelir?",
          secenekler: [
            "Bu iş gerçekten devredilebilir mi?",
            "Model bu işi yapmak için neyi bilmiyor?",
            "Bu çıktı neyi kaçırmış olabilir?",
            "Bu çıktıyı imzalayabilir miyim?",
          ],
        },
      ],
      not: "Panelden \"Başlat\", sonra her soruda: 20-30 saniye ver, \"Cevaplamayı kapat\"a bas, dağılıma bak, bir cümleyle doğruyu söyle, \"Sonraki soru\". On soru ~7 dakika — hızlı git, tartışma açma. DAĞILIM YALNIZCA SENİN EKRANINDA: çoğunluğu gören katılımcı ona uyar, bilgi kontrolü ankete döner. Panelde bütün sorular listeleniyor, aktif olan vurgulu — geriye bakıp \"burada takıldınız\" diyebilirsin. En çok yanlış gelen soruyu quiz bittikten sonra tekrar anlat; genellikle 5, 9 ve 10 zorlanılan sorular. Doğru cevaplar sunucuda, `src/icerik/cevaplar.ts` — katılımcının tarayıcısına inmiyor.",
    },

    /* ---- 00:41 · Etkili istem yazımı ---- */

    {
      id: "b-istem",
      blok: "Etkili istem yazımı",
      tip: "bolum",
      numara: "05",
      baslik: "Etkili istem yazımı",
      ozet: "İstem bir cümle değil, kurduğunuz bağlam.",
      not: "Ayraç. Beş saniye dur, blok adını söyle, geç. Katılımcı nerede olduğunu bilsin diye var.",
    },
    {
      id: "s1-istem-giris",
      blok: "Etkili istem yazımı",
      tip: "vurgu",
      metin: "Aynı iş öğesi, iki farklı istem. Fark modelde değil, istemde.",
      kaynak: "Yetkinliğin tarif aşaması",
      not: "Bu cümle bloğun bütün öğretisi. Slaytı geçmeden önce bir kez daha söyle. Dört aşamadan tarif aşamasındayız — hatırlat.",
    },
    {
      id: "s1-baglam-nedir",
      blok: "Etkili istem yazımı",
      tip: "kartlar",
      baslik: "Bağlam mühendisliği",
      giris:
        "Alanın dili değişti: istem mühendisliğinden bağlam mühendisliğine. Fark şu — istem mühendisliği tek bir metni mükemmelleştirmeye çalışır; bağlam mühendisliği modelin yanıt üretmeden ÖNCE gördüğü her şeyi tasarlar. \"Bağlam\" dediğimiz şey aşağıdaki yedi parçanın toplamı.",
      kartlar: [
        {
          ust: "SİSTEM TALİMATI",
          ana: "Modelin nasıl davranacağını baştan tanımlayan kurallar",
          alt: "Rol, ton, uyulacak kısıtlar, örnekler. Sohbetin tamamı boyunca geçerli.",
        },
        {
          ust: "KULLANICI İSTEMİ",
          ana: "O anki soru veya görev",
          alt: "Çoğu kişinin \"istem\" derken kastettiği tek parça. Yedide biri.",
        },
        {
          ust: "KISA VADELİ HAFIZA",
          ana: "Konuşmanın buraya kadarki geçmişi",
          alt: "Aynı sohbetteki önceki mesajlar. Yeni sohbet açtığınızda sıfırlanır.",
        },
        {
          ust: "UZUN VADELİ HAFIZA",
          ana: "Önceki oturumlardan kalıcı bilgi",
          alt: "Öğrenilmiş tercihler, geçmiş proje özetleri. Araç destekliyorsa.",
        },
        {
          ust: "GETİRİLEN BİLGİ · RAG",
          ana: "Güvenilir kaynaktan çekilmiş güncel belge",
          alt: "Kurumsal dokümanla çalışmanın doğru yolu. Modelin ezberi değil, sizin belgeniz.",
        },
        {
          ust: "ARAÇLAR",
          ana: "Modelin çağırabileceği işlevler",
          alt: "Pano sorgusu, takvim, arama. Agent'ı sohbet botundan ayıran şey bu.",
        },
        {
          ust: "ÇIKTI BİÇİMİ",
          ana: "Yanıtın hangi yapıda döneceği",
          alt: "Given/When/Then, tablo, JSON. Biçimi söylemezseniz model kendi seçer.",
        },
      ],
      kaynak:
        "Kaynak: Philipp Schmid, \"The New Skill in AI is Not Prompting, It's Context Engineering\", 30 Haziran 2025.",
      not: "Bu slaydın işi kavramı yerleştirmek. Tanımı oku: bağlam mühendisliği, modele görevi çözebilmesi için gereken doğru bilgiyi ve araçları doğru biçimde ve doğru zamanda veren sistemleri tasarlama disiplini (Tobi Lütke'nin tanımı: \"görevin çözülebilir olması için gereken bütün bağlamı sağlama sanatı\"). Kaynaktaki can alıcı cümle: agent hatalarının çoğu artık MODEL hatası değil, BAĞLAM hatası. Yedi kartı tek tek okuma — ikinci kartta dur ve sor: çoğunuz \"istem\" derken sadece bunu kastediyorsunuz, değil mi? Yedide biri. Beşinci ve altıncı kart ikinci oturumdaki araç tablolarına bağlanıyor, oraya köprü kur. Sonraki slayt bunun pratik hâli.",
    },
    {
      id: "s1-prompt-kalibi",
      blok: "Etkili istem yazımı",
      tip: "madde",
      baslik: "İstem kalıbı — oturumdan çıkan kart",
      giris: "Önceki slayttaki yedi parçanın çoğunu araç yönetiyor. Sizin elinizde bu beşi var — ve eksik olan her parça, çıktıda bir eksiklik olarak geri dönüyor.",
      maddeler: [
        { ana: "Rol", alt: "\"Deneyimli bir Product Owner gibi davran.\"" },
        {
          ana: "Bağlam",
          alt: "Ekip, ürün, kullanıcı, kısıt. En uzun parça bu olmalı; çoğu kişi burayı atlıyor. İki incelik: ham veri yığını yerine düzenli özet verin — nasıl sunduğunuz ne sunduğunuz kadar etkili. Ve her şeyi baştan yüklemeyin; kalabalık bağlam sinyali boğar.",
        },
        { ana: "Format", alt: "\"Given/When/Then biçiminde, en fazla beş madde.\"" },
        { ana: "Sınır", alt: "\"Teknik çözüm önerme, sadece davranışı tarif et.\"" },
        { ana: "Dürüstlük çağrısı", alt: "\"Varsayım yaptığın yeri işaretle.\" En çok atlanan ve en çok işe yarayan madde." },
      ],
      not: "Bu kartı katılımcılar oturumdan sonra kullanacak ve atölyede puanlanan liste tam olarak bu beşi — söyle. Beş parçayı tek tek oku; ikinci maddede dur, en uzun parçanın orası olması gerektiğini vurgula ve önceki slayttaki bağlam kartlarına bağla. Dördüncü maddede kurumsal doküman örneği ver: modele belgeyi GETİRTİN, ezberinden yanıtlamasını istemeyin.",
    },
    {
      id: "s1-istem-cevir",
      blok: "Etkili istem yazımı",
      tip: "cevir",
      baslik: "Aynı iş, aynı model, iki istem",
      giris: "Soldaki kalıbı bu iş öğesine uygulayınca ne oluyor? Karta tıklayın.",
      on: {
        etiket: "Kötü istem",
        metin: "Bu iş için kabul kriteri yaz.",
      },
      arka: {
        etiket: "Etkili istem",
        metin: `Deneyimli bir Product Owner gibi davran.

EKİP: 6 kişilik ödeme ekibi.
ÜRÜN: kurumsal mobil bankacılık uygulaması.
KULLANICI: bireysel müşteri, çoğu 45 yaş üstü.
KISIT: SMS altyapısı üçüncü partide, gecikmeli.

İŞ ÖĞESİ: "Kullanıcı şifresini sıfırlayabilsin."

Given/When/Then biçiminde, en fazla beş madde yaz.
Teknik çözüm önerme, sadece davranışı tarif et.
Varsayım yaptığın yeri [VARSAYIM] diye işaretle.`,
      },
      ipucu: "Karta tıklayın. Tekrar tıklarsanız geri döner.",
      not: "Slaydı açar açmaz tıklama, önce kısa istemi okut ve sor: bu istemle gelen çıktıyı ekibe gösterir miydiniz? Sonra tıkla. Çözülme biterken şunu söyle: uzun olduğu için iyi değil — beş parçası olduğu için iyi. Uzun kısım BAĞLAM, yani modelin bilmediği şey; onu yazan kişi sensin. Katılımcılar kendi cihazlarında da çevirebilir, çevirmelerini iste. Önceki slayttaki beş parçayı bu metnin üzerinde tek tek göster.",
    },
    {
      id: "s1-atolye-istem",
      blok: "Etkili istem yazımı",
      tip: "atolye",
      baslik: "Şimdi siz yazın",
      giris: "Beş parçalı kalıbı gördünüz, uygulanmış hâlini de gördünüz. Sıra sizde.",
      gorev:
        "İş öğesi: \"Kullanıcı şifresini sıfırlayabilsin.\" Bu iş öğesi için kabul kriteri ürettirecek bir istem yazın. Rol, bağlam, format, sınır ve dürüstlük çağrısını kendi cümlelerinizle kurun.",
      parcalar: ["Rol", "Bağlam", "Format", "Sınır", "Dürüstlük"],
      yerTutucu: "Deneyimli bir Product Owner gibi davran…",
      ipucu:
        "Gerçek müşteri verisi, kişisel veri veya sözleşme metni yazmayın — uydurma bir ekip ve ürün tarif edin. Yazdığınız metin eğitmen ekranında görünecek ve değerlendirilmek üzere bir AI servisine gönderilebilir.",
      not: "Panelden \"Gönderimi aç\" deyip süreyi söyle: dört dakika. Bu slaytta konuşma, sessiz kal — yazarken anlatılan şey duyulmuyor. Panelde gelen istemler puana göre sıralanıyor; puan KALİTE değil, beş parçadan kaçının bulunduğu. Süre bitince \"Gönderimi kapat\"a bas. Sonra en üstteki üç ile en alttaki üçe bak, ✓ ve ✗ ile işaretle. İlk gönderim geçerli, katılımcı düzeltemiyor — bunu baştan söyle ki kimse beklemesin. UYARI: gerçek veri yazmama cümlesini yüksek sesle tekrarla — bu metinler hem ekranda gösterilecek hem de değerlendirme için dışarıdaki bir AI servisine gidecek. Bunu saklamak yerine ÖRNEK olarak kullan: \"biz de aynı kararı verdik ve size söylüyoruz; blok 10'da bunun neden önemli olduğunu konuşacağız.\" Sorumlu kullanımın canlı örneği bu.",
    },
    {
      id: "s1-atolye-sonuc",
      blok: "Etkili istem yazımı",
      tip: "karsilastirma",
      baslik: "En iyi ve en kötü istem",
      giris:
        "İkisi de aynı iş öğesi için, aynı modele yazıldı. Şimdi ikisini de aynı araca vereceğiz. Bakacağımız soru: iki çıktı arasındaki fark hangi parçadan geliyor?",
      kaynakSlayt: "s1-atolye-istem",
      araclar: ["ChatGPT", "Microsoft Copilot", "Gemini", "Claude"],
      not: "EN KÖTÜ İSTEMİN SAHİBİ EKRANDA GÖRÜNMÜYOR ve adını sen de söyleme — ders odaya, ödül kişiye. En iyiyi yazanın adını oku, kısa bir teşekkür yeter. Sonra iki kopyala düğmesini kullanıp ikisini de kurumun onaylı asistanına art arda yapıştır, çıktıları ekranda göster. Sorulacak soru: iki çıktı arasındaki fark hangi parçadan geliyor? Cevap neredeyse her zaman BAĞLAM. Araç listesi örnek — kurumda onaylı olan hangisiyse onu kullan.",
    },

    /* ---- 00:55 · Özet ve kapanış ---- */

    {
      id: "b-ozet",
      blok: "Özet ve kapanış",
      tip: "bolum",
      numara: "06",
      baslik: "Özet ve kapanış",
      ozet: "Açılıştaki sorunun cevabı, üç madde ve ikinci oturuma köprü.",
      not: "Ayraç. Beş saniye dur, blok adını söyle, geç. Katılımcı nerede olduğunu bilsin diye var.",
    },
    {
      id: "s1-sm-yeni-is",
      blok: "Özet ve kapanış",
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
      id: "s1-siralama",
      blok: "Özet ve kapanış",
      tip: "siralama",
      baslik: "Oturum sıralaması",
      giris: "Bilgi kontrolü ve atölye puanları birlikte. İlk on herkeste görünüyor; listede değilseniz kendi satırınız altta.",
      quizSlayt: "s1-quiz-temeller",
      atolyeSlayt: "s1-atolye-istem",
      not: "Eğlence, ölçme değil — bunu söyleyerek aç. İSTEM puanı kalıp puanı: beş parçadan kaçının bulunduğuna bakıyor, isteminizin iyi olup olmadığına değil. Bunu açıkça söyle, yoksa düşük puan alan kişi kendini yanlış değerlendirilmiş hisseder. İlk üçü oku, bir alkış iste, geç. Uzatma — asıl mesaj sıralama değil, iki oturumun birbirine bağlanması.",
    },
    {
      id: "s1-veri-uyarisi",
      blok: "Özet ve kapanış",
      tip: "vurgu",
      metin: "İki oturum arasında geçerli tek kural: gerçek müşteri verisi, kişisel veri ve sözleşme metni hiçbir AI aracına yapıştırılmaz.",
      kaynak: "Sorumlu kullanım · ayrıntısı ikinci oturumda",
      not: "Otuz saniye, tek cümle, ama atlanmayacak. Sebebi zamanlama: katılımcılar istem yazmayı bugün öğrendi ve iki oturum arasında deneyecekler — güvenlik bloğu ise bir hafta sonra. O boşlukta ellerinde duracak tek kural bu. Söylenecek ek cümle: emin değilseniz yapıştırmayın, ikinci oturumda hangi verinin neden çıkamayacağını tek tek konuşacağız. Kurumun onaylı araç listesi varsa burada bir kez daha hatırlat.",
    },
    {
      id: "s1-kapanis",
      blok: "Özet ve kapanış",
      tip: "vurgu",
      metin: "İkinci oturumda Sprint Planning ve Daily Scrum'a tek tek gireceğiz.",
      kaynak: "İkinci oturum · olaylar, araçlar ve ortak anlaşma",
      not: "Tek cümle, sonra bitir. İkinci oturumun sonunda ekip çalışma anlaşmasını birlikte yazacağımızı söyle. Ön hazırlık istenmediğini açıkça belirt.",
    },

  ],
};
