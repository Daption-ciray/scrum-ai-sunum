"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Perde, Slayt } from "@/components/Slayt";
import { OTURUMLAR, bloklar } from "@/icerik";
import type { Durum } from "@/lib/durum";
import { anahtarDogrula, komutGonder, useYoklama } from "@/lib/yoklama";
import p from "./sunucu.module.css";

const ANAHTAR_DEPO = "sunum.sunucu.anahtar";

export default function SunucuSayfasi() {
  const [anahtar, setAnahtar] = useState<string | null>(null);
  const [hazir, setHazir] = useState(false);

  useEffect(() => {
    try {
      setAnahtar(window.localStorage.getItem(ANAHTAR_DEPO));
    } catch {
      /* depolama kapalı: her seferinde sorulur */
    }
    setHazir(true);
  }, []);

  if (!hazir) return <main className={p.kilit} />;
  if (!anahtar) return <Kilit onAc={setAnahtar} />;
  return <Panel anahtar={anahtar} onCik={() => setAnahtar(null)} />;
}

/* ------------------------------------------------------------------ kilit */

function Kilit({ onAc }: { onAc: (a: string) => void }) {
  const [deger, setDeger] = useState("");
  const [hata, setHata] = useState("");
  const [deniyor, setDeniyor] = useState(false);

  async function dene(e: React.FormEvent) {
    e.preventDefault();
    setDeniyor(true);
    setHata("");
    const gecerli = await anahtarDogrula(deger);
    setDeniyor(false);
    if (!gecerli) {
      setHata("Anahtar kabul edilmedi.");
      return;
    }
    try {
      window.localStorage.setItem(ANAHTAR_DEPO, deger);
    } catch {
      /* yok say */
    }
    onAc(deger);
  }

  return (
    <main className={p.kilit}>
      <form className={p.kilitKutu} onSubmit={dene}>
        <span className="etiket">Sunucu paneli</span>
        <h1 style={{ fontSize: "1.6rem" }}>Anahtarı girin</h1>
        <input
          className={p.girdi}
          type="password"
          value={deger}
          onChange={(e) => setDeger(e.target.value)}
          placeholder="SUNUCU_ANAHTARI"
          autoFocus
          autoComplete="off"
        />
        {hata && <p className={p.hata}>{hata}</p>}
        <button className={`${p.dugme} ${p.birincil}`} disabled={!deger || deniyor}>
          {deniyor ? "Kontrol ediliyor…" : "Aç"}
        </button>
      </form>
    </main>
  );
}

/* ------------------------------------------------------------------ panel */

