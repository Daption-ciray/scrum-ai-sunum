import type { CSSProperties } from "react";
import type { Slayt } from "@/icerik/tipler";
import y from "./sayilar.module.css";

/**
 * Büyük rakam slaytı.
 *
 * Deste tablo ve madde listesinden ibaret kalınca tekdüzeleşiyor. Bu tip
 * ritmi kırmak için var: tek şey söyler, büyük söyler. Rakamlar sırayla
 * "sayarak" beliriyor — 8-bit skor ekranı hissi.
 *
 * `etki` alanı olan kartın içine yaşayan bir katman giriyor. İkisi de
 * rakamın ANLAMINI canlandırıyor, süs değil:
 *   `su`       — kart doluyor, çatlıyor, ağır ağır boşalıyor
 *   `elektrik` — akım dalgalanması, kart bir an için tersine dönüyor
 *
 * Katmanlar CSS animasyonu; `requestAnimationFrame` KULLANILMIYOR. Arka plan
 * sekmesinde rAF hiç çalışmıyor ve bu sitede bir kez donmuş karta yol açtı
 * (bkz. CLAUDE.md, `cevir` kartı). CSS animasyonu arka planda duraklasa da
 * takılı kalmıyor, sekme geri gelince kaldığı yerden akıyor.
 */
export function Sayilar({ slayt }: { slayt: Extract<Slayt, { tip: "sayi" }> }) {
  return (
    <div className={y.sarma}>
      {slayt.baslik && <h2 className={y.baslik}>{slayt.baslik}</h2>}
      {slayt.giris && <p className={y.giris}>{slayt.giris}</p>}

      <div className={y.izgara} data-adet={slayt.sayilar.length}>
        {slayt.sayilar.map((s, i) => (
          <div
            key={s.aciklama}
            className={`${y.kutu} ${s.etki ? y.etkili : ""}`}
            style={{ "--g": `${i * 0.18}s` } as CSSProperties}
          >
            {s.etki === "su" && <SuKatmani />}
            {s.etki === "elektrik" && <ElektrikKatmani />}

            <span className={y.deger}>
              {s.deger}
              {s.birim && <span className={y.birim}>{s.birim}</span>}
            </span>
            <span className={y.aciklama}>{s.aciklama}</span>
          </div>
        ))}
      </div>

      {slayt.kaynak && <p className={y.kaynak}>{slayt.kaynak}</p>}
    </div>
  );
}

/**
 * Su katmanı: doluyor → çatlıyor → boşalıyor.
 *
 * Yükseklik `steps()` ile iniyor — su akmıyor, blok blok çekiliyor; sayfanın
 * geri kalanındaki 8-bit dili bozulmasın diye. Çatlak ve damlalar suyun
 * seviyesiyle AYNI zamanlamayı paylaşıyor: çatlak belirmeden su inmiyor,
 * yoksa sebep sonuç ters görünüyor.
 */
function SuKatmani() {
  return (
    <div className={y.suKatman} aria-hidden>
      <div className={y.su} />
      <svg className={y.catlak} viewBox="0 0 14 52" preserveAspectRatio="none">
        <path d="M7 0 L4 7 L9 13 L3 20 L8 27 L2 34 L7 41 L4 47 L6 52" />
      </svg>
      <span className={`${y.damla} ${y.damla1}`} />
      <span className={`${y.damla} ${y.damla2}`} />
      <span className={`${y.damla} ${y.damla3}`} />
    </div>
  );
}

/**
 * Elektrik katmanı: akım dalgalanması.
 *
 * Renk YOK — su mavisi bu kartta bulunmuyor, kart siyah-beyaz kalıyor.
 * Çarpma anında beyaz bir katman `mix-blend-mode: difference` ile kartı
 * tersine çeviriyor: bir anlığına zemin siyah, rakam beyaz. Şimşek aynı
 * ritimde çakıyor.
 */
function ElektrikKatmani() {
  return (
    <div className={y.elektrikKatman} aria-hidden>
      <svg className={y.simsek} viewBox="0 0 12 20">
        <path d="M7 0 L2 11 L5 11 L4 20 L10 8 L6 8 Z" />
      </svg>
      <div className={y.sok} />
    </div>
  );
}
