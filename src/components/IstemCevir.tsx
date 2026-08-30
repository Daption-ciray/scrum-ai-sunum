"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Slayt } from "@/icerik/tipler";
import c from "./cevir.module.css";

/* Şifre çözülme hissi veren glif havuzu. Piksel fontta okunaklı kalsın diye
   yalnızca büyük harf, rakam ve düz noktalama var — Türkçe aksanlı harf yok,
   yoksa çözülme sırasında metin "neredeyse doğru" görünüp etkiyi kaybediyor. */
const GLIFLER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>-_/\\[]{}=+*^?#@$%&";

/** Kaç rAF karesinde bir glif değişsin. 3 ≈ 20 fps — 8-bit adımlı his. */
const KARE_ADIMI = 3;

type Plan = { bas: number; sure: number };

/**
 * Kötü istem → etkili istem. Kart tıklanınca metin karakter karakter
 * çözülüyormuş gibi hedefe dönüşüyor.
 *
 * Çözülme SIRALI değil, sıralıya YAKIN: her karakterin başlangıcı soldan sağa
 * kayan bir taban artı rastgele bir sapma. Tam sıralı olsa yazı makinesi gibi
 * görünürdü; tamamen rastgele olsa kaynayan bir bulanıklık olurdu. Aradaki
 * bu karışım "çözülüyor" hissini veren şey.
 *
 * Senkron sunumda kart yerel: katılımcı kendi cihazında çevirir, sunucuya
 * bildirilmez. Bilerek — herkesin aynı anda çevirmesi gerekmiyor, kendi
 * hızında deneyecek.
 */
export function IstemCevir({ slayt }: { slayt: Extract<Slayt, { tip: "cevir" }> }) {
  const [acik, setAcik] = useState(false);
  const [metin, setMetin] = useState(slayt.on.metin);
  const [cozuluyor, setCozuluyor] = useState(false);
  const kareRef = useRef<number | null>(null);

  const durdur = () => {
    if (kareRef.current !== null) cancelAnimationFrame(kareRef.current);
    kareRef.current = null;
  };

  // Slayt değişince kart ön yüze dönsün; sunucu geri gelip tekrar gösterebilir.
  useEffect(() => {
    durdur();
    setAcik(false);
    setCozuluyor(false);
    setMetin(slayt.on.metin);
    return durdur;
  }, [slayt.id, slayt.on.metin]);

  const cevir = useCallback(() => {
    if (cozuluyor) return;
    const kaynak = acik ? slayt.arka.metin : slayt.on.metin;
    const hedef = acik ? slayt.on.metin : slayt.arka.metin;

    // Hareket azaltma açıksa çözülme yok, doğrudan çevir.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setMetin(hedef);
      setAcik((a) => !a);
      return;
    }

    const n = Math.max(kaynak.length, hedef.length);
    const plan: Plan[] = Array.from({ length: n }, (_, i) => ({
      bas: Math.floor((i / n) * 26) + Math.floor(Math.random() * 14),
      sure: 5 + Math.floor(Math.random() * 12),
    }));

    setCozuluyor(true);
    let kare = 0;
    let alt = 0;

    const tik = () => {
      alt += 1;
      if (alt % KARE_ADIMI === 0) {
        let cikti = "";
        let biten = 0;
        for (let i = 0; i < n; i++) {
          const h = hedef[i] ?? "";
          const k = kaynak[i] ?? "";
          const { bas, sure } = plan[i];
          if (kare < bas) cikti += k;
          else if (kare < bas + sure) {
            // Satır yapısı çözülme boyunca hedefinkine göre oturuyor;
            // yoksa metin her karede zıplar ve okunmaz olur.
            cikti += h === "\n" ? "\n" : GLIFLER[(Math.random() * GLIFLER.length) | 0];
          } else {
            cikti += h;
            biten += 1;
          }
        }
        setMetin(cikti);
        kare += 1;
        if (biten >= n) {
          setCozuluyor(false);
          setAcik((a) => !a);
          kareRef.current = null;
          return;
        }
      }
      kareRef.current = requestAnimationFrame(tik);
    };

    kareRef.current = requestAnimationFrame(tik);
  }, [acik, cozuluyor, slayt.on.metin, slayt.arka.metin]);

  const yuz = acik ? slayt.arka : slayt.on;
  const durum = cozuluyor ? c.cozuluyor : acik ? c.iyi : c.kotu;

  return (
    <div className={c.sarma}>
      <h2 className={c.baslik}>{slayt.baslik}</h2>
      {slayt.giris && <p className={c.giris}>{slayt.giris}</p>}

      <button
        type="button"
        className={`${c.kart} ${durum}`}
        onClick={cevir}
        aria-live="polite"
        aria-label={
          cozuluyor
            ? "İstem çözülüyor"
            : `${yuz.etiket}. Çevirmek için tıklayın.`
        }
      >
        <span className={`etiket ${c.rozet}`}>
          {cozuluyor ? "Çözülüyor…" : yuz.etiket}
        </span>
        <pre className={c.metin}>{metin}</pre>
      </button>

      <p className={c.ipucu}>
        {slayt.ipucu ?? "Karta tıklayın."}
      </p>
      {slayt.kaynak && <p className={c.kaynak}>{slayt.kaynak}</p>}
    </div>
  );
}
