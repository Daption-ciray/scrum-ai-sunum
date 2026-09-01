"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Kabuk } from "@/components/Kabuk";
import { Galeri } from "@/components/Galeri";
import { Perde, Slayt } from "@/components/Slayt";
import { OTURUMLAR } from "@/icerik";
import { blokBul, tumBloklar } from "@/icerik/bloklar";
import { kimlikAl, kimlikSil } from "@/lib/kimlik";
import { ATILMA_SURESI } from "@/lib/durum";
import { useYoklama } from "@/lib/yoklama";
import k from "@/components/kabuk.module.css";

/** Katılımcının kendi konumu. null = sunucuyu takip ediyor. */
type Yerel = { oturum: 1 | 2; slayt: number } | null;

export default function Oda() {
  const router = useRouter();
  const [kimlik, setKimlik] = useState<{ id: string; ad: string } | null>(null);
  /* Slayt görünümü VARSAYILAN, galeri değil.
     Galeriyle açılıyordu ve katılımcı bir karta tıklamadan sunumu hiç
     görmüyordu — sunucu "slaytlar sizin ekranınızda" derken katılımcı hareketsiz
     bir kart yığınına bakıyordu. Quiz veya atölye açıldığında da katılamıyordu.
     Galeri bir tık uzakta duruyor; harita olarak değerli ama iniş sayfası değil. */
  const [gorunum, setGorunum] = useState<"galeri" | "slayt">("slayt");
  const [yerel, setYerel] = useState<Yerel>(null);

  useEffect(() => {
    const kk = kimlikAl();
    if (!kk) router.replace("/");
    else setKimlik(kk);
  }, [router]);

  const { durum, saglikli, yukleniyor } = useYoklama({
    id: kimlik?.id,
    ad: kimlik?.ad,
    // Sunucu bu katılımcının oturumunu kapattıysa kimlik silinip
    // giriş ekranına dönülüyor. Kısa süreli bir kapatma; kalıcı yasak değil.
    onAtildi: () => {
      // Süre de kaydediliyor: giriş ekranı "şu kadar saniye sonra
      // girebilirsiniz" diyebilsin. Bu olmadan katılımcı sessizce düşüyor,
      // adını tekrar yazıyor ve aynı kimlikle yeniden atılıyordu.
      kimlikSil(ATILMA_SURESI);
      router.replace("/");
    },
  });

  // Kilitli oturuma düşülmüşse takibe geri dön. Sunucu ikinci oturumu
  // tekrar kilitlerse orada gezinen katılımcı boşlukta kalmasın.
  useEffect(() => {
    if (yerel && yerel.oturum > durum.acilan) setYerel(null);
  }, [durum.acilan, yerel]);

  /* Quiz veya atölye AÇILDIĞI anda katılımcıyı sunucunun yanına çek.
     Serbest gezinme bir kolaylık; cevaplanacak bir şey açıldığında ise
     katılımcının başka yerde olması doğrudan katılım kaybı. Yalnızca
     kapalıdan açığa geçişte tetikleniyor, sürekli değil — açıkken geri
     gezinmek isterse engellenmiyor. */
  const oncekiAcik = useRef(false);
  useEffect(() => {
    const acik = durum.quizAcik || durum.istemAcik;
    if (acik && !oncekiAcik.current) {
      setGorunum("slayt");
      setYerel(null);
    }
    oncekiAcik.current = acik;
  }, [durum.quizAcik, durum.istemAcik]);

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
        ad={kimlik.ad}
        onCik={() => {
          /* Sunucuya haber ver: liste 30 dakikalık pencereye göre süzülüyor,
             haber verilmezse çıkan kişi panelde yarım saat "odada" kalır.
             `keepalive` — sayfa hemen değişiyor, istek yarıda kalmasın. */
          void fetch("/api/buradayim", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ id: kimlik.id, ayril: true }),
            keepalive: true,
          }).catch(() => {});
          // Yalnızca ad siliniyor; katılımcı kimliği localStorage'da kalıyor,
          // aynı cihazdan tekrar girildiğinde aynı kişi olarak dönülüyor.
          kimlikSil();
          router.replace("/");
        }}
        onAc={(o, s) => {
          if (o > durum.acilan) return; // kilitli oturum: girilmez
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
        slayt={indeks}
        toplam={toplam}
        saglikli={saglikli}
        galeriyeDon={() => setGorunum("galeri")}
        uyari={
          kaydi ? (
            <div className={k.kaydiSerit}>
              <span className={k.kaydiMetin}>
                Kendi başınıza geziyorsunuz. Eğitmen şu an{" "}
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
        {durum.perde && !kaydi ? <Perde /> : <Slayt slayt={slayt} durum={durum} />}
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
