import { durumuOku, quizCevapYaz } from "@/lib/depo";
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
 * Tek bir sorunun cevabı.
 *
 * Hangi quiz ve hangi SORU olduğu durumdan çıkarılıyor, istemci göndermiyor:
 * istemci soru indeksi uydurabilseydi kapalı bir soruya veya sırası gelmemiş
 * bir soruya cevap yazabilirdi.
 *
 * Yanıt doğru cevabı İÇERMİYOR. Katılımcı sonucunu sıralamada görüyor.
 */
export async function POST(istek: Request) {
  let govde: { id?: string; ad?: string; sik?: unknown };
  try {
    govde = (await istek.json()) as typeof govde;
  } catch {
    return Response.json({ hata: "İstek okunamadı." }, { status: 400 });
  }

  const id = String(govde.id ?? "").slice(0, 64);
  const ad = String(govde.ad ?? "").slice(0, 64);
  if (!id || !ad) return Response.json({ hata: "Kimlik eksik." }, { status: 400 });

  const durum = await durumuOku();
  const slayt = slaytAl(durum.oturum, durum.slayt);
  if (!slayt || slayt.tip !== "quiz") {
    return Response.json({ hata: "Şu an açık bir quiz yok." }, { status: 409 });
  }
  if (!durum.quizAcik) {
    return Response.json({ hata: "Cevaplama kapalı." }, { status: 409 });
  }
  const soru = slayt.sorular[durum.quizSoru];
  if (!soru) {
    return Response.json({ hata: "Aktif soru yok." }, { status: 409 });
  }

  const sik = Number(govde.sik);
  if (!Number.isInteger(sik) || sik < 0 || sik >= soru.secenekler.length) {
    return Response.json({ hata: "Şık geçersiz." }, { status: 400 });
  }

  const kabul = await quizCevapYaz(slayt.id, {
    id, ad, soru: durum.quizSoru, sik, zaman: Date.now(),
  });
  return Response.json({ kabul }, { headers: { "cache-control": "no-store" } });
}
