"use client";

import { useEffect, useState } from "react";
import type { Slayt } from "@/icerik/tipler";
import type { Durum } from "@/lib/durum";
import { kimlikAl } from "@/lib/kimlik";
import q from "./quiz.module.css";

const yerelAnahtar = (slaytId: string) => `sunum.quiz.${slaytId}`;

/**
 * Bilgi kontrolü. Bütün sorular aynı ekranda, tek gönderim.
 *
 * Neden soru soru değil hepsi birden: 75 kişilik odada her soru için ayrı
 * "başlat / kapat / sonraki" turu hem sunucuyu meşgul ediyor hem de bağlantısı
 * kopan katılımcıyı bir soruya mahkûm ediyordu. Tek gönderim, atölyeyle aynı
 * kurgu — ve `HSETNX` sayesinde ilk gönderim geçerli.
 *
 * DOĞRU CEVAP BU DOSYAYA GELMİYOR. Katılımcı sonucunu sıralama slaytında
 * görüyor; burada gösterilseydi ilk gönderen odaya söylerdi.
 */
export function Quiz({
  slayt,
  durum,
}: {
  slayt: Extract<Slayt, { tip: "quiz" }>;
  durum?: Durum;
}) {
  const [secimler, setSecimler] = useState<number[]>(() => slayt.sorular.map(() => -1));
  const [gonderildi, setGonderildi] = useState(false);
  const [gonderiliyor, setGonderiliyor] = useState(false);
  const [hata, setHata] = useState<string | null>(null);
  const [kimlikVar, setKimlikVar] = useState(true);

  const acik = durum?.quizAcik ?? false;

  useEffect(() => {
    setSecimler(slayt.sorular.map(() => -1));
    try {
      setGonderildi(window.localStorage.getItem(yerelAnahtar(slayt.id)) === "1");
    } catch {
      setGonderildi(false);
    }
    setKimlikVar(Boolean(kimlikAl()?.id));
  }, [slayt.id, slayt.sorular]);

  const sec = (soru: number, sik: number) => {
    if (!acik || gonderildi) return;
    setSecimler((o) => o.map((d, i) => (i === soru ? sik : d)));
  };

  const gonder = async () => {
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
        body: JSON.stringify({ id: kimlik.id, ad: kimlik.ad, cevaplar: secimler }),
      });
      const veri = (await yanit.json().catch(() => ({}))) as { hata?: string };
      if (!yanit.ok) {
        setHata(veri.hata ?? "Gönderilemedi.");
        return;
      }
      try {
        window.localStorage.setItem(yerelAnahtar(slayt.id), "1");
      } catch {
        /* gizli sekme: kayıt yine sunucuda */
      }
      setGonderildi(true);
    } catch {
      setHata("Sunucuya ulaşılamadı. Tekrar deneyin.");
    } finally {
      setGonderiliyor(false);
    }
  };

  const eksik = secimler.filter((d) => d < 0).length;

  return (
    <div className={q.sarma}>
      <h2 className={q.baslik}>{slayt.baslik}</h2>
      {slayt.giris && <p className={q.giris}>{slayt.giris}</p>}

      {gonderildi ? (
        <div className={q.bitti}>
          <span className={`etiket ${q.rozet}`}>Cevaplarınız alındı</span>
          <p className={q.ipucu}>
            Sonucu oturumun sonundaki sıralamada göreceksiniz. İlk gönderim
            geçerli — değiştirilemiyor.
          </p>
        </div>
      ) : (
        <>
          <ol className={q.sorular}>
            {slayt.sorular.map((s, si) => (
              <li key={s.soru} className={q.soru}>
                <p className={q.soruMetin}>
                  <span className={`mono ${q.soruNo}`}>{si + 1}</span>
                  {s.soru}
                </p>
                <div className={q.sikler}>
                  {s.secenekler.map((sik, ki) => (
                    <button
                      key={sik}
                      type="button"
                      className={`${q.sik} ${secimler[si] === ki ? q.secili : ""}`}
                      onClick={() => sec(si, ki)}
                      disabled={!acik}
                      aria-pressed={secimler[si] === ki}
                    >
                      {sik}
                    </button>
                  ))}
                </div>
              </li>
            ))}
          </ol>

          <div className={q.alt}>
            <span className={q.ipucu}>
              {!acik
                ? "Eğitmen başlatana kadar bekleyin."
                : eksik > 0
                  ? `${eksik} soru boş`
                  : "Hepsi işaretlendi"}
            </span>
            <button
              type="button"
              className={q.dugme}
              onClick={gonder}
              disabled={!acik || gonderiliyor || eksik === slayt.sorular.length}
            >
              {gonderiliyor ? "Gönderiliyor…" : "Gönder"}
            </button>
          </div>
          {acik && !kimlikVar && (
            <p className={q.ipucu}>
              Bu ekran eğitmen görünümü — cevaplama yalnızca katılımcı
              sayfasından yapılabilir.
            </p>
          )}
          {hata && <p className={q.hata}>{hata}</p>}
        </>
      )}

      {slayt.kaynak && <p className={q.kaynak}>{slayt.kaynak}</p>}
    </div>
  );
}
