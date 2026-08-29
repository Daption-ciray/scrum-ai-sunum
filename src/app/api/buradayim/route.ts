import { katilimciBildir } from "@/lib/depo";

export const dynamic = "force-dynamic";

/**
 * "Buradayım" bildirimi. Yoklamadan ayrıldı çünkü çok daha seyrek gerekiyor:
 * canlılık eşiği 20 saniye, bildirim 10 saniyede bir yetiyor. Ayrılmasının
 * ikinci sebebi /api/durum'un CDN'de önbelleklenebilmesi — kişiye özel bir
 * yazma orada duramazdı.
 *
 * Yanıt `acik: false` ise sunucu bu kişinin oturumunu kapatmış demektir;
 * istemci kimliği silip giriş ekranına dönüyor.
 */
export async function POST(istek: Request) {
  let govde: { id?: unknown; ad?: unknown };
  try {
    govde = (await istek.json()) as { id?: unknown; ad?: unknown };
  } catch {
    return Response.json({ hata: "Okunamadı." }, { status: 400 });
  }

  const id = typeof govde.id === "string" ? govde.id.slice(0, 64) : "";
  const ad = typeof govde.ad === "string" ? govde.ad.slice(0, 40) : "";
  if (!id || !ad) return Response.json({ hata: "Kimlik eksik." }, { status: 400 });

  // Bildirim çökse de oturum durmaz; istemci bir sonraki turda yeniden dener.
  // Ama sessizce yutulmuyor: bu catch bir keresinde gerçek bir Redis hatasını
  // (anahtar tipi çakışması) gizlemişti, günlükte görünsün.
  const acik = await katilimciBildir(id, ad).catch((e) => {
    console.error("[buradayim] kayıt başarısız:", e);
    return true;
  });

  return Response.json({ acik }, { headers: { "cache-control": "no-store" } });
}
