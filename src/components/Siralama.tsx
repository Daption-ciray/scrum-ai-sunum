"use client";

import { useEffect, useState } from "react";
import type { Slayt } from "@/icerik/tipler";
import { kimlikAl } from "@/lib/kimlik";
import s from "./siralama.module.css";

type Satir = {
  id: string;
  ad: string;
  quiz: number;
  istem: number;
  toplam: number;
  dogru: number;
  soruSayisi: number;
};

const ILK = 10;

/**
 * Oturum sonu sıralaması.
 *
 * İlk on herkese açık. Listede olmayan katılımcı kendi satırını altta ayrıca
 * görüyor — 75 kişilik odada otuz beşinci sıradaki kişiyi kaydırarak
 * aratmak yerine kendi yerini doğrudan gösteriyoruz, ama tam listeyi
 * yayınlamıyoruz: sondan birinci olmak kimsenin ekranında yazmasın.
 */
export function Siralama({ slayt }: { slayt: Extract<Slayt, { tip: "siralama" }> }) {
  const [satirlar, setSatirlar] = useState<Satir[] | null>(null);
  const [benimId, setBenimId] = useState<string | null>(null);

  useEffect(() => {
    setBenimId(kimlikAl()?.id ?? null);
  }, []);

  useEffect(() => {
    let durdu = false;
    const sor = async () => {
      try {
        const y = await fetch(
          `/api/siralama?quiz=${encodeURIComponent(slayt.quizSlayt)}&atolye=${encodeURIComponent(slayt.atolyeSlayt)}`,
          { cache: "no-store" },
        );
        if (!y.ok) return;
        const v = (await y.json()) as { satirlar: Satir[] };
        if (!durdu) setSatirlar(v.satirlar);
      } catch {
        /* geçici hata: bir sonraki tur yakalar */
      }
    };
    void sor();
    const sayac = setInterval(sor, 4000);
    return () => {
      durdu = true;
      clearInterval(sayac);
    };
  }, [slayt.quizSlayt, slayt.atolyeSlayt]);

  const ilk = satirlar?.slice(0, ILK) ?? [];
  const benimSira = satirlar?.findIndex((r) => r.id === benimId) ?? -1;
  const benim = benimSira >= ILK ? satirlar?.[benimSira] : null;

  return (
    <div className={s.sarma}>
      <h2 className={s.baslik}>{slayt.baslik}</h2>
      {slayt.giris && <p className={s.giris}>{slayt.giris}</p>}

      <div className={s.tabloSar}>
        <table className={s.tablo}>
          <thead>
            <tr>
              <th className={s.sagaDayali}>#</th>
              <th>Katılımcı</th>
              <th className={s.sagaDayali}>Bilgi</th>
              <th className={s.sagaDayali}>İstem</th>
              <th className={s.sagaDayali}>Toplam</th>
            </tr>
          </thead>
          <tbody>
            {ilk.map((r, i) => (
              <tr key={r.id} className={r.id === benimId ? s.benim : undefined}>
                <td className={`mono ${s.sagaDayali}`}>{i + 1}</td>
                <td>{r.ad}</td>
                <td className={`mono ${s.sagaDayali}`}>
                  {r.quiz}
                  <span className={s.alt}>
                    {r.dogru}/{r.soruSayisi}
                  </span>
                </td>
                <td className={`mono ${s.sagaDayali}`}>{r.istem}</td>
                <td className={`mono ${s.sagaDayali} ${s.toplam}`}>{r.toplam}</td>
              </tr>
            ))}
            {benim && (
              <tr className={`${s.benim} ${s.ayrik}`}>
                <td className={`mono ${s.sagaDayali}`}>{benimSira + 1}</td>
                <td>{benim.ad}</td>
                <td className={`mono ${s.sagaDayali}`}>
                  {benim.quiz}
                  <span className={s.alt}>
                    {benim.dogru}/{benim.soruSayisi}
                  </span>
                </td>
                <td className={`mono ${s.sagaDayali}`}>{benim.istem}</td>
                <td className={`mono ${s.sagaDayali} ${s.toplam}`}>{benim.toplam}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {satirlar && satirlar.length === 0 && (
        <p className={s.ipucu}>Henüz gönderim yok.</p>
      )}

      <p className={s.ipucu}>
        <b>Bilgi</b> doğru cevap oranından geliyor. <b>İstem</b> yazdığınız
        istemin beş parçalı kalıba ne kadar uyduğundan — kalıp puanı, kalite
        puanı değil. Eşitlikte önce cevaplayan önde.
      </p>
      {slayt.kaynak && <p className={s.kaynak}>{slayt.kaynak}</p>}
    </div>
  );
}
