import {
  atolyeSifirla,
  durumuOku,
  durumuYaz,
  katilimcilariTemizle,
  katilimciyiAt,
  secimOku,
  secimYaz,
} from "@/lib/depo";
import { yoneticiMi } from "@/lib/anahtar";
import { slaytAl, slaytSayisi } from "@/icerik";
import type { Durum } from "@/lib/durum";

export const dynamic = "force-dynamic";

type Komut =
  | { komut: "ileri" }
  | { komut: "geri" }
  | { komut: "git"; deger: number }
  | { komut: "oturum"; deger: 1 | 2 }
  | { komut: "perde" }
  | { komut: "sifirla" }
  | { komut: "katilimcilari-temizle" }
  | { komut: "at"; id: string }
  | { komut: "kilitle" }
  | { komut: "istem"; eylem: "ac" | "kapat" | "iyi" | "kotu" | "sifirla"; deger?: string };

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
      // Bir kez açılan kilitli kalmaz: sunucu birinciye dönse de açık kalır.
      if (hedef > onceki.acilan) yeni.acilan = hedef;
      break;
    }
    case "kilitle":
      // Provadan sonra ikinci oturumu tekrar kilitlemek için.
      yeni.acilan = 1;
      break;
    case "perde":
      yeni.perde = !onceki.perde;
      break;
    case "sifirla":
      yeni = { ...onceki, slayt: 0, perde: false, acilan: 1, istemAcik: false };
      break;
    case "istem": {
      // Hangi atölye olduğu slayttan çıkarılıyor; panel id göndermiyor.
      const slayt = slaytAl(onceki.oturum, onceki.slayt);
      const hedefId =
        slayt?.tip === "atolye"
          ? slayt.id
          : slayt?.tip === "karsilastirma"
            ? slayt.kaynakSlayt
            : null;
      if (!hedefId) {
        return Response.json({ hata: "Bu slaytta atölye yok." }, { status: 409 });
      }
      if (govde.eylem === "ac" || govde.eylem === "kapat") {
        yeni.istemAcik = govde.eylem === "ac";
        break;
      }
      if (govde.eylem === "sifirla") {
        await atolyeSifirla(hedefId);
        yeni.istemAcik = false;
        break;
      }
      // iyi / kotu: yan yana yazılmasın diye önce okunup birleştiriliyor.
      const secilen = String(govde.deger ?? "").slice(0, 64);
      if (!secilen) return Response.json({ hata: "Kimlik eksik." }, { status: 400 });
      const mevcut = await secimOku(hedefId);
      const anahtar = govde.eylem === "iyi" ? "iyi" : "kotu";
      // Aynı kişiye ikinci kez basmak işareti kaldırıyor.
      await secimYaz(hedefId, {
        ...mevcut,
        [anahtar]: mevcut[anahtar] === secilen ? undefined : secilen,
      });
      return Response.json({ durum: onceki }, { headers: { "cache-control": "no-store" } });
    }
    case "katilimcilari-temizle":
      await katilimcilariTemizle();
      return Response.json({ durum: onceki }, { headers: { "cache-control": "no-store" } });
    case "at": {
      // Katılımcının oturumunu kapatır. Kaydı silmek yetmez — bir sonraki
      // bildirimde kendini geri eklerdi; kısa süreli bir işaret bırakılıyor.
      if (typeof govde.id !== "string" || !govde.id) {
        return Response.json({ hata: "Kimlik eksik." }, { status: 400 });
      }
      await katilimciyiAt(govde.id.slice(0, 64));
      return Response.json({ durum: onceki }, { headers: { "cache-control": "no-store" } });
    }
    default:
      return Response.json({ hata: "Bilinmeyen komut." }, { status: 400 });
  }

  const kayit = await durumuYaz(yeni);
  return Response.json({ durum: kayit }, { headers: { "cache-control": "no-store" } });
}
