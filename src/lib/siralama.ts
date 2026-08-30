import { CEVAPLAR } from "@/icerik/cevaplar";
import { istemPuanla } from "./istemPuan";
import type { Istem, QuizCevabi } from "./depo";

/* =============================================================================
   SIRALAMA — quiz puanı + istem puanı.

   İki bileşen de 0–1000, eşit ağırlıklı; toplam en çok 2000.

   Quiz: doğru oranı × 1000. Sorular tek tek geldiği için katılımcı bazı
   soruları kaçırmış olabilir — payda her zaman TOPLAM soru sayısı, cevap
   verilen soru sayısı değil. Kaçırılan soru boş bırakılmış sayılıyor.

   Hız puana GİRMİYOR, yalnızca eşitlik bozuyor. Ortak bir geri sayım ağı
   yavaş olanı sistematik olarak kaybettirirdi ve bu site zaten o gecikmeyi
   ortadan kaldırmak için yazıldı.

   İstem: anahtar kelime eleğinin puanı (0–100) × 10. Hakem puanı BİLEREK
   kullanılmıyor — hakem yalnızca uçlardaki on isteme bakıyor, herkese
   uygulanmadığı için sıralamada adaletsiz olurdu. Bu yüzden slayt "kalıp
   puanı" diyor, "kalite puanı" demiyor.
   ============================================================================= */

export type SiraSatiri = {
  id: string;
  ad: string;
  quiz: number;
  istem: number;
  toplam: number;
  /** Kaç soruyu doğru bildi. Slaytta gösteriliyor. */
  dogru: number;
  soruSayisi: number;
};

export function siralamaHesapla(
  quizSlaytId: string,
  cevaplar: QuizCevabi[],
  istemler: Istem[],
): SiraSatiri[] {
  const dogruDizi = CEVAPLAR[quizSlaytId] ?? [];
  const soruSayisi = dogruDizi.length;

  const satirlar = new Map<string, SiraSatiri>();
  const al = (id: string, ad: string) => {
    const v = satirlar.get(id) ?? {
      id, ad, quiz: 0, istem: 0, toplam: 0, dogru: 0, soruSayisi,
    };
    satirlar.set(id, v);
    return v;
  };

  const hiz = new Map<string, number>();

  for (const c of cevaplar) {
    const s = al(c.id, c.ad);
    if (dogruDizi[c.soru] === c.sik) s.dogru += 1;
    // Eşitlik bozucu: son cevabını en erken veren önde.
    hiz.set(c.id, Math.max(hiz.get(c.id) ?? 0, c.zaman));
  }
  for (const s of satirlar.values()) {
    s.quiz = soruSayisi > 0 ? Math.round((s.dogru / soruSayisi) * 1000) : 0;
  }

  for (const i of istemler) {
    const s = al(i.id, i.ad);
    s.istem = istemPuanla(i.metin).puan * 10;
  }

  for (const s of satirlar.values()) s.toplam = s.quiz + s.istem;

  return [...satirlar.values()].sort(
    (a, b) =>
      b.toplam - a.toplam ||
      // Eşitlikte önce cevaplayan önde. Gönderemeyen en sonda.
      (hiz.get(a.id) ?? Infinity) - (hiz.get(b.id) ?? Infinity) ||
      a.ad.localeCompare(b.ad, "tr"),
  );
}
