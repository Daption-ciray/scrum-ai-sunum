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

Akış: 14 blok, 7'si birinci oturum 7'si ikinci oturum. Dakika dakika akış
`src/icerik/` içinde slayt olarak duruyor; blok süreleri `src/icerik/bloklar.ts`.

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
- Sunucu paneli: canlı önizleme, sunucu notları, blok atlama, perde, klavye
- Giriş sayfasından sunucu girişi — anahtar doğruysa doğrudan `/sunucu`
- Galeri: 14 blok 3B kart yığını (GSAP), serbest gezinme, ikinci oturum kilitli
- İki oturumun 23+18 slaytı — kurumsal eğitim dilinde, kaynaklı
- **Quiz motoru** — 5 slaytta çalışıyor: `s1-nabiz` (nabız, puansız),
  `s1-quiz-1` ve `s2-hatirlatma-quiz` (4'er soru, 20 sn), `s2-anlasma`
  (5 maddelik oylama, puansız), `s2-final-quiz` (8 soru, 15 sn, podyum).
  Sorular yazıldı.

**Yok — sıradaki iş, bu sırayla**
1. **Site içi AI** — blok 09 ve 10 atölyeleri için
2. **İçerik** — örnek user story, dağınık retro not seti
3. Blok 12'nin 5. maddesi oturumda odadan gelecek (slaytta yer tutucu duruyor)

Bunların yerinde şu an "Yapım aşamasında" rozetli `taslak` tipi slaytlar var;
her birinin `beklenen` alanında ne geleceği yazılı. Akış şimdiden baştan sona
prova edilebilir durumda — **iskeleti bozmadan doldurun.**

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

**Slayt slayt içerik gözden geçirmesi.** Kullanıcı 11 bloğun 52 slaydını tek tek
konuşmak istiyor. Tasarım ve yapı işi şimdilik durdu; sırada içeriğin kendisi
var. Gözden geçirmeye baştan başlayın, blok blok ilerleyin.

## Kullanıcıdan bekleyenler

1. **Tarih/saat teyidi** — 1 ve 3 Eylül mü, saat kaç, daveti kim gönderiyor
2. **Vercel'e deploy + Upstash Redis + `SUNUCU_ANAHTARI`** — Salı'ya bırakılmamalı
3. Quiz ödülü var mı, oturum kaydedilecek mi, yönetici oturumda olacak mı
4. Görsel kimlik: şu an bağımsız tema. Kurumsal renge geçilecekse `tema.css`

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
