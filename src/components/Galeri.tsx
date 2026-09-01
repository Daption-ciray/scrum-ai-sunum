"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { blokBul, tumBloklar } from "@/icerik/bloklar";
import type { Durum } from "@/lib/durum";
import g from "./galeri.module.css";

/** Yığında kaç kart görünür duruyor. Gerisi arkada, saydam. */
const GORUNUR = 5;

/** Derinliğe göre kartın yeri. Ölçü birimi px. */
function yuva(derinlik: number, toplam: number, dar: boolean) {
  const adimX = dar ? 14 : 26;
  const adimY = dar ? 10 : 16;
  return {
    x: derinlik * adimX,
    y: -derinlik * adimY,
    z: -derinlik * adimX * 1.6,
    zIndex: toplam - derinlik,
    opacity: derinlik < GORUNUR ? 1 : 0,
  };
}

/**
 * Blok galerisi — 3B kart yığını.
 *
 * Referans React Bits'in CardSwap'i; oradan alınan yığın geometrisi ve GSAP
 * zaman çizelgesi. İki temel fark var:
 *
 *   1) Orada kartlar zamanlayıcıyla kendi kendine dönüyor. Burada dönmüyor —
 *      yığını katılımcı çeviriyor. Sunum sunucu senkronunda; ekranda
 *      kendiliğinden hareket eden bir şey olması kafa karıştırırdı.
 *   2) Eğim (skew) küçük tutuldu. Büyük açı piksel fontu bulanıklaştırıyor;
 *      yığın hissini asıl taşıyan kaydırma ve gölge zaten.
 *
 * Ön kart seçili blok. Alttaki mini dizin doğrudan atlamak için — 14 blok
 * arasında tek tek dönmek çok yavaş kalıyordu.
 */
