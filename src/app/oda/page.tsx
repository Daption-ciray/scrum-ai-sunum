"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Kabuk } from "@/components/Kabuk";
import { Galeri } from "@/components/Galeri";
import { Perde, Slayt } from "@/components/Slayt";
import { OTURUMLAR } from "@/icerik";
import { blokBul, tumBloklar } from "@/icerik/bloklar";
import { kimlikAl } from "@/lib/kimlik";
import { useYoklama } from "@/lib/yoklama";
import k from "@/components/kabuk.module.css";

/** Katılımcının kendi konumu. null = sunucuyu takip ediyor. */
type Yerel = { oturum: 1 | 2; slayt: number } | null;

export default function Oda() {
  const router = useRouter();
  const [kimlik, setKimlik] = useState<{ id: string; ad: string } | null>(null);
  const [gorunum, setGorunum] = useState<"galeri" | "slayt">("galeri");
  const [yerel, setYerel] = useState<Yerel>(null);

  useEffect(() => {
    const kk = kimlikAl();
    if (!kk) router.replace("/");
    else setKimlik(kk);
  }, [router]);

  const { durum, bagli, saglikli, yukleniyor } = useYoklama({
    id: kimlik?.id,
    ad: kimlik?.ad,
    aralik: 1500,
  });

  // Sunucu katılımcının durduğu slayda gelirse takip kendiliğinden yeniden başlar.
  useEffect(() => {
    if (yerel && yerel.oturum === durum.oturum && yerel.slayt === durum.slayt) {
      setYerel(null);
    }
  }, [durum.oturum, durum.slayt, yerel]);

  const gosterilen = yerel ?? { oturum: durum.oturum, slayt: durum.slayt };
  const oturum = OTURUMLAR[gosterilen.oturum];
  const toplam = oturum.slaytlar.length;
  const indeks = Math.min(Math.max(gosterilen.slayt, 0), toplam - 1);
  const slayt = oturum.slaytlar[indeks];
  const kaydi = yerel !== null;

  const bloklar = useMemo(() => tumBloklar(), []);
  const sunucuBlok = bloklar[blokBul(durum.oturum, durum.slayt)];

  useEffect(() => {
    document.body.dataset.oturum = String(gosterilen.oturum);
  }, [gosterilen.oturum]);

  const gez = useCallback(
    (yon: -1 | 1) => {
      const su = yerel ?? { oturum: durum.oturum, slayt: durum.slayt };
      const uzunluk = OTURUMLAR[su.oturum].slaytlar.length;
      const hedef = Math.min(Math.max(su.slayt + yon, 0), uzunluk - 1);
      if (hedef !== su.slayt) setYerel({ oturum: su.oturum, slayt: hedef });
    },
    [yerel, durum.oturum, durum.slayt],
  );

  // Serbest gezinmede ok tuşları katılımcının kendi kontrolü.
  useEffect(() => {
    if (gorunum !== "slayt") return;
    function tus(e: KeyboardEvent) {
      const h = e.target as HTMLElement | null;
      if (h && /^(INPUT|TEXTAREA|SELECT)$/.test(h.tagName)) return;
      if (e.key === "ArrowRight") { e.preventDefault(); gez(1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); gez(-1); }
      else if (e.key === "Escape") { e.preventDefault(); setGorunum("galeri"); }
    }
    window.addEventListener("keydown", tus);
    return () => window.removeEventListener("keydown", tus);
  }, [gorunum, gez]);

  if (!kimlik) return null;

  /* ---------------- galeri ---------------- */
  if (gorunum === "galeri") {
    return (
      <Galeri
        durum={durum}
        bagli={bagli}
        ad={kimlik.ad}
        onAc={(o, s) => {
          // Sunucunun bulunduğu bloğa girildiyse takip modunda kal.
          const sunucudaMi = o === durum.oturum && blokBul(o, s) === blokBul(durum.oturum, durum.slayt);
          setYerel(sunucudaMi ? null : { oturum: o, slayt: s });
          setGorunum("slayt");
        }}
      />
    );
  }

  /* ---------------- slayt ---------------- */
  return (
    <>
      <Kabuk
        oturum={gosterilen.oturum}
        oturumAdi={oturum.ad}
        blok={yukleniyor ? "Bağlanıyor…" : slayt.blok}
        slayt={indeks}
        toplam={toplam}
        saglikli={saglikli}
        sol={
          <button className={k.galeriDugme} onClick={() => setGorunum("galeri")}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            Galeri
          </button>
        }
        sag={<span className="etiket">{kimlik.ad}</span>}
        uyari={
          kaydi ? (
            <div className={k.kaydiSerit}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--oturum2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v4l2.5 2.5" />
              </svg>
              <span className={k.kaydiMetin}>
                Kendi başınıza geziyorsunuz. Sunucu şu an{" "}
                <b>
                  {String(sunucuBlok.no).padStart(2, "0")} · {sunucuBlok.ad}
                </b>{" "}
                bloğunda.
              </span>
              <button className={k.kaydiDugme} onClick={() => setYerel(null)}>
                Takibe dön
              </button>
            </div>
          ) : undefined
        }
      >
        {durum.perde && !kaydi ? <Perde /> : <Slayt slayt={slayt} />}
      </Kabuk>

      {kaydi && (
        <>
          <button
            className={`${k.gezOk} ${k.gezSol}`}
            onClick={() => gez(-1)}
            disabled={indeks === 0}
            aria-label="Önceki slayt"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            className={`${k.gezOk} ${k.gezSag}`}
            onClick={() => gez(1)}
            disabled={indeks >= toplam - 1}
            aria-label="Sonraki slayt"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </>
      )}
    </>
  );
}
