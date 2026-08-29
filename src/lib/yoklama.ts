"use client";

import { useEffect, useRef, useState } from "react";
import { BASLANGIC, type Durum } from "./durum";

export type Katilan = { id: string; ad: string };

export type YoklamaSonucu = {
  durum: Durum;
  bagli: number;
  paylasimli: boolean;
  /** Yalnızca sunucu panelinde dolu. */
  katilimcilar?: Katilan[];
  /** Son istek başarılı mı? Kullanıcıya "bağlantı koptu" demek için. */
  saglikli: boolean;
  /** İlk yanıt gelene kadar true. */
  yukleniyor: boolean;
};

type Ayar = {
  id?: string;
  ad?: string;
  /** Doluysa sunucu paneli modunda çalışır: /api/panel sorulur. */
  anahtar?: string;
  /** Sekme öndeyken yoklama aralığı (ms). */
  aralik?: number;
  /** Sunucu bu katılımcının oturumunu kapattı. */
  onAtildi?: () => void;
};

/** Katılımcı "buradayım" bildirimi kaç ms'de bir. Canlılık eşiği 20 sn. */
const BILDIRIM_ARALIGI = 10_000;

/**
 * Uyarlamalı yoklama.
 * - Sekme öndeyken varsayılan 2 sn.
 * - Sekme arkaya düşünce 6 sn'ye seyrelir; öne gelince anında bir kez sorar.
 * - Hata halinde üstel geri çekilme, 10 sn'ye kadar.
 *
 * 75 kişilik oda için iki ayrım yapıldı:
 *
 * 1) Durum sorgusu ile "buradayım" bildirimi ayrıldı. Bildirim 10 saniyede
 *    bir yetiyor (eşik 20 sn), durum ise 2 saniyede bir isteniyor. Yazma
 *    trafiği altıda birine indi.
 * 2) Durum sorgusu artık kişiye özel hiçbir şey taşımıyor, bu yüzden
 *    CDN'de bir saniye önbelleklenebiliyor — 75 kişinin isteği kenardan
 *    karşılanıyor, fonksiyon saniyede bir kez çalışıyor.
 *
 * Sunucu paneli ayrı uçtan (/api/panel) besleniyor; orası önbelleklenmiyor.
 */
export function useYoklama(ayar: Ayar = {}): YoklamaSonucu {
  const { id, ad, anahtar, aralik = 2000, onAtildi } = ayar;

  const [sonuc, setSonuc] = useState<YoklamaSonucu>({
    durum: BASLANGIC,
    bagli: 0,
    paylasimli: true,
    saglikli: true,
    yukleniyor: true,
  });

  const zamanlayici = useRef<ReturnType<typeof setTimeout> | null>(null);
  const durduruldu = useRef(false);
  const hataSayisi = useRef(0);
  const atildiCb = useRef(onAtildi);
  atildiCb.current = onAtildi;

  /* ---- durum yoklaması ---- */
  useEffect(() => {
    durduruldu.current = false;
    let iptal: AbortController | null = null;

    const bekleme = () => {
      if (hataSayisi.current > 0) {
        return Math.min(aralik * 2 ** hataSayisi.current, 10_000);
      }
      return document.visibilityState === "hidden" ? 6000 : aralik;
    };

    const sor = async () => {
      if (durduruldu.current) return;
      iptal?.abort();
      iptal = new AbortController();

      try {
        const yanit = await fetch(anahtar ? "/api/panel" : "/api/durum", {
          signal: iptal.signal,
          cache: "no-store",
          headers: anahtar ? { "x-sunucu-anahtari": anahtar } : undefined,
        });
        if (!yanit.ok) throw new Error(String(yanit.status));
        const veri = (await yanit.json()) as Omit<YoklamaSonucu, "saglikli" | "yukleniyor">;
        hataSayisi.current = 0;
        if (!durduruldu.current) setSonuc({ ...veri, saglikli: true, yukleniyor: false });
      } catch (e) {
        if ((e as Error)?.name === "AbortError") return;
        hataSayisi.current = Math.min(hataSayisi.current + 1, 3);
        if (!durduruldu.current) {
          setSonuc((o) => ({ ...o, saglikli: false, yukleniyor: false }));
        }
      } finally {
        if (!durduruldu.current) {
          zamanlayici.current = setTimeout(sor, bekleme());
        }
      }
    };

    const gorunurluk = () => {
      if (document.visibilityState === "visible") {
        if (zamanlayici.current) clearTimeout(zamanlayici.current);
        void sor();
      }
    };

    void sor();
    document.addEventListener("visibilitychange", gorunurluk);

    return () => {
      durduruldu.current = true;
      document.removeEventListener("visibilitychange", gorunurluk);
      if (zamanlayici.current) clearTimeout(zamanlayici.current);
      iptal?.abort();
    };
  }, [anahtar, aralik]);

  /* ---- "buradayım" bildirimi — ayrı ve seyrek ---- */
  useEffect(() => {
    if (!id || !ad) return;
    let durdu = false;

    const bildir = async () => {
      try {
        const yanit = await fetch("/api/buradayim", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ id, ad }),
        });
        if (!yanit.ok) return;
        const veri = (await yanit.json()) as { acik?: boolean };
        if (veri.acik === false && !durdu) atildiCb.current?.();
      } catch {
        /* bildirim kaçtıysa sorun değil: eşik 20 sn, sonraki tur yetişir */
      }
    };

    void bildir();
    const sayac = setInterval(bildir, BILDIRIM_ARALIGI);
    return () => {
      durdu = true;
      clearInterval(sayac);
    };
  }, [id, ad]);

  return sonuc;
}

/**
 * Anahtarı yan etkisiz doğrular.
 * `/api/panel` yalnızca yöneticiye 200 döndüğü için durum kodu tek başına
 * yeterli kanıt; sunumu değiştiren bir komut göndermeye gerek yok.
 */
export async function anahtarDogrula(anahtar: string): Promise<boolean> {
  try {
    const yanit = await fetch("/api/panel", {
      headers: { "x-sunucu-anahtari": anahtar },
      cache: "no-store",
    });
    return yanit.ok;
  } catch {
    return false;
  }
}

/**
 * Sunucu komutu gönderir ve yeni durumu geri verir.
 * Sunucunun kendi ekranı yoklamayı beklemesin diye: komut yanıtındaki durum
 * anında uygulanır, yoklama arkadan onu yakalar.
 */
export async function komutGonder(
  anahtar: string,
  govde: Record<string, unknown>,
): Promise<{ ok: boolean; durum?: Durum; hata?: string }> {
  try {
    const yanit = await fetch("/api/komut", {
      method: "POST",
      headers: { "content-type": "application/json", "x-sunucu-anahtari": anahtar },
      body: JSON.stringify(govde),
    });
    const veri = (await yanit.json().catch(() => ({}))) as { durum?: Durum; hata?: string };
    if (yanit.ok) return { ok: true, durum: veri.durum };
    if (yanit.status === 401) return { ok: false, hata: "Sunucu anahtarı geçersiz." };
    return { ok: false, hata: veri.hata || `Sunucu ${yanit.status} döndü.` };
  } catch {
    return { ok: false, hata: "Sunucuya ulaşılamadı." };
  }
}
