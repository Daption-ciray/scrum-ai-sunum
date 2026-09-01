"use client";

import type { ReactNode } from "react";
import k from "./kabuk.module.css";

/**
 * Slayt kabuğu.
 *
 * Üst ve alt şeritler kaldırıldı: katılımcının bakması gereken şey slaytın
 * kendisi. Geriye üç köşe göstergesi kaldı — galeriye dönüş, slayt sayacı,
 * bağlantı durumu. Hepsi piksel fontta ve küçük.
 *
 * SLAYTTA İMZA YOK. Bir kez sağ alt köşeye marka imzası konuldu ve geri
 * alındı: kurumsal bir iç eğitimde 70 slaydın her birinde duran marka
 * satırı ekranı sahiplenmiş gibi duruyor. Sahiplik LICENSE dosyasında
 * duruyor, katılımcının ekranında değil.
 */
export function Kabuk({
  slayt,
  toplam,
  saglikli,
  galeriyeDon,
  uyari,
  children,
}: {
  slayt: number;
  toplam: number;
  saglikli: boolean;
  galeriyeDon: () => void;
  uyari?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={k.kabuk}>
      <div className={`${k.kose} ${k.solUst}`}>
        <button
          type="button"
          className={k.galeriDugme}
          onClick={galeriyeDon}
          aria-label="Galeriye dön"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden>
            <rect x="0" y="0" width="4" height="4" />
            <rect x="6" y="0" width="4" height="4" />
            <rect x="0" y="6" width="4" height="4" />
            <rect x="6" y="6" width="4" height="4" />
          </svg>
          Galeri
        </button>
      </div>

      <div className={`${k.kose} ${k.sagUst}`}>
        <span className={`sayi ${k.sayac}`}>
          {String(slayt + 1).padStart(2, "0")}/{toplam}
        </span>
      </div>

      {/* Yalnızca bağlantı ışığı. Rakam kaldırıldı: katılımcı sayısı
          `/api/durum`'dan çıkarıldı çünkü her yoklamada fazladan bir Redis
          komutu demekti. Sayı sunucu panelinde duruyor. */}
      <div
        className={`${k.kose} ${k.solAlt} ${saglikli ? "" : k.kopuk}`}
        title={saglikli ? "Bağlantı iyi" : "Bağlantı koptu, yeniden deniyorum"}
      >
        <span className={k.baglıNokta} aria-hidden />
        {!saglikli && <span className={`sayi ${k.bagliSayi}`}>—</span>}
      </div>

      {uyari}

      {children}
    </div>
  );
}
