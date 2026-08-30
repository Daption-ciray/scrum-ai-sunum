import g from "./bolumGorseli.module.css";

/**
 * Bölüm ayraçlarındaki destekleyici görsel — Corporate Memphis dilinde.
 *
 * MERKEZDE İNSAN VAR. Bu bir süs tercihi değil: katılımcı soyut bir ikonla
 * bağ kurmuyor, figürle kuruyor. On bir kompozisyonun onunda en az bir kişi
 * var ve sahnedeki en koyu kütle çoğunlukla o — göz önce oraya gidiyor.
 *
 * Biçim: şekiller konturla değil DOLGUYLA tanımlanıyor, formlar yuvarlak.
 * Renk yok, üç düz ton (ton1 soluk · ton2 orta · ton3 koyu) — Memphis'in üç
 * renkli paletinin yerini temanın gri rampası aldı. Yeşil hâlâ yalnızca
 * "sunucu burada" demek, illüstrasyona girmiyor.
 *
 * Hepsi `viewBox 0 0 100 100`. Buraya hex yazmayın, renkler tema.css'ten.
 */

function Sarma({ children, etiket }: { children: React.ReactNode; etiket: string }) {
  return (
    <svg className={g.gorsel} viewBox="0 0 100 100" role="img" aria-label={etiket}>
      {children}
    </svg>
  );
}

/**
 * Memphis figürü: baş daire, gövde hap, YÜZ YOK. Yüz çizilmediği için figür
 * "biri" değil "herkes" oluyor — katılımcının kendini koyabildiği yer burası.
 *
 * Gövde altı = y + 4.6r. Yeni figür yerleştirirken bunu 94'ün altında tutun,
 * yoksa figür kutudan taşar.
 */
function Kisi({
  x,
  y,
  r,
  ton,
  kol,
}: {
  x: number;
  y: number;
  r: number;
  ton: string;
  /** İsteğe bağlı kol yolu. Rengi figürün tonundan miras alır. */
  kol?: string;
}) {
  const gen = r * 1.3;
  return (
    <g className={ton}>
      {kol && <path d={kol} className={g.kol} />}
      <circle cx={x} cy={y} r={r} />
      <rect x={x - gen} y={y + r + r * 0.4} width={gen * 2} height={r * 3.2} rx={gen} />
    </g>
  );
}

