"use client";

const ANAHTAR_ID = "sunum.katilimci.id";
const ANAHTAR_AD = "sunum.katilimci.ad";

function guvenliOku(k: string): string | null {
  try {
    return window.localStorage.getItem(k);
  } catch {
    return null;
  }
}
function guvenliYaz(k: string, d: string) {
  try {
    window.localStorage.setItem(k, d);
  } catch {
    /* gizli sekme veya kapalı depolama: sorun değil, oturum yine çalışır */
  }
}

export function kimlikAl(): { id: string; ad: string } | null {
  const ad = guvenliOku(ANAHTAR_AD);
  if (!ad) return null;
  let id = guvenliOku(ANAHTAR_ID);
  if (!id) {
    id = yeniId();
    guvenliYaz(ANAHTAR_ID, id);
  }
  return { id, ad };
}

export function kimlikYaz(ad: string): { id: string; ad: string } {
  const id = guvenliOku(ANAHTAR_ID) || yeniId();
  guvenliYaz(ANAHTAR_ID, id);
  guvenliYaz(ANAHTAR_AD, ad);
  return { id, ad };
}

export function kimlikSil() {
  try {
    window.localStorage.removeItem(ANAHTAR_AD);
  } catch {
    /* yok say */
  }
}

function yeniId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `k-${Math.random().toString(36).slice(2)}-${Date.now().toString(36)}`;
  }
}
