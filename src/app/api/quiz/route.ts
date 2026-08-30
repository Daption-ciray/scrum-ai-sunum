import { durumuOku, quizYaz } from "@/lib/depo";
import { OTURUMLAR, slaytAl } from "@/icerik";
import { dogrula } from "@/icerik/cevaplar";

export const dynamic = "force-dynamic";

/* Cevap dizileri sorularla hizalı mı? Bir soru eklenip cevabı unutulursa
   sessizce yanlış puanlama olurdu.

   Kontrol BU DOSYADA çünkü burası sunucu. `src/icerik/index.ts` içine
   konulmuştu; orası istemci bileşenlerinden de import ediliyor ve doğru
   cevaplar geliştirmede tarayıcıya inerdi. */
if (process.env.NODE_ENV !== "production") {
  const sorunlar = [
    ...dogrula(OTURUMLAR[1].slaytlar),
    ...dogrula(OTURUMLAR[2].slaytlar),
  ];
  if (sorunlar.length > 0) console.error("[cevaplar]", sorunlar.join(" · "));
}

/**
 * Quiz gönderimi. Hangi quiz olduğu slayttan çıkarılıyor, istemci
 * göndermiyor — kapalı bir quize yazılamasın.
 *
 * Yanıt DOĞRU CEVAPLARI İÇERMİYOR. Katılımcı sonucunu sıralama slaytında
 * görüyor; buradan dönseydi ilk gönderen şıkları başkalarına söyleyebilirdi.
 */
export async function POST(istek: Request) {
  let govde: { id?: string; ad?: string; cevaplar?: unknown };
  try {
    govde = (await istek.json()) as typeof govde;
  } catch {
    return Response.json({ hata: "İstek okunamadı." }, { status: 400 });
  }

  const id = String(govde.id ?? "").slice(0, 64);
  const ad = String(govde.ad ?? "").slice(0, 64);
  if (!id || !ad) return Response.json({ hata: "Kimlik eksik." }, { status: 400 });
  if (!Array.isArray(govde.cevaplar)) {
    return Response.json({ hata: "Cevaplar okunamadı." }, { status: 400 });
  }

  const durum = await durumuOku();
  const slayt = slaytAl(durum.oturum, durum.slayt);
  if (!slayt || slayt.tip !== "quiz") {
    return Response.json({ hata: "Şu an açık bir quiz yok." }, { status: 409 });
  }
  if (!durum.quizAcik) {
    return Response.json({ hata: "Cevaplama kapalı." }, { status: 409 });
  }

  // Şık indeksleri aralığa sıkıştırılıyor; -1 = boş bırakıldı.
  const cevaplar = slayt.sorular.map((s, i) => {
    const d = Number((govde.cevaplar as unknown[])[i]);
    return Number.isInteger(d) && d >= 0 && d < s.secenekler.length ? d : -1;
  });

  const kabul = await quizYaz(slayt.id, { id, ad, cevaplar, zaman: Date.now() });
  return Response.json({ kabul }, { headers: { "cache-control": "no-store" } });
}