export function Galeri({
  durum,
  ad,
  onAc,
  onCik,
}: {
  durum: Durum;
  ad: string;
  onAc: (oturum: 1 | 2, slayt: number) => void;
  /** Katılımcı adını bırakıp giriş ekranına döner. */
  onCik: () => void;
}) {
  const bloklar = useMemo(() => tumBloklar(), []);
  const sunucuBlok = blokBul(durum.oturum, durum.slayt);
  const toplam = bloklar.length;

  const [on, setOn] = useState(sunucuBlok);
  const kap = useRef<HTMLDivElement>(null);
  const kartlar = useRef<(HTMLButtonElement | null)[]>([]);
  const ilk = useRef(true);

  const onBlok = bloklar[on];
  const onKilitli = onBlok.oturum > durum.acilan;

  /* Yığını yerleştir. İlk çizimde animasyonsuz, sonra geçişli. */
  useEffect(() => {
    const azHareket = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dar = window.matchMedia("(max-width: 680px)").matches;
    const egim = azHareket || dar ? 0 : 4;

    kartlar.current.forEach((el, i) => {
      if (!el) return;
      const derinlik = (i - on + toplam) % toplam;
      const y = yuva(derinlik, toplam, dar);
      const hedef = {
        x: y.x,
        y: y.y,
        z: y.z,
        zIndex: y.zIndex,
        opacity: y.opacity,
        skewY: egim,
        xPercent: -50,
        yPercent: -50,
        transformOrigin: "center center",
        force3D: true,
      };
      if (ilk.current || azHareket) gsap.set(el, hedef);
      else gsap.to(el, { ...hedef, duration: 0.45, ease: "power3.out" });
    });
    ilk.current = false;
  }, [on, toplam]);

  const cevir = useCallback(
    (yon: 1 | -1) => setOn((o) => (o + yon + toplam) % toplam),
    [toplam],
  );

  const ac = useCallback(() => {
    if (onKilitli) return;
    onAc(onBlok.oturum, onBlok.slayt);
  }, [onKilitli, onAc, onBlok]);

  /* Klavye: ok tuşlarıyla çevir, Enter ile aç. */
  useEffect(() => {
    function tus(e: KeyboardEvent) {
      const h = e.target as HTMLElement | null;
      if (h && /^(INPUT|TEXTAREA|SELECT)$/.test(h.tagName)) return;
      if (e.key === "ArrowRight") { e.preventDefault(); cevir(1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); cevir(-1); }
      else if (e.key === "Enter") { e.preventDefault(); ac(); }
    }
    window.addEventListener("keydown", tus);
    return () => window.removeEventListener("keydown", tus);
  }, [cevir, ac]);

  /* Dokunmatikte kaydırma. Telefonda asıl gezinme yolu bu. */
  useEffect(() => {
    const node = kap.current;
    if (!node) return;
    let basla: number | null = null;
    const bas = (e: PointerEvent) => { basla = e.clientX; };
    const birak = (e: PointerEvent) => {
      if (basla === null) return;
      const fark = e.clientX - basla;
      basla = null;
      if (Math.abs(fark) > 45) cevir(fark < 0 ? 1 : -1);
    };
    node.addEventListener("pointerdown", bas);
    node.addEventListener("pointerup", birak);
    node.addEventListener("pointercancel", () => { basla = null; });
    return () => {
      node.removeEventListener("pointerdown", bas);
      node.removeEventListener("pointerup", birak);
    };
  }, [cevir]);

  return (
    <main className={g.sayfa}>
      <div className={g.ustSatir}>
        <span className={`etiket ${g.marka}`}>Scrum + AI</span>
        <span className={`etiket ${g.kimlik}`}>{ad}</span>
        <button type="button" className={g.cikis} onClick={onCik}>
          Çıkış
        </button>
        <span className={`sayi ${g.bagli}`}>
          <span className={g.baglıNokta} aria-hidden />
        </span>
      </div>

      <div className={g.sahne} ref={kap}>
        <div className={g.yigin}>
          {bloklar.map((b, i) => {
            const kilitli = b.oturum > durum.acilan;
            // Kilitli blokta eğitmen rozeti gösterilmiyor: katılımcı için
            // "burada ama giremezsin" çelişkili bir sinyal.
            const sunucuda = i === sunucuBlok && !kilitli;
            const onde = i === on;

            return (
              <button
                key={b.no}
                ref={(el) => { kartlar.current[i] = el; }}
                type="button"
                className={`${g.kart} ${sunucuda ? g.burada : ""} ${kilitli ? g.kilitli : ""}`}
                onClick={() => (onde ? ac() : setOn(i))}
                tabIndex={onde ? 0 : -1}
                aria-hidden={!onde}
                aria-label={
                  kilitli
                    ? `${b.ad} — kilitli, ikinci oturumda açılacak`
                    : `${b.ad}, ${b.sure} dakika${sunucuda ? " — eğitmen burada" : ""}`
                }
              >
                <span className={`etiket ${g.no}`}>
                  {String(b.no).padStart(2, "0")}
                </span>
                <span className={g.ad}>{b.ad}</span>
                <span className={g.alt}>
                  <span className={`sayi ${g.sure}`}>{b.sure} DK</span>
                  {kilitli && <span className={`etiket ${g.kilitEtiket}`}>Kilitli</span>}
                  {sunucuda && (
                    <span className={`etiket ${g.buradaEtiket}`}>Eğitmen burada</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className={`${g.ok} ${g.okSol}`}
          onClick={() => cevir(-1)}
          aria-label="Önceki blok"
        >
          ‹
        </button>
        <button
          type="button"
          className={`${g.ok} ${g.okSag}`}
          onClick={() => cevir(1)}
          aria-label="Sonraki blok"
        >
          ›
        </button>
      </div>

      <div className={g.altSatir}>
        {/* Mini dizin: 14 blok arasında tek tek dönmek yavaş kalıyor. */}
        <ol className={g.dizin}>
          {bloklar.map((b, i) => (
            <li key={b.no}>
              <button
                type="button"
                className={`${g.dizinKare} ${i === on ? g.dizinAktif : ""} ${
                  i === sunucuBlok && b.oturum <= durum.acilan ? g.dizinSunucu : ""
                } ${b.oturum > durum.acilan ? g.dizinKilitli : ""}`}
                onClick={() => setOn(i)}
                aria-label={`${b.no}. blok: ${b.ad}`}
              />
            </li>
          ))}
        </ol>

        {on !== sunucuBlok && (
          <button type="button" className={g.sunucuyaGit} onClick={() => setOn(sunucuBlok)}>
            Eğitmene git
          </button>
        )}
      </div>

      <p className={`etiket ${g.dipnot}`}>
        {onKilitli
          ? "Bu blok kilitli — eğitmen ikinci oturumu açtığında girilir."
          : "Karta bas ve bloğu aç · ← → ile çevir"}
      </p>
    </main>
  );
}
