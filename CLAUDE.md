# Scrum + AI İç Eğitimi — Sunum Sitesi

Şirket içi eğitim için canlı sunum sitesi. Sunucu slaytı ilerlettiğinde
katılımcıların ekranı takip eder. **Türkçe proje** — kod, yorum, değişken
adları ve arayüz Türkçe; İngilizceye çevirmeyin.

## Bağlam

| | |
|---|---|
| Eğitim | Scrum + AI farkındalık eğitimi, şirket içi |
| Format | **Tamamen online** (Teams/Zoom), 2 oturum × 60 dk |
| Tarihler | Salı 1 Eylül + Perşembe 3 Eylül 2026 — **kullanıcı henüz teyit etmedi** |
| Kitle | ~75 kişi, karma: Scrum'a yeni olanlar + ürün/yazılım ekibi + yöneticiler |
| Cihaz | Herkes kendi cihazında — laptop/telefon karışık, önceden bilinmiyor |
| Ödev | Yok (kullanıcı kararı). Perşembe atölyesi hazır materyalle çalışır. |

Akış: **13 blok, 70 slayt** — 6'sı birinci oturum (37 slayt), 7'si ikinci (33). Dakika dakika
akış `src/icerik/` içinde slayt olarak duruyor; blok süreleri
`src/icerik/bloklar.ts` (iki oturum da tam 60 dk'ya toplanıyor).

## Eğitim duyurusu — desteyi bağlayan söz

Katılımcıya gönderilen duyurunun içerik kısmı desteyi belirliyor. **Blok sırası
bu cümleleri birebir takip ediyor; içerik değişikliği yapmadan önce buraya
bakın.**

> Sunumun içeriği, yapay zeka araçlarının Scrum uygulamalarında bilinçli ve
> tutarlı şekilde kullanılmasına yönelik **ortak bir yaklaşım oluşturmayı**
> amaçlamaktadır. 1. oturumda öncelikle **Agile yaklaşımı ve Scrum'ın temel
> ilkeleri** ele alınacak, ardından **üretken yapay zekanın çalışma mantığı ve
> sınırlarına** değinilecektir. 2. **Daily Scrum ve Sprint Planning** süreçleri
> **öncesi, sırası ve sonrası** olarak üç aşamada ele alınacak. Bu kapsamda
> yapay zekanın katkı sağlayabileceği alanlar ile **ekip içi iletişimin ön
> planda tutulması gereken noktalar** değerlendirilecektir. Oturum **veri
> güvenliği ve sorumlu kullanım** ilkeleriyle tamamlanacaktır.

Karşılıkları: ortak yaklaşım → `Ekip çalışma anlaşması` bloğu · Agile/Scrum
ilkeleri → `Scrum çerçevesi` · üretken AI mantığı ve sınırları →
`AI temelleri ve sınırları` + `Etkili istem yazımı` · iki olayın üç aşaması →
`Sprint Planning'de AI` + `Daily Scrum'da AI` · iletişimin ön planda kaldığı
noktalar → `s2-daily-akis` orta aşaması ve `s2-daily-iletisim` terazisi ·
güvenlik ve sorumlu kullanım → `Sorumlu kullanım: güvenlik ve etik`.

**Scrum terimleri resmi Türkçe kılavuzdan.** Kaynak: Scrum Kılavuzu Kasım 2020,
Agile Turkey çevirisi (scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-Turkish.pdf).
Kendi çevirinizi uydurmayın, oradan bakın:

| İngilizce | Kullanılan | Kullanılmayan |
|---|---|---|
| Artifacts | **eser** | artefakt |
| Events | **etkinlik** | olay |
| Empiricism | **deneysellik** | ampirizm |
| pillars | **taşıyıcı kolonlar** | ayaklar, sütunlar |
| Inspection | **gözlem** | gözden geçirme |
| Adaptation | **adaptasyon** | uyarlama |
| Accountabilities | **sorumluluk** | rol |
| Definition of Done | **Bitti Tanımı** | DoD (tek başına) |
| Product Goal | **Ürün Hedefi** | ürün amacı |
| Sprint Goal | **Sprint Hedefi** | sprint hedefi (küçük) |
| Increment | **Increment** | artış |

Rol, etkinlik ve eser ADLARI İngilizce kalıyor — kılavuz da öyle yapıyor:
Product Owner, Scrum Master, Developers, Sprint Planning, Daily Scrum,
Sprint Review, Sprint Retrospective, Product Backlog, Sprint Backlog,
Increment. Türkçeleşenler: Ürün Hedefi, Sprint Hedefi, Bitti Tanımı, Taahhüt.

Üç istisna, hepsi bilinçli:
1. **Sıradan Türkçe.** "gözden geçirmek" günlük dilde de var ("çıktıyı gözden
   geçiren kim") — orada değiştirmeyin; yalnızca Scrum kolonu kastedildiğinde
   "gözlem". Aynı şekilde "güncel olay" bir Scrum etkinliği değil.
2. **Makale adları çevrilmez.** `AI Impacts On Your Definition of Done` bir
   yayın başlığı; kaynakçada İngilizce kalır.
3. **Slayt kimlikleri değişmez.** `s1-ampirizm`, `s1-olaylar` gibi id'ler
   kararlı kimlik; içerik terimi değişse de id sabit kalıyor.

Kılavuzda GEÇMEYEN terimler serbest: "kabul kriteri", "iş öğesi" (Jira/ADO
dili), "engel". Bunlar için kılavuza bakmaya gerek yok.

**Dil kurumsal eğitim dili.** Blok adları ("Bağlan ve ısın", "İlk yarış" gibi
gündelik adlar) kurumsal eğitim terminolojisine çevrildi: Açılış ve kurulum,
Ön değerlendirme, Bilgi kontrolü, Kapanış değerlendirmesi, Eylem planı.
Katılımcıya giden metin resmî; sunucu notları pratik ve doğrudan kalıyor.
Tarih adı (Salı/Perşembe) hiçbir yerde geçmiyor — tarihler teyitli değil,
"birinci/ikinci oturum" kullanılıyor.

**İçerik Scrum.org PSM — AI Essentials sınavına dayanıyor.** Dört bilgi alanı
(AI for Scrum Masters · Effective AI Prompting · AI Security and Ethics ·
AI Theory and Primer) bloklara birebir eşleniyor; eşleme tablosu `s1-kapsam`
slaytında. Eğitimin omurgası oradan gelen **4D AI Fluency** çerçevesi
(delegasyon · tarif · muhakeme · sahiplenme, slayt `s1-4d`): ikinci oturumun
her bloğu bu dört aşamadan birine denk geliyor. Diğer kaynaklı slaytlar —
`s1-llm-nasil` (MIT Sloan, halüsinasyon nedenleri), `s1-asamalar` (Scrum.org,
olay öncesi/sırasında/sonrası), `s2-baglam` (bağlam mühendisliği),
`s2-dod` (AI ile değişen Definition of Done), `s2-dogrulama` (MIT Sloan,
dört savunma), `s2-onay` (AB kılavuzu, insan denetiminin üç biçimi).
Kaynak sayfa: scrum.org/assessments/preparing-professional-scrum-master-ai-essentials

## Durum

**Çalışıyor**
- Senkron slayt motoru (sunucu ilerletir, herkes takip eder)
- Sunucu paneli: canlı önizleme, sunucu notları, blok atlama, perde, klavye,
  katılımcı listesi ve tek tek oturum kapatma
- Giriş sayfasından sunucu girişi; galeride katılımcı için çıkış düğmesi
- Galeri: 13 blok 3B kart yığını (GSAP), ikinci oturum kilitli
- **70 slayt, 13 blok** — kurumsal eğitim dilinde, kaynakları slaytın içinde
- 20 slayt tipi; `bolum` ayraçları, `sayi`, `adim`, `terazi`, `kartlar`,
  `alinti`, `roller`, `olgunluk`, `cevir`, `atolye`, `karsilastirma`, `quiz`, `siralama` dahil
- Upstash Redis bağlı, 75 kişilik yüke göre kurgulanmış

**Blok sırası**

| # | Blok | dk | Oturum |
|---|---|---|---|
| 1 | Açılış ve kurulum | 3 | 1 |
| 2 | Roller değişiyor | 3 | 1 |
| 3 | Scrum çerçevesi | 8 | 1 |
| 4 | AI temelleri ve sınırları | 21 | 1 | ← quiz (10 soru)
| 5 | Etkili istem yazımı | 18 | 1 | ← atölye
| 6 | Özet ve kapanış | 7 | 1 | ← sıralama
| 7 | İkinci oturum açılışı | 2 | 2 |
| 8 | Sprint Planning'de AI | 14 | 2 |
| 9 | Daily Scrum'da AI | 10 | 2 |
| 10 | AI çıktısını değerlendirme | 8 | 2 |
| 11 | Sorumlu kullanım: güvenlik ve etik | 19 | 2 |
| 12 | Ekip çalışma anlaşması | 5 | 2 |
| 13 | Eylem planı | 2 | 2 |

**Yok — sıradaki iş**
1. **Slayt slayt içerik gözden geçirmesi** — 13 bloğu baştan sona konuşmak.
   Yeni yazılan slaytlar öncelikli: `s2-planning-akis`, `s2-planning-araclar`,
   `s2-daily-akis`, `s2-daily-araclar`, `s2-anlasma`, `s2-anlasma-nasil`.
2. **Chart slaytları** — `echarts` kurulmadı; Evil Charts'ın tonlamalı dili
   henüz uygulanmadı. Referans: evilcharts.com (shadcn/Tailwind istiyor,
   yalnızca `echarts` kurup option reçetelerini almak yeterli).
3. **Kalan tekdüzelik** — 62 slaydın bir kısmı hâlâ `madde`.
4. **Quiz motoru geri geldi**, ama eski hâliyle değil — aşağıya bakın.

**Bilinçli olarak yok (kullanıcı kararı)**
- **Quiz motoru silindi.** Bileşen, `/api/cevap`, depo tarafı, panel kontrolü
  ve cevap tanımları kaldırıldı. Geri istenirse yeniden yazılacak.
- **Atölye slaytları çıkarıldı.** Site içi AI da bu yüzden gündemde değil.
- **Kart görselleri kullanılmıyor.** Dosyalar `public/kartlar/` altında duruyor
  (1,2 MB) ama hiçbir yerden referans verilmiyor.

## Komutlar

```bash
npm install
cp .env.example .env.local     # SUNUCU_ANAHTARI'nı değiştirin
npm run dev                    # localhost:3000 katılımcı · /sunucu panel
npm run build                  # değişiklikten sonra çalıştırın

node kartlar/fal-uret.mjs --dry-run          # kart promptlarını gösterir
node kartlar/fal-uret.mjs                    # .env.local'daki FAL_KEY ile üretir
node kartlar/fal-uret.mjs --only 5,7         # sadece belirli kartları yeniler
node kartlar/uret.html + calistir.mjs        # jeneratif (fal'sız) alternatif
```

## Mimari — kararlar ve gerekçeleri

Bunlar keyfi tercih değil, hepsi bir soruna karşılık. **Değiştirmeden önce
gerekçeyi okuyun**; gerekçe hâlâ geçerliyse karar da geçerlidir.

**Sunucu-senkron slayt, katılımcının kendi ekranında.** Eğitim tamamen online
olduğu için ekran paylaşımı 2–5 sn gecikiyor. Slaytlar herkesin kendi
cihazında akarsa bu gecikme yok olur; quiz geri sayımı adil olur, telefonda
okunur, prompt kopyalanabilir, bağlantısı kopan anında geri döner. Ekran
paylaşımı sadece ses/yüz ve canlı Jira demosu için.

**Websocket değil yoklama — ama 75 kişiye göre kurgulanmış.** Vercel'de kalıcı
bağlantı zahmetli; uyarlamalı yoklama (önde 2 sn, arkada 6 sn, hatada üstel
geri çekilme) yeterli. 75 kişide çalışması için üç ayrım yapıldı:

**1. Durum sorgusu ile "buradayım" bildirimi ayrı uçlarda.** Bildirim 10
saniyede bir yetiyor (canlılık eşiği 20 sn), durum 2 saniyede bir isteniyor.
Yazma trafiği altıda birine indi. `POST /api/buradayim`.

**2. `/api/durum` kişiye özel hiçbir şey döndürmüyor** — bu yüzden CDN'de bir
saniye önbelleklenebiliyor (`s-maxage=1, stale-while-revalidate=4`). 75 kişinin
isteği kenardan karşılanıyor, fonksiyon saniyede bir kez çalışıyor.
**Bu uca kişiye özel bir alan eklerseniz önbelleği kaldırın**, yoksa bir
katılımcının verisi başkasına servis edilir. İsim listesi bu yüzden ayrı uçta:
`/api/panel`, yalnızca sunucu anahtarıyla, `no-store`.

**3. Katılımcılar HASH değil ZSET.** Üye `id\u0001ad`, skor son görülme anı.
Sayı `ZCOUNT` ile tek komut ve birkaç bayt; eskiden her yoklamada tüm liste
(`HGETALL`) istemciye kadar gidiyordu — 75 kişide saatte ~1,2 GB Redis
trafiği demekti. Tam liste yalnızca panele gidiyor.

**Sunucu bir katılımcının oturumunu kapatabiliyor** (`at` komutu). Kaydı
silmek yetmiyor; kişi bir sonraki bildirimde kendini geri eklerdi. 60 saniyelik
bir işaret bırakılıyor: istemci `acik: false` görüp kimliği siliyor ve giriş
ekranına dönüyor. Kalıcı yasak değil, "şimdi çık" demek.

**Depo iki modlu.** Upstash Redis REST varsa onu, yoksa bellek yedeğini
kullanır (`src/lib/depo.ts`). Bellek modu yerelde sorunsuz ama Vercel'de her
çağrı başka örneğe düşeceği için katılımcılar senkron olmaz — sunucu paneli
bu durumda sarı "Bellek modu" uyarısı gösterir. **Oturumdan önce o uyarının
kaybolduğunu görün.**

**Galeri bir kart yığını, ızgara değil.** Referans React Bits'in `CardSwap`'i;
oradan yığın geometrisi ve GSAP zaman çizelgesi alındı, iki şey değiştirildi:
(1) orada kartlar zamanlayıcıyla kendi kendine dönüyor — burada dönmüyor,
yığını katılımcı çeviriyor; senkron bir sunumda ekranda kendiliğinden hareket
eden şey kafa karıştırır. (2) Eğim 4° ile sınırlı; büyük açı piksel fontu
bulanıklaştırıyor, dar ekranda tamamen kapalı.

14 blok arasında tek tek dönmek yavaş kaldığı için altta mini dizin var.
Oradaki üç sinyal **ayrı CSS özellikleriyle** veriliyor — seçili `outline`,
eğitmenin yeri `background`, kilitli tarama deseni. Üçü de `background`
kullansaydı kilitli+seçili kare seçimi göstermiyordu; bu bir kez yaşandı.

**İkinci oturum sunucu açana kadar kilitli.** Galeride kartı görünür — akışın
tamamı baştan bilinsin — ama girilemez, oyunlardaki kilitli bölüm gibi. Durum
`Durum.acilan` (1 | 2). `oturum 2` komutu kalıcı olarak açıyor; sunucu birinciye
dönse de kapanmıyor. `kilitle` komutu provadan sonra geri kilitliyor, `sifirla`
da öyle. Oturum ayrımını artık renk değil bu kilit taşıyor.

**Serbest gezinme, ama galeri kendiliğinden kaymaz.** Kullanıcı katılımcıların
serbest gezmesini istedi. Galeri sunucu ilerlettiğinde kaymıyor — birinin
ekranı elindeyken altından kaymamalı. Değişiklik sadece kartın "Sunucu burada"
rozetiyle ve "Sunucuya dön" düğmesiyle duyuruluyor. Sunucudan farklı slayta
gidilince turuncu şerit çıkıyor; sunucu katılımcının durduğu slayda gelirse
takip kendiliğinden yeniden başlıyor. `src/app/oda/page.tsx` içindeki `yerel`
durumu bunu yönetiyor.

**Tema tek dosyada.** `src/app/tema.css` dışında renk kodu yalnızca iki yerde
var ve ikisi de CSS değişkeni okuyamayan yerler: `layout.tsx` içindeki
`themeColor` (mobil tarayıcı çubuğu) ve `app/icon.svg` (favicon). Tema
değiştirirken bu ikisini elle güncelleyin; geri kalan her şey token'dan
besleniyor. (WebGL galeri silindi; canvas'a renk okutan `getComputedStyle`
numarasına da artık gerek yok.)

Oturum 1 indigo, oturum 2 koyu pembe; renk `<body data-oturum>` ile değişiyor
ve **bilgi taşıyor**, dekorasyon değil.

**Yön: 8-bit · siyah-beyaz.** (Önceki "Akış" yönü yerini buna bıraktı.)
Sayfada tek renk var — yeşil — ve tek iş yapıyor: "sunucu burada". Vurgu,
kenarlık, işaret dahil geri kalan her şey siyahın tonları. Renk kıt tutulduğu
için bilgi taşıyor. Geometri sıfır yuvarlatma, kenarlar 2 px katı siyah,
gölgeler bulanıksız kaydırılmış blok, geçişler `steps()` ile adımlı.

Yazı üçlü: `--yazi-piksel` (etiket ve arayüz), `--yazi-govde` (okunur metin),
`--yazi-mono` (rakam). Gövde metni piksel font DEĞİL — 41 slaytlık metin piksel
fontla telefonda okunmuyor.

**Eski yön notu — "Akış" (açık zemin).** Önceki dil koyu zeminde neon turkuazdı — Tron
estetiği. Karma bir odada (Scrum'a yeni olanlar + yöneticiler) parıltı içeriğin
önüne geçiyordu, parlak odada projeksiyonda koyu zemin yıkanıyordu. Yeni dil
düğüm ve bağ: açık zemin, elektrik indigo, yumuşak köşe, maddeleri birbirine
bağlayan kesikli çizgi (`slayt.module.css` içinde `.madde::after`). Scrum bir
döngü, ajan bir graf; ortak dilleri bu. Beş yönün karşılaştırması:
https://claude.ai/code/artifact/124c4fd5-6b63-4b12-91ed-dcfa66b68971

Açık zeminde `--vurgu-koyu` / `--vurgu-sis` isimleri yanıltıyor ama rolleri
aynı kaldı: `-koyu` metin ve kenarlık (orta ton), `-sis` zemin (soluk tint).

**Yazı tipleri npm'den self-host** (`@fontsource`). Build Google Fonts'a
bağımlı değil — bir dış servis daha az kırılma noktası.

**Kart görselleri şu an kullanılmıyor.** 8-bit yönüne geçerken galeri
görselsiz kart ızgarasına döndü. Dosyalar `public/kartlar/` altında duruyor
(1,2 MB, mürekkep-kâğıt serisi) ama hiçbir yerden referans verilmiyor —
silinmediler, kullanıcı kararı bekliyor. Geri dönülürse üretim betiği
(`kartlar/fal-uret.mjs`) ve promptlar yerinde; promptların zemin varsayımını
yeni temaya göre çevirmek gerekir.

**Kırmızı yalnızca `cevir` kartında var.** Tema tek renkliydi: yeşil =
"sunucu burada". `s1-istem-cevir` kartı ikinci bir renk getirdi (`--kotu`,
`--kotu-zemin`, `--kotu-metin`) çünkü orada renk gerçekten bilgi taşıyor:
kırmızı yüz kötü istem, yeşil yüz etkili istem. **İkisi hiçbir karede yan yana
gelmiyor** — kart tek seferde tek yüz gösteriyor, arada zemin siyaha düşüyor —
o yüzden yeşilin tek anlamı bozulmuyor. Kırmızıyı başka bir yerde kullanırsanız
bu denge biter.

**`cevir` kartı yerel, senkron değil.** Katılımcı kendi cihazında çeviriyor,
sunucuya bildirilmiyor. Bilerek: herkesin aynı anda çevirmesi gerekmiyor.
Çözülme animasyonu sıralıya YAKIN (soldan sağa kayan taban + rastgele sapma);
tam sıralı olsa yazı makinesi, tamamen rastgele olsa kaynayan bulanıklık olurdu.
Metin yüksekliği uzun yüze göre sabit — kısa yüzdeki boşluk kaybolmuş yer değil,
slaydın mesajı.

**Ajan değil agent.** İçerikte "ajan" geçmiyor; jargon olarak `agent` /
`agentic AI` kullanılıyor (kullanıcı kararı). Yeni slaytta da böyle yazın.

**Quiz on soru, tek tek geliyor.** Aktif soruyu `Durum.quizSoru` taşıyor
(-1 başlamadı, soru sayısı = bitti), cevaplanabilirliği `Durum.quizAcik`.
Panel: Başlat → (her soruda) Cevaplamayı kapat · Sonraki soru → … → Bitir.
Cevaplar tek hash'te, bileşik alanla: `<katılımcıId>\u0001<soruIndeksi>`;
soru başına ayrı anahtar sıfırlamada N tane DEL isterdi.

Şıkka tıklamak DOĞRUDAN gönderiyor, ayrı düğme yok — on soruluk turda soru
başına iki tıklama akışı yavaşlatıyordu. `HSETNX` ilk tıklamayı geçerli
kılıyor ve ekranda bu yazıyor.

**Geri sayım var: soru başına 20 sn, toplam 200 sn** (`SORU_SURESI`,
`src/lib/durum.ts`). Eski motorda geri sayım REDDEDİLMİŞTİ çünkü orada PUAN
hıza bağlıydı ve ağı yavaş olan sistematik olarak kaybediyordu. Burada puan
yalnızca doğru oranı; sayaç sadece soruyu kapatıyor, yani gecikmenin bedeli
puan değil birkaç saniye. Gerekçe değişti, karar da değişti.

Sayaç sunucunun damgasından FARK hesaplamıyor: istemci `Durum.quizAcildi`
değerinin DEĞİŞTİĞİNİ görünce kendi 20 saniyesini başlatıyor. Sebebi cihaz
saati kayması — kimse saati yüzünden soru kaybetmesin. Senkron kayması en
fazla bir yoklama turu (~2 sn).

**Süre sunucuda da kontrol ediliyor** (`SURE_TOLERANSI` = 2 sn pay).
İstemcideki sayaç yalnızca arayüzü kilitliyor; sekmesi duraklamış veya
isteği elle atan biri süresi geçmiş soruya yazamıyor.

Payda her zaman TOPLAM soru sayısı — sorusu kaçan katılımcı boş bırakmış
sayılıyor.

**Doğru cevaplar `src/icerik/cevaplar.ts` içinde ve sunucuda kalır.** Bu dosyayı
hiçbir istemci bileşeninden import etmeyin. `dogrula()` kontrolü bir ara
`src/icerik/index.ts` içine konuldu — orası istemci bileşenlerinden de import
ediliyor, doğru cevaplar geliştirmede tarayıcıya inecekti. Kontrol şimdi
`src/app/api/quiz/route.ts` modül kapsamında, yani sunucuda. Derlemede
doğrulandı: `CEVAPLAR` istemci paketinde yok, yalnızca sorular ve şıklar var.

**Dağılım yalnızca sunucu panelinde.** Çoğunluğu gören katılımcı ona uyar,
bilgi kontrolü ankete döner.

**Sıralama = quiz (0–1000) + istem (0–1000), eşit ağırlık.** İstem bileşeni
anahtar kelime **eleğinin** puanı × 10; hakem puanı bilerek kullanılmıyor
çünkü hakem yalnızca uçlardaki ona bakıyor, herkese uygulanmadığı için
sıralamada adaletsiz olurdu. Slayt bu yüzden "kalıp puanı" diyor, "kalite
puanı" demiyor — sunucu notu da bunu söylemeyi hatırlatıyor.

**"En iyi / en kötü" değil, "tam istem / eksik istem".** Anonim olsa bile
"en kötü" kırıcı ve yanlış şeyi adlandırıyor: eksik olan istem, kişi değil.
Katılımcı ekranında, panelde ve sunucu notlarında bu dil kullanılıyor —
`iyi`/`kotu` yalnızca kod içi anahtar olarak kaldı, oraya dokunmaya gerek yok.
Karşılaştırma slaydının başlığı da "Aynı görev, iki istem": başlık cevabı
vermiyor, çünkü slaydın sorusu zaten "fark hangi parçadan geliyor?".

**Atölye: istem yaz → puanla → tam/eksik istem → canlı karşılaştır.**
İki slayt (`s1-atolye-istem` tip `atolye`, `s1-atolye-sonuc` tip
`karsilastirma`) ve dört karar:

1. **İki katmanlı değerlendirme: elek + hakem.**
   `src/lib/istemPuan.ts` = **elek**, anahtar kelime deseni, 0 ms, 0 ₺.
   `src/lib/hakem.ts` = **hakem**, Gemini'ye yargılatıyor.
   Elek 75 istemi uçlardaki 10'a indiriyor, hakem yalnızca onlara bakıyor —
   tek çağrıda hepsi birden, çünkü model istemleri BİRLİKTE görünce göreli ve
   tutarlı puan veriyor. Ayrı ayrı sorulsa aynı istem farklı turlarda farklı
   puan alırdı. Hakem katılımcı ADINI görmüyor, yalnızca id ve metin.

   Neden ikisi birden: elek tek başına aldanıyor. Ölçülen bir örnek —
   `"gibi davran ekip ürün format sadece varsayım madde biçim..."` gibi 168
   karakterlik anlamsız bir kelime dizisi elekten **88** alıp listenin ikinci
   sırasına çıkıyor; hakem aynı metne **10** verip "anahtar kelimeler rastgele
   dizildiği için anlamlı bir bağlam içermemektedir" diyor. Asıl kazanç puan
   değil, o **gerekçe cümlesi** — sunucu odada yüksek sesle okuyor.

   **Hakem her hata yolunda `null` döndürür, asla atmaz.** Anahtar yoksa,
   API çökerse, zaman aşımına uğrarsa panel eleğin sıralamasıyla çalışmaya
   devam eder ve "değerlendirilemedi" satırı gösterir. Yönetici önünde tek
   hata noktası bırakılmıyor. `GOOGLE_AI_API_KEY` tanımlı değilse düğme hiç
   görünmez.

2. **Elek puanı KALİTE değil KALIP kontrolü.** `src/lib/istemPuan.ts` beş parçadan
   (rol · bağlam · format · sınır · dürüstlük) kaçının bulunduğuna bakıyor,
   artı uzunluk bonusu. İşi sunucuyu 75 istemin en üstüne ve en altına
   götürmek; **son söz her zaman sunucuda** (panelde ✓ / ✗). Desenler Türkçe
   ünsüz yumuşamasını hesaba katıyor — `/ekip/` "ekibimiz"i kaçırıyordu,
   `/eki[pb]/` yakalıyor. Dosya sunucuda kalır, istemciye inmez: katılımcı
   deseni görüp puan avlamasın.
3. **En kötünün SAHİBİ istemciye hiç inmiyor.** `/api/atolye` yanıtında
   `kotu.ad` diye bir alan yok — sansür sunucuda, istemcide gizleme değil.
   Ad yalnızca sunucu panelinde. Ödül kişiye, ders odaya.
4. **`HSETNX` — ilk gönderim geçerli.** Puanı görüp düzeltip tekrar göndermek
   olsaydı sıralama anlamını kaybederdi. Cevaplardaki gerekçenin aynısı.
5. **Panel verisi yalnızca atölye slaytlarında okunuyor.** Her yoklamada
   `HGETALL` çekmek 75 kişilik odada gereksiz Redis trafiği. `/api/panel`
   önce slayt tipine bakıyor.

Gönderim `Durum.istemAcik` ile açılıp kapanıyor — slayta gelmek tek başına
açmıyor, sunucu basıyor. Karşılaştırma slaydındaki kırmızı/yeşil çifti `cevir`
kartıyla AYNI: katılımcı o ikiliyi yarım saat önce gördü, ders eşleşmeden
geliyor. **Bu iki yer dışında kırmızı kullanmayın.**

**Blok sırası duyuruya göre kuruldu, ters yöne çevirmeyin.** Olayların üç
aşamalı işlenişi (`s2-asamalar` ve iki olay bloğu) önce birinci oturumdaydı,
`s1-asamalar` tek slayt hâlinde ve örnekleri Retrospektif üzerindendi. Duyuru
bu içeriği ikinci oturuma ve **isim isim Daily Scrum ile Sprint Planning'e**
bağladığı için taşındı; `Etkili istem yazımı` da yer açmak için birinci oturuma
geçti — orası zaten "üretken yapay zekanın çalışma mantığı" başlığının altına
düşüyor. `Ekip çalışma anlaşması` bloğu quiz silinirken kaldırılmıştı; duyurunun
ilk cümlesi ("ortak bir yaklaşım oluşturmayı amaçlamaktadır") tam olarak o bloğu
vaat ettiği için geri kondu. Slayt kimlikleri taşınırken yenilendi: prefiks
oturum numarasını taşıyor (`s1-baglam`, `s2-planning-akis`), kod hiçbir yerde
slayt id'si aramıyor.

**`Daily` araç tablosunda bir hücre bilerek boş.** `s2-daily-araclar` içindeki
"Sırasında · Araç yok" satırı eksiklik değil, slaytın mesajı. Doldurmayın.

## Tuzaklar

**Piksel font kesirli punto boyutunda okunmuyor.** `clamp()` ile verilen
boyutlar tam sayı px'e denk gelmiyor, tarayıcı glifi yumuşatıyor ve harfler
birbirine karışıyor: **5 → S, 2 → 8, C → O**. Süre etiketleri "12 DK" yerine
"18 DK" görünüyordu. Çözüm iki parçalı ve ikisi de gerekli:
`globals.css` içindeki `.etiket` **sabit tam sayı px** (14 px, dar ekranda 12)
ve `-webkit-font-smoothing: none`; rakamlar ise piksel fontta değil, `.sayi`
sınıfıyla mono'da. **Kural: harf piksel, rakam mono.** Boyut değiştirecekseniz
yine tam sayı verin.

**Dar ekranda tablolar karta dönüşüyor.** `slayt.module.css` içinde 680 px
altı için tablo satırları kart oluyor, `data-etiket` ile sütun başlıkları her
hücrenin üstünde tekrar ediyor. Telefondan katılan biri yatay kaydırma
olduğunu fark etmez; kesilen sütun görülmemiş sütundur.

**`uDim` / `uFocus` uniform'ları.** Kart durumları (geçildi / odakta) shader
içinde. DOM tarafında karşılığı yok, oradan aramayın.

**Bölüm ayraçlarındaki görseller Corporate Memphis, ama renksiz.**
`BolumGorseli.tsx` içinde 11 kompozisyon var, hepsi `viewBox 0 0 100 100`.
Üç kural, üçü de kasıtlı:

1. **Kontur yok, dolgu var.** Şekiller `fill` ile tanımlanıyor. İlk sürüm
   `stroke-width: 7` ile çizilmişti; kullanıcı "çok kalın, daha soft" dedi ve
   haklıydı — Corporate Memphis'in yumuşaklığı tam olarak konturun
   yokluğundan geliyor. Kontur yalnızca üç yerde: `.baglanti` (ince organik
   bağ), `.halka` (kalın yay), `.onay` / `.onayTers` (işaret).
2. **Formlar yuvarlak.** `rx`, daire, yay. Temanın `--kose: 0px` kuralı
   arayüz kroması için — düğme, kart, kutu; illüstrasyon ayrı bir register.
3. **Renk yok, üç düz ton var.** `.ton1` soluk · `.ton2` orta · `.ton3` koyu.
   Memphis'in üç renkli paletinin yerini temanın gri rampası aldı. **Renk
   eklemeyin** — yeşil hâlâ yalnızca "sunucu burada" demek.

Figürler `Kisi` yardımcısıyla çiziliyor: baş daire, gövde hap, **yüz yok** —
figürün "herkes" olması bundan. Görseller bölüm `numara` alanına göre
eşleşiyor; yeni bölüm eklerseniz oraya bir `case` ekleyin, yoksa görsel
sessizce boş kalır. **Hex yazmayın**, hepsi token.

**Panel yüksekliği `height`, `min-height` değil.** Sağ sütun uzun içerik
aldığında (on soruluk quiz dağılımı) sayfa büyüyor, grid yüzünden sol sütun
da onunla uzuyor ve önizlemedeki slayt — dikeyde ortalandığı için — 2000 px'lik
bir kutunun ortasına, ekranın çok altına düşüyordu. Panel ekrana sabitlenip
kaydırma `.sag`'a bırakıldı. Dar ekranda (900 px altı) iki sütun alt alta
geldiği için orada `height: auto`.

**Sunucu rehberi `src/icerik/rehber.ts` içinde ve SUNUCUDA kalır.**
Panelin alt bölümü üç kaynaktan besleniyor:

| Bölüm | Nereden | İstemci paketinde mi |
|---|---|---|
| Nasıl anlat | slaytın `not` alanı | **evet** |
| Bilmen gereken | `rehber.bilgi` | hayır |
| Gelebilecek soru | `rehber.soru` | hayır |
| Dikkat | `rehber.uyari` | hayır |

`not` alanı slayt tanımlarıyla birlikte tarayıcıya iniyor — görsel olarak
yalnızca /sunucu'da görünüyor ama kaynağa bakan katılımcı okuyabilir. Rehber
baştan sunucuda tutuldu ki aynı sorun büyümesin; `/api/panel` üzerinden,
sunucu anahtarıyla geliyor. **`rehber.ts`'i hiçbir istemci bileşeninden
import etmeyin.** Yeni rehber malzemesi eklerken `not`'a değil oraya yazın.

Panelde sıra kasıtlı: önce **Dikkat** (katlanmıyor — atlanmaması gereken şey
gizlenmemeli), sonra **Nasıl anlat**, sonra katlanmış hâlde arka plan. Canlı
oturumda gözün ilk düştüğü yer söylenecek cümle olmalı.

**Gemini model adı ENV'den geliyor, sabit değil.** `gemini-2.5-flash` bir gün
404 vermeye başladı: *"no longer available to new users, use
models/gemini-3.6-flash"*. Varsayılan güncellendi ama asıl çözüm `HAKEM_MODEL`
ortam değişkeni — Google bir adı daha kapatırsa kod değişikliği değil tek satır
env yeter. Anahtar **başlıkta** gönderiliyor (`x-goog-api-key`), sorgu dizesinde
değil: sorgu dizeleri günlüklere düşüyor.

**Olgunluk eğrisinde çizilme animasyonu denemeyin.** İki yol da kırıldı ve
sebep ortak: SVG `preserveAspectRatio="none"` ile esnetiliyor, çizgi kalınlığı
`vector-effect: non-scaling-stroke` ile düzeltiliyor. (1) `stroke-dasharray`:
non-scaling-stroke dash'i ekran pikselinde ölçtürüyor, `pathLength={1}`
normalizasyonu iptal oluyor — eğri **kesik kesik** çiziliyordu ve uzun süre
öyle kaldı. (2) `clip-path: inset()`: SVG'de referans kutu `fill-box`,
yüzdeler beklendiği gibi çözülmüyor — eğri **hiç görünmedi**. Şimdi eğri sabit,
hareketi noktalar taşıyor. Gerçekten gerekiyorsa SVG `<clipPath>` içinde
genişliği animasyonlanan bir `<rect>` ile yapın, CSS ile değil.

**Olgunluk eğrisinde ad değil NUMARA var.** Dokuz noktanın hepsi zirve
bölgesinde (x 9–39) toplandığı için etiketler üst üste biniyordu; etiketi
noktadan uzaklaştırmak da çözmedi (anlamlı ayrım 100 px'ten fazla kaydırma
istiyor, o da bağı koparıyor). Şimdi eğri üstünde numaralı rozet, altında üç
sütunlu ad listesi var — Gartner'ın kendi çözümü. Aynı `.rozet` iki yerde de
kullanılıyor; dolgu olgunlaşma ufkunu, numara kimliği taşıyor. Nokta eklerken
listenin de büyüdüğünü unutmayın, slayt yüksekliği sınıra yakın.

**Görsel modeli hex kodu okumaz.** Kart promptlarında vurgu rengi hex olarak
yazılıydı; flux/dev bunu tamamen yok saydı, 14 kartın 14'ü de gri çıktı
(ölçülen doygunluk ~0,01). Renk **adıyla** yazınca düzeldi. Hex
`kart-promptlari.mjs` içinde duruyor ama yalnızca tema.css ile aynı kaldığını
göstermek için — prompta giden `VURGU_ADI` ("vivid indigo blue" / "vivid
crimson pink"). Aynı model olumsuz komutları zayıf tutuyor: "no 3D render"
dendiği halde podyum kartı hâlâ gölgeli çıkıyor. Yükü **olumlu** ifadeler
taşımalı — "on plain off-white paper", "flat vector ink" gibi.

**Tema değişince kart promptları da değişir.** Kartlar zemin varsayımı taşıyor.
Eski seri "karanlık boşlukta parlayan çizgi"ydi; açık temada o kartlar ekranda
kara kutu gibi duruyordu. `ORTAK_STIL` ve 14 motifin tamamı kâğıt-mürekkep
diline çevrildi. Koyu bir yöne dönerseniz aynı çeviriyi ters yöne yapın —
`--zemin` değiştirip kartlara dokunmamak seriyi bozar.

**Kart üretiminden sonra küçültme şart.** fal ~300 KB'lik JPEG döndürüyor,
14 kart 5 MB ediyor; galeri hepsini birden yüklüyor. `sips -s formatOptions 78`
ile 1,2 MB'a iniyor, gözle fark yok. Betik bunu kendi yapmıyor, uyarı basıyor.

**WebGL yedeği var.** WebGL kurulamazsa galeri gerçek düğmelerden bir ızgaraya
düşüyor, oturum aksamıyor. `prefers-reduced-motion` da destekleniyor.

## Quiz motoru — nasıl kurulduğu

**Akış.** Sunucu paneli tek düğmeyle yürütüyor: başlat → kapat → sonraki →
… → bitir, artı sıfırla. Komutlar `/api/komut` üzerinden
`{komut:"quiz", eylem:…}`. Hangi quiz olduğu slayttan çıkarılıyor, istemci
slayt id'si göndermiyor.

**Geri sayım her cihazda kendi başlıyor.** `Quiz.tsx` içindeki `basladi` ref'i,
soru o cihaza ulaştığı anda kuruluyor. Ortak sayaç ağı yavaş olanı
sistematik olarak kaybettirirdi — bu siteyi zaten o gecikmeyi kaldırmak için
yaptık. Cevabı kapatan şey sunucunun "kapat" komutu; yerel süre yalnızca
arayüzü kilitliyor.

**Puan.** `puanHesapla` — doğruysa `1000 × (1 − 0,5 × geçenSüre/süre)`, yanlışsa
0. Anında 1000, düdükte 500. Puan yalnızca soru **kapanırken** bir kez
hesaplanıp `sunum:skor:<slaytId>` altına tek JSON olarak yazılıyor; liderlik
tablosu bu yüzden yoklama başına soru sayısı kadar değil tek okuma ediyor.

**Cevaplar durumun içinde değil.** Durumu sunucu yazar, cevabı katılımcı; aynı
kayda iki taraf dokunursa biri diğerinin üstüne yazar. Cevaplar
`sunum:cevap:<slaytId>:<soru>` hash'inde, `HSETNX` ile — ilk cevap geçerli,
fikir değiştirip puan yükseltmek yok.

**Doğru cevaplar `src/icerik/cevaplar.ts` içinde ve sunucuda kalıyor.** Sorular
tarayıcıya iniyor, cevaplar inmiyor; aksi hâlde şık sayfa kaynağında görünürdü.
**Bu dosyayı hiçbir istemci bileşeninden import etmeyin.** Dizilerin sorularla
hizası `dogrula()` ile kontrol ediliyor, geliştirmede modül yüklenirken
kendiliğinden çalışıp terminale yazıyor.

**Katılımcı soru açıkken dağılımı görmüyor.** Çoğunluğu görüp ona uymak quizi
ankete çevirirdi. Sunucu her ikisini de baştan görüyor (`/api/durum` yanıtı
anahtara göre ayrışıyor), katılımcı soru kapanınca.

**Nabız ve oylama aynı motor.** `cevaplar.ts` içinde `dogru` yoksa soru
puanlanmıyor; geri kalan her şey aynı. Blok 12'nin oylaması bu yüzden ayrı kod
istemedi.

## Sıradaki işin tasarım notları

**Site içi AI.** `/api/ai` sunucu tarafı vekil; anahtar tarayıcıya inmeyecek.
Sistem promptu sabit, katılımcı sadece değişken kısmı doldurur. Kişi başı
çağrı limiti (Redis sayacı), `max_tokens` sınırı, 8 sn zaman aşımı ve
**hazır yedek çıktı zorunlu** — API çökerse atölye durmamalı, yönetici
önünde tek hata noktası bırakılmayacak. Arayüzde "gerçek şirket verisi
yapıştırmayın" uyarısı duracak; bu kısıt değil, blok 11'in canlı örneği.

## Sıradaki oturum

**Slayt slayt içerik gözden geçirmesi — SÜRÜYOR.** Bloklar 1-4 konuşuldu ve
düzeltildi; sırada **blok 5 (Etkili istem yazımı)**. Kullanıcı 13 bloğun 62
slaydını tek tek konuşmak istiyor. Tasarım ve yapı işi durdu; sırada içeriğin kendisi var.
Baştan başlayın, blok blok ilerleyin.

## Ölçülen kapasite

100 kişilik oturum için production'da yük testi yapıldı (gerçek istek deseni,
20 sn): **1118 istek, 50,3 istek/sn, %0 hata**, hepsi HTTP 200. 50 istek/sn
zaten gerçek oturum hızı. Vercel tarafı rahat.

Tam oturum yükü, koddan sayarak (100 kişi × 60 dk):

| | |
|---|---|
| Fonksiyon çalıştırma | 42.140 |
| — `/api/durum` | 3.600 · CDN emiyor, kenara 50/sn geliyor fonksiyona ~1 |
| — `/api/buradayim` | 36.000 · önbelleklenemez |
| Redis komutu | **86.060** · iki oturum 172.120 |

**Yerel geliştirme production ile AYNI Redis'e bağlıydı.** `vercel env pull`
Upstash bağlantısını `.env.local`'e indiriyor ve o bağlantı production'ın ta
kendisi. Ölçüldü: yerelde slayt 17 yapıldığında production da 17 oldu. Canlı
oturumda `npm run dev` açıkken bir tuşa basmak sunumu oynatırdı.

Çözüm `DEPO=bellek`: bağlantı bilgisi dursa bile bellek moduna düşülüyor
(`src/lib/depo.ts`). Değişken Vercel'in **Development** ortamında tanımlı,
böylece `vercel env pull` her çektiğinde geri geliyor; Production ve
Preview'da yok. Doğrulandı: yerelde slayt 22, production 0'da kaldı.

Yerelde gerçekten Redis'i denemek isterseniz `.env.local`'deki satırı geçici
silin — ama o sırada canlı oturum olmadığından emin olun. Panelde yerelde
sarı "Bellek modu" uyarısı görünmesi artık NORMAL; o uyarı production için
anlamlı.

**Slayt geçiş gecikmesi ölçüldü ve düşürüldü.** Sunucu ilerlettiğinde
katılımcının ekranına ulaşma süresi (production, 20 eşzamanlı istemci):

| | medyan | en kötü |
|---|---|---|
| `swr=4`, yoklama 2000 ms | 3.943 ms | 4.061 ms |
| **swr yok, yoklama 1200 ms** | **1.408 ms** | **1.699 ms** |

Sebep `stale-while-revalidate=4` idi: CDN dört saniyeye kadar bayat içerik
servis ediyordu. Ekran paylaşımının gecikmesi 2-5 sn; o gecikmeyi kaldırmak
için yazılmış sitede 3,9 sn kabul edilemezdi. **swr'yi geri eklemeyin.**
`stale-if-error=10` kalsın — normal sürede bayat servis etmek yanlış, ama
origin tökezlerse oda donmamalı. Fonksiyon yükü değişmedi: `s-maxage=1`
origin'i yine saniyede bir kez vuruyor.

**Darboğaz Vercel değil, Upstash.** Ücretsiz katman günde 10.000 komut; bir
oturum bunun 8,6 katı ve yaklaşık 7. dakikada Redis hata dönmeye başlar.
Pay As You Go'ya geçmek şart, iki oturum ~$0,34. **Aylık sabit ücreti yok**, boştaki veritabanı $0 — test aşamasında geçmek maliyet doğurmuyor. $10/ay olan sabit plana geçmeyin.

~~Vercel Hobby planı ticari kullanım~~ — **kapatıldı, kullanıcı kararı.**
Proje açık kaynak paylaşıldığı ve ölçek denetim eşiğinin çok altında olduğu
için risk kabul edildi. Tekrar açmayın.

## Kullanıcıdan bekleyenler

1. **Gemini anahtarını yenileyin.** Anahtar sohbete yapıştırıldığı için
   transkriptte duruyor. `.env.local` gitignore'da, depoya girmiyor — ama
   oturum öncesi Google AI Studio'dan yeni bir anahtar üretip eskisini iptal
   edin. Production için ayrıca Vercel'e `GOOGLE_AI_API_KEY` eklenecek;
   eklenmezse atölye çalışır, yalnızca AI değerlendirmesi kapalı kalır.
2. **Tarih/saat teyidi** — hangi günler, saat kaç, daveti kim gönderiyor
3. **Upstash Pay As You Go** — 75 kişide oturum başına ~150K komut, ücretsiz
   katman 10K/gün. İki oturum ~$0,60. Gerçek oturumdan önce şart.
4. **Production'a yeni sürümü çıkarmak** — canlıdaki deploy 30 Ağustos
   öncesinden; 75 kişilik ölçek ve çıkış düğmesi orada yok.
5. ~~`SUNUCU_ANAHTARI` kontrolü~~ — **kapatıldı, kullanıcı kararı.** Depo
   public olduğu için gündeme gelmişti; kullanıcı riski görüp "kalsın" dedi.
   Tekrar açmayın.
6. Oturum kaydedilecek mi, yönetici oturumda olacak mı
7. Görsel kimlik: şu an bağımsız 8-bit tema. Kurumsal renge geçilecekse
   `tema.css` (ve `layout.tsx` içindeki `themeColor`, `icon.svg`)


## Önceki oturumun ortamına ait notlar — sizde geçerli değil

Bu proje Cowork bulut konteynerinde başladı. Oradaki üç kısıt Claude Code'da
**yok**, miras almayın:

- **fal.ai ve Higsfield erişimi.** Konteynerin egress allowlist'i `queue.fal.run`'ı
  engelliyordu, kartlar bu yüzden Canvas ile üretilmişti. **Çözüldü:** kartların
  14'ü de fal.ai flux/dev ile yeniden üretildi (`kartlar/fal-uret.mjs`).
- **GitHub push.** Konteynerin git vekili yeni repo açamıyordu. Depo yerelde
  hazır (`main`, 3 commit); `git remote add origin ... && git push -u origin main`.
- **`.git` kilit dosyaları.** Bağlı klasörde silme izni olmadığı için git her
  komutta kilit bırakıyordu; hepsi `../_silinecek/` altına taşındı, o klasör ve
  `scrum-ai-sunum-git.zip` silinebilir. Claude Code'da böyle bir sorun yok.

Karar geçmişinin tamamı Claude projesindeki üç belgede:
`scrum-ai-ic-egitim-akisi.md`, `scrum-ai-sunum-karari.md`,
`scrum-ai-site-yapim-durumu.md`. Tasarım tuvali:
https://claude.ai/code/artifact/b0bb1b10-13ab-4dd6-969c-7ecff5906885

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
