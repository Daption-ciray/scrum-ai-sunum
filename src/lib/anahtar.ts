/** Sunucu panelinin anahtarı. Yalnızca sunucu tarafında okunur. */
export function sunucuAnahtari(): string {
  return process.env.SUNUCU_ANAHTARI || "degistir-beni";
}

export function yoneticiMi(istek: Request): boolean {
  const gelen = istek.headers.get("x-sunucu-anahtari");
  if (!gelen) return false;
  const dogru = sunucuAnahtari();
  // Uzunluk farkında erken çıkmayan basit karşılaştırma.
  if (gelen.length !== dogru.length) return false;
  let fark = 0;
  for (let i = 0; i < gelen.length; i++) fark |= gelen.charCodeAt(i) ^ dogru.charCodeAt(i);
  return fark === 0;
}
