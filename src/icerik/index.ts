import { oturum1 } from "./oturum1";
import { oturum2 } from "./oturum2";
import type { Oturum, Slayt } from "./tipler";

export const OTURUMLAR: Record<1 | 2, Oturum> = { 1: oturum1, 2: oturum2 };

export function oturumAl(n: 1 | 2): Oturum {
  return OTURUMLAR[n];
}

export function slaytAl(oturum: 1 | 2, indeks: number): Slayt | null {
  return OTURUMLAR[oturum].slaytlar[indeks] ?? null;
}

export function slaytSayisi(oturum: 1 | 2): number {
  return OTURUMLAR[oturum].slaytlar.length;
}

/** Slaytları bloklara göre grupla — sunucu paneli ve ilerleme çubuğu kullanıyor. */
export function bloklar(oturum: 1 | 2): { ad: string; baslangic: number; adet: number }[] {
  const liste: { ad: string; baslangic: number; adet: number }[] = [];
  OTURUMLAR[oturum].slaytlar.forEach((s, i) => {
    const son = liste[liste.length - 1];
    if (son && son.ad === s.blok) son.adet += 1;
    else liste.push({ ad: s.blok, baslangic: i, adet: 1 });
  });
  return liste;
}

export type { Oturum, Slayt } from "./tipler";
