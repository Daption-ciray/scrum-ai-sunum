"use client";

import { useEffect, useRef, useState } from "react";
import type { Slayt } from "@/icerik/tipler";
import type { Durum } from "@/lib/durum";
import { kimlikAl } from "@/lib/kimlik";
import a from "./atolye.module.css";

const SINIR = 2000;

/** Gönderilen istem cihazda da tutuluyor: sayfa yenilenirse kaybolmasın. */
const yerelAnahtar = (slaytId: string) => `sunum.istem.${slaytId}`;

/* Kayıt sıfırlama damgasıyla birlikte tutuluyor. Damga uyuşmuyorsa kayıt
   yok sayılıyor: sunucu sıfırladığında sunucu tarafı boşalıyordu ama cihazdaki
   metin duruyor, katılımcı "gönderildi" ekranında kilitli kalıyordu. Provadan
   sonra gerçek turda kimse yazamazdı. */
function yerelOku(slaytId: string, tur: number): string | null {
  try {
    const ham = window.localStorage.getItem(yerelAnahtar(slaytId));
    if (!ham) return null;
    const kayit = JSON.parse(ham) as { tur?: number; metin?: string };
    return kayit?.tur === tur && typeof kayit.metin === "string" ? kayit.metin : null;
  } catch {
    // Eski biçim (düz metin) da buraya düşüyor; yok sayılması doğru.
    return null;
  }
}
function yerelYaz(slaytId: string, metin: string, tur: number) {
  try {
    window.localStorage.setItem(yerelAnahtar(slaytId), JSON.stringify({ tur, metin }));
  } catch {
    /* gizli sekme: gönderim yine sunucuda duruyor, sorun değil */
  }
}

/**
 * Atölye: katılımcı kendi istemini yazıp gönderiyor.
 *
 * Gönderim SUNUCU AÇANA KADAR kilitli ve gönderdikten sonra değiştirilemiyor
 * (`HSETNX`). İkincisi kasıtlı: sıralama puanı görüp düzeltilebilseydi
 * karşılaştırma anlamını kaybederdi.
 */
export function Atolye({
  slayt,
  durum,
}: {
  slayt: Extract<Slayt, { tip: "atolye" }>;
  durum?: Durum;
}) {
  const [metin, setMetin] = useState("");
  const [gonderilen, setGonderilen] = useState<string | null>(null);
  const [gonderiliyor, setGonderiliyor] = useState(false);
  const [hata, setHata] = useState<string | null>(null);
  const kutu = useRef<HTMLTextAreaElement | null>(null);
  const [kimlikVar, setKimlikVar] = useState(true);

  const acik = durum?.istemAcik ?? false;
  const tur = durum?.sifirlandi ?? 0;

  // Damga değişirse (sunucu sıfırladı) yerel kayıt geçersiz sayılıyor ve
  // katılımcı yeniden yazabiliyor.
  useEffect(() => {
    setGonderilen(yerelOku(slayt.id, tur));
    setKimlikVar(Boolean(kimlikAl()?.id));
  }, [slayt.id, tur]);

  // Sunucu gönderimi açtığı anda imleç kutuya gitsin; katılımcı aramasın.
  useEffect(() => {
    if (acik && !gonderilen) kutu.current?.focus();
  }, [acik, gonderilen]);

  const gonder = async () => {
    const kimlik = kimlikAl();
    if (!kimlik?.id || !kimlik.ad) {
      setHata("Kimlik bulunamadı. Sayfayı yenileyip adınızı tekrar girin.");
      return;
    }
    const temiz = metin.trim();
    if (!temiz) return;

    setGonderiliyor(true);
    setHata(null);
    try {
      const yanit = await fetch("/api/istem", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id: kimlik.id, ad: kimlik.ad, metin: temiz }),
      });
      const veri = (await yanit.json().catch(() => ({}))) as {
        kabul?: boolean;
        hata?: string;
      };
      if (!yanit.ok) {
        setHata(veri.hata ?? "Gönderilemedi.");
        return;
      }
      // kabul=false: bu kişi zaten göndermiş. Yine de kilitliyoruz, çünkü
      // sunucudaki kayıt geçerli olan.
      yerelYaz(slayt.id, temiz, tur);
      setGonderilen(temiz);
    } catch {
      setHata("Sunucuya ulaşılamadı. Tekrar deneyin.");
    } finally {
      setGonderiliyor(false);
    }
  };

  const kalan = SINIR - metin.length;

  return (
    <div className={a.sarma}>
      <h2 className={a.baslik}>{slayt.baslik}</h2>
      {slayt.giris && <p className={a.giris}>{slayt.giris}</p>}

      <p className={a.gorev}>{slayt.gorev}</p>

      {/* Uyarı kutunun ÜSTÜNDE ve sessiz değil. Katılımcının gerçek veri
          yazabileceği tek an burası; kural sonraki slaytlardan birinde
          değil, tam burada durmalı. */}
      {slayt.uyari && (
        <p className={a.uyari}>
          <span className={`etiket ${a.uyariEtiket}`}>Yazmadan önce</span>
          {slayt.uyari}
        </p>
      )}

      {/* Kalıp kutunun üstünde: katılımcı yazarken önceki slayta dönemiyor. */}
      {slayt.parcalar && slayt.parcalar.length > 0 && (
        <div className={a.parcalar}>
          {slayt.parcalar.map((p) => (
            <span key={p} className={`etiket ${a.parca}`}>
              {p}
            </span>
          ))}
        </div>
      )}

      {gonderilen ? (
        <div className={a.gonderildi}>
          <span className={`etiket ${a.rozet}`}>Gönderildi</span>
          <pre className={a.kendiIstem}>{gonderilen}</pre>
          <p className={a.ipucu}>
            İlk gönderim geçerli — değiştirilemiyor. Sıralamayı eğitmen ekranında
            birlikte göreceğiz.
          </p>
        </div>
      ) : (
        <>
          <textarea
            ref={kutu}
            className={a.kutu}
            value={metin}
            onChange={(e) => setMetin(e.target.value.slice(0, SINIR))}
            placeholder={
              acik
                ? (slayt.yerTutucu ?? "İsteminizi buraya yazın…")
                : "Eğitmen başlatana kadar bekleyin."
            }
            disabled={!acik || gonderiliyor}
            rows={9}
            spellCheck={false}
          />
          <div className={a.alt}>
            <span className={`mono ${a.sayac}`}>{kalan}</span>
            <button
              type="button"
              className={a.dugme}
              onClick={gonder}
              disabled={!acik || gonderiliyor || !metin.trim()}
            >
              {gonderiliyor ? "Gönderiliyor…" : "Gönder"}
            </button>
          </div>
          {!acik && <p className={a.ipucu}>Gönderim eğitmen açtığında etkinleşir.</p>}
          {acik && !kimlikVar && (
            <p className={a.ipucu}>
              Bu ekran eğitmen görünümü — gönderim yalnızca katılımcı sayfasından
              yapılabilir.
            </p>
          )}
          {slayt.ipucu && acik && <p className={a.ipucu}>{slayt.ipucu}</p>}
          {hata && <p className={a.hata}>{hata}</p>}
        </>
      )}

      {slayt.kaynak && <p className={a.kaynak}>{slayt.kaynak}</p>}
    </div>
  );
}
