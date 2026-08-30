import { durumuOku, istemYaz } from "@/lib/depo";
import { slaytAl } from "@/icerik";

export const dynamic = "force-dynamic";

/**
 * Atölye gönderimi. Hangi atölye olduğu SLAYTTAN çıkarılıyor, istemci
 * göndermiyor — quiz motorundaki ile aynı gerekçe: istemci slayt id'si
 * uydurabilseydi kapalı bir atölyeye yazabilirdi.
 */
export async function POST(istek: Request) {
  let govde: { id?: string; ad?: string; metin?: string };
  try {
    govde = (await istek.json()) as typeof govde;
  } catch {
    return Response.json({ hata: "İstek okunamadı." }, { status: 400 });
  }

  const id = String(govde.id ?? "").slice(0, 64);
  const ad = String(govde.ad ?? "").slice(0, 64);
  const metin = String(govde.metin ?? "").trim();
  if (!id || !ad) return Response.json({ hata: "Kimlik eksik." }, { status: 400 });
  if (!metin) return Response.json({ hata: "İstem boş." }, { status: 400 });

  const durum = await durumuOku();
  const slayt = slaytAl(durum.oturum, durum.slayt);
  if (!slayt || slayt.tip !== "atolye") {
    return Response.json({ hata: "Şu an açık bir atölye yok." }, { status: 409 });
  }
  if (!durum.istemAcik) {
    return Response.json({ hata: "Gönderim kapalı." }, { status: 409 });
  }

  const kabul = await istemYaz(slayt.id, id, ad, metin);
  return Response.json({ kabul }, { headers: { "cache-control": "no-store" } });
}
