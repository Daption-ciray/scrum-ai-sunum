import type { CSSProperties } from "react";
import type { Slayt as SlaytTipi, SutunIcerik } from "@/icerik/tipler";
import { RollerAkisi } from "./RollerAkisi";
import { Sayilar } from "./Sayilar";
import { Adimlar } from "./Adimlar";
import { Terazi } from "./Terazi";
import { Kartlar } from "./Kartlar";
import { Alinti } from "./Alinti";
import { OlgunlukEgrisi } from "./OlgunlukEgrisi";
import s from "./slayt.module.css";

export function Perde() {
  return (
    <div className={s.perde}>
      <span className={s.perdeNokta} aria-hidden />
      <span className="etiket">Ara</span>
    </div>
  );
}

export function Slayt({ slayt }: { slayt: SlaytTipi }) {
  return (
    <div className={s.sahne}>
      {/* key: slayt değişince giriş animasyonu yeniden çalışsın */}
      <div className={s.icerik} key={slayt.id}>
        <Govde slayt={slayt} />
      </div>
    </div>
  );
}

function Govde({ slayt }: { slayt: SlaytTipi }) {
  switch (slayt.tip) {
    case "kapak":
      return (
        <div className={s.kapak}>
          <p className={`etiket ${s.kapakUst}`}>{slayt.ust}</p>
          <h1 className={s.kapakBaslik}>{slayt.baslik}</h1>
          {slayt.alt && <p className={s.kapakAlt}>{slayt.alt}</p>}
          {slayt.meta && <p className={s.kapakMeta}>{slayt.meta}</p>}
        </div>
      );

    case "bolum":
      return (
        <div className={s.bolum}>
          <p className={`mono ${s.bolumNumara}`}>{slayt.numara}</p>
          <h2 className={s.bolumBaslik}>{slayt.baslik}</h2>
          {slayt.ozet && <p className={s.bolumOzet}>{slayt.ozet}</p>}
        </div>
      );

    case "madde":
      return (
        <div>
          <h2 className={s.baslik}>{slayt.baslik}</h2>
          {slayt.giris ? (
            <p className={s.giris}>{slayt.giris}</p>
          ) : (
            <div className={s.baslikBosluk} />
          )}
          <ul className={s.maddeler}>
            {slayt.maddeler.map((m, i) => (
              <li key={i} className={s.madde}>
                <span className={s.maddeIsaret} aria-hidden />
                <span className={s.maddeAna}>{m.ana}</span>
                {m.alt && <span className={s.maddeAlt}>{m.alt}</span>}
              </li>
            ))}
          </ul>
        </div>
      );

    case "vurgu":
      return (
        <div className={s.vurguSarma}>
          <h2 className={s.vurguMetin}>{slayt.metin}</h2>
          {slayt.kaynak && <p className={`etiket ${s.vurguKaynak}`}>{slayt.kaynak}</p>}
        </div>
      );

    case "ikili":
      return (
        <div>
          <h2 className={`${s.baslik} ${s.baslikBosluk}`}>{slayt.baslik}</h2>
          <div className={s.ikili}>
            <Sutun icerik={slayt.sol} />
            <Sutun icerik={slayt.sag} />
          </div>
        </div>
      );

    case "katman":
      return (
        <div>
          <h2 className={s.baslik}>{slayt.baslik}</h2>
          {slayt.giris ? (
            <p className={s.giris}>{slayt.giris}</p>
          ) : (
            <div className={s.baslikBosluk} />
          )}
          <div className={s.katmanlar}>
            {slayt.katmanlar.map((k, i) => (
              <div
                key={k.ad}
                className={s.katman}
                style={{ "--derinlik": i } as CSSProperties}
              >
                <span className={s.katmanAd}>{k.ad}</span>
                <span className={s.katmanAciklama}>{k.aciklama}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case "tablo":
      return (
        <div>
          <h2 className={`${s.baslik} ${s.baslikBosluk}`}>{slayt.baslik}</h2>
          <div className={s.tabloSarma}>
            <table className={s.tablo}>
              <thead>
                <tr>
                  {slayt.sutunlar.map((b) => (
                    <th key={b}>{b}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {slayt.satirlar.map((satir, i) => (
                  <tr key={i}>
                    {satir.map((h, j) => (
                      // data-etiket: dar ekranda tablo karta dönüşürken
                      // sütun başlığı her hücrenin üstünde tekrar eder.
                      <td key={j} data-etiket={slayt.sutunlar[j]} data-bos={h ? undefined : "1"}>
                        {h}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

    case "adim":
      return <Adimlar slayt={slayt} />;

    case "terazi":
      return <Terazi slayt={slayt} />;

    case "kartlar":
      return <Kartlar slayt={slayt} />;

    case "alinti":
      return <Alinti slayt={slayt} />;

    case "sayi":
      return <Sayilar slayt={slayt} />;

    case "roller":
      return <RollerAkisi slayt={slayt} />;

    case "olgunluk":
      return <OlgunlukEgrisi slayt={slayt} />;

    case "taslak":
      return (
        <div className={s.taslak}>
          <span className={`etiket ${s.taslakRozet}`}>Yapım aşamasında</span>
          <h2 className={s.baslik}>{slayt.baslik}</h2>
          <p className={s.taslakNot}>{slayt.not}</p>
          {slayt.beklenen && (
            <ul className={s.taslakListe}>
              {slayt.beklenen.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}
        </div>
      );
  }
}

function Sutun({ icerik }: { icerik: SutunIcerik }) {
  const ton =
    icerik.ton === "olumlu" ? s.sutunOlumlu : icerik.ton === "olumsuz" ? s.sutunOlumsuz : "";
  return (
    <div className={`${s.sutun} ${ton}`}>
      {icerik.etiket && <span className="etiket">{icerik.etiket}</span>}
      <h3 className={s.sutunBaslik}>{icerik.baslik}</h3>
      <ul className={s.sutunListe}>
        {icerik.maddeler.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    </div>
  );
}
