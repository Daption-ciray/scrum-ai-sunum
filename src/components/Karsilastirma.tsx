"use client";

import { useCallback, useEffect, useState } from "react";
import type { Slayt } from "@/icerik/tipler";
import k from "./karsilastirma.module.css";

type Yanit = {
  toplam: number;
  iyi: { ad: string; metin: string } | null;
  /** Ad YOK — eksik istemi yazan hiçbir zaman istemciye inmiyor. */
  kotu: { metin: string } | null;
};

/**
 * Atölye çıktısı: tam istem ve eksik istem yan yana.
 *
 * Tam istemi yazan adıyla görünüyor, eksik istemi yazan GÖRÜNMÜYOR. "Kötü"
 * değil "eksik" deniyor: eksik olan istem, kişi değil. Ödül kişiye,
 * ders odaya. Sansür sunucu tarafında: `/api/atolye` yanıtında `kotu.ad`
 * diye bir alan hiç yok, istemcide gizlenmiyor.
 *
 * Renkler `cevir` kartıyla aynı çift — katılımcı aynı kırmızıyı ve aynı
 * yeşili yarım saat önce gördü, ders o eşleşmeden geliyor.
 */
export function Karsilastirma({
  slayt,
}: {
  slayt: Extract<Slayt, { tip: "karsilastirma" }>;
}) {
  const [veri, setVeri] = useState<Yanit | null>(null);
  const [kopyalanan, setKopyalanan] = useState<string | null>(null);

  useEffect(() => {
    let durdu = false;
    const sor = async () => {
      try {
        const y = await fetch(`/api/atolye?slayt=${encodeURIComponent(slayt.kaynakSlayt)}`, {
          cache: "no-store",
        });
        if (!y.ok) return;
        const v = (await y.json()) as Yanit;
        if (!durdu) setVeri(v);
      } catch {
        /* geçici hata: bir sonraki tur yakalar */
      }
    };
    void sor();
    // Sunucu işaretlerken slayt açık kalıyor; seçim değişince ekran güncellensin.
    const sayac = setInterval(sor, 3000);
    return () => {
      durdu = true;
      clearInterval(sayac);
    };
  }, [slayt.kaynakSlayt]);

  const kopyala = useCallback(async (etiket: string, metin: string) => {
    try {
      await navigator.clipboard.writeText(metin);
      setKopyalanan(etiket);
      setTimeout(() => setKopyalanan(null), 1800);
    } catch {
      setKopyalanan("hata");
      setTimeout(() => setKopyalanan(null), 1800);
    }
  }, []);

  return (
    <div className={k.sarma}>
      <h2 className={k.baslik}>{slayt.baslik}</h2>
      {slayt.giris && <p className={k.giris}>{slayt.giris}</p>}

      <div className={k.ikili}>
        <section className={`${k.panel} ${k.iyi}`}>
          <header className={k.tepe}>
            <span className={`etiket ${k.rozet}`}>Tam istem</span>
            {veri?.iyi && <span className={k.sahip}>{veri.iyi.ad}</span>}
          </header>
          <pre className={k.metin}>
            {veri?.iyi?.metin ?? "Eğitmen henüz seçmedi."}
          </pre>
          {veri?.iyi && (
            <button
              type="button"
              className={k.kopya}
              onClick={() => kopyala("iyi", veri.iyi!.metin)}
            >
              {kopyalanan === "iyi" ? "Kopyalandı" : "Kopyala"}
            </button>
          )}
        </section>

        <section className={`${k.panel} ${k.kotu}`}>
          <header className={k.tepe}>
            <span className={`etiket ${k.rozet}`}>Eksik istem</span>
            {/* Ad yok ve olmayacak — sunucu yanıtında da yok. */}
            <span className={k.sahip}>Anonim</span>
          </header>
          <pre className={k.metin}>
            {veri?.kotu?.metin ?? "Eğitmen henüz seçmedi."}
          </pre>
          {veri?.kotu && (
            <button
              type="button"
              className={k.kopya}
              onClick={() => kopyala("kotu", veri.kotu!.metin)}
            >
              {kopyalanan === "kotu" ? "Kopyalandı" : "Kopyala"}
            </button>
          )}
        </section>
      </div>

      {kopyalanan === "hata" && (
        <p className={k.ipucu}>Kopyalanamadı — metni elle seçip kopyalayın.</p>
      )}

      {slayt.araclar && slayt.araclar.length > 0 && (
        <p className={k.araclar}>
          <span className="etiket">Şimdi ikisini de aynı araca verelim:</span>{" "}
          {slayt.araclar.join(" · ")}
        </p>
      )}

      {veri && (
        <p className={k.ipucu}>
          {veri.toplam} istem gönderildi.
        </p>
      )}
      {slayt.kaynak && <p className={k.kaynak}>{slayt.kaynak}</p>}
    </div>
  );
}
