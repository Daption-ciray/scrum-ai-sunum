import { katilimciAyril, katilimciBildir } from "@/lib/depo";

export const dynamic = "force-dynamic";

/**
 * "Buradayım" bildirimi. Yoklamadan ayrıldı çünkü çok daha seyrek gerekiyor:
 * canlılık eşiği 20 saniye, bildirim 10 saniyede bir yetiyor. Ayrılmasının
 * ikinci sebebi /api/durum'un CDN'de önbelleklenebilmesi — kişiye özel bir
 * yazma orada duramazdı.
 *
 * Yanıt `acik: false` ise sunucu bu kişinin oturumunu kapatmış demektir;
 * istemci kimliği silip giriş ekranına dönüyor.
 *
 * `ayril: true` ise katılımcı Çıkış'a bastı: kayıt hemen siliniyor. Aynı
 * uçtan gidiyor çünkü tek şey değişiyor — kaydın yazılması yerine silinmesi.
 */
export async function POST(istek: Request) {
  let govde: { id?: unknown; ad?: unknown; ayril?: unknown };
  try {
    govde = (await istek.json()) as { id?: unknown; ad?: unknown; ayril?: unknown };
  } catch {
    return Response.json({ hata: "Okunamadı." }, { status: 400 });
  }

  const id = typeof govde.id === "string" ? govde.id.slice(0, 64) : "";
  const ad = typeof govde.ad === "string" ? govde.ad.slice(0, 40) : "";
  if (!id) return Response.json({ hata: "Kimlik eksik." }, { status: 400 });

  if (govde.ayril === true) {
    // `keepalive` isteği: sayfa zaten kapanıyor, yanıtı kimse okumuyor.
    await katilimciAyril(id).catch((e) => console.error("[buradayim] ayrılma:", e));
    return Response.json({ ok: true }, { headers: { "cache-control": "no-store" } });
  }

  if (!ad) return Response.json({ hata: "Kimlik eksik." }, { status: 400 });

  // Bildirim çökse de oturum durmaz; istemci bir sonraki turda yeniden dener.
  // Ama sessizce yutulmuyor: bu catch bir keresinde gerçek bir Redis hatasını
  // (anahtar tipi çakışması) gizlemişti, günlükte görünsün.
  const acik = await katilimciBildir(id, ad).catch((e) => {
    console.error("[buradayim] kayıt başarısız:", e);
    return true;
  });

  return Response.json({ acik }, { headers: { "cache-control": "no-store" } });
}
