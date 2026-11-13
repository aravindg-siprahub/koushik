import { Diya, Mandala } from "./Motifs";
import { SaveTheDate } from "./SaveTheDate";
import { SectionHeading } from "./SectionHeading";
import { WeddingCountdown } from "./WeddingCountdown";

export function CountdownSection() {
  return (
    <section id="countdown" aria-labelledby="countdown-title" className="silk relative overflow-hidden px-4 py-20 sm:px-8 sm:py-24">
      <Mandala className="pointer-events-none absolute -top-40 -left-40 w-96 opacity-10" />
      <Mandala className="pointer-events-none absolute -right-40 -bottom-40 w-96 opacity-10" />
      <Diya className="pointer-events-none absolute top-10 left-4 hidden h-20 w-14 sm:block lg:left-16" />
      <Diya className="pointer-events-none absolute top-10 right-4 hidden h-20 w-14 sm:block lg:right-16" />
      <SectionHeading id="countdown-title" tone="dark" telugu="శుభ ముహూర్తానికి" eyebrow="Counting every moment" title="Until We Say I Do" />
      <WeddingCountdown />
      <SaveTheDate />
    </section>
  );
}
