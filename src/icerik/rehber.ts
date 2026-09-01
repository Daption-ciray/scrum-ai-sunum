/**
 * Sunucu rehberi — slayt notunun arkasındaki bilgi.
 *
 * BU DOSYA SUNUCUDA KALIR. Hiçbir istemci bileşeninden import etmeyin;
 * yalnızca `src/app/api/panel/route.ts` okuyor ve içerik sunucu anahtarıyla
 * korunan uçtan geliyor.
 *
 * Neden ayrı dosya: slaytların `not` alanı slayt tanımlarıyla birlikte
 * istemci paketine iniyor — görsel olarak yalnızca /sunucu'da görünüyor ama
 * kaynağa bakan katılımcı okuyabiliyor. Bu rehber baştan sunucuda tutuldu ki
 * aynı sorun büyümesin.
 *
 * Alanların işbölümü:
 *   `not` (slaytın kendisinde) → NASIL ANLAT, söylenecek cümle
 *   `bilgi`                    → BİLMEN GEREKEN, arkadaki bilgi
 *   `soru`                     → odadan gelebilecek soru ve cevabı
 *   `uyari`                    → yapılmayacak veya atlanmayacak şey
 */
export type RehberKaydi = {
  bilgi?: string;
  soru?: string;
  uyari?: string;
};

