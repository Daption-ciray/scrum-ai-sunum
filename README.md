# Scrum + AI — Canlı Sunum Sitesi

İki oturumluk iç eğitimin sunum sitesi. Slaytlar **katılımcının kendi cihazında**
akar; sunucu ilerlettikçe herkesin ekranı takip eder. Ekran paylaşımına
bağımlılık yok — bu, tam online formatta quiz'in adil çalışmasını sağlayan karar.

## Şu an ne var, ne yok

| | Durum |
|---|---|
| Senkron slayt motoru | ✅ Çalışıyor |
| **CircularGallery ana sayfa** (WebGL, 14 kart) | ✅ Çalışıyor |
| Serbest gezinme + "sunucudan ayrıldınız" şeridi | ✅ Çalışıyor |
| Kart görselleri (14 adet, fal.ai) | ✅ Üretildi |
| Sunucu paneli (notlar, blok atlama, klavye) | ✅ Çalışıyor |
| Katılımcı ekranı, mobil + masaüstü | ✅ Çalışıyor |
| Perde (ara) modu | ✅ Çalışıyor |
| İki oturumun slayt iskeleti | ✅ 14 + 14 slayt |
| Canlı quiz | ⏳ Sırada |
| Site içi AI atölyesi | ⏳ Sırada |

## Galeri

Katılımcı adını girince **galeri** açılıyor: 14 blok, bir yay üzerinde, WebGL
ile (`ogl`, ~30 KB). Sürükleyerek, tekerlekle veya `←` `→` ile gezilir; karta
tıklayınca o bloğun slaytı açılır.

- Sunucunun bulunduğu kartta **"Sunucu burada"** rozeti durur; geçilen kartlar
  sönük çizilir. Galeri sunucu ilerlettiğinde kendiliğinden kaymaz — kimsenin
  ekranı altından kaymasın diye. **"Sunucuya dön"** düğmesi geri götürür.
- Sunucudan farklı bir slayta gidildiğinde üstte turuncu bir şerit çıkar ve
  sunucunun nerede olduğunu söyler; **"Takibe dön"** tek tıkla senkrona alır.
  Sunucu sizin durduğunuz slayda gelirse takip kendiliğinden yeniden başlar.
- WebGL çalışmayan cihazda galeri gerçek düğmelerden oluşan bir ızgaraya düşer;
  oturum aksamaz.
- `prefers-reduced-motion` açıksa dalgalanma ve yumuşatma kapanır.

Ayarlar `src/components/Galeri.tsx` içinde: `bend` (yayın bükülmesi),
`scrollEase` (kaydırma ağırlığı), `borderRadius`, `font`, `textColor`.

## Kart görselleri

`public/kartlar/blok-01…14.jpg` — fal.ai (flux/dev) ile üretiliyor, stok görsel
değil. Her blok kendi motifini taşıyor (döngü, iç içe halkalar, yarış izleri,
sınır…), oturum 1 turkuaz / oturum 2 turuncu. Toplam ~1,2 MB.

Yeniden üretmek veya motif değiştirmek için `kartlar/kart-promptlari.mjs`
içindeki metinleri düzenleyip:

```bash
node kartlar/fal-uret.mjs --dry-run     # ne üretileceğini gösterir
node kartlar/fal-uret.mjs               # .env.local'daki FAL_KEY ile üretir
node kartlar/fal-uret.mjs --only 5,7    # sadece belirli kartları yeniler
sips -s formatOptions 78 -s format jpeg public/kartlar/*.jpg --out public/kartlar
```

Son adım küçültme: fal ~300 KB'lik kartlar döndürüyor, galeri 14'ünü birden
yüklüyor. `kartlar/uret.html` + `calistir.mjs` fal'sız jeneratif alternatif
olarak duruyor.

Quiz ve atölye blokları slaytlarda **"Yapım aşamasında"** rozetiyle duruyor;
akış şimdiden baştan sona provası yapılabilir durumda.

## Yerelde çalıştırma

```bash
npm install
cp .env.example .env.local        # SUNUCU_ANAHTARI'nı değiştirin
npm run dev
```

- `http://localhost:3000` — katılımcı girişi
- `http://localhost:3000/sunucu` — sunucu paneli (anahtar sorar)

## Vercel'e alma

1. **GitHub'a push edin** (bu klasör bir repo kökü).
2. Vercel → *Add New → Project* → repoyu seçin. Framework otomatik algılanır,
   ayar değiştirmeye gerek yok.
3. **Upstash Redis ekleyin** — Vercel proje sayfası → *Storage* →
   *Marketplace* → **Upstash Redis** → ücretsiz kademe.
   `UPSTASH_REDIS_REST_URL` ve `UPSTASH_REDIS_REST_TOKEN` otomatik gelir.
4. **Environment Variables** altına `SUNUCU_ANAHTARI` ekleyin — uzun ve tahmin
   edilemez olsun. Bu anahtarı bilen slaytları ilerletebilir.
5. Redeploy.

> **Upstash olmadan da açılır** ama sunucusuz her çağrı ayrı bir örneğe düşeceği
> için katılımcılar senkron olmaz. Sunucu paneli bu durumda sarı bir
> "Bellek modu" uyarısı gösterir. Oturumdan önce o uyarının kaybolduğunu görün.

## Klavye — sunum sırasında

| Tuş | İş |
|---|---|
| `→` / `Boşluk` / `PageDown` | İleri |
| `←` / `PageUp` | Geri |
| `B` | Perde aç/kapa (ara verirken) |

## Slayt içeriğini değiştirme

Bütün metin `src/icerik/oturum1.ts` ve `oturum2.ts` içinde. Kod bilmeden
düzenlenebilir: her slayt bir nesne, `not` alanı yalnızca sunucu panelinde
görünür.

Slayt tipleri: `kapak`, `bolum`, `madde`, `vurgu`, `ikili`, `katman`, `tablo`,
`taslak`. Tipleri `src/icerik/tipler.ts` tanımlar.

## Renkleri değiştirme

Tek dosya: **`src/app/tema.css`**. Başka hiçbir dosyada renk kodu geçmiyor.
Kurumsal kimliğe geçiş bu dosyadaki değerleri değiştirmekten ibaret.
Oturum 1 turkuaz, oturum 2 turuncu akar — katılımcı hangi oturumda olduğunu
renkten anlar.

## Mimari notları

- **Senkron:** Upstash Redis + uyarlamalı yoklama. Sekme öndeyken 1.5 sn,
  arkaya düşünce 6 sn, hata halinde 10 sn'ye kadar geri çekilir. 15 kişilik
  odada websocket'e gerek yok ve bu çok daha az kırılgan.
- **Yazı tipleri** npm'den self-host ediliyor (`@fontsource`), build Google
  Fonts'a bağımlı değil.
- **Kimlik:** katılımcı id'si cihazda saklanır. Bağlantısı kopan sayfayı
  yenileyip aynı isimle devam eder.
- **Yetki:** slayt ilerletme `SUNUCU_ANAHTARI` ile korunur; katılımcı uçları
  yalnızca okur.

## Sıradaki iş

1. Quiz motoru — soru açma, cihaz başına geri sayım, liderlik tablosu
2. Site içi AI — `/api/ai` sunucu tarafı vekil, kişi başı limit, hazır yedek çıktı
3. Quiz ve atölye içeriğinin yazılması
