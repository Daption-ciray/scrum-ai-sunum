"use client";

import { useEffect, useMemo, useState } from "react";
import CircularGallery, { type GaleriOgesi } from "./CircularGallery";
import { blokBul, tumBloklar } from "@/icerik/bloklar";
import type { Durum } from "@/lib/durum";
import g from "./galeri.module.css";

export function Galeri({
  durum,
  bagli,
  ad,
  onAc,
}: {
  durum: Durum;
  bagli: number;
  ad: string;
  /** Blok seçildi: hangi oturumun kaçıncı slaytına gidileceği. */
  onAc: (oturum: 1 | 2, slayt: number) => void;
}) {
  const bloklar = useMemo(() => tumBloklar(), []);
  const sunucuBlok = blokBul(durum.oturum, durum.slayt);

  const [odak, setOdak] = useState(sunucuBlok);
  const [sinyal, setSinyal] = useState(0);

  // Not: sunucu blok değiştirdiğinde galeri kendiliğinden kaymıyor — serbest
  // gezinme seçildi. Değişiklik yalnızca kart rozetiyle ve "Sunucuya dön"
  // düğmesiyle duyuruluyor; kimsenin ekranı altından kaymıyor.

  const ogeler: GaleriOgesi[] = useMemo(
    () =>
      bloklar.map((b, i) => ({
        id: `${b.oturum}-${b.no}`,
        baslik: b.ad,
        gorsel: b.gorsel,
        sure: b.sure,
        oturum: b.oturum,
        aktif: i === sunucuBlok,
        gecildi: i < sunucuBlok,
      })),
    [bloklar, sunucuBlok],
  );

  const odaktaki = bloklar[odak] ?? bloklar[0];
  const odakSunucuda = odak === sunucuBlok;

  // Odaktaki kartın oturumu, çerçevenin vurgu rengini de belirliyor.
  useEffect(() => {
    document.body.dataset.oturum = String(odaktaki.oturum);
  }, [odaktaki.oturum]);

  function sunucuyaDon() {
    setSinyal((s) => s + 1);
  }

  return (
    <div className={g.kap}>
      <div className={g.atmosfer} aria-hidden />

      <header className={g.ust}>
        <span className={`etiket ${g.marka}`}>Scrum + AI</span>
        <span className={g.ayrac} aria-hidden />
        <span className={g.ustBilgi}>İç Eğitim · iki oturum · 120 dakika</span>
        <div className={g.ustSag}>
          {!odakSunucuda && (
            <button className={g.geriDon} onClick={sunucuyaDon}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M9 14 4 9l5-5" />
                <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
              </svg>
              Sunucuya dön
            </button>
          )}
          <span className={`etiket ${g.canli}`}>{bagli} bağlı</span>
        </div>
      </header>

      <div className={g.baslikAlan}>
        <h1 className={g.baslik}>Akışın tamamı, tek halkada</h1>
        <p className={g.altBaslik}>
          Scrum bir döngü. Bu yüzden bloklar da düz bir liste değil, bir yay üzerinde
          duruyor — sonu başına bakıyor.
        </p>
      </div>

      <CircularGallery
        ogeler={ogeler}
        bend={3}
        textColor="#F0F3F7"
        borderRadius={0.05}
        scrollEase={0.045}
        font="600 30px 'Archivo Variable', Archivo, sans-serif"
        onOdak={setOdak}
        onSec={(i) => onAc(bloklar[i].oturum, bloklar[i].slayt)}
        merkezSinyali={sinyal}
        merkezIndeks={sunucuBlok}
      />

      <div className={g.odakSatir}>
        <span className={g.odakSatirIc}>
          {odakSunucuda && <span className={g.rozet}>Sunucu burada</span>}
          <span className={g.sure}>
            <span
              className={g.sureCizgi}
              style={{ width: `${10 + odaktaki.sure * 3.6}px` }}
              aria-hidden
            />
            <span className={g.sureMetin}>{odaktaki.sure} DK</span>
          </span>
        </span>
        <button
          className={g.ac}
          onClick={() => onAc(odaktaki.oturum, odaktaki.slayt)}
        >
          {odakSunucuda ? "Takibe başla" : "Bu bloğu aç"}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </button>
      </div>

      <footer className={g.alt}>
        <span className={`etiket ${g.oturumEtiket}`}>
          <span className={g.oturumCizgi} style={{ background: "var(--oturum1)" }} aria-hidden />
          Oturum 1 · Salı
        </span>
        <span className={`etiket ${g.oturumEtiket}`}>
          <span className={g.oturumCizgi} style={{ background: "var(--oturum2)" }} aria-hidden />
          Oturum 2 · Perşembe
        </span>
        <span className={`etiket ${g.ipucu}`}>
          <span>{ad}</span>
          <span className={g.ipucuAyrac}>·</span>
          <span>Sürükle</span>
          <span className={g.ipucuAyrac}>·</span>
          <span>← →</span>
          <span className={g.ipucuAyrac}>·</span>
          <span>Karta tıkla</span>
        </span>
      </footer>
    </div>
  );
}