export const REHBER: Record<string, RehberKaydi> = {
  /* ---- Blok 01 · Açılış ve kurulum ---- */
  "s1-kapak": {
    bilgi:
      "Bu bir slayt değil, bekleme odası. 75 kişilik çevrim içi bir eğitimde ilk 3-4 dakika insanların sızmasıyla geçer; erken başlarsan ilk bloğu tekrar anlatmak zorunda kalırsın. Beklenen sayının yaklaşık %80'i bağlanınca başla.",
    soru:
      "\"Oturum kaydedilecek mi?\" → Cevabı ÖNCEDEN kararlaştır ve burada net söyle. Kaydedilecekse insanlar kamerayı ve soru sormayı kısar; kaydedilmeyecekse bunu duymak katılımı açar. Belirsiz bırakmak ikisinin de kötüsü.",
  },
  "s1-nasil-calisir": {
    bilgi:
      "Bu sitenin varlık sebebi bu slaytta. Ekran paylaşımında video akışı 2-5 saniye gecikir ve bunun üç somut bedeli var: (1) quiz adaletsiz olur — 20 saniyelik soruda 3 saniye gecikme %15 kayıp, (2) telefonda paylaşılan ekran dörtte bire düşer, (3) katılımcı ekrandaki istemi seçip kopyalayamaz. Slaytlar herkesin kendi cihazında akınca üçü de çözülür.",
    soru:
      "\"Bağlantım koparsa?\" → Sayfayı yenileyin, aynı adla kaldığınız yerden devam edersiniz. Hiçbir şey kaybolmaz.",
  },
  "s1-hedefler": {
    bilgi:
      "Bu slayt katılımcı için değil, yönetici için. Altı madde de ölçülebilir fiille başlıyor — tarif edebilmek, adlandırabilmek, kullanabilmek. \"Farkında olmak\" gibi ölçülemeyen bir fiil bilerek yok. Son madde duyurunun ilk cümlesinin karşılığı: eğitimin ilan edilmiş amacı ortak bir yaklaşım oluşturmak.",
    soru:
      "\"Bu eğitimden sonra bizden ne bekleniyor?\" → Bugün için hiçbir şey: ödev yok. Perşembe oturumunun sonunda ekip olarak bir çalışma anlaşması yazacağız — beklenti o, ve onu birlikte yazacağız.",
  },
  "s1-kapsam": {
    bilgi:
      "Dört alan Scrum.org Professional Scrum Master — AI Essentials sınavının resmi bilgi alanları. Slaydın tek işi şunu söylemek: bu eğitim birinin kafasından derlediği bir liste değil.",
    soru:
      "\"Bu eğitim sertifika veriyor mu?\" → Hayır, bu farkındalık eğitimi. İçerik o sınavın alanlarıyla hizalı; sertifika isteyen Scrum.org üzerinden ayrıca alabilir.",
  },

  /* ---- Blok 02 · Roller değişiyor ---- */
  "s1-roller": {
    bilgi:
      "Gartner: 2029'a kadar kuruluşların %60'ı küçük yazılım ekiplerine geçecek; bugün %15. Product Manager + Software Engineer → Product Engineer, BA → AI Requirements Analyst gibi birleşmeler oluyor. Şema Gartner'ın sunumundan uyarlandı ama kendi dilimizle yeniden çizildi — Gartner içeriği lisanslı, birebir kopyalanamaz. Scrum Master'ın bağlantısız olması kasıtlı ve doğru: Gartner'ın şemasında da yok.",
    uyari:
      "BURADA CEVAPLAMA. Bütün oturumun gerilimi bu sorunun elli dakika açık kalmasına dayanıyor. Biri \"Scrum Master yok\" derse \"evet, neden acaba?\" deyip geç. Cevap `s1-sm-yeni-is` slaydında.",
    soru:
      "\"AI Scrum Master'ın yerini alacak mı?\" → Hayır, ama işin ağırlık merkezini kaydırıyor. Yazma, özetleme, taslak çıkarma tarafı hızlanıyor; kolaylaştırma, çatışma yönetimi, ekibin gerçekten ne yaşadığını görme tarafı büyüyor. Bu slayttaki kutulardan hiçbirine AI'dan çizgi çıkmıyor — sebebi bu.",
  },
  "s1-alinti-gartner": {
    bilgi:
      "Önceki slayt korkuyu masaya koydu, bu slayt onu kaynakla yatıştırıyor — sıralama önemli. Gartner'ın açık uyarısı var ve yönetici odadaysa değerli: AI'a güvenip junior kadroları kesen kuruluşlar yetenek hattını zayıflatır. Küçük ekip bir maliyet kısma taktiği değil, yeniden yapılandırma.",
    soru:
      "\"Bu tahminler tutar mı, kaynak ne kadar güvenilir?\" → Tahmin olduğunu açıkça söyle. Buradaki iş kehanet doğrulamak değil, odadaki 'AI her şeyi devraldı' hissini bağımsız bir kaynakla yere indirmek. Sayıya değil yöne bak.",
  },

  /* ---- Blok 03 · Scrum çerçevesi ---- */
  "s1-tez": {
    bilgi:
      "Eğitimin temel tezi; bütün deste bu cümlenin etrafında kuruluyor ve ikinci oturumun son sorusu da bu. İki yarısı da gerekli: birincisi korkuyu, ikincisi kayıtsızlığı hedefliyor.",
    soru:
      "\"AI tahmin edebiliyorsa deneyselliğe ne gerek var?\" → Model geçmiş veriden en olası devamı üretiyor; sizin ekibinizin bu sprintte neyle karşılaşacağını bilmiyor. Gözlem ve adaptasyon tam olarak o bilinmeyeni kapatmak için var. AI tahmini iyileştirir, belirsizliği yok etmez.",
  },
  "s1-manifesto": {
    bilgi:
      "Manifesto 2001, 17 kişi, Utah. Dört değerin hepsi \"X, Y'den önce gelir\" biçiminde — sağdakini değersiz saymıyor, soldakinin daha değerli olduğunu söylüyor; bu nüansı atlayan çok olur. Birinci değer bu eğitimin sınırını 2001'de çizmiş: bireyler ve etkileşimler, süreçler ve ARAÇLARDAN önce gelir. AI bir araç. İkinci oturumdaki \"Daily'de AI kapalı\" kararı doğrudan bu cümleden çıkıyor.",
    soru:
      "\"Manifesto 2001'de yazıldı, AI çağında hâlâ geçerli mi?\" → Dört değerin hiçbiri araç hakkında değil, hepsi tercih hakkında. 'Süreç ve araçlardan çok bireyler ve etkileşimler' maddesi AI çağında daha da keskinleşiyor: araç güçlendikçe insan tarafını korumak bilinçli bir karar hâline geliyor.",
  },
  "s1-ampirizm": {
    bilgi:
      "Deneysellik: bilgi deneyimden gelir. Scrum planı baştan doğru kurmaya değil, gerçekle karşılaşıp düzeltmeye güvenir; Sprint'in kısa olmasının tek sebebi bu — yanlış yönde gidildiğinde kaybı sınırlamak. Üç taşıyıcı kolon sıralı ve birbirine bağlı: görünmeyen iş gözlemlenemez, gözlemlenmeyen iş adapte edilemez.",
    soru:
      "\"Bu üçünü AI'a yaptırabilir miyiz?\" → Şeffaflığı ve gözlemi hızlandırabilir: veriyi toplar, özetler, sapmayı gösterir. Adaptasyon kararını veremez — o karar sorumluluk gerektiriyor ve sorumluluk devredilemiyor. Perşembe bunun adı 'sahiplenme' olacak.",
  },
  "s1-uc-bes-uc": {
    bilgi:
      "Harita slaydı. Dikkat: Sprint'in kendisi de bir etkinliktir — diğer dördünü içeren kap. Bunu soran çıkabilir.",
    soru:
      "\"Biz tam Scrum yapmıyoruz, karma çalışıyoruz. Bu bize uyar mı?\" → Uyar. Bugün anlatılan hiçbir şey tam Scrum uygulamayı şart koşmuyor; ikinci oturumdaki iki olay (Sprint Planning ve Daily) sizde başka adla da olsa var. Kılavuzu referans alıyoruz çünkü ortak bir sözlük lazım.",
  },
  "s1-sorumluluklar": {
    bilgi:
      "Ayrımın özü karar yetkisinde: PO neyin yapılacağına, Developers nasıl yapılacağına, Scrum Master sürece karar verir — işin içeriğine değil. Üçüncü satır ikinci oturumdaki çalışma anlaşmasının temeli: \"nasıl\" kararı ekipte olduğu için AI'ın nerede kullanılacağına da ekip karar verir.",
    soru:
      "\"'Nasıl' kararı ekipte diyorsunuz ama tarihi ben savunuyorum.\" → İkisi çelişmiyor: ne ve niye Product Owner'da, nasıl Developers'ta. Yönetici tarafın kaldıracı tahmin dayatmak değil, kapsamı ve önceliği netleştirmek. Perşembe Sprint Planning bloğunda bunun somut hâli var.",
  },

  /* ---- Blok 04 · AI temelleri ve sınırları ---- */
  "s1-katmanlar": {
    bilgi:
      "Katmanlar gerçekten iç içe, yan yana değil. Makine öğrenmesi: kural yazılmaz, örnek verilir (kredi skorlaması, spam filtresi). Derin öğrenme: çok katmanlı sinir ağları, görüntü-ses-dildeki sıçramayı bu yaptı. Üretken AI: yeni içerik üretir. Agentic AI: üretmekle kalmaz, ARAÇ KULLANIR ve adım adım iş yürütür — fark burada.",
    soru:
      "\"Jira'daki AI hangisi?\" → Çoğunlukla üçüncü katman: özet çıkarır, metin üretir. Otomatik iş yürüten bir agent değil.",
  },
  "s1-olgunluk": {
    bilgi:
      "Dikey eksen BEKLENTİYİ ölçüyor, yeteneği değil — bu cümle olmadan eğri sistematik olarak yanlış okunur; yetenek eğri boyunca artmaya devam eder, düşen ilgi. Beş aşama: Tetikleyici (ürün yok, haber var) → Beklenti zirvesi (birkaç başarı, çok daha fazla sessiz başarısızlık) → Hayal kırıklığı çukuru (basın gider, mühendislik başlar) → Aydınlanma yamacı (neyin işe yaradığı netleşir) → Plato (ne alacağınızı önceden bilirsiniz). Dokuz noktanın tamamı zirvede veya öncesinde. Asıl mesaj kalın yazılmış ikisinde: yönetişim ve güvenlik, kontrol etmeleri gereken şeyden bile geride.",
    soru:
      "\"Bu bilimsel mi?\" → Ölçüm değil, ortak bir dil. Konumun kendisi tartışılır; söylediği şey tartışılmaz — bu alanda henüz oturmuş bir pratik yok. (Hype Cycle ampirik olarak doğrulanmış bir model değildir, konumlar analist yargısıdır.)",
  },
  "s1-hype-gercek": {
    bilgi:
      "%70 — McKinsey: bugünkü teknolojiyle çalışan zamanının bu kadarını kapsayan işler TEKNİK OLARAK otomatikleştirilebilir; korkunun kaynağı bu rakam. %0,6 — AYNI raporun 2040'a kadar beklediği YILLIK verimlilik artışı. İkisi de aralığın iyimser ucu. %40+ — Gartner: 2027 sonuna kadar iptal edilecek agentic AI projesi, yukarıdaki yavaşlığın sebebi. \"Teknik olarak mümkün\" ile \"kurumda gerçekleşmiş\" arasında benimseme, süreç değişikliği ve mevzuat duruyor.",
    soru:
      "\"Bunlar farklı birimler.\" → Haklısınız, bilerek. Biri tavanı, diğeri o tavana çıkma hızını ölçüyor; karşılaştırdığım iki sayı değil, aralarındaki mesafe. · \"McKinsey raporu eski.\" → 2023 projeksiyonu, doğru. Ama iddia rakamın kendisi değil; o mesafe kapanmadı.",
  },
  "s1-sozluk": {
    bilgi:
      "Referans slaydı, ezber slaydı değil. RAG ile ince ayar farkı sorulursa: RAG modeli değiştirmez, ona belge verir; ince ayar modeli yeniden eğitir. Çoğu ihtiyaç için RAG yeterli ve çok daha ucuz.",
    soru:
      "\"RAG'i biz nasıl kullanırız?\" → Modele kendi dokümanınızı okutup cevabı ona dayandırması. Pratik faydası: model uydurmak yerine sizin kaynağınızdan konuşuyor. Kurumsal araçlarda çoğunlukla hazır geliyor; kendiniz kurmanız gerekmiyor.",
  },
  "s1-llm-nasil": {
    bilgi:
      "Kaynak MIT Sloan, \"When AI Gets It Wrong\". Üçüncü neden en çok şaşırtan: yalnızca doğru veriyle eğitilse bile model örüntüleri beklenmedik biçimde birleştirip yeni bir yanlış üretebilir. Yani halüsinasyon bir veri hatası değil, mekanizmanın kendisi.",
    soru:
      "\"O zaman bu araca hiç güvenilmez mi?\" → Güvenilir ama doğrulanarak. Halüsinasyon bir arıza değil, tasarımın sonucu — model doğruyu değil, en olası devamı üretiyor. Bu yüzden bir sonraki slayt 'nerede güçlü, nerede zayıf' diye ayırıyor; kural basit: girdi sizdeyse çıktıyı doğrulayabilirsiniz. · \"Devamı değil de cevabı üretmesi gerekmez mi?\" → Kelime bilerek 'devam': model cevap ARAMIYOR, metni sürdürüyor. 'Cevabı üretir' deseydik modelin cevaplamaya çalıştığını ama bazen ıskaladığını söylemiş olurduk; oysa doğruluk hedefi hiç yok. Halüsinasyonun açıklaması tam olarak burada — uydurma bir kaynak adı, gerçek olan kadar 'olası' görünüyor.",
  },
  "s1-llm-yapar": {
    bilgi:
      "Ayrımın tek kuralı sütun başlıklarında: girdi kimde? Sol sütunda girdiyi siz verdiniz, çıktıyı doğrulayabiliyorsunuz. Sağ sütunda girdi modelin ezberinde ve doğrulama imkânınız yok — asıl risk orada.",
    soru:
      "\"Kod yazmak hangi tarafta?\" → İkisinde de: taslak üretmek sol tarafta, üretime gitmesi sağ tarafta. Ayrımı belirleyen şey işin türü değil, çıktının yanlış olduğunda ne kadara mal olduğu.",
  },
  "s1-4d": {
    bilgi:
      "4D AI Fluency çerçevesi (Delegation · Description · Discernment · Diligence), bu destenin omurgası. Dördü sırayla ilerliyor: Delegasyon (bu iş devredilebilir mi) → Tarif (model neyi bilmiyor) → Muhakeme (bu çıktı neyi kaçırdı) → Sahiplenme (bunu imzalayabilir miyim). Eşleme: delegasyon → ikinci oturumun etkinlik blokları, tarif → beşinci blok, muhakeme → çıktı değerlendirme, sahiplenme → güvenlik bloğu ve çalışma anlaşması.",
    soru:
      "\"Bu çerçeveyi kim tanımladı, bizim standardımız mı olacak?\" → Scrum.org'un PSM — AI Essentials içeriğinden geliyor. Bugün tanıtım; perşembe her bloğu bu dörtten birine oturtacağız. Şirket standardı olup olmayacağı ikinci oturumun sonundaki çalışma anlaşmasının konusu.",
  },
  "s1-olaylar": {
    bilgi:
      "Bu tablo bilerek sınırlardan SONRA geliyor: katılımcı artık her satırı \"ama halüsinasyon görebilir, ama bağlamı bilmiyor\" filtresiyle okuyor. Sınırlardan önce gelseydi bir ürün broşürü gibi okunurdu. Beş satırın ortak özelliği: hepsi taslak üretimi, hiçbiri karar.",
    soru:
      "\"Retrospektifi AI'a yaptırabilir miyiz?\" → Hazırlığını evet: veriyi toplar, temaları çıkarır, soru önerir. Kendisini hayır — Retrospektif'in işi güven ve açık konuşma üretmek; o odada makinenin özetlediği değil, insanların söylediği şey işe yarıyor.",
  },
  "s1-araclar": {
    bilgi:
      "Kaynak Scrum.org, \"Setup an AI-Powered Scrum Team\". Liste ÖRNEK, tavsiye değil — kurumun onaylı araç listesi neyse o geçerli.",
    uyari:
      "\"Bunlar örnek, tavsiye değil; kurumda onaylı olan hangisiyse o geçerli\" cümlesini söylemeden geçme. Söylenmezse ikinci oturumdaki güvenlik kuralıyla çelişir.",
    soru:
      "\"Hangisini alacağız, lisansı kim ödüyor?\" → Bu slayt satın alma listesi değil, manzara. Karar bugünün konusu değil; sorunun cevabı gelirse 'şu an kullanabildiklerimizle başlayalım, ihtiyacı ölçelim' de. Ölçmeden alınan lisans rafta kalıyor.",
  },
  "s1-quiz-temeller": {
    bilgi:
      "Sorular birinci oturumun tamamını tarıyor: manifesto · deneysellik · Sprint Backlog sahipliği · üretken AI ne değildir · katmanlar · bağlam penceresi · halüsinasyon nedeni · güvenilir iş · Hype Cycle ekseni · 4D muhakeme. Şıkka tıklamak doğrudan gönderiyor, ilk tıklama geçerli. Süre dolunca soru kendi kendine kilitleniyor. En çok zorlanılan sorular genellikle katmanlar, Hype Cycle ekseni ve 4D muhakeme.",
    soru:
      "\"Yanlış tıkladım, düzeltebilir miyim?\" → Hayır, ilk tıklama geçerli. Bunu BAŞLAMADAN ÖNCE söyle ki kimse şaşırmasın.",
    uyari:
      "Dağılım yalnızca senin ekranında kalmalı. Çoğunluğu gören katılımcı ona uyar, bilgi kontrolü ankete döner.",
  },

  /* ---- Blok 05 · Etkili istem yazımı ---- */
  "s1-istem-giris": {
    bilgi:
      "Bloğun bütün öğretisi bu cümlede. Katılımcıların çoğu \"hangi model daha iyi\" sorusuyla geliyor; asıl değişken orada değil.",
    soru:
      "\"Her seferinde bu kadar uzun mu yazacağız?\" → Hayır. Bir kez yazıp saklıyorsunuz — kalıp aynı, değişen tek şey iş öğesi. Zaten sıradan bir soru için gerekmiyor; bu kalıp çıktısını başkasına göstereceğiniz işler için.",
  },
  "s1-baglam-nedir": {
    bilgi:
      "Tanım: bağlam mühendisliği, modele görevi çözebilmesi için gereken doğru bilgiyi ve araçları doğru biçimde ve doğru zamanda veren sistemleri tasarlama disiplini. Tobi Lütke'nin kısa hâli: \"görevin çözülebilir olması için gereken bütün bağlamı sağlama sanatı\". Kaynaktaki can alıcı cümle: agent hatalarının çoğu artık MODEL hatası değil, BAĞLAM hatası. Kaynak: Philipp Schmid, 30 Haziran 2025.",
    soru:
      "\"Bağlam vermek yerine daha iyi bir model kullansak olmaz mı?\" → Olmaz, çünkü eksik olan şey zekâ değil bilgi. Ekibinizin kaç kişi olduğunu, hangi kısıtla çalıştığınızı hiçbir model bilemez. Daha güçlü model, yanlış varsayımı daha ikna edici anlatır.",
  },
  "s1-prompt-kalibi": {
    bilgi:
      "Yedi parçanın çoğunu araç yönetiyor; katılımcının elinde bu beşi var. Atölyede puanlanan liste tam olarak bu beşi — söylersen atölye adil hissettirir. En çok atlanan iki parça: bağlam (en uzun parça olmalı) ve dürüstlük çağrısı (\"varsayım yaptığın yeri işaretle\" — en çok işe yarayan madde).",
    soru:
      "\"Beş parçanın hepsini her seferinde kullanmak şart mı?\" → Şart değil, ama bağlam ve sınır olmadan çıktı neredeyse hep jenerik çıkıyor. Atölyede bunu kendi isteminizde göreceksiniz. Kalanı zamanla refleks oluyor.",
  },
  "s1-istem-cevir": {
    bilgi:
      "Kartın kırmızı yüzündeki büyük boşluk tesadüf değil: yükseklik uzun yüze sabitlendi ki o boşluk \"modele bu kadar az şey verdin\" desin.",
    soru:
      "\"Aradaki fark sadece uzunluk mu?\" → Hayır — uzunluk sonuç, sebep değil. Fark modelin kendiliğinden bilemeyeceği bilgi: ekip, ürün, kullanıcı, kısıt. Aynı uzunlukta ama boş bir istem aynı jenerik cevabı verir.",
  },
  "s1-atolye-istem": {
    bilgi:
      "Panelde gelen istemler puana göre sıralanıyor; puan KALİTE değil KALIP kontrolü — beş parçadan kaçının bulunduğuna bakıyor. \"AI ile değerlendir\" düğmesi uçlardaki on isteme bakıp puan ve tek cümlelik gerekçe döndürüyor; asıl değer o gerekçe, odada yüksek sesle okunabilir. Anahtar yoksa veya servis çökerse düğme çalışmaz ama atölye durmaz, sıralama kalıp puanıyla devam eder. İlk gönderim geçerli.",
    uyari:
      "Gerçek veri yazılmayacağını yüksek sesle söyle: bu metinler hem ekranda gösterilecek hem de değerlendirme için dışarıdaki bir AI servisine gidecek. Bunu saklama, ÖRNEK olarak kullan — \"biz de aynı kararı verdik ve size söylüyoruz\".",
    soru:
      "\"Yazdıklarımız kaydediliyor mu, kim görecek?\" → Oturum boyunca sunucu ekranında duruyor, sonra siliniyor — kayıtların ömrü 12 saat, sunucu ayrıca elle de sıfırlıyor. Eksik istem örneği anonim gösteriliyor, adı ekranda görünmüyor. Gerçek şirket verisi yazmayın — bu kural bugün sadece uyarı, perşembe bloğun kendisi.",
  },
  "s1-atolye-sonuc": {
    bilgi:
      "Eksik istemi yazanın adı hiçbir zaman katılımcı ekranına inmiyor — sunucu yanıtında böyle bir alan yok. Ad yalnızca senin panelinde. Kırmızı ve yeşil, katılımcının yarım saat önce gördüğü çevir kartıyla aynı çift; ders o eşleşmeden geliyor.",
    uyari:
      "Eksik istemi kimin yazdığını SÖYLEME. Ödül kişiye, ders odaya. Ve \"kötü\" deme, \"eksik\" de — eksik olan istem, kişi değil.",
    soru:
      "\"Benim istemim neden düşük puan aldı?\" → Puan kalite değil kalıp ölçüyor: beş parçadan kaçının bulunduğuna bakıyor. AI değerlendirmesi gerekçe cümlesi de veriyor — asıl bilgi orada. Puan sıralama içindir, yargı için değil.",
  },

  /* ---- Blok 06 · Özet ve kapanış ---- */
  "s1-sm-yeni-is": {
    bilgi:
      "Oturumun düğüm noktası. Elli dakika önce sorulan sorunun cevabı burada: Scrum Master'ın çizgisi yoktu çünkü BİRLEŞMİYOR, YER DEĞİŞTİRİYOR. İlk üç madde Scrum.org'un AI-Powered Scrum Team kılavuzundan; dördüncüsünü bu eğitim ekledi ve en önemlisi o: ekip AI çıktısını yargılamayı öğrenmezse hız kalite değil, daha hızlı hata üretir.",
    uyari:
      "Açılıştaki soruyu açıkça geri çağır: \"Elli dakika önce sormuştum — bu tabloda eksik olan neydi?\" Cevabı ondan sonra ver. Acele etme.",
    soru:
      "\"İşin bir kısmı otomatikleşiyorsa kadro azalacak mı?\" → Bu eğitimin konusu değil ve bugün böyle bir karar yok. Slaytta görülen şey işin yer değiştirmesi: hazırlık ve raporlama küçülüyor, kolaylaştırma ve karar kalitesi büyüyor. Soruyu ciddiye al, geçiştirme.",
  },
  "s1-siralama": {
    bilgi:
      "Bilgi puanı doğru cevap oranından, İstem puanı kalıp puanından geliyor. İstem bileşeni kaliteyi değil, beş parçadan kaçının bulunduğunu ölçüyor. Tam liste bilerek yayınlanmıyor: sondan birinci olmak kimsenin ekranında yazmasın.",
    uyari:
      "İstem puanının KALIP puanı olduğunu açıkça söyle. Söylenmezse düşük puan alan kişi kendini yanlış değerlendirilmiş hisseder.",
    soru:
      "\"Bu puan performans değerlendirmemize yansıyacak mı?\" → Hayır. Oyun; ölçme değil. Bunu sıralamayı açmadan ÖNCE söyle — sonra söylersen inandırıcılığı kalmaz. İstem tarafı zaten kalıp puanı, kalite puanı değil.",
  },
  "s1-veri-uyarisi": {
    bilgi:
      "Zamanlama meselesi: katılımcılar istem yazmayı bugün öğrendi ve iki oturum arasında deneyecekler; güvenlik bloğu ise bir hafta sonra. O boşlukta ellerinde duracak tek kural bu.",
    soru:
      "\"Peki şirket verisini hangi araca girebiliriz?\" → Bugün bu sorunun cevabını verme, sözünü ver: perşembe oturumu tam olarak bunun üstüne kurulu — veri güvenliği, maskeleme ve sorumlu kullanım. Bugünkü kural tek cümle: emin değilsen yapıştırma.",
  },
};
