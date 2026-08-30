import { istemleriOku, quizleriOku } from "@/lib/depo";
import { siralamaHesapla } from "@/lib/siralama";

export const dynamic = "force-dynamic";

/**
 * Oturum sonu sıralaması.
 *
 * KİŞİYE ÖZEL DEĞİL — herkese aynı liste gidiyor, o yüzden önbelleklenebilir.
 * Buraya kişiye özel bir alan eklerseniz önbelleği kaldırın.
 *
 * Doğru cevaplar bu yanıtta YOK; yalnızca kaç doğru yapıldığı var.
 */
export async function GET(istek: Request) {
  const url = new URL(istek.url);
  const quizSlayt = url.searchParams.get("quiz") ?? "";
  const atolyeSlayt = url.searchParams.get("atolye") ?? "";
  if (!quizSlayt || !atolyeSlayt) {
    return Response.json({ hata: "Slaytlar belirtilmedi." }, { status: 400 });
  }

  const [quizler, istemler] = await Promise.all([
    quizleriOku(quizSlayt),
    istemleriOku(atolyeSlayt),
  ]);

  return Response.json(
    { satirlar: siralamaHesapla(quizSlayt, quizler, istemler) },
    { headers: { "cache-control": "public, s-maxage=3, stale-while-revalidate=8" } },
  );
}
