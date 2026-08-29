import type { Slayt } from "@/icerik/tipler";
import n from "./alinti.module.css";

/** Doğrudan alıntı. Otorite cümlesi ekranda dursun, notta gömülü kalmasın. */
export function Alinti({ slayt }: { slayt: Extract<Slayt, { tip: "alinti" }> }) {
  return (
    <figure className={n.sarma}>
      <span className={n.tirnak} aria-hidden>
        <span />
        <span />
      </span>
      <blockquote className={n.metin}>{slayt.metin}</blockquote>
      <figcaption className={n.kunye}>
        <span className={n.kisi}>{slayt.kisi}</span>
        {slayt.kaynak && <span className={`etiket ${n.kaynak}`}>{slayt.kaynak}</span>}
      </figcaption>
    </figure>
  );
}
