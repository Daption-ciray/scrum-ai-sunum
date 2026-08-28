// Kart görsellerini üretir: node kartlar/calistir.mjs
// Gereken: npm i -D playwright  (ve bir kez: npx playwright install chromium)
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const BURASI = dirname(fileURLToPath(import.meta.url));
const KOK = resolve(BURASI, '..');
const CIKTI = resolve(KOK, 'public/kartlar');
mkdirSync(CIKTI, { recursive: true });

const TEAL = '#4FE3D4', TURUNCU = '#FFA76F';

const t = await chromium.launch();
const p = await (await t.newContext({ viewport: { width: 700, height: 900 } })).newPage();
p.on('pageerror', e => { console.error('SAYFA HATASI:', e.message); });
await p.goto('file://' + resolve(BURASI, 'uret.html'));

let toplam = 0;
for (let i = 0; i < 14; i++) {
  const renk = i < 7 ? TEAL : TURUNCU;
  const veri = await p.evaluate(([i, renk]) => window.ciz(i, renk), [i, renk]);
  const b64 = veri.split(',')[1];
  const buf = Buffer.from(b64, 'base64');
  const ad = `blok-${String(i + 1).padStart(2, '0')}.jpg`;
  writeFileSync(`${CIKTI}/${ad}`, buf);
  toplam += buf.length;
  console.log(ad, (buf.length / 1024).toFixed(0) + ' KB');
}
console.log('toplam', (toplam / 1024 / 1024).toFixed(2), 'MB');

// hepsini tek karede göster — seri olarak tutarlı mı diye bakmak için
await p.setViewportSize({ width: 1400, height: 860 });
await p.setContent(`<style>body{margin:0;background:#0A0C0F;display:grid;grid-template-columns:repeat(7,1fr);gap:8px;padding:10px}img{width:100%;display:block;border-radius:3px}</style>` +
  Array.from({ length: 14 }, (_, i) => `<img src="file://${CIKTI}/blok-${String(i + 1).padStart(2, '0')}.jpg">`).join(''));
await p.waitForTimeout(700);
await p.screenshot({ path: resolve(BURASI, 'onizleme.png') });
await t.close();
