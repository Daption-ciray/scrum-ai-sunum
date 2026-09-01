"use client";

import { useCallback, useEffect, useState } from "react";
import type { Slayt } from "@/icerik/tipler";
import { SORU_SURESI, type Durum } from "@/lib/durum";
import { kimlikAl } from "@/lib/kimlik";
import q from "./quiz.module.css";

const yerelAnahtar = (slaytId: string) => `sunum.quiz.${slaytId}`;

/* Cihazda tutulan cevaplar: soru indeksi → seçilen şık. Sıfırlama damgasıyla
   birlikte saklanıyor; sunucu quizi sıfırladığında damga değişiyor ve eski
   cevaplar yok sayılıyor. Yoksa provada cevaplayan katılımcı gerçek turda
   şıkka basamıyordu. */
function yerelOku(slaytId: string, tur: number): Record<number, number> {
  try {
    const ham = window.localStorage.getItem(yerelAnahtar(slaytId));
    if (!ham) return {};
    const kayit = JSON.parse(ham) as { tur?: number; harita?: Record<number, number> };
    return kayit?.tur === tur && kayit.harita ? kayit.harita : {};
  } catch {
    return {};
  }
}
function yerelYaz(slaytId: string, harita: Record<number, number>, tur: number) {
  try {
    window.localStorage.setItem(yerelAnahtar(slaytId), JSON.stringify({ tur, harita }));
  } catch {
    /* gizli sekme: kayıt yine sunucuda */
  }
}

/**
 * Bilgi kontrolü. Sorular TEK TEK geliyor; hangi sorunun açık olduğunu
 * sunucu söylüyor (`Durum.quizSoru`).
 *
 * Şıkka tıklamak doğrudan gönderiyor — ayrı "gönder" düğmesi yok. On soruluk
 * bir turda her soru için iki tıklama akışı yavaşlatıyordu. `HSETNX` sayesinde
 * ilk tıklama geçerli; bu ekranda da açıkça yazıyor.
 *
 * DOĞRU CEVAP BU DOSYAYA GELMİYOR. Katılımcı sonucunu sıralama slaytında
 * görüyor; burada gösterilseydi ilk cevaplayan odaya söylerdi.
 */