function Panel({ anahtar, onCik }: { anahtar: string; onCik: () => void }) {
  const yoklama = useYoklama({ anahtar, aralik: 2500 });
  // Komut yanıtı yoklamadan hızlı gelir; sunucunun ekranı beklemesin.
  const [yerel, setYerel] = useState<Durum | null>(null);
  const [hata, setHata] = useState("");

  const durum: Durum =
    yerel && yerel.surum > yoklama.durum.surum ? yerel : yoklama.durum;

  const oturum = OTURUMLAR[durum.oturum];
  const toplam = oturum.slaytlar.length;
  const indeks = Math.min(durum.slayt, toplam - 1);
  const slayt = oturum.slaytlar[indeks];
  const sonrakiSlayt = oturum.slaytlar[indeks + 1];
  const blokListesi = useMemo(() => bloklar(durum.oturum), [durum.oturum]);

  const gonder = useCallback(
    async (govde: Record<string, unknown>) => {
      const sonuc = await komutGonder(anahtar, govde);
      if (sonuc.ok) {
        setHata("");
        if (sonuc.durum) setYerel(sonuc.durum);
      } else {
        setHata(sonuc.hata || "Komut gönderilemedi.");
      }
    },
    [anahtar],
  );

  useEffect(() => {
    document.body.dataset.oturum = String(durum.oturum);
  }, [durum.oturum]);

  // Klavye: sunum sırasında fareye dokunmak zorunda kalmayın.
  useEffect(() => {
    function tus(e: KeyboardEvent) {
      const hedef = e.target as HTMLElement | null;
      if (hedef && /^(INPUT|TEXTAREA|SELECT)$/.test(hedef.tagName)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        void gonder({ komut: "ileri" });
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        void gonder({ komut: "geri" });
      } else if (e.key.toLowerCase() === "b") {
        e.preventDefault();
        void gonder({ komut: "perde" });
      }
    }
    window.addEventListener("keydown", tus);
    return () => window.removeEventListener("keydown", tus);
  }, [gonder]);

  return (
    <div className={p.panel}>
      {/* ---------------- sol: katılımcının gördüğü ---------------- */}
      <div className={p.sol}>
        <div className={p.onizlemeBaslik}>
          <span className={`etiket ${p.canliRozet}`}>
            {durum.perde ? "Perde kapalı" : "Ekranda"}
          </span>
          <span className="etiket">{slayt.blok}</span>
          <span className="mono etiket" style={{ marginLeft: "auto" }}>
            {indeks + 1}/{toplam}
          </span>
        </div>

        <div className={p.onizleme}>
          {durum.perde ? <Perde /> : <Slayt slayt={slayt} />}
        </div>

        <div className={p.notlar}>
          <span className="etiket">Sunucu notu</span>
          {slayt.not ? (
            <p className={p.notMetin}>{slayt.not}</p>
          ) : (
            <p className={p.notYok}>Bu slayt için not yok.</p>
          )}
          <p className={p.sonraki}>
            Sıradaki: <b>{sonrakiSlayt ? baslikCikar(sonrakiSlayt) : "— oturum sonu —"}</b>
          </p>
        </div>
      </div>

      {/* ---------------- sağ: kontroller ---------------- */}
      <div className={p.sag}>
        {!yoklama.paylasimli && (
          <div className={p.uyari}>
            <b>Bellek modu.</b> Upstash bağlı değil, durum sunucusuzda paylaşılmıyor.
            Yerelde çalışır ama Vercel&apos;de katılımcılar senkron olmaz. Yayına almadan
            önce Upstash ekleyin.
          </div>
        )}
        {hata && <p className={p.hata}>{hata}</p>}

        <div className={p.satir}>
          <button className={p.dugme} onClick={() => gonder({ komut: "geri" })} disabled={indeks === 0}>
            ← Geri
          </button>
          <button
            className={`${p.dugme} ${p.birincil}`}
            onClick={() => gonder({ komut: "ileri" })}
            disabled={indeks >= toplam - 1}
          >
            İleri →
          </button>
        </div>

        <div className={p.satir}>
          <button
            className={`${p.dugme} ${durum.perde ? p.aktif : ""}`}
            onClick={() => gonder({ komut: "perde" })}
          >
            {durum.perde ? "Perdeyi aç" : "Perde (B)"}
          </button>
          <button
            className={`${p.dugme} ${durum.oturum === 1 ? p.aktif : ""}`}
            onClick={() => gonder({ komut: "oturum", deger: 1 })}
          >
            Oturum 1
          </button>
          <button
            className={`${p.dugme} ${durum.oturum === 2 ? p.aktif : ""}`}
            onClick={() => gonder({ komut: "oturum", deger: 2 })}
            title={durum.acilan < 2 ? "İkinci oturumu açar ve katılımcılara kilidini kaldırır" : undefined}
          >
            Oturum 2
          </button>
        </div>

        {/* Kilit — ikinci oturum katılımcıda kapalı mı? Provadan sonra geri
            kilitlemek için; oturum 2'ye geçmek zaten kilidi açıyor. */}
        <div className={p.satir}>
          <span className={`etiket ${p.kilitDurum}`}>
            {durum.acilan < 2
              ? "Oturum 2 katılımcıda kilitli"
              : "Oturum 2 katılımcıya açık"}
          </span>
          {durum.acilan >= 2 && (
            <button
              className={p.dugme}
              style={{ flex: "0 0 auto" }}
              onClick={() => gonder({ komut: "kilitle" })}
            >
              Geri kilitle
            </button>
          )}
        </div>

        <div className={p.kart}>
          <div className={p.sayilar}>
            <div>
              <div className={`mono ${p.sayi}`}>{yoklama.bagli}</div>
              <div className={`etiket ${p.sayiEtiket}`}>Bağlı</div>
            </div>
            <div>
              <div className={`mono ${p.sayi}`}>
                {indeks + 1}
                <span style={{ color: "var(--metin-3)", fontSize: ".55em" }}>/{toplam}</span>
              </div>
              <div className={`etiket ${p.sayiEtiket}`}>Slayt</div>
            </div>
          </div>
          {yoklama.katilimcilar && yoklama.katilimcilar.length > 0 && (
            <div className={p.adlar}>
              {yoklama.katilimcilar.map((k) => (
                <span key={k.id} className={p.ad}>
                  {k.ad}
                  <button
                    type="button"
                    className={p.at}
                    onClick={() => gonder({ komut: "at", id: k.id })}
                    title={`${k.ad} — oturumunu kapat`}
                    aria-label={`${k.ad} oturumunu kapat`}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className={p.kart}>
          <span className={`etiket ${p.kartBaslik}`}>Bloklar — {oturum.ad}</span>
          <div className={p.bloklar}>
            {blokListesi.map((b) => {
              const aktif = indeks >= b.baslangic && indeks < b.baslangic + b.adet;
              return (
                <button
                  key={b.ad + b.baslangic}
                  className={`${p.blokDugme} ${aktif ? p.blokAktif : ""}`}
                  onClick={() => gonder({ komut: "git", deger: b.baslangic })}
                >
                  <span>{b.ad}</span>
                  <span className={`mono ${p.blokSayi}`}>{b.adet}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className={p.kisayollar}>
          <span>
            <kbd>→</kbd> <kbd>Boşluk</kbd> ileri &nbsp;·&nbsp; <kbd>←</kbd> geri &nbsp;·&nbsp;{" "}
            <kbd>B</kbd> perde
          </span>
          <button
            className={p.dugme}
            style={{ marginTop: ".6rem", flex: "0 0 auto" }}
            onClick={() => {
              try {
                window.localStorage.removeItem(ANAHTAR_DEPO);
              } catch {
                /* yok say */
              }
              onCik();
            }}
          >
            Paneli kilitle
          </button>
        </div>
      </div>
    </div>
  );
}

function baslikCikar(s: { tip: string } & Record<string, unknown>): string {
  if (typeof s.baslik === "string") return s.baslik;
  if (typeof s.metin === "string") return s.metin;
  return "(başlıksız)";
}
