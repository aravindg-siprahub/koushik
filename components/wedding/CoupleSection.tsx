import Image from "next/image";
import { couple, images } from "@/config/wedding";
import { Lotus, PeacockFeather } from "./Motifs";
import { CouplePlaceholder } from "./Placeholders";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function NamePanel({
  label,
  name,
  telugu,
  relation,
  parents,
  align,
  delay,
}: {
  label: string;
  name: string;
  telugu: string;
  relation: string;
  parents: string;
  align: "left" | "right";
  delay: number;
}) {
  return (
    <Reveal delay={delay} className={`text-center ${align === "left" ? "lg:text-right" : "lg:text-left"}`}>
      <span className="inline-block rounded-full border border-gold bg-maroon px-4 py-1 font-display text-[0.6rem] tracking-[0.3em] text-champagne uppercase">
        {label}
      </span>
      <h3 className="mt-4 font-script text-5xl text-maroon sm:text-6xl">{name}</h3>
      <p lang="te" className="mt-1 font-telugu text-lg text-gold">
        {telugu}
      </p>
      <p className="mt-3 text-sm tracking-[0.2em] text-ink/55 uppercase">{relation}</p>
      <p className={`mx-auto mt-1 max-w-[18rem] text-lg text-ink/85 ${align === "left" ? "lg:mr-0" : "lg:ml-0"}`}>{parents}</p>
    </Reveal>
  );
}

export function CoupleSection() {
  const { groom, bride } = couple;
  return (
    <section id="couple" aria-labelledby="couple-title" className="paper-cream relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28">
      <PeacockFeather className="pointer-events-none absolute top-10 -left-4 h-40 w-14 -rotate-12 opacity-40 sm:h-56 sm:w-20" />
      <PeacockFeather className="pointer-events-none absolute -right-4 bottom-10 h-40 w-14 rotate-[168deg] opacity-40 sm:h-56 sm:w-20" />
      <SectionHeading id="couple-title" telugu="వధూవరులు" eyebrow="Two hearts, one journey" title="The Bride & Groom" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_auto_1fr] lg:gap-14">
        <div className="order-2 lg:order-1">
          <NamePanel
            label="The Groom"
            name={groom.firstName}
            telugu={groom.telugu}
            relation={groom.relation}
            parents={groom.parents}
            align="left"
            delay={0.1}
          />
        </div>

        <Reveal className="order-1 mx-auto w-[min(80vw,380px)] lg:order-2">
          <div className="relative">
            <div className="absolute -inset-3 rounded-t-[999px] rounded-b-[1.6rem] border border-gold/60" aria-hidden="true" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-2xl border-2 border-gold bg-burgundy shadow-[0_28px_60px_-24px_rgb(64_8_23/0.6)]">
              {images.coupleTogether ? (
                <Image
                  src={images.coupleTogether}
                  alt="Koushik and Srija together with lotus and jasmine garlands"
                  fill
                  sizes="(max-width: 640px) 80vw, 380px"
                  className="object-cover object-[50%_25%]"
                />
              ) : (
                <CouplePlaceholder />
              )}
            </div>
            <div className="absolute -bottom-6 left-1/2 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full border border-gold bg-ivory shadow" aria-hidden="true">
              <Lotus className="h-5 w-8" />
            </div>
          </div>
        </Reveal>

        <div className="order-3">
          <NamePanel
            label="The Bride"
            name={bride.firstName}
            telugu={bride.telugu}
            relation={bride.relation}
            parents={`${bride.parents}, ${bride.hometown}`}
            align="right"
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
}