/** Bölüm numarasına göre görsel. Eşleşme yoksa hiçbir şey çizmiyor. */
export function BolumGorseli({ numara }: { numara: string }) {
  switch (numara) {
    /* Roller değişiyor — üç unvan, tek rolde toplanıyor. */
    case "02":
      return (
        <Sarma etiket="Birleşen roller">
          <Kisi x={10} y={62} r={6} ton={g.ton1} />
          <Kisi x={30} y={62} r={6} ton={g.ton1} />
          <Kisi x={50} y={62} r={6} ton={g.ton1} />
          <path d="M10 48 C28 26 52 20 66 26" className={g.baglanti} />
          <Kisi x={78} y={34} r={13} ton={g.ton3} />
        </Sarma>
      );

    /* Scrum çerçevesi — ekip döngünün içinde çalışır. */
    case "03":
      return (
        <Sarma etiket="Döngünün içindeki ekip">
          <path d="M74 26 A34 34 0 1 1 60 18" className={g.halka} />
          <path d="M70 8 L81 26 L59 27 Z" className={g.uc} />
          <Kisi x={50} y={40} r={9} ton={g.ton3} />
        </Sarma>
      );

    /* AI temelleri — insan ve model yan yana; ölçek farkı bilerek. */
    case "04":
      return (
        <Sarma etiket="İnsan ve model">
          <circle cx={66} cy={50} r={31} className={g.ton1} />
          <circle cx={66} cy={50} r={20} className={g.ton2} />
          <circle cx={66} cy={50} r={9} className={g.ton3} />
          <Kisi x={16} y={38} r={12} ton={g.ton3} kol="M27 58 C34 56 38 54 40 52" />
        </Sarma>
      );

    /* Etkili istem yazımı — bağlamı kuran kişi. */
    case "05":
      return (
        <Sarma etiket="İstemi yazan kişi">
          <rect x={40} y={10} width={56} height={46} rx={16} className={g.ton1} />
          <path d="M52 52 C52 52 48 70 42 74 C54 72 62 64 66 54 Z" className={g.ton1} />
          <rect x={52} y={22} width={32} height={6} rx={3} className={g.ton2} />
          <rect x={52} y={35} width={20} height={6} rx={3} className={g.ton2} />
          <circle cx={80} cy={38} r={5} className={g.ton3} />
          <Kisi x={18} y={44} r={11} ton={g.ton3} kol="M28 62 C36 60 40 56 42 52" />
        </Sarma>
      );

    /* Özet ve kapanış — tamamlandı. */
    case "06":
      return (
        <Sarma etiket="Tamamlandı">
          <circle cx={70} cy={54} r={25} className={g.ton1} />
          <path d="M59 55 L67 63 L82 45" className={g.onay} />
          <Kisi x={26} y={36} r={12} ton={g.ton3} kol="M37 54 C44 50 46 42 45 34" />
        </Sarma>
      );

    /* Sprint Planning — panonun başındaki kişi. */
    case "07":
      return (
        <Sarma etiket="Panonun başında">
          <rect x={4} y={8} width={66} height={52} rx={13} className={g.ton1} />
          <rect x={13} y={19} width={18} height={11} rx={5.5} className={g.ton3} />
          <rect x={38} y={19} width={18} height={11} rx={5.5} className={g.ton2} />
          <rect x={13} y={38} width={18} height={11} rx={5.5} className={g.ton2} />
          <rect x={38} y={38} width={30} height={7} rx={3.5} className={g.ton2} />
          <Kisi x={85} y={42} r={11} ton={g.ton3} kol="M77 58 C73 55 72 51 73 47" />
        </Sarma>
      );

    /* Daily Scrum — on beş dakika ekibin. Araç yok, sadece insanlar. */
    case "08":
      return (
        <Sarma etiket="Üç kişi ayakta">
          <Kisi x={20} y={38} r={10} ton={g.ton1} />
          <Kisi
            x={50}
            y={26}
            r={12}
            ton={g.ton3}
            kol="M36 50 C42 44 58 44 64 50"
          />
          <Kisi x={80} y={38} r={10} ton={g.ton1} />
          <rect x={6} y={86} width={88} height={8} rx={4} className={g.ton2} />
        </Sarma>
      );

    /* Çıktıyı değerlendirme — muhakemeyi yapan insan. */
    case "09":
      return (
        <Sarma etiket="Çıktıyı inceleyen kişi">
          <rect x={4} y={8} width={44} height={58} rx={12} className={g.ton1} />
          <rect x={14} y={21} width={24} height={6} rx={3} className={g.ton2} />
          <rect x={14} y={33} width={16} height={6} rx={3} className={g.ton2} />
          <circle cx={44} cy={52} r={17} className={g.ton3} />
          <circle cx={44} cy={52} r={9} className={g.ton1} />
          <path d="M56 64 L64 72" className={g.sap} />
          <Kisi x={84} y={40} r={11} ton={g.ton3} />
        </Sarma>
      );

    /* Güvenlik ve etik — korunan insan. */
    case "10":
      return (
        <Sarma etiket="Kalkanın içindeki kişi">
          <path
            d="M50 4 C62 10 76 15 88 17 C90 46 78 74 50 94 C22 74 10 46 12 17 C24 15 38 10 50 4 Z"
            className={g.ton1}
          />
          <Kisi x={50} y={34} r={12} ton={g.ton3} />
        </Sarma>
      );

    /* Ekip çalışma anlaşması — iki kişi, aralarındaki ortak metin. */
    case "11":
      return (
        <Sarma etiket="Üzerinde anlaşılan metin">
          <rect x={33} y={12} width={34} height={48} rx={11} className={g.ton1} />
          <rect x={40} y={22} width={20} height={5} rx={2.5} className={g.ton2} />
          <rect x={40} y={32} width={20} height={5} rx={2.5} className={g.ton2} />
          <rect x={40} y={42} width={13} height={5} rx={2.5} className={g.ton2} />
          <Kisi x={14} y={46} r={10} ton={g.ton3} kol="M23 62 C29 58 31 52 31 46" />
          <Kisi x={86} y={46} r={10} ton={g.ton3} kol="M77 62 C71 58 69 52 69 46" />
        </Sarma>
      );

    /* Eylem planı — hedefe doğru yürüyen kişi. */
    case "12":
      return (
        <Sarma etiket="Hedefe yürüyen kişi">
          <rect x={4} y={88} width={92} height={7} rx={3.5} className={g.ton1} />
          <Kisi x={16} y={32} r={12} ton={g.ton3} kol="M27 50 C33 52 37 54 40 56" />
          <circle cx={46} cy={72} r={5} className={g.ton2} />
          <circle cx={58} cy={66} r={5} className={g.ton2} />
          <circle cx={68} cy={58} r={5} className={g.ton2} />
          <rect x={78} y={14} width={8} height={74} rx={4} className={g.ton2} />
          <path d="M86 18 C94 20 98 25 99 30 C93 35 88 37 86 37 Z" className={g.uc} />
        </Sarma>
      );

    default:
      return null;
  }
}
