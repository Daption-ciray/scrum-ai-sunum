import type { Oturum } from "./tipler";

export const oturum2: Oturum = {
  numara: 2,
  ad: "Elini kirletme oturumu",
  slaytlar: [
    /* ---- 00:00 · Salı'dan ne kaldı ---- */
    {
      id: "s2-kapak",
      blok: "Salı'dan ne kaldı",
      tip: "kapak",
      ust: "Scrum + AI · İç Eğitim",
      baslik: "Elini kirletme oturumu",
      alt: "Oturum 2 / 2 · 60 dakika",
      meta: "Bugün ben az konuşuyorum.",
      not: "Geç kalanlar için 1 dakika bekle, sonra doğrudan quiz'e geç.",
    },
    {
      id: "s2-hatirlatma-quiz",
      blok: "Salı'dan ne kaldı",
      tip: "taslak",
      baslik: "Salı'dan ne kaldı",
      not: "Skorlu quiz, 4 soru. Hem hatırlatma hem geç kalanlar için tampon.",
      beklenen: [
        "Ampirizmin üç ayağı",
        "LLM'in üç sınırından biri",
        "Hangi işi AI'a devredebiliriz, hangisini devredemeyiz",
        "Beş olaydan birinde AI'ın somut katkısı",
      ],
    },

    /* ---- 00:05 · Atölye 1 ---- */
    {
      id: "s2-atolye1-giris",
      blok: "Atölye 1",
      tip: "vurgu",
      metin: "Aynı story, iki prompt. Fark promptta, modelde değil.",
      kaynak: "Atölye 1 · 18 dakika",
      not: "Bu cümle atölyenin bütün öğretisi. Slaytı geçmeden önce bir kere daha söyle.",
    },
    {
      id: "s2-atolye1",
      blok: "Atölye 1",
      tip: "taslak",
      baslik: "Story'den kabul kriterine",
      not: "Site içi AI buraya gelecek. Katılımcı iki promptu da kendi cihazından çalıştırır.",
      beklenen: [
        "Örnek user story (hazır, sitede yazılı)",
        "Zayıf prompt: \"buna kabul kriteri yaz\"",
        "İyi prompt: rol + bağlam + format + sınır + \"emin olmadığın yeri işaretle\"",
        "İki çıktı yan yana, fark katılımcının gözüyle bulunuyor",
        "Yedek: API çökerse hazır örnek çıktı gösterilir",
      ],
    },
    {
      id: "s2-prompt-kalibi",
      blok: "Atölye 1",
      tip: "madde",
      baslik: "Prompt kalıbı — oturumdan çıkan kart",
      giris: "Beş parça. Eksik olan her parça, çıktıda bir eksiklik olarak geri dönüyor.",
      maddeler: [
        { ana: "Rol", alt: "\"Deneyimli bir Product Owner gibi davran.\"" },
        { ana: "Bağlam", alt: "Ekip, ürün, kullanıcı, kısıt. Model bunları bilmiyor — siz vereceksiniz." },
        { ana: "Format", alt: "\"Given/When/Then biçiminde, en fazla beş madde.\"" },
        { ana: "Sınır", alt: "\"Teknik çözüm önerme, sadece davranışı tarif et.\"" },
        { ana: "Dürüstlük çağrısı", alt: "\"Varsayım yaptığın yeri işaretle.\" En çok atlanan ve en çok işe yarayan madde." },
      ],
    },

    /* ---- 00:23 · Atölye 2 ---- */
    {
      id: "s2-atolye2",
      blok: "Atölye 2",
      tip: "taslak",
      baslik: "Retro notundan temaya",
      not: "20 satırlık dağınık retro notu seti sitede hazır bekliyor.",
      beklenen: [
        "Hazır retro not seti (ben hazırlayacağım, gerçekçi ve dağınık olacak)",
        "AI temaları çıkarır — hızlı ve ikna edici",
        "Asıl soru: AI neyi kaçırdı?",
        "Kaçırdığı şey kasten yerleştirilmiş olacak: sayıca az ama ağır bir sinyal",
      ],
    },
    {
      id: "s2-atolye2-ders",
      blok: "Atölye 2",
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
          "Bir kere söylenmiş ama ağır olan şey",
          "Kimsenin yazmadığı, herkesin bildiği şey",
          "Notun arkasındaki ton ve gerilim",
        ],
      },
      not: "Ampirizmin neden yerini alamadığı tam olarak burada görülüyor. Bu slayt oturumun dönüm noktası.",
    },

    /* ---- 00:35 · Sorumlu kullanım ---- */
    {
      id: "s2-yapistirma",
      blok: "Neyi asla yapıştırmayacaksın",
      tip: "madde",
      baslik: "Neyi asla yapıştırmayacaksın",
      giris: "Az önce iki atölyede ne yapıştırdığınızı bir daha düşünün.",
      maddeler: [
        { ana: "Müşteri verisi", alt: "İsim, e-posta, sipariş, kayıt. Anonimleştirmeden yapıştırılmaz." },
        { ana: "Kişisel veri", alt: "Çalışan bilgisi, performans notu, sağlık bilgisi. KVKK burada başlar." },
        { ana: "Sözleşme ve fiyat", alt: "Gizlilik yükümlülüğü olan her metin." },
        { ana: "İzinsiz kaynak kod", alt: "Şirketin aracı onaylamadıysa, kod da yapıştırılmaz." },
      ],
      not: "Liste kısa ve ezberlenebilir olsun. Uzun politika metni kimsede kalmıyor.",
    },
    {
      id: "s2-insan-onayi",
      blok: "Neyi asla yapıştırmayacaksın",
      tip: "vurgu",
      metin: "AI taslak yazar. Kararı ekip verir.",
      kaynak: "Pazarlık konusu olmayan tek kural",
      not: "Çalışma anlaşmasının ilk maddesi bu olacak. Köprüyü burada kur.",
    },

    /* ---- 00:45 · Çalışma anlaşması ---- */
    {
      id: "s2-anlasma",
      blok: "Ekip AI çalışma anlaşması",
      tip: "taslak",
      baslik: "Ekip AI çalışma anlaşması",
      not: "Canlı oylama. Quiz motorunun ikinci işi. Çıkan metin oturum biter bitmez herkese gider.",
      beklenen: [
        "5 madde, her biri için Katılıyorum / Katılmıyorum / Değiştirelim",
        "Madde 1: AI taslak yazar, kararı ekip verir",
        "Madde 2: Şirket verisi yapıştırılmaz (liste yukarıdaki slayttan)",
        "Madde 3: AI ile üretilen içerik işaretlenir",
        "Madde 4: Onaylı araçlar listesi dışına çıkılmaz",
        "Madde 5: (odadan gelecek)",
      ],
    },

    /* ---- 00:52 · Final ---- */
    {
      id: "s2-final-quiz",
      blok: "Final",
      tip: "taslak",
      baslik: "Final",
      not: "8 soru, iki oturuma dağılmış. Toplam skor, podyum, kazanan.",
      beklenen: ["Sorular iki oturumdan dengeli dağılsın", "Podyum ekranı", "Ödül kararı bekleniyor"],
    },
    {
      id: "s2-taahhut",
      blok: "Taahhüt",
      tip: "vurgu",
      metin: "Kişi başı bir deney. İki sprint sonra ölçüm.",
      kaynak: "Eğitimin tek çıktısı",
      not: "Herkesten tek cümlelik deney iste. Sohbete yazsınlar, ben toplayayım.",
    },
  ],
};
