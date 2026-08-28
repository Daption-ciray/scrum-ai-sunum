"use client";

import { useEffect, useRef, useState } from "react";
import { BASLANGIC, type Durum } from "./durum";

export type YoklamaSonucu = {
  durum: Durum;
  bagli: number;
  paylasimli: boolean;
  adlar?: string[];
  /** Son istek başarılı mı? Kullanıcıya "bağlantı koptu" demek için. */
  saglikli: boolean;
  /** İlk yanıt gelene kadar true. */
  yukleniyor: boolean;
};

type Ayar = {
  id?: string;
  ad?: string;
  /** Sunucu paneli için: yanıta katılımcı adları da eklenir. */
  anahtar?: string;
  /** Sekme öndeyken yoklama aralığı (ms). */
  aralik?: number;
};

/**
 * Uyarlamalı yoklama.
 * - Sekme öndeyken varsayılan 1.5 sn.
 * - Sekme arkaya düşünce 6 sn'ye seyrelir; öne gelince anında bir kez sorar.
 * - Hata halinde 1.5 → 3 → 6 → 10 sn'ye kadar geri çekilir, düzelince toparlar.
 * Vercel'de kalıcı websocket zahmetli; 15 kişilik odada bu fazlasıyla yeter.
 */
export function useYoklama(ayar: Ayar = {}): YoklamaSonucu {
  const { id, ad, anahtar, aralik = 1500 } = ayar;

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
        const q = new URLSearchParams();
        if (id && ad) {
          q.set("id", id);
          q.set("ad", ad);
        }
        const yanit = await fetch(`/api/durum?${q.toString()}`, {
          signal: iptal.signal,
          cache: "no-store",
          headers: anahtar ? { "x-sunucu-anahtari": anahtar } : undefined,
        });
        if (!yanit.ok) throw new Error(String(yanit.status));
        const veri = (await yanit.json()) as Omit<YoklamaSonucu, "saglikli" | "yukleniyor">;
        hataSayisi.current = 0;
        if (!durduruldu.current) {
          setSonuc({ ...veri, saglikli: true, yukleniyor: false });
        }
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
  }, [id, ad, anahtar, aralik]);

  return sonuc;
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
