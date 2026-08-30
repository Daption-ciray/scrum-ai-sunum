"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Perde, Slayt } from "@/components/Slayt";
import { OTURUMLAR, bloklar } from "@/icerik";
import { SORU_SURESI, type Durum } from "@/lib/durum";
import {
  anahtarDogrula,
  komutGonder,
  useYoklama,
  type AtolyeVerisi,
  type QuizVerisi,
} from "@/lib/yoklama";
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
          {durum.perde ? <Perde /> : <Slayt slayt={slayt} durum={durum} />}
        </div>

        <div className={p.notlar}>
          {/* Sıra bilerek böyle: önce SÖYLENECEK şey, sonra arkasındaki bilgi.
              Canlı oturumda gözün ilk düştüğü yer anlatılacak cümle olmalı. */}
          {yoklama.rehber?.uyari && (
            <div className={p.rehberUyari}>
              <span className="etiket">Dikkat</span>
              <p>{yoklama.rehber.uyari}</p>
            </div>
          )}

          <span className="etiket">Nasıl anlat</span>
          {slayt.not ? (
            <p className={p.notMetin}>{slayt.not}</p>
          ) : (
            <p className={p.notYok}>Bu slayt için not yok.</p>
          )}

          {yoklama.rehber?.bilgi && (
            <details className={p.rehber}>
              <summary className="etiket">Bilmen gereken</summary>
              <p className={p.rehberMetin}>{yoklama.rehber.bilgi}</p>
            </details>
          )}
          {yoklama.rehber?.soru && (
            <details className={p.rehber}>
              <summary className="etiket">Gelebilecek soru</summary>
              <p className={p.rehberMetin}>{yoklama.rehber.soru}</p>
            </details>
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

        {yoklama.quiz && (
          <QuizKarti
            veri={yoklama.quiz}
            durum={durum}
            slayt={slayt}
            gonder={gonder}
          />
        )}

        {yoklama.atolye && (
          <AtolyeKarti
            veri={yoklama.atolye}
            acik={durum.istemAcik}
            gonder={gonder}
            anahtar={anahtar}
            hakemVar={Boolean(yoklama.hakemVar)}
          />
        )}

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

/**
 * Quiz kartı — sunucu dağılımı canlı görüyor, katılımcı görmüyor.
 *
 * Çoğunluğu görüp ona uymak bilgi kontrolünü ankete çevirirdi; o yüzden
 * dağılım yalnızca bu panelde. Doğru şık kalın ve işaretli.
 */
function QuizKarti({
  veri,
  durum,
  slayt,
  gonder,
}: {
  veri: QuizVerisi;
  durum: Durum;
  slayt: { tip: string } & Record<string, unknown>;
  gonder: (govde: Record<string, unknown>) => void;
}) {
  const sorular = (slayt.sorular ?? []) as { soru: string; secenekler: string[] }[];
  const aktif = durum.quizSoru;

  /* Sunucunun da geri sayımı görmesi gerek: "beş saniye" deyip sonrakine
     geçebilsin. Katılımcı ekranıyla aynı mantık — damganın değiştiği an
     yerel saatte işaretleniyor, saat kayması sorun çıkarmasın. */
  const [kalan, setKalan] = useState(0);
  useEffect(() => {
    if (!durum.quizAcik || !durum.quizAcildi) {
      setKalan(0);
      return;
    }
    const bas = Date.now();
    setKalan(SORU_SURESI);
    const sayac = setInterval(() => {
      setKalan(Math.max(0, SORU_SURESI - (Date.now() - bas)));
    }, 250);
    return () => clearInterval(sayac);
  }, [durum.quizAcik, durum.quizAcildi]);
  const basladi = aktif >= 0;
  const bitti = aktif >= sorular.length;
  const sonSoru = aktif >= sorular.length - 1;

  return (
    <div className={p.kart}>
      <span className={`etiket ${p.kartBaslik}`}>
        Quiz —{" "}
        {!basladi
          ? "başlamadı"
          : bitti
            ? "bitti"
            : `soru ${aktif + 1}/${sorular.length} · ${veri.cevaplayan} cevap`}
        {durum.quizAcik && kalan > 0 && (
          <span className={p.quizSayac}> · {Math.ceil(kalan / 1000)} sn</span>
        )}
        {durum.quizAcik && kalan <= 0 && (
          <span className={p.quizSayacBitti}> · süre doldu</span>
        )}
      </span>

      <div className={p.atolyeDugmeler}>
        {!basladi && (
          <button
            type="button"
            className={`${p.dugme} ${p.birincil}`}
            onClick={() => gonder({ komut: "quiz", eylem: "basla" })}
          >
            Başlat
          </button>
        )}
        {basladi && !bitti && (
          <>
            <button
              type="button"
              className={`${p.dugme} ${durum.quizAcik ? p.aktif : ""}`}
              onClick={() =>
                gonder({ komut: "quiz", eylem: durum.quizAcik ? "kapat" : "ac" })
              }
            >
              {durum.quizAcik ? "Cevaplamayı kapat" : "Cevaplamayı aç"}
            </button>
            {!sonSoru ? (
              <button
                type="button"
                className={`${p.dugme} ${p.birincil}`}
                onClick={() => gonder({ komut: "quiz", eylem: "sonraki" })}
              >
                Sonraki soru →
              </button>
            ) : (
              <button
                type="button"
                className={`${p.dugme} ${p.birincil}`}
                onClick={() => gonder({ komut: "quiz", eylem: "bitir" })}
              >
                Bitir
              </button>
            )}
          </>
        )}
        <button
          type="button"
          className={p.dugme}
          onClick={() => gonder({ komut: "quiz", eylem: "sifirla" })}
          title="Bütün cevapları siler ve başa alır"
        >
          Sıfırla
        </button>
      </div>

      {/* Dağılım bütün sorular için görünüyor; aktif soru vurgulu.
          Sunucu geriye bakıp "burada takıldınız" diyebilsin diye. */}
      <div className={p.quizDagilim}>
        {sorular.map((s, si) => {
          const toplam = (veri.dagilim[si] ?? []).reduce((a, b) => a + b, 0);
          return (
            <div
              key={s.soru}
              className={`${p.quizSoru} ${si === aktif ? p.quizAktif : ""}`}
            >
              <span className={p.quizSoruMetin}>
                <span className="mono">{si + 1}</span> {s.soru}
              </span>
              {s.secenekler.map((sik, ki) => {
                const say = veri.dagilim[si]?.[ki] ?? 0;
                const oran = toplam > 0 ? (say / toplam) * 100 : 0;
                return (
                  <div
                    key={sik}
                    className={`${p.quizSik} ${veri.dogru[si] === ki ? p.quizDogru : ""}`}
                  >
                    <span className={p.quizCubuk} style={{ width: `${oran}%` }} aria-hidden />
                    <span className={p.quizSikMetin}>
                      {veri.dogru[si] === ki ? "✓ " : ""}
                      {sik}
                    </span>
                    <span className={`mono ${p.quizSay}`}>{say}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Atölye kartı — 75 istemi okumak yerine sıralı listeye bakılıyor.
 *
 * Puan KALİTE değil KALIP kontrolü: beş parçadan kaçı var. Sıralamanın işi
 * sunucuyu en üstteki ve en alttaki birkaç isteme götürmek; tam ve eksik
 * istem kararı yine sunucunun. Aynı satıra ikinci kez basmak işareti kaldırıyor.
 */
function AtolyeKarti({
  veri,
  acik,
  gonder,
  anahtar,
  hakemVar,
}: {
  veri: AtolyeVerisi;
  acik: boolean;
  gonder: (govde: Record<string, unknown>) => void;
  anahtar: string;
  hakemVar: boolean;
}) {
  const [kopyalanan, setKopyalanan] = useState<string | null>(null);
  const [acikListe, setAcikListe] = useState<string | null>(null);
  /* Hakem notları panelde yerel tutuluyor, depoya yazılmıyor: sunucu
     değerlendirmeden hemen sonra işaretliyor, kalıcı olmasına gerek yok.
     Kaybolursa tekrar çalıştırmak birkaç kuruş. */
  const [notlar, setNotlar] = useState<Record<string, { puan: number; gerekce: string }>>({});
  const [degerlendiriyor, setDegerlendiriyor] = useState(false);
  const [hakemHatasi, setHakemHatasi] = useState("");

  const degerlendir = async () => {
    setDegerlendiriyor(true);
    setHakemHatasi("");
    try {
      const yanit = await fetch("/api/degerlendir", {
        method: "POST",
        headers: { "x-sunucu-anahtari": anahtar },
      });
      const veriJson = (await yanit.json().catch(() => ({}))) as {
        notlar?: { id: string; puan: number; gerekce: string }[] | null;
        hata?: string;
      };
      if (!veriJson.notlar) {
        // Yedek: sıralama olduğu gibi kalıyor, oturum durmuyor.
        setHakemHatasi(veriJson.hata ?? "Değerlendirme başarısız — sıralama anahtar kelimeye göre.");
        return;
      }
      const harita: Record<string, { puan: number; gerekce: string }> = {};
      for (const n of veriJson.notlar) harita[n.id] = { puan: n.puan, gerekce: n.gerekce };
      setNotlar(harita);
    } catch {
      setHakemHatasi("Değerlendirmeye ulaşılamadı — sıralama anahtar kelimeye göre.");
    } finally {
      setDegerlendiriyor(false);
    }
  };

  const kopyala = async (etiket: string, metin: string) => {
    try {
      await navigator.clipboard.writeText(metin);
      setKopyalanan(etiket);
      setTimeout(() => setKopyalanan(null), 1800);
    } catch {
      /* pano yoksa sunucu metni elle seçer */
    }
  };

  const bul = (id?: string) => veri.istemler.find((i) => i.id === id);
  const iyi = bul(veri.secim.iyi);
  const kotu = bul(veri.secim.kotu);

  return (
    <div className={p.kart}>
      <span className={`etiket ${p.kartBaslik}`}>
        Atölye — {veri.istemler.length} istem
      </span>

      <div className={p.atolyeDugmeler}>
        <button
          type="button"
          className={`${p.dugme} ${acik ? p.aktif : ""}`}
          onClick={() => gonder({ komut: "istem", eylem: acik ? "kapat" : "ac" })}
        >
          {acik ? "Gönderimi kapat" : "Gönderimi aç"}
        </button>
        {hakemVar && (
          <button
            type="button"
            className={p.dugme}
            onClick={degerlendir}
            disabled={degerlendiriyor || veri.istemler.length === 0}
            title="Uçlardaki istemleri AI ile değerlendirir"
          >
            {degerlendiriyor ? "Değerlendiriliyor…" : "AI ile değerlendir"}
          </button>
        )}
        <button
          type="button"
          className={p.dugme}
          onClick={() => gonder({ komut: "istem", eylem: "sifirla" })}
          title="Bütün gönderimleri ve işaretleri siler"
        >
          Sıfırla
        </button>
      </div>

      {hakemHatasi && <p className={p.hata}>{hakemHatasi}</p>}

      {(iyi || kotu) && (
        <div className={p.atolyeSecim}>
          {iyi && (
            <button
              type="button"
              className={p.kopyaDugme}
              onClick={() => kopyala("iyi", iyi.metin)}
            >
              {kopyalanan === "iyi" ? "Kopyalandı" : `Tam istemi kopyala — ${iyi.ad}`}
            </button>
          )}
          {kotu && (
            <button
              type="button"
              className={p.kopyaDugme}
              onClick={() => kopyala("kotu", kotu.metin)}
            >
              {kopyalanan === "kotu" ? "Kopyalandı" : "Eksik istemi kopyala — anonim"}
            </button>
          )}
        </div>
      )}

      <div className={p.istemListe}>
        {veri.istemler.length === 0 && (
          <p className={p.istemBos}>
            {acik ? "Gönderim bekleniyor…" : "Henüz gönderim yok. Gönderimi açın."}
          </p>
        )}
        {veri.istemler.map((i) => {
          const secili =
            veri.secim.iyi === i.id ? "iyi" : veri.secim.kotu === i.id ? "kotu" : null;
          return (
            <div
              key={i.id}
              className={`${p.istemSatir} ${secili === "iyi" ? p.istemIyi : ""} ${
                secili === "kotu" ? p.istemKotu : ""
              }`}
            >
              <span className={`mono ${p.istemPuan}`}>
                {notlar[i.id] ? notlar[i.id].puan : i.puan}
                {notlar[i.id] && <span className={p.istemOnPuan}>{i.puan}</span>}
              </span>
              <button
                type="button"
                className={p.istemAd}
                onClick={() => setAcikListe(acikListe === i.id ? null : i.id)}
                title="Metni aç / kapat"
              >
                <span className={p.istemAdMetin}>{i.ad}</span>
                <span className={p.istemParca}>
                  {notlar[i.id]
                    ? notlar[i.id].gerekce
                    : i.parcalar.length > 0
                      ? i.parcalar.join(" · ")
                      : "—"}
                </span>
              </button>
              <button
                type="button"
                className={p.istemIsaret}
                onClick={() => gonder({ komut: "istem", eylem: "iyi", deger: i.id })}
                title="Tam istem olarak işaretle"
                aria-label={`${i.ad} — tam istem olarak işaretle`}
              >
                ✓
              </button>
              <button
                type="button"
                className={p.istemIsaret}
                onClick={() => gonder({ komut: "istem", eylem: "kotu", deger: i.id })}
                title="Eksik istem olarak işaretle"
                aria-label={`${i.ad} — eksik istem olarak işaretle`}
              >
                ✗
              </button>
              {acikListe === i.id && <pre className={p.istemMetin}>{i.metin}</pre>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function baslikCikar(s: { tip: string } & Record<string, unknown>): string {
  if (typeof s.baslik === "string") return s.baslik;
  if (typeof s.metin === "string") return s.metin;
  return "(başlıksız)";
}
