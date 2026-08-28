import { durumuOku, durumuYaz, katilimcilariTemizle } from "@/lib/depo";
import { yoneticiMi } from "@/lib/anahtar";
import { slaytSayisi } from "@/icerik";
import type { Durum } from "@/lib/durum";

export const dynamic = "force-dynamic";

type Komut =
  | { komut: "ileri" }
  | { komut: "geri" }
  | { komut: "git"; deger: number }
  | { komut: "oturum"; deger: 1 | 2 }
  | { komut: "perde" }
  | { komut: "sifirla" }
  | { komut: "katilimcilari-temizle" };

const sinirla = (n: number, enAz: number, enCok: number) => Math.min(Math.max(n, enAz), enCok);

export async function POST(istek: Request) {
  if (!yoneticiMi(istek)) {
    return Response.json({ hata: "Sunucu anahtarı geçersiz." }, { status: 401 });
  }

  let govde: Komut;
  try {
    govde = (await istek.json()) as Komut;
  } catch {
    return Response.json({ hata: "Komut okunamadı." }, { status: 400 });
  }

  const onceki = await durumuOku();
  const son = slaytSayisi(onceki.oturum) - 1;
  let yeni: Durum = { ...onceki };

  switch (govde.komut) {
    case "ileri":
      yeni.slayt = sinirla(onceki.slayt + 1, 0, son);
      yeni.perde = false;
      break;
    case "geri":
      yeni.slayt = sinirla(onceki.slayt - 1, 0, son);
      yeni.perde = false;
      break;
    case "git":
      yeni.slayt = sinirla(Number(govde.deger) || 0, 0, son);
      yeni.perde = false;
      break;
    case "oturum": {
      const hedef = govde.deger === 2 ? 2 : 1;
      yeni.oturum = hedef;
      yeni.slayt = 0;
      yeni.perde = false;
      break;
    }
    case "perde":
      yeni.perde = !onceki.perde;
      break;
    case "sifirla":
      yeni = { ...onceki, slayt: 0, perde: false };
      break;
    case "katilimcilari-temizle":
      await katilimcilariTemizle();
      return Response.json({ durum: onceki }, { headers: { "cache-control": "no-store" } });
    default:
      return Response.json({ hata: "Bilinmeyen komut." }, { status: 400 });
  }

  const kayit = await durumuYaz(yeni);
  return Response.json({ durum: kayit }, { headers: { "cache-control": "no-store" } });
}
