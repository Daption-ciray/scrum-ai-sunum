"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { atilmaKalan, atilmayiUnut, kimlikAl, kimlikYaz } from "@/lib/kimlik";
import { anahtarDogrula } from "@/lib/yoklama";
import g from "./giris.module.css";

/** Sunucu paneli anahtarı burada da saklanıyor; /sunucu aynı anahtarı okuyor. */
const ANAHTAR_DEPO = "sunum.sunucu.anahtar";

export default function Giris() {
  const router = useRouter();
  const [ad, setAd] = useState("");
  const [hata, setHata] = useState("");
  const [hazir, setHazir] = useState(false);

  // Sunucu girişi kapalı başlıyor: katılımcılar çok, sunucu bir kişi.
  const [sunucuAcik, setSunucuAcik] = useState(false);
  const [anahtar, setAnahtar] = useState("");
  const [deniyor, setDeniyor] = useState(false);

  /* Eğitmen bu kişinin oturumunu kapattıysa geri sayım gösteriliyor.
     Bu olmadan katılımcı sessizce giriş ekranına düşüyor, adını tekrar
     yazıyor ve AYNI kimlikle yeniden atılıyordu — ne olduğunu anlamadan
     birkaç kez deneyip vazgeçiyordu. */
  const [atilmaMs, setAtilmaMs] = useState(0);
  useEffect(() => {
    const tik = () => {
      const kalan = atilmaKalan();
      setAtilmaMs(kalan);
      if (kalan <= 0) atilmayiUnut();
    };
    tik();
    const sayac = setInterval(tik, 500);
    return () => clearInterval(sayac);
  }, []);
  const atilmaSn = Math.ceil(atilmaMs / 1000);

  // Daha önce girmişse doğrudan odaya al — kopan bağlantı sonrası
  // kimse ismini yeniden yazmak zorunda kalmasın.
  useEffect(() => {
    const kayitli = kimlikAl();
    if (kayitli) router.replace("/oda");
    else setHazir(true);
  }, [router]);

  function gonder(e: React.FormEvent) {
    e.preventDefault();
    const temiz = ad.trim().replace(/\s+/g, " ");
    if (temiz.length < 2) {
      setHata("Adınızı yazın — en az iki karakter.");
      return;
    }
    if (temiz.length > 40) {
      setHata("Ad çok uzun. 40 karakteri geçmesin.");
      return;
    }
    if (atilmaKalan() > 0) return;
    kimlikYaz(temiz);
    router.push("/oda");
  }

  async function sunucuGir(e: React.FormEvent) {
    e.preventDefault();
    setDeniyor(true);
    setHata("");
    const gecerli = await anahtarDogrula(anahtar);
    setDeniyor(false);
    if (!gecerli) {
      setHata("Anahtar kabul edilmedi.");
      return;
    }
    try {
      window.localStorage.setItem(ANAHTAR_DEPO, anahtar);
    } catch {
      /* depolama kapalı: panel anahtarı bir kez daha soracak */
    }
    router.push("/sunucu");
  }

  if (!hazir) return <main className={g.sayfa} />;

  return (
    <main className={g.sayfa}>
      <div className={g.kutu}>
        <p className={`etiket ${g.ust}`}>Scrum + AI · Kurum İçi Eğitim</p>
        <h1 className={g.baslik}>Adınızı yazın, oturuma katılın</h1>
        <p className={g.aciklama}>
          Slaytlar bu ekranda akacak, değerlendirmeler de aynı yerden. Başka bir
          uygulama açmanız gerekmiyor.
        </p>

        {atilmaMs > 0 && (
          <div className={g.atildi}>
            <span className={`etiket ${g.atildiEtiket}`}>Oturumunuz kapatıldı</span>
            {/* Cümle tek bir öğede: sarmalayıcı flex sütun olduğu için ayrı
                metin düğümleri alt alta düşüp cümleyi kırıyordu. */}
            <span>
              Eğitmen oturumunuzu kapattı. Kalıcı değil —{" "}
              <b className="mono">{atilmaSn}</b> saniye sonra aynı adla tekrar
              girebilirsiniz.
            </span>
          </div>
        )}

        <form className={g.form} onSubmit={gonder}>
          <label className={`etiket ${g.etiketAlan}`} htmlFor="ad">
            Görünecek adınız
          </label>
          <input
            id="ad"
            className={g.girdi}
            value={ad}
            onChange={(e) => {
              setAd(e.target.value);
              if (hata) setHata("");
            }}
            placeholder="Örn. Gökalp E."
            autoComplete="name"
            autoFocus
            maxLength={40}
          />
          {!sunucuAcik && hata && <p className={g.hata}>{hata}</p>}
          <button
            className={g.dugme}
            type="submit"
            disabled={ad.trim().length < 2 || atilmaMs > 0}
          >
            Katıl
          </button>
        </form>

        <p className={g.dipnot}>
          Bu ad değerlendirme sonuç tablosunda görünecek.
        </p>

        <p className={g.imza}>Daption · Abdullah Gökalp Çıray</p>

        <div className={g.sunucuAlan}>
          {!sunucuAcik ? (
            <button
              type="button"
              className={g.sunucuAc}
              onClick={() => {
                setSunucuAcik(true);
                setHata("");
              }}
            >
              Sunum bende — sunucu olarak gir
            </button>
          ) : (
            <form className={g.form} onSubmit={sunucuGir}>
              <label className={`etiket ${g.etiketAlan}`} htmlFor="anahtar">
                Sunucu anahtarı
              </label>
              <input
                id="anahtar"
                className={g.girdi}
                type="password"
                value={anahtar}
                onChange={(e) => {
                  setAnahtar(e.target.value);
                  if (hata) setHata("");
                }}
                placeholder="SUNUCU_ANAHTARI"
                autoComplete="off"
                autoFocus
              />
              {hata && <p className={g.hata}>{hata}</p>}
              <button className={g.dugme} type="submit" disabled={!anahtar || deniyor}>
                {deniyor ? "Kontrol ediliyor…" : "Sunucu paneline geç"}
              </button>
              <button
                type="button"
                className={g.sunucuAc}
                onClick={() => {
                  setSunucuAcik(false);
                  setAnahtar("");
                  setHata("");
                }}
              >
                Vazgeç, katılımcı olarak gireceğim
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
