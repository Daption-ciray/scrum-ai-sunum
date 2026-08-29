#!/usr/bin/env node
/**
 * Kart görsellerini fal.ai ile üretir.
 *
 *   node kartlar/fal-uret.mjs
 *   node kartlar/fal-uret.mjs --only 3,9,14
 *   node kartlar/fal-uret.mjs --model fal-ai/flux/schnell
 *   node kartlar/fal-uret.mjs --dry-run
 *
 * Anahtar: proje kökündeki .env.local dosyasına FAL_KEY=... yazın. Betik onu
 * kendi okuyor. (.env.local git tarafından yok sayılıyor — anahtar depoya
 * girmez.) İsterseniz komut satırından da geçebilirsiniz:
 *   FAL_KEY=xxx node kartlar/fal-uret.mjs
 * Komut satırı .env.local'ın önüne geçer.
 *
 * Anahtarı https://fal.ai/dashboard/keys adresinden alırsınız.
 *
 * Yalnızca üretim betiği — siteye dahil değil, Vercel'e gitmiyor.
 * Bağımlılığı yok, Node 18+ yeterli.
 */

import { mkdirSync, writeFileSync, renameSync, statSync, existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { KARTLAR, promptKur, dosyaAdi } from "./kart-promptlari.mjs";

const BURASI = dirname(fileURLToPath(import.meta.url));
const KOK = resolve(BURASI, "..");
const CIKTI = resolve(KOK, "public/kartlar");

/* ------------------------------------------------------------------ ayarlar */

const VARSAYILAN_MODEL = "fal-ai/flux/dev";
const EN = 768;
const BOY = 1024; // 3:4 — kartın oranı
const ES_ZAMANLI = 3; // fal'ı yormadan makul hız
const DENEME = 3; // geçici hatalarda toplam deneme
const ZAMAN_ASIMI_MS = 180_000; // tek kart için üst sınır
const BUYUK_UYARI = 260 * 1024; // bunun üstü galeriyi yavaşlatır

/* ------------------------------------------------------------- argümanlar */

function argAl(ad) {
  const i = process.argv.indexOf(`--${ad}`);
  return i === -1 ? null : process.argv[i + 1] ?? "";
}
const bayrak = (ad) => process.argv.includes(`--${ad}`);

const MODEL = argAl("model") || VARSAYILAN_MODEL;
const KURU = bayrak("dry-run");
const sadece = argAl("only");
const SECILEN = sadece
  ? sadece
      .split(",")
      .map((s) => Number(s.trim()))
      .filter((n) => Number.isInteger(n) && n >= 1 && n <= KARTLAR.length)
  : null;

if (sadece && (!SECILEN || SECILEN.length === 0)) {
  cik(`--only değeri anlaşılmadı: "${sadece}". Örnek: --only 3,9,14 (1-${KARTLAR.length} arası).`);
}

const ISLENECEK = SECILEN ? KARTLAR.filter((k) => SECILEN.includes(k.no)) : KARTLAR;

/**
 * .env.local, sonra .env okunur. Zaten tanımlı bir değişkenin üzerine
 * yazılmaz — komut satırından verilen değer her zaman öncelikli.
 * Bağımlılık istemiyoruz, o yüzden ufak bir okuyucu.
 */
function ortamiYukle() {
  for (const ad of [".env.local", ".env"]) {
    const yol = resolve(KOK, ad);
    if (!existsSync(yol)) continue;
    let icerik;
    try {
      icerik = readFileSync(yol, "utf8");
    } catch {
      continue;
    }
    for (const satir of icerik.split(/\r?\n/)) {
      const t = satir.trim();
      if (!t || t.startsWith("#")) continue;
      const esit = t.indexOf("=");
      if (esit === -1) continue;
      const anahtar = t.slice(0, esit).trim().replace(/^export\s+/, "");
      if (!anahtar || process.env[anahtar] !== undefined) continue;
      let deger = t.slice(esit + 1).trim();
      const tirnak = deger[0];
      if ((tirnak === '"' || tirnak === "'") && deger.endsWith(tirnak)) {
        deger = deger.slice(1, -1);
      }
      // Boş atama yok sayılır: şablondan kopyalanan "FAL_KEY=" satırı,
      // aşağıda gerçekten doldurulmuş bir satırı gölgelemesin.
      if (deger === "") continue;
      process.env[anahtar] = deger;
    }
  }
}
ortamiYukle();

const ANAHTAR = process.env.FAL_KEY || process.env.FAL_API_KEY || "";
if (!ANAHTAR && !KURU) {
  cik(
    "FAL_KEY bulunamadı.\n\n" +
      "  Proje kökündeki .env.local dosyasına şu satırı ekleyin:\n" +
      "    FAL_KEY=buraya-anahtariniz\n\n" +
      "  Anahtar: https://fal.ai/dashboard/keys\n" +
      "  (.env.local git'e girmez, anahtar depoda kalmaz.)\n\n" +
      "  Önce ne üretileceğini görmek için anahtara gerek yok:\n" +
      "    node kartlar/fal-uret.mjs --dry-run",
  );
}

/* ------------------------------------------------------------------ yardım */

function cik(mesaj) {
  console.error(`\n${mesaj}\n`);
  process.exit(1);
}
const bekle = (ms) => new Promise((r) => setTimeout(r, ms));
const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

/** fal geçici hata mı veriyor, yoksa vazgeçmeli miyiz? */
function gecici(durum) {
  return durum === 408 || durum === 429 || durum >= 500;
}

async function falIstek(url, secenekler = {}, deneme = 1) {
  const yanit = await fetch(url, {
    ...secenekler,
    headers: {
      Authorization: `Key ${ANAHTAR}`,
      "content-type": "application/json",
      ...(secenekler.headers || {}),
    },
  });

  if (yanit.ok) return yanit.json();

  const govde = await yanit.text().catch(() => "");

  // 403 her zaman "anahtar yanlış" demek değil: kurumsal ağlar ve sanal
  // ortamlar fal.ai'ı engellediğinde de 403 döner. İkisini karıştırmayalım,
  // yoksa insan saatlerce doğru anahtarı yanlış sanır.
  if (/allowlist|egress|not in allow|blocked|proxy/i.test(govde)) {
    cik(
      `fal.ai'a ağ erişimi engellenmiş (HTTP ${yanit.status}).\n` +
        `  ${govde.slice(0, 200)}\n\n` +
        `  Bu bir anahtar sorunu değil. Betiği fal.ai'a çıkabilen bir yerden\n` +
        `  çalıştırın — kendi Terminal'iniz iş görür.`,
    );
  }
  if (yanit.status === 401 || yanit.status === 403) {
    cik(`fal anahtarı kabul edilmedi (HTTP ${yanit.status}). FAL_KEY doğru mu?\n  ${govde.slice(0, 300)}`);
  }
  if (gecici(yanit.status) && deneme < DENEME) {
    const geri = 1500 * 2 ** (deneme - 1);
    await bekle(geri);
    return falIstek(url, secenekler, deneme + 1);
  }
  throw new Error(`fal ${yanit.status}: ${govde.slice(0, 300)}`);
}

/* ------------------------------------------------------------- tek kart */

async function kartUret(kart) {
  const prompt = promptKur(kart);
  const ad = dosyaAdi(kart);

  // 1) kuyruğa bırak
  const gonderi = await falIstek(`https://queue.fal.run/${MODEL}`, {
    method: "POST",
    body: JSON.stringify({
      prompt,
      image_size: { width: EN, height: BOY },
      num_images: 1,
      output_format: "jpeg",
      enable_safety_checker: false,
      // schnell 4 adımı kendi seçiyor; dev için makul bir varsayılan
      ...(MODEL.includes("schnell") ? {} : { num_inference_steps: 28, guidance_scale: 3.5 }),
    }),
  });

  const durumUrl = gonderi.status_url;
  const sonucUrl = gonderi.response_url;
  if (!durumUrl || !sonucUrl) {
    throw new Error(`fal beklenmedik yanıt verdi: ${JSON.stringify(gonderi).slice(0, 300)}`);
  }

  // 2) bitene kadar sor
  const basladi = Date.now();
  let durum = "IN_QUEUE";
  while (durum !== "COMPLETED") {
    if (Date.now() - basladi > ZAMAN_ASIMI_MS) {
      throw new Error(`zaman aşımı (${ZAMAN_ASIMI_MS / 1000} sn)`);
    }
    await bekle(1800);
    const d = await falIstek(durumUrl);
    durum = d.status;
    if (durum === "FAILED" || durum === "CANCELLED") {
      throw new Error(`fal işi ${durum}: ${JSON.stringify(d.error ?? d).slice(0, 300)}`);
    }
  }

  // 3) sonucu al
  const sonuc = await falIstek(sonucUrl);
  const gorsel = sonuc?.images?.[0];
  if (!gorsel?.url) {
    throw new Error(`sonuçta görsel yok: ${JSON.stringify(sonuc).slice(0, 300)}`);
  }

  // 4) indir
  const indir = await fetch(gorsel.url);
  if (!indir.ok) throw new Error(`görsel indirilemedi: HTTP ${indir.status}`);
  const veri = Buffer.from(await indir.arrayBuffer());

  // Önce geçici dosyaya yaz, sonra taşı: yarım kalan bir çalıştırma
  // mevcut kartı bozmasın, galeri her an ayakta kalsın.
  mkdirSync(CIKTI, { recursive: true });
  const gecici_ = resolve(CIKTI, `.${ad}.indiriliyor`);
  writeFileSync(gecici_, veri);
  renameSync(gecici_, resolve(CIKTI, ad));

  return { ad, bayt: veri.length, sure: Math.round((Date.now() - basladi) / 1000) };
}

/* ------------------------------------------------------------------ ana */

async function main() {
  console.log(`\nModel     : ${MODEL}`);
  console.log(`Boyut     : ${EN}×${BOY} (3:4)`);
  console.log(`Çıktı     : ${CIKTI}`);
  console.log(`Üretilecek: ${ISLENECEK.length} kart${SECILEN ? ` (${SECILEN.join(", ")})` : ""}\n`);

  if (KURU) {
    for (const k of ISLENECEK) {
      console.log(`--- ${dosyaAdi(k)}  ·  ${k.ad}  ·  oturum ${k.oturum}`);
      console.log(promptKur(k));
      console.log("");
    }
    console.log("Kuru çalıştırma — hiçbir şey üretilmedi, hiçbir dosya değişmedi.\n");
    return;
  }

  const sonuclar = [];
  const hatalar = [];
  const sira = [...ISLENECEK];

  async function isci() {
    while (sira.length) {
      const kart = sira.shift();
      const etiket = `${dosyaAdi(kart)} (${kart.ad})`;
      try {
        process.stdout.write(`  ↻ ${etiket}\n`);
        const r = await kartUret(kart);
        sonuclar.push({ ...r, kart });
        const uyari = r.bayt > BUYUK_UYARI ? "  ⚠ büyük" : "";
        console.log(`  ✓ ${r.ad}  ${kb(r.bayt)}  ${r.sure} sn${uyari}`);
      } catch (e) {
        hatalar.push({ kart, mesaj: e.message });
        console.log(`  ✗ ${etiket}  →  ${e.message}`);
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(ES_ZAMANLI, sira.length) }, isci));

  console.log(`\n${sonuclar.length}/${ISLENECEK.length} kart üretildi.`);

  const buyukler = sonuclar.filter((r) => r.bayt > BUYUK_UYARI);
  if (buyukler.length) {
    console.log(
      `\n${buyukler.length} kart ${kb(BUYUK_UYARI)} üstünde. Galeri 14 kartı birden yüklüyor,\n` +
        `toplamı 2 MB altında tutmakta fayda var. Mac'te küçültmek için:\n` +
        `  sips -s formatOptions 80 -s format jpeg public/kartlar/*.jpg --out public/kartlar`,
    );
  }

  if (hatalar.length) {
    const nolar = hatalar.map((h) => h.kart.no).join(",");
    console.log(`\nBaşarısız: ${nolar}`);
    console.log(`Sadece onları yeniden denemek için:\n  FAL_KEY=... node kartlar/fal-uret.mjs --only ${nolar}`);
    process.exitCode = 1;
  }

  // Seriye topluca bakmak için basit bir kontak sayfası
  const onizleme = resolve(BURASI, "onizleme.html");
  if (!existsSync(onizleme)) yaz_onizleme(onizleme);

  const toplam = KARTLAR.map((k) => resolve(CIKTI, dosyaAdi(k)))
    .filter((p) => existsSync(p))
    .reduce((t, p) => t + statSync(p).size, 0);
  console.log(`\nKlasör toplamı: ${(toplam / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Seriye topluca bakmak için: open kartlar/onizleme.html\n`);
}

function yaz_onizleme(hedef) {
  const kutucuklar = KARTLAR.map(
    (k) => `  <figure>
    <img src="../public/kartlar/${dosyaAdi(k)}" alt="">
    <figcaption><b>${String(k.no).padStart(2, "0")}</b> ${k.ad}</figcaption>
  </figure>`,
  ).join("\n");

  writeFileSync(
    hedef,
    `<!doctype html>
<meta charset="utf-8">
<title>Kart serisi</title>
<style>
  body { margin:0; padding:20px; background:#0A0C0F; color:#98A2B1;
         font:14px/1.5 -apple-system, system-ui, sans-serif;
         display:grid; grid-template-columns:repeat(7,1fr); gap:14px; }
  figure { margin:0; display:flex; flex-direction:column; gap:8px; }
  img { width:100%; aspect-ratio:3/4; object-fit:cover; border-radius:4px;
        background:#161A21; display:block; }
  figcaption { font-size:12px; }
  b { color:#F0F3F7; font-family:ui-monospace, monospace; }
</style>
${kutucuklar}
`,
  );
}

main().catch((e) => cik(`Beklenmeyen hata: ${e.stack || e.message}`));
