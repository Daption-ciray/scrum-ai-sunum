import type { Oturum } from "./tipler";

export const oturum1: Oturum = {
  numara: 1,
  ad: "AI Scrum'ın neresinde duruyor",
  slaytlar: [
    /* ---- 00:00 · Bağlan ve ısın ---- */
    {
      id: "s1-kapak",
      blok: "Bağlan ve ısın",
      tip: "kapak",
      ust: "Scrum + AI · İç Eğitim",
      baslik: "AI Scrum'ın neresinde duruyor",
      alt: "Oturum 1 / 2 · 60 dakika",
      meta: "Bu ekran sizin cihazınızda akıyor. İlerletme bende.",
      not: "Herkes girene kadar bu slaytta bekle. Sağ üstteki bağlı sayısını izle.",
    },
    {
      id: "s1-nasil-calisir",
      blok: "Bağlan ve ısın",
      tip: "madde",
      baslik: "Bu oturum nasıl işliyor",
      maddeler: [
        { ana: "Slaytlar sizin ekranınızda", alt: "Ekran paylaşımını beklemiyorsunuz; ben ilerlettikçe sizinki de ilerliyor." },
        { ana: "Quiz aynı yerden", alt: "Ayrı uygulama yok, aynı sekmede kalıyorsunuz." },
        { ana: "Bağlantınız koparsa", alt: "Sayfayı yenileyin, aynı isimle kaldığınız yerden devam edersiniz." },
        { ana: "Soru için elinizi kaldırın", alt: "Ya da toplantı sohbetine yazın; blok sonlarında duruyorum." },
      ],
      not: "2 dakikayı geçme. Amaç teknik sorunları burada bitirmek.",
    },

    /* ---- 00:04 · Nabız yoklaması ---- */
    {
      id: "s1-nabiz",
      blok: "Nabız yoklaması",
      tip: "taslak",
      baslik: "Nabız yoklaması",
      not: "Quiz motoru buraya gelecek. Skorsuz, 3 soru, sonuç canlı grafik.",
      beklenen: [
        "AI, Scrum Master'ın yerini alır mı? (Evet / Hayır / Kısmen)",
        "Haftada kaç kez AI kullanıyorsun? (Hiç / 1-2 / Her gün)",
        "Ekibinizde AI kullanımı için yazılı bir kural var mı? (Var / Yok / Bilmiyorum)",
      ],
    },

    /* ---- 00:08 · Scrum'ı 12 dakikada ---- */
    {
      id: "s1-tez",
      blok: "Scrum'ı 12 dakikada",
      tip: "vurgu",
      metin: "AI Scrum'ın yerine geçmez. Scrum'ın döngüsünü hızlandırır.",
      kaynak: "Bu oturumun tek cümlelik tezi",
      not: "Yavaş oku. Bütün eğitim bu cümlenin etrafında dönüyor.",
    },
    {
      id: "s1-ampirizm",
      blok: "Scrum'ı 12 dakikada",
      tip: "madde",
      baslik: "Scrum ampirizme dayanır",
      giris: "Planı baştan doğru kurmaya değil, gerçekle karşılaşıp düzeltmeye güvenir.",
      maddeler: [
        { ana: "Şeffaflık", alt: "İş görünür olmalı. Görünmeyen iş gözden geçirilemez." },
        { ana: "Gözden geçirme", alt: "Düzenli aralıklarla gerçek çıktıya bakılır, plana değil." },
        { ana: "Uyarlama", alt: "Bakılan şey yanlışsa yön değişir. Sprint bunun için kısa." },
      ],
      not: "AI üçünü de hızlandırabilir ama hiçbirinin yerine geçemez — sonraki slaytların zemini bu.",
    },
    {
      id: "s1-uc-bes-uc",
      blok: "Scrum'ı 12 dakikada",
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
      not: "Hızlı geç. Bilenler için hatırlatma, bilmeyenler için harita. Detay 00:39'da.",
    },

    /* ---- 00:20 · AI aslında ne ---- */
    {
      id: "s1-katmanlar",
      blok: "AI aslında ne",
      tip: "katman",
      baslik: "İç içe geçen dört halka",
      giris: "Günlük konuşmada hepsine \"AI\" diyoruz. Aslında biri diğerinin içinde.",
      katmanlar: [
        { ad: "Makine öğrenmesi", aciklama: "Veriden örüntü çıkarır. Kural yazmazsınız, örnek verirsiniz." },
        { ad: "Derin öğrenme", aciklama: "Çok katmanlı sinir ağları. Görüntü, ses ve dilde sıçramayı bu yaptı." },
        { ad: "Üretken AI", aciklama: "Yeni içerik üretir: metin, kod, görsel. ChatGPT ve Claude burada." },
        { ad: "Ajanlı AI", aciklama: "Üretmekle kalmaz, araç kullanır ve adım adım iş yürütür." },
      ],
      not: "Jira'daki AI özellikleri çoğunlukla üçüncü halkada. Dördüncüsü yeni ve daha az öngörülebilir.",
    },
    {
      id: "s1-llm-yapar",
      blok: "AI aslında ne",
      tip: "madde",
      baslik: "Bir dil modeli ne yapar",
      maddeler: [
        { ana: "Dönüştürür", alt: "Dağınık notu yapılandırılmış metne çevirir. En güvenilir olduğu iş bu." },
        { ana: "Özetler", alt: "Uzun girdiden ana hatları çıkarır." },
        { ana: "Taslak üretir", alt: "Boş sayfayı doldurur. Taslak demek, bitmiş demek değil." },
        { ana: "Alternatif çoğaltır", alt: "\"Beş farklı kabul kriteri yaz\" — insanın atladığı ihtimalleri açar." },
      ],
    },
    {
      id: "s1-llm-sinir",
      blok: "AI aslında ne",
      tip: "madde",
      baslik: "Üç sınır — Perşembe'nin tamamı bunların üstüne kurulu",
      maddeler: [
        { ana: "Bilmediğini bilmez", alt: "Emin olmadığında da aynı özgüvenle yazar. Uydurmanın adı halüsinasyon." },
        { ana: "Sınırsız bağlam tutmaz", alt: "Ona ne verirseniz onu görür. Sprint'inizin geçmişini bilmez." },
        { ana: "Sizin verinizi bilmez", alt: "Müşterinizi, sözleşmenizi, ekip anlaşmalarınızı bilmez. Söylemezseniz." },
      ],
      not: "Bu üç maddeyi Perşembe atölyesinde tek tek geri çağıracağım. Burada tohumu at.",
    },

    /* ---- 00:34 · İlk yarış ---- */
    {
      id: "s1-quiz-1",
      blok: "İlk yarış",
      tip: "taslak",
      baslik: "İlk yarış",
      not: "Skorlu quiz, 4 soru, soru başına 20 saniye, ardından liderlik tablosu.",
      beklenen: [
        "Ampirizmin üç ayağı hangileri?",
        "Halüsinasyon nedir?",
        "Sprint Retrospective ne zaman yapılır?",
        "Üretken AI ile ajanlı AI farkı nedir?",
      ],
    },

    /* ---- 00:39 · Beş olayda AI ---- */
    {
      id: "s1-olaylar",
      blok: "Beş olayda AI",
      tip: "tablo",
      baslik: "AI beş olayın neresine dokunuyor",
      sutunlar: ["Olay", "AI ne yapabilir", "Nerede"],
      satirlar: [
        ["Refinement", "Büyük story'yi böler, kabul kriteri taslağı çıkarır", "Jira / ADO — iş öğesi açıklaması"],
        ["Sprint Planning", "Risk ve bağımlılık listesi çıkarır, soru üretir", "Sprint hedefi notu"],
        ["Daily Scrum", "Açık engelleri özetler, tekrarlayanı işaretler", "Pano yorumları"],
        ["Sprint Review", "Demo notu ve paydaş özeti yazar", "Sürüm notları"],
        ["Retrospective", "Not yığınını temaya indirger", "Retro panosu"],
      ],
      not: "Her satırda bir cümle. Sekiz dakikada bitir, kalanı sonraki iki slayta bırak.",
    },
    {
      id: "s1-olaylar-sinir",
      blok: "Beş olayda AI",
      tip: "ikili",
      baslik: "Aynı tabloya bir de tersinden bakalım",
      sol: {
        baslik: "AI'a devredilebilir",
        etiket: "Taslak işi",
        ton: "olumlu",
        maddeler: [
          "Metni biçimlendirmek ve yeniden yazmak",
          "Uzun girdiden özet çıkarmak",
          "Kontrol listesi ve soru üretmek",
          "Aynı şeyi beş farklı şekilde denemek",
        ],
      },
      sag: {
        baslik: "Ekipte kalması gereken",
        etiket: "Karar işi",
        ton: "olumsuz",
        maddeler: [
          "Neyin değerli olduğuna karar vermek",
          "Sprint hedefini taahhüt etmek",
          "Bir şeyin \"bitti\" olduğunu söylemek",
          "Ekip içi gerilimi konuşmak",
        ],
      },
      not: "Sağ sütun eğitimin ahlaki merkezi. Acele etme.",
    },

    /* ---- 00:54 · Canlı demo ---- */
    {
      id: "s1-demo",
      blok: "Canlı demo",
      tip: "taslak",
      baslik: "Canlı demo — story'den kabul kriterine",
      not: "Ekran paylaşımını burada aç. Hazır story'yi yapıştır, 60 saniyede kabul kriteri çıksın.",
      beklenen: [
        "Hazır user story metni (ben hazırlayacağım)",
        "Çıktıdaki en az iki hata önceden işaretli olsun",
        "Kapanış sorusu: \"bunun neresi yanlış?\"",
      ],
    },
    {
      id: "s1-kapanis",
      blok: "Canlı demo",
      tip: "vurgu",
      metin: "Perşembe bunu siz yapacaksınız.",
      kaynak: "Oturum 2 · elini kirletme oturumu",
      not: "Tek cümle, sonra bitir. Ödev yok — bunu açıkça söyle.",
    },
  ],
};
