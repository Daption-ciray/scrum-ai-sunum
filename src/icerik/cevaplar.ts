/**
 * Doğru cevaplar. SUNUCUDA KALIR.
 *
 * Bu dosyayı HİÇBİR istemci bileşeninden import etmeyin. Sorular tarayıcıya
 * iniyor, cevaplar inmiyor — aksi hâlde doğru şık sayfa kaynağında görünürdü.
 * Yalnızca `src/app/api/**` ve `src/lib/**` içinden okunmalı.
 *
 * Anahtar slayt id'si, değer her sorunun doğru şık indeksi (0 tabanlı).
 */
export const CEVAPLAR: Record<string, number[]> = {
  "s1-quiz-temeller": [1, 1, 2, 2, 1, 0, 1, 1, 1, 2],
};

/**
 * Dizilerin sorularla hizasını kontrol eder. Bir soru eklenip cevabı
 * eklenmezse sessizce yanlış puanlama olurdu; geliştirmede modül yüklenirken
 * kendiliğinden çalışıp terminale yazıyor.
 */
export function dogrula(
  slaytlar: { id: string; tip: string; sorular?: { secenekler: string[] }[] }[],
): string[] {
  const sorunlar: string[] = [];
  for (const s of slaytlar) {
    if (s.tip !== "quiz") continue;
    const c = CEVAPLAR[s.id];
    if (!c) {
      sorunlar.push(`${s.id}: cevap dizisi yok`);
      continue;
    }
    if (c.length !== (s.sorular?.length ?? 0)) {
      sorunlar.push(`${s.id}: ${s.sorular?.length ?? 0} soru var, ${c.length} cevap`);
      continue;
    }
    s.sorular?.forEach((soru, i) => {
      if (c[i] < 0 || c[i] >= soru.secenekler.length) {
        sorunlar.push(`${s.id} soru ${i + 1}: cevap indeksi ${c[i]} şık aralığı dışında`);
      }
    });
  }
  return sorunlar;
}
