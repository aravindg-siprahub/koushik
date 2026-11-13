import { couple, dateRangeLabel } from "@/config/wedding";
import { Monogram } from "./Monogram";
import { Divider, Elephant, Gopuram, Toran } from "./Motifs";

export function FooterSection() {
  return (
    <footer className="silk relative overflow-hidden text-center text-cream">
      <Toran id="toran-footer" />
      <div className="relative mx-auto max-w-4xl px-5 pt-12 pb-28 sm:pb-24">
        <Monogram id="mono-footer" className="mx-auto h-36 w-auto drop-shadow-[0_6px_20px_rgb(0_0_0/0.5)]" />
        <p lang="te" className="mt-4 font-telugu text-lg text-champagne">
          మీ ఆశీస్సులే మాకు శ్రీరామరక్ష
        </p>
        <p className="gold-text shimmer mt-1 inline-block px-3 py-3 font-script text-6xl sm:text-7xl">
          <span className="block sm:inline">{couple.groom.firstName}</span> <span className="whitespace-nowrap">&amp; {couple.bride.firstName}</span>
        </p>
        <Divider className="mx-auto mt-4 h-5 w-48" />
        <p className="mt-3 font-display text-sm tracking-[0.25em] text-champagne uppercase">{dateRangeLabel}</p>
        <p className="mt-6 text-lg text-cream/80 italic">With love and warmth, we welcome you to join our celebrations.</p>
        <p className="mt-2 text-base text-cream/70">With love, the Penugonda &amp; Thatavarthy families</p>

        <div className="mt-10 flex items-end justify-center gap-1 sm:gap-6" aria-hidden="true">
          <Elephant className="h-20 w-28 shrink-0 sm:h-28 sm:w-40" />
          <Gopuram className="h-28 w-32 shrink-0 sm:h-40 sm:w-48" color="#C69A45" />
          <Elephant className="h-20 w-28 shrink-0 -scale-x-100 sm:h-28 sm:w-40" />
        </div>
        <div className="mx-auto h-px max-w-md bg-gradient-to-r from-transparent via-gold to-transparent" />
        <p className="mt-6 font-display text-[0.6rem] tracking-[0.35em] text-gold/80 uppercase">Koushik weds Srija · 2026</p>
      </div>
    </footer>
  );
}
