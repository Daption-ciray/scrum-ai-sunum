"use client";

import type { ReactNode } from "react";
import k from "./kabuk.module.css";

export function Kabuk({
  oturum,
  oturumAdi,
  blok,
  slayt,
  toplam,
  saglikli,
  sol,
  sag,
  uyari,
  children,
}: {
  oturum: 1 | 2;
  oturumAdi: string;
  blok: string;
  slayt: number;
  toplam: number;
  saglikli: boolean;
  sol?: ReactNode;
  sag?: ReactNode;
  uyari?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={k.kabuk}>
      <header className={k.ust}>
        {sol}
        <span className={`etiket ${k.oturumRozet}`}>Oturum {oturum}</span>
        <span className={k.blok} title={`${oturumAdi} — ${blok}`}>
          {blok}
        </span>
        <div className={k.sag}>
          {sag}
          <span className={`mono etiket ${k.sayac}`}>
            {slayt + 1}/{toplam}
          </span>
          <span
            className={`etiket ${k.durumNoktasi} ${saglikli ? "" : k.kopuk}`}
            title={saglikli ? "Bağlantı iyi" : "Bağlantı koptu, yeniden deniyorum"}
          >
            {saglikli ? "Canlı" : "Kopuk"}
          </span>
        </div>
      </header>

      <div className={k.ilerleme} aria-hidden>
        {Array.from({ length: toplam }, (_, i) => (
          <span
            key={i}
            className={`${k.dilim} ${i < slayt ? k.dilimGecti : ""} ${i === slayt ? k.dilimAktif : ""}`}
          />
        ))}
      </div>

      {uyari && <div className={k.uyariSerit}>{uyari}</div>}

      {children}
    </div>
  );
}
