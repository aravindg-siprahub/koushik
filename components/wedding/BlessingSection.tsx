import Image from "next/image";
import { blessing } from "@/config/wedding";
import { Diya, Divider, Ganesha, Mandala, ShivaEmblem, VenkateswaraEmblem } from "./Motifs";
import { Reveal } from "./Reveal";

type Deity = (typeof blessing.deities)[number];

function DeityMedallion({ deity, delay, main }: { deity: Deity; delay: number; main?: boolean }) {
  return (
    <Reveal delay={delay} className="flex flex-col items-center">
      <div className={`relative grid place-items-center ${main ? "h-32 w-32 sm:h-60 sm:w-60" : "h-24 w-24 sm:h-48 sm:w-48"}`}>
        <div
          className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgb(255_210_110/0.4)_0%,rgb(198_154_69/0.14)_45%,transparent_70%)]"
          aria-hidden="true"
        />
        <span className="absolute inset-2 rounded-full border border-gold/55" aria-hidden="true" />
        <span className="spin-slow absolute inset-4 rounded-full border border-dashed border-gold/30" aria-hidden="true" />
        {deity.image ? (
          <div className="relative h-[72%] w-[72%] overflow-hidden rounded-full border-2 border-gold shadow-[0_0_40px_rgb(242_185_43/0.35)]">
            <Image src={deity.image} alt={deity.name} fill sizes="160px" className="object-cover" />
          </div>
        ) : deity.id === "ganesha" ? (
          <Ganesha className={`relative w-auto drop-shadow-[0_0_20px_rgb(242_185_43/0.45)] ${main ? "h-24 sm:h-44" : "h-[4.25rem] sm:h-[8.5rem]"}`} bg="#641326" title={deity.name} />
        ) : deity.id === "shiva" ? (
          <ShivaEmblem className={`relative w-auto drop-shadow-[0_0_20px_rgb(242_185_43/0.45)] ${main ? "h-24 sm:h-44" : "h-16 sm:h-32"}`} title={deity.name} />
        ) : (
          <VenkateswaraEmblem className="relative w-[72%] drop-shadow-[0_0_20px_rgb(242_185_43/0.45)]" title={deity.name} />
        )}
      </div>
      <p lang="te" className="mt-3 font-telugu text-[0.85rem] leading-snug text-champagne sm:text-xl">
        {deity.mantra}
      </p>
      <p className="mt-1 hidden font-display text-[0.6rem] tracking-[0.25em] text-gold uppercase sm:block">{deity.english}</p>
      <p className="mt-0.5 text-sm text-cream/70 italic sm:text-base">{deity.name}</p>
    </Reveal>
  );
}

/** Divine blessings: Sri Vighneshwara and Sri Venkateswara Swamy. */
export function BlessingSection() {
  return (
    <section id="blessings" aria-labelledby="blessings-title" className="silk relative overflow-hidden px-4 py-20 text-center sm:py-24">
      <Mandala className="spin-slow pointer-events-none absolute top-1/2 left-1/2 w-[720px] max-w-[170vw] -translate-x-1/2 -translate-y-1/2 opacity-[0.07]" />

      <Reveal className="relative">
        <p className="font-display text-[0.65rem] tracking-[0.4em] text-gold uppercase">Divine blessings</p>
        <h2 id="blessings-title" className="gold-text shimmer mt-2 inline-block px-2 py-1 font-script text-5xl sm:text-6xl">
          With God&apos;s Grace
        </h2>
        <Divider className="mx-auto mt-3 h-5 w-48" />
      </Reveal>

      <div className="relative mx-auto mt-10 grid max-w-4xl grid-cols-3 items-end gap-1 sm:gap-8">
        {[blessing.deities[0], blessing.deities[1], blessing.deities[2]].map((d, i) => (
          <DeityMedallion key={d.id} deity={d} delay={i * 0.15} main={i === 1} />
        ))}
      </div>

      <Reveal className="relative mx-auto mt-12 max-w-2xl">
        <div className="flex items-end justify-center gap-4">
          <Diya className="hidden h-14 w-9 shrink-0 sm:block" />
          <blockquote lang="te" className="font-telugu text-lg leading-loose text-cream sm:text-xl">
            {blessing.shloka.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </blockquote>
          <Diya className="hidden h-14 w-9 shrink-0 sm:block" />
        </div>
        <p className="mx-auto mt-4 max-w-lg text-lg text-cream/75 italic">{blessing.shlokaMeaning}</p>
        <p className="mx-auto mt-8 max-w-xl text-xl leading-relaxed text-champagne">
          Seeking the divine grace of Lord Vighneshwara and Sri Venkateswara Swamy, and the heartfelt blessings of our elders, we
          begin this sacred journey.
        </p>
      </Reveal>
    </section>
  );
}
