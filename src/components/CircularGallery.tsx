"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";
import type { OGLRenderingContext } from "ogl";
import g from "./galeri.module.css";

export type GaleriOgesi = {
  id: string;
  baslik: string;
  gorsel: string;
  sure: number;
  oturum: 1 | 2;
  /** Sunucunun bulunduğu blok. Kartın üstündeki rozet buradan geliyor. */
  aktif?: boolean;
  /** Sunucunun geçtiği bloklar sönük çiziliyor. */
  gecildi?: boolean;
};

type Props = {
  ogeler: GaleriOgesi[];
  /** Yayın bükülmesi. 0 = düz şerit, 3 = belirgin halka. */
  bend?: number;
  textColor?: string;
  /** Köşe yuvarlaklığı, kart genişliğinin oranı olarak. */
  borderRadius?: number;
  /** Kaydırmanın hedefe yaklaşma hızı. Küçük = daha ağır, daha yumuşak. */
  scrollEase?: number;
  font?: string;
  /** Merkezdeki kart değiştiğinde haber verir. */
  onOdak?: (indeks: number) => void;
  /** Bir kart açıldığında. */
  onSec?: (indeks: number) => void;
  /** Bu sayaç her arttığında galeri `merkezIndeks`e kayar. */
  merkezSinyali?: number;
  merkezIndeks?: number;
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const VERT = `
attribute vec3 position;
attribute vec2 uv;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uTime;
uniform float uSpeed;
varying vec2 vUv;
void main() {
  vec3 p = position;
  // Kaydırma hızlandıkça yüzey hafifçe dalgalanır — hareketin ağırlığını verir.
  p.z = (sin(p.x * 4.0 + uTime) * 1.3 + cos(p.y * 2.0 + uTime) * 1.3) * (0.06 + uSpeed * 0.42);
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}`;

const FRAG = `
precision highp float;
uniform sampler2D tMap;
uniform vec2 uImageSizes;
uniform vec2 uPlaneSizes;
uniform float uRadius;
uniform float uDim;
uniform float uFocus;
varying vec2 vUv;

float kutu(vec2 p, vec2 yari, float r) {
  vec2 q = abs(p) - yari + r;
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}

void main() {
  // örtme (cover) hesabı: görsel kartı doldurur, oranı bozulmaz
  vec2 oran = vec2(
    min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
    min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
  );
  vec2 uv = vec2(
    vUv.x * oran.x + (1.0 - oran.x) * 0.5,
    vUv.y * oran.y + (1.0 - oran.y) * 0.5
  );
  vec3 renk = texture2D(tMap, uv).rgb;
  renk = mix(renk, renk * 0.38, uDim);
  renk = mix(renk * 0.72, renk, uFocus);

  float d = kutu(vUv - 0.5, vec2(0.5), uRadius);
  if (d > 0.0) discard;
  float kenar = 1.0 - smoothstep(-0.004, 0.0, d);
  gl_FragColor = vec4(renk, kenar);
}`;

/* ---------------------------------------------------------------- başlık dokusu */

function basligiCiz(gl: OGLRenderingContext, metin: string, font: string, renk: string) {
  const c = document.createElement("canvas");
  const x = c.getContext("2d")!;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  x.font = font;
  const genislik = Math.ceil(x.measureText(metin).width);
  const punto = parseInt(font.match(/(\d+)px/)?.[1] || "30", 10);
  c.width = Math.max(2, (genislik + 24) * dpr);
  c.height = Math.ceil(punto * 1.6) * dpr;
  const x2 = c.getContext("2d")!;
  x2.scale(dpr, dpr);
  x2.font = font;
  x2.fillStyle = renk;
  x2.textBaseline = "middle";
  x2.textAlign = "center";
  x2.fillText(metin, c.width / dpr / 2, c.height / dpr / 2);
  const doku = new Texture(gl, { generateMipmaps: false });
  doku.image = c;
  return { doku, en: c.width / dpr, boy: c.height / dpr };
}

/* ---------------------------------------------------------------- bileşen */

export default function CircularGallery({
  ogeler,
  bend = 3,
  textColor = "#F0F3F7",
  borderRadius = 0.05,
  scrollEase = 0.045,
  font = "600 30px Archivo Variable, Archivo, sans-serif",
  onOdak,
  onSec,
  merkezSinyali = 0,
  merkezIndeks = 0,
}: Props) {
  const kap = useRef<HTMLDivElement>(null);
  const [webglYok, setWebglYok] = useState(false);

  // Callback'ler her render'da değişebilir; döngü içinden ref üzerinden okunuyor.
  const odakCb = useRef(onOdak);
  const secCb = useRef(onSec);
  odakCb.current = onOdak;
  secCb.current = onSec;

  const apiRef = useRef<{ merkezle: (i: number) => void } | null>(null);

  useEffect(() => {
    const kok = kap.current;
    if (!kok || ogeler.length === 0) return;

    const azHareket = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: Renderer;
    try {
      renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio || 1, 2) });
    } catch {
      setWebglYok(true);
      return;
    }
    const gl = renderer.gl;
    if (!gl) {
      setWebglYok(true);
      return;
    }
    gl.clearColor(0, 0, 0, 0);
    gl.canvas.classList.add(g.tuval);
    kok.appendChild(gl.canvas as HTMLCanvasElement);

    const camera = new Camera(gl, { fov: 45 });
    camera.position.z = 20;
    const sahne = new Transform();
    const geo = new Plane(gl, { heightSegments: azHareket ? 1 : 40, widthSegments: azHareket ? 1 : 80 });

    let ekran = { en: 0, boy: 0 };
    let gorunum = { en: 0, boy: 0 };
    let kartEn = 0;
    let kartBoy = 0;
    let adim = 0;
    let toplamEn = 0;
    let maksYay = 0;

    const kayd = { simdi: 0, hedef: 0, son: 0, konum: 0 };
    let hiz = 0;
    let suruklu = false;
    let basX = 0;
    let basKaydirma = 0;
    let hareketEtti = 0;

    type Kart = {
      oge: GaleriOgesi;
      mesh: Mesh;
      program: Program;
      baslik: Mesh;
      baslikBoy: number;
      x: number;
      ekstra: number;
    };
    const kartlar: Kart[] = [];

    /* ---- kartları kur ---- */
    ogeler.forEach((oge) => {
      const doku = new Texture(gl, { generateMipmaps: true });
      const program = new Program(gl, {
        vertex: VERT,
        fragment: FRAG,
        transparent: true,
        uniforms: {
          tMap: { value: doku },
          uPlaneSizes: { value: [0, 0] },
          uImageSizes: { value: [1, 1] },
          uRadius: { value: borderRadius },
          uDim: { value: oge.gecildi ? 1 : 0 },
          uFocus: { value: 0 },
          uTime: { value: Math.random() * 100 },
          uSpeed: { value: 0 },
        },
      });

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = oge.gorsel;
      img.onload = () => {
        doku.image = img;
        program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
      };

      const mesh = new Mesh(gl, { geometry: geo, program });
      mesh.setParent(sahne);

      const { doku: bDoku, en: bEn, boy: bBoy } = basligiCiz(gl, oge.baslik, font, textColor);
      const bProgram = new Program(gl, {
        vertex: `
          attribute vec3 position; attribute vec2 uv;
          uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix;
          varying vec2 vUv;
          void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragment: `
          precision highp float;
          uniform sampler2D tMap; uniform float uAlpha;
          varying vec2 vUv;
          void main(){ vec4 c = texture2D(tMap, vUv); gl_FragColor = vec4(c.rgb, c.a * uAlpha); }`,
        transparent: true,
        uniforms: { tMap: { value: bDoku }, uAlpha: { value: 1 } },
      });
      const baslik = new Mesh(gl, { geometry: new Plane(gl), program: bProgram });
      baslik.setParent(sahne);

      kartlar.push({ oge, mesh, program, baslik, baslikBoy: bBoy / bEn, x: 0, ekstra: 0 });
    });

    /* ---- ölçüler ---- */
    function olcule() {
      ekran = { en: kok!.clientWidth, boy: kok!.clientHeight };
      renderer.setSize(ekran.en, ekran.boy);
      camera.perspective({ aspect: ekran.en / ekran.boy });

      const fov = (camera.fov * Math.PI) / 180;
      const boy = 2 * Math.tan(fov / 2) * camera.position.z;
      gorunum = { boy, en: boy * (ekran.en / ekran.boy) };

      const dar = ekran.en < 720;
      // Telefonda kart görünümün çoğunu kaplar; masaüstünde yay görünsün diye küçülür.
      kartEn = dar ? gorunum.en * 0.62 : Math.min(gorunum.en * 0.19, gorunum.boy * 0.5);
      kartBoy = kartEn * (4 / 3);

      // Yayın kenarlardaki en büyük düşüşü. Kart yüksekliği buna göre sınırlanmazsa
      // kenardaki kartların başlıkları ekranın altından taşar.
      maksYay = 0;
      if (bend !== 0) {
        const B = Math.abs(bend);
        const Y = gorunum.en / 2;
        const R = (Y * Y + B * B) / (2 * B);
        maksYay = R - Math.sqrt(Math.max(R * R - Y * Y, 0));
      }
      // Sahneyi düşüşün yarısı kadar yukarı alıyoruz: yay dikeyde ortalanmış olur.
      sahne.position.y = maksYay / 2;

      // kartBoy/2 (kart) + maksYay (düşüş) + ~0.21*kartBoy (başlık) <= yarı yükseklik
      const kullanilabilir = gorunum.boy / 2 + maksYay / 2 - gorunum.boy * 0.03;
      const enBuyukBoy = Math.max((kullanilabilir - maksYay) / 0.71, gorunum.boy * 0.28);
      if (kartBoy > enBuyukBoy) {
        kartBoy = enBuyukBoy;
        kartEn = kartBoy * 0.75;
      }
      adim = kartEn * (dar ? 1.46 : 1.24);
      toplamEn = adim * kartlar.length;

      kartlar.forEach((k, i) => {
        k.mesh.scale.x = kartEn;
        k.mesh.scale.y = kartBoy;
        k.program.uniforms.uPlaneSizes.value = [kartEn, kartBoy];
        const bEn = kartEn * 0.92;
        k.baslik.scale.x = bEn;
        k.baslik.scale.y = bEn * k.baslikBoy;
        k.x = i * adim;
        k.ekstra = 0;
      });
    }

    /* ---- kart konumu ---- */
    function kartiYerlestir(k: Kart) {
      k.mesh.position.x = k.x - kayd.simdi - k.ekstra;

      const Y = gorunum.en / 2;
      if (bend === 0) {
        k.mesh.position.y = 0;
        k.mesh.rotation.z = 0;
      } else {
        const B = Math.abs(bend);
        const R = (Y * Y + B * B) / (2 * B);
        const uz = Math.min(Math.abs(k.mesh.position.x), Y);
        const yay = R - Math.sqrt(Math.max(R * R - uz * uz, 0));
        const isaret = Math.sign(k.mesh.position.x) || 0;
        const aci = Math.asin(Math.min(uz / R, 1));
        if (bend > 0) {
          k.mesh.position.y = -yay;
          k.mesh.rotation.z = -isaret * aci;
        } else {
          k.mesh.position.y = yay;
          k.mesh.rotation.z = isaret * aci;
        }
      }

      k.baslik.position.x = k.mesh.position.x;
      k.baslik.position.y = k.mesh.position.y - kartBoy / 2 - k.baslik.scale.y * 0.85;
      k.baslik.rotation.z = k.mesh.rotation.z;

      // merkeze yakınlık: odaktaki kart tam parlak, uzaklar sönük
      const yakin = 1 - Math.min(Math.abs(k.mesh.position.x) / (adim * 1.35), 1);
      k.program.uniforms.uFocus.value = yakin;
      (k.baslik.program.uniforms as { uAlpha: { value: number } }).uAlpha.value =
        0.25 + yakin * 0.75;

      // sonsuz sarma
      const yariKart = kartEn / 2;
      const yariGorunum = gorunum.en / 2;
      if (k.mesh.position.x + yariKart < -yariGorunum - adim) k.ekstra -= toplamEn;
      else if (k.mesh.position.x - yariKart > yariGorunum + adim) k.ekstra += toplamEn;
    }

    function odakIndeksi() {
      const n = kartlar.length;
      return ((Math.round(kayd.simdi / adim) % n) + n) % n;
    }

    function kilitle() {
      kayd.hedef = Math.round(kayd.hedef / adim) * adim;
    }

    /* ---- girdi ---- */
    function bas(e: PointerEvent) {
      suruklu = true;
      hareketEtti = 0;
      basX = e.clientX;
      basKaydirma = kayd.hedef;
      (gl.canvas as HTMLCanvasElement).setPointerCapture?.(e.pointerId);
    }
    function kaydir(e: PointerEvent) {
      if (!suruklu) return;
      const fark = basX - e.clientX;
      hareketEtti = Math.max(hareketEtti, Math.abs(fark));
      kayd.hedef = basKaydirma + (fark / ekran.en) * gorunum.en * 1.6;
    }
    function birak(e: PointerEvent) {
      if (!suruklu) return;
      suruklu = false;
      (gl.canvas as HTMLCanvasElement).releasePointerCapture?.(e.pointerId);
      if (hareketEtti < 6) {
        // sürükleme değil tıklama: ortadaki karta tıklandıysa aç, yandakine kaydır
        const oran = (e.clientX - (gl.canvas as HTMLCanvasElement).getBoundingClientRect().left) / ekran.en;
        const duncaX = (oran - 0.5) * gorunum.en;
        let enYakin = kartlar[0];
        for (const k of kartlar) {
          if (Math.abs(k.mesh.position.x - duncaX) < Math.abs(enYakin.mesh.position.x - duncaX)) enYakin = k;
        }
        if (Math.abs(enYakin.mesh.position.x) < adim * 0.5) {
          secCb.current?.(ogeler.indexOf(enYakin.oge));
        } else {
          kayd.hedef += enYakin.mesh.position.x;
          kilitle();
        }
      } else {
        kilitle();
      }
    }
    function tekerlek(e: WheelEvent) {
      e.preventDefault();
      const d = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      kayd.hedef += (d / 220) * adim;
      clearTimeout(tekerlekZamani);
      tekerlekZamani = window.setTimeout(kilitle, 140);
    }
    let tekerlekZamani = 0;

    function tus(e: KeyboardEvent) {
      if (e.key === "ArrowRight") { e.preventDefault(); kayd.hedef += adim; kilitle(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); kayd.hedef -= adim; kilitle(); }
      else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); secCb.current?.(odakIndeksi()); }
    }

    const tuval = gl.canvas as HTMLCanvasElement;
    tuval.addEventListener("pointerdown", bas);
    tuval.addEventListener("pointermove", kaydir);
    tuval.addEventListener("pointerup", birak);
    tuval.addEventListener("pointercancel", birak);
    tuval.addEventListener("wheel", tekerlek, { passive: false });
    kok.addEventListener("keydown", tus);

    const gozlemci = new ResizeObserver(() => olcule());
    gozlemci.observe(kok);

    /* ---- döngü ---- */
    let cerceve = 0;
    let sonOdak = -1;
    function dongu() {
      cerceve = requestAnimationFrame(dongu);
      kayd.simdi = lerp(kayd.simdi, kayd.hedef, azHareket ? 1 : scrollEase);
      hiz = Math.abs(kayd.simdi - kayd.son) * 0.06;
      kartlar.forEach((k) => {
        kartiYerlestir(k);
        k.program.uniforms.uTime.value += 0.02;
        k.program.uniforms.uSpeed.value = azHareket ? 0 : hiz;
      });
      kayd.son = kayd.simdi;
      const o = odakIndeksi();
      if (o !== sonOdak) {
        sonOdak = o;
        odakCb.current?.(o);
      }
      renderer.render({ scene: sahne, camera });
    }

    olcule();
    // sunucunun bulunduğu bloktan başla
    const baslangic = Math.max(0, ogeler.findIndex((o) => o.aktif));
    kayd.simdi = kayd.hedef = baslangic * adim;
    apiRef.current = {
      merkezle: (i: number) => {
        const n = kartlar.length;
        const suanki = Math.round(kayd.hedef / adim);
        const suankiMod = ((suanki % n) + n) % n;
        let delta = i - suankiMod;
        if (delta > n / 2) delta -= n;
        if (delta < -n / 2) delta += n;
        kayd.hedef = (suanki + delta) * adim;
      },
    };
    dongu();

    return () => {
      cancelAnimationFrame(cerceve);
      clearTimeout(tekerlekZamani);
      gozlemci.disconnect();
      tuval.removeEventListener("pointerdown", bas);
      tuval.removeEventListener("pointermove", kaydir);
      tuval.removeEventListener("pointerup", birak);
      tuval.removeEventListener("pointercancel", birak);
      tuval.removeEventListener("wheel", tekerlek);
      kok.removeEventListener("keydown", tus);
      apiRef.current = null;
      const kayip = gl.getExtension("WEBGL_lose_context");
      kayip?.loseContext();
      tuval.remove();
    };
    // ogeler kimliği değişince (oturum değişimi) galeri baştan kurulur
  }, [ogeler, bend, borderRadius, scrollEase, font, textColor]);

  useEffect(() => {
    if (merkezSinyali > 0) apiRef.current?.merkezle(merkezIndeks);
  }, [merkezSinyali, merkezIndeks]);

  return (
    <div className={g.sahne} ref={kap} tabIndex={0} role="listbox" aria-label="Eğitim blokları">
      {webglYok && (
        <div className={g.yedek}>
          {ogeler.map((o, i) => (
            <button key={o.id} className={g.yedekKart} onClick={() => onSec?.(i)}>
              <img src={o.gorsel} alt="" />
              <span>{o.baslik}</span>
              <span className={g.yedekSure}>{o.sure} dk</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
