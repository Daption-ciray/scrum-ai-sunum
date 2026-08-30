import { istemleriOku, secimOku } from "@/lib/depo";

export const dynamic = "force-dynamic";

/**
 * Seçilen iki istem — karşılaştırma slaydı bunu okuyor.
 *
 * KİŞİYE ÖZEL DEĞİL: herkese aynı yanıt gidiyor, o yüzden önbelleklenebilir.
 * Buraya kişiye özel bir alan eklerseniz önbelleği kaldırın.
 *
 * Eksik istemi YAZANIN adı bu yanıtta YOK ve olmayacak. Ad yalnızca sunucu
 * panelinde görünüyor; katılımcının ekranına inen tek şey metnin kendisi.
 * Amaç dersi göstermek, kimseyi odada küçük düşürmek değil.
 */
export async function GET(istek: Request) {
  const slaytId = new URL(istek.url).searchParams.get("slayt") ?? "";
  if (!slaytId) return Response.json({ hata: "Slayt belirtilmedi." }, { status: 400 });

  const [istemler, secim] = await Promise.all([istemleriOku(slaytId), secimOku(slaytId)]);
  const bul = (id?: string) => (id ? istemler.find((i) => i.id === id) : undefined);

  const iyi = bul(secim.iyi);
  const kotu = bul(secim.kotu);

  return Response.json(
    {
      toplam: istemler.length,
      iyi: iyi ? { ad: iyi.ad, metin: iyi.metin } : null,
      // Ad bilerek yok — sansür burada, istemcide değil.
      kotu: kotu ? { metin: kotu.metin } : null,
    },
    { headers: { "cache-control": "public, s-maxage=2, stale-while-revalidate=6" } },
  );
}
