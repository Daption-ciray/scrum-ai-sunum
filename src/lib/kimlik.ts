"use client";

const ANAHTAR_ID = "sunum.katilimci.id";
const ANAHTAR_AD = "sunum.katilimci.ad";
/** Atılma bitiş zamanı. Giriş ekranı bunu okuyup geri sayım gösteriyor. */
const ANAHTAR_ATILDI = "sunum.katilimci.atildi";

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

/**
 * Adı siler, kimliği bırakır. Kimlik kalıyor ki aynı kişi tekrar girdiğinde
 * yeni bir katılımcı olarak sayılmasın.
 *
 * `atildiMi` verilirse atılmanın bittiği an da kaydediliyor: giriş ekranı
 * bunu okuyup "şu kadar saniye sonra girebilirsiniz" diyor. Bu olmadan
 * katılımcı sessizce giriş ekranına düşüyor, adını tekrar yazıyor ve AYNI
 * kimlikle yeniden atılıyordu — kimse ne olduğunu anlamıyordu.
 */
export function kimlikSil(atilmaSaniyesi?: number) {
  try {
    window.localStorage.removeItem(ANAHTAR_AD);
    if (atilmaSaniyesi) {
      guvenliYaz(ANAHTAR_ATILDI, String(Date.now() + atilmaSaniyesi * 1000));
    }
  } catch {
    /* yok say */
  }
}

/** Atılma bitene kaç ms kaldı. Bitmişse 0. */
export function atilmaKalan(): number {
  const ham = guvenliOku(ANAHTAR_ATILDI);
  if (!ham) return 0;
  return Math.max(0, Number(ham) - Date.now());
}

export function atilmayiUnut() {
  try {
    window.localStorage.removeItem(ANAHTAR_ATILDI);
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