export function Quiz({
  slayt,
  durum,
}: {
  slayt: Extract<Slayt, { tip: "quiz" }>;
  durum?: Durum;
}) {
  const [verilen, setVerilen] = useState<Record<number, number>>({});
  const [gonderiliyor, setGonderiliyor] = useState(false);
  const [hata, setHata] = useState<string | null>(null);
  const [kimlikVar, setKimlikVar] = useState(true);

  const aktif = durum?.quizSoru ?? -1;
  const tur = durum?.sifirlandi ?? 0;
  const acik = durum?.quizAcik ?? false;
  const acildi = durum?.quizAcildi ?? 0;
  const soru = slayt.sorular[aktif];
  const secilen = verilen[aktif];

  /* Geri sayım.
     İstemcinin cihaz saati sunucununkinden kaymış olabilir, o yüzden mutlak
     zaman karşılaştırması yapılmıyor. Bunun yerine sorunun ne kadar süredir
     açık olduğu SUNUCUNUN KENDİ İKİ SAYISININ FARKINDAN çıkarılıyor
     (`durum.zaman - durum.quizAcildi`); iki sayı da aynı saatten geldiği için
     kayma sadeleşiyor. Kalan süre oradan başlatılıyor.

     Bu olmadan sonradan katılan veya sayfayı yenileyen kişi taze 20 saniye
     görüyordu, oysa sunucu ilk açılıştan sayıyor: sayaçta süre varken cevabı
     "Süre doldu" ile reddediliyordu. */
  const [kalan, setKalan] = useState(0);
  useEffect(() => {
    if (!acik || !acildi) {
      setKalan(0);
      return;
    }
    // Sunucunun hesapladığı kalan süreden başla. `quizKalan` yoksa (eski
    // yanıt) tam süreye düş.
    const baslangicKalan = durum?.quizKalan ?? SORU_SURESI;
    const yerelBaslangic = Date.now();
    setKalan(baslangicKalan);
    const tik = () => {
      const k = Math.max(0, baslangicKalan - (Date.now() - yerelBaslangic));
      setKalan(k);
      if (k <= 0) clearInterval(sayac);
    };
    const sayac = setInterval(tik, 250);
    return () => clearInterval(sayac);
  }, [acik, acildi, durum?.quizKalan]);

  const suresiDoldu = acik && kalan <= 0;
  const saniye = Math.ceil(kalan / 1000);

  // Damga değişirse (sunucu quizi sıfırladı) cihazdaki cevaplar düşüyor.
  useEffect(() => {
    setVerilen(yerelOku(slayt.id, tur));
    setKimlikVar(Boolean(kimlikAl()?.id));
  }, [slayt.id, tur]);

  // Soru değişince hata mesajı önceki sorudan taşınmasın.
  useEffect(() => {
    setHata(null);
  }, [aktif]);

  const sec = useCallback(
    async (sik: number) => {
      if (!acik || gonderiliyor || secilen !== undefined || kalan <= 0) return;
      const kimlik = kimlikAl();
      if (!kimlik?.id || !kimlik.ad) {
        setHata("Kimlik bulunamadı. Sayfayı yenileyip adınızı tekrar girin.");
        return;
      }
      setGonderiliyor(true);
      setHata(null);
      try {
        const yanit = await fetch("/api/quiz", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ id: kimlik.id, ad: kimlik.ad, sik }),
        });
        const veri = (await yanit.json().catch(() => ({}))) as { hata?: string };
        if (!yanit.ok) {
          setHata(veri.hata ?? "Gönderilemedi.");
          return;
        }
        const yeni = { ...verilen, [aktif]: sik };
        yerelYaz(slayt.id, yeni, tur);
        setVerilen(yeni);
      } catch {
        setHata("Sunucuya ulaşılamadı. Tekrar deneyin.");
      } finally {
        setGonderiliyor(false);
      }
    },
    [acik, aktif, gonderiliyor, kalan, secilen, slayt.id, verilen],
  );

  const durumMetni =
    aktif < 0
      ? "Eğitmen başlatana kadar bekleyin."
      : aktif >= slayt.sorular.length
        ? null
        : secilen !== undefined
          ? "Cevabınız alındı. Sonraki soruyu bekleyin."
          : acik
            ? "Bir şık seçin — seçtiğiniz an kaydedilir, değiştirilemez."
            : "Cevaplama kapalı.";

  return (
    <div className={q.sarma}>
      <h2 className={q.baslik}>{slayt.baslik}</h2>
      {slayt.giris && aktif < 0 && <p className={q.giris}>{slayt.giris}</p>}

      {aktif >= slayt.sorular.length ? (
        <div className={q.bitti}>
          <span className={`etiket ${q.rozet}`}>Bilgi kontrolü bitti</span>
          <p className={q.ipucu}>
            Kaç doğru yaptığınızı oturum sonundaki sıralamada göreceksiniz.
          </p>
        </div>
      ) : soru ? (
        <>
          <div className={q.ilerleme} aria-hidden>
            {slayt.sorular.map((s, i) => (
              <span
                key={s.soru}
                className={`${q.nokta} ${i === aktif ? q.noktaAktif : ""} ${
                  verilen[i] !== undefined ? q.noktaDolu : ""
                }`}
              />
            ))}
          </div>

          <p className={q.soruMetin}>
            <span className={`mono ${q.soruNo}`}>
              {aktif + 1}/{slayt.sorular.length}
            </span>
            {soru.soru}
          </p>

          {/* Geri sayım. Son beş saniyede uyarı rengine dönüyor; rakam mono,
              çubuk adımlı — piksel font kesirli boyutta rakam okutmuyor. */}
          {acik && secilen === undefined && (
            <div className={`${q.sayacSar} ${saniye <= 5 ? q.sayacAz : ""}`}>
              <div className={q.sayacYol} aria-hidden>
                <div
                  className={q.sayacDolgu}
                  style={{ width: `${(kalan / SORU_SURESI) * 100}%` }}
                />
              </div>
              <span className={`mono ${q.sayacSayi}`} aria-live="off">
                {saniye}
              </span>
            </div>
          )}

          <div className={q.sikler}>
            {soru.secenekler.map((sik, ki) => (
              <button
                key={sik}
                type="button"
                className={`${q.sik} ${secilen === ki ? q.secili : ""}`}
                onClick={() => sec(ki)}
                disabled={!acik || gonderiliyor || secilen !== undefined || kalan <= 0}
                aria-pressed={secilen === ki}
              >
                {sik}
              </button>
            ))}
          </div>

          {durumMetni && <p className={q.ipucu}>{durumMetni}</p>}
          {acik && !kimlikVar && (
            <p className={q.ipucu}>
              Bu ekran eğitmen görünümü — cevaplama yalnızca katılımcı
              sayfasından yapılabilir.
            </p>
          )}
          {hata && <p className={q.hata}>{hata}</p>}
        </>
      ) : (
        <p className={q.ipucu}>{durumMetni}</p>
      )}

      {slayt.kaynak && <p className={q.kaynak}>{slayt.kaynak}</p>}
    </div>
  );
}
