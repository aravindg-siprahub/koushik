import { printedCard as c } from "@/config/wedding";
import { Corner, Divider, Ganesha, ShivaEmblem, VenkateswaraEmblem } from "./Motifs";
import { PrintedCardButton } from "./PrintedCardButton";
import { Reveal } from "./Reveal";

function Box({ heading, lines }: { heading: string; lines: string[] }) {
  return (
    <div className="relative rounded-2xl border border-maroon/35 bg-ivory/80 px-4 py-4 text-center shadow-[0_10px_24px_-18px_rgb(64_8_23/0.6)]">
      <span className="absolute inset-1 rounded-xl border border-gold/30" aria-hidden="true" />
      <p className="relative font-telugu text-[0.98rem] font-semibold text-maroon">{heading}</p>
      {lines.map((l) => (
        <p key={l} className="relative font-telugu text-[0.95rem] leading-relaxed text-ink/85">
          {l}
        </p>
      ))}
    </div>
  );
}

/** Digital replica of the printed invitation card — same text, same order. */
export function InvitationMessage() {
  return (
    <section id="invitation" aria-labelledby="invitation-title" className="paper relative px-3 py-20 sm:px-8 sm:py-28">
      <Reveal className="relative mx-auto max-w-4xl">
        <article lang="te" className="gold-border relative overflow-hidden rounded-[1.75rem] bg-ivory px-4 py-10 text-center sm:px-10 sm:py-14">
          <Corner className="absolute top-2 left-2 h-10 w-10 sm:h-14 sm:w-14" />
          <Corner className="absolute top-2 right-2 h-10 w-10 -scale-x-100 sm:h-14 sm:w-14" />
          <Corner className="absolute bottom-2 left-2 h-10 w-10 -scale-y-100 sm:h-14 sm:w-14" />
          <Corner className="absolute right-2 bottom-2 h-10 w-10 -scale-100 sm:h-14 sm:w-14" />

          {/* header with deities, as on the card */}
          <div className="grid grid-cols-[3.5rem_1fr_3.5rem] items-start gap-2 sm:grid-cols-[6rem_1fr_6rem] sm:gap-4">
            <div className="grid aspect-square place-items-center rounded-full border border-gold/50 bg-maroon p-1.5 shadow-md">
              <Ganesha className="h-full w-auto" bg="#641326" title="Lord Ganesha" />
            </div>
            <div>
              <p className="font-telugu text-[0.85rem] text-ink/70 sm:text-base">{c.blessing}</p>
              <h2 id="invitation-title" className="mt-1 font-telugu text-xl leading-snug font-semibold text-maroon sm:text-3xl">
                {c.title}
              </h2>
            </div>
            <div className="grid aspect-square place-items-center rounded-full border border-gold/50 bg-maroon p-2 shadow-md">
              <ShivaEmblem className="h-full w-auto" title="Sri Shiva Parvathi" />
            </div>
          </div>

          <p className="mx-auto mt-4 max-w-2xl font-telugu text-[0.92rem] leading-relaxed text-ink/75 sm:text-base">
            {c.shloka.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </p>
          <Divider className="mx-auto mt-4 h-5 w-44" />

          {/* upanayanam + couple */}
          <div className="mt-6 grid items-center gap-6 md:grid-cols-[15rem_1fr] md:text-center">
            <div className="order-2 md:order-1">
              <Box heading={c.upanayanam.heading} lines={c.upanayanam.lines} />
            </div>
            <div className="order-1 md:order-2">
              <p className="font-telugu text-base text-ink/70">{c.onlySon}</p>
              <p className="mt-2 font-telugu text-lg text-ink/85">
                {c.groom.label} {c.groom.prefix} <span className="text-3xl font-semibold text-maroon sm:text-4xl">{c.groom.name}</span>,{" "}
                <span className="font-serif">{c.groom.suffix}</span>
              </p>
              <p className="mt-3 font-telugu text-lg text-ink/85">
                {c.bride.label} {c.bride.prefix} <span className="text-3xl font-semibold text-maroon sm:text-4xl">{c.bride.name}</span>,{" "}
                <span className="font-serif">{c.bride.suffix}</span>
              </p>
              <p className="mx-auto mt-3 max-w-xl font-telugu text-[0.95rem] leading-relaxed text-ink/75">{c.brideParents}</p>
              <p className="mt-2 font-telugu text-[0.95rem] text-ink/80">{c.decided}</p>
            </div>
          </div>

          {/* muhurtham */}
          <div className="relative mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl bg-gradient-to-b from-maroon to-burgundy px-4 py-6 text-cream shadow-[0_20px_40px_-24px_rgb(64_8_23/0.9)] sm:px-8">
            <span className="absolute inset-1.5 rounded-xl border border-gold/40" aria-hidden="true" />
            <p className="gold-text relative inline-block px-2 font-telugu text-2xl font-semibold">{c.muhurthamHeading}</p>
            {c.muhurtham.map((l) => (
              <p key={l} className="relative mt-2 font-telugu text-[0.98rem] leading-relaxed sm:text-lg">
                {l}
              </p>
            ))}
            <p className="relative mt-4 font-telugu text-base text-champagne sm:text-lg">
              <span className="font-semibold text-gold">{c.vedika.label}</span> {c.vedika.value}
            </p>
          </div>

          {/* vratham · deity · reception */}
          <div className="mt-8 grid items-center gap-5 md:grid-cols-[1fr_7rem_1fr]">
            <Box heading={c.vratham.heading} lines={c.vratham.lines} />
            <div className="flex flex-col items-center">
              <div className="grid h-24 w-24 place-items-center rounded-full border border-gold/50 bg-maroon p-3 shadow-md">
                <VenkateswaraEmblem className="w-full" title="Sri Venkateswara Swamy" />
              </div>
            </div>
            <Box heading={c.reception.heading} lines={c.reception.lines} />
          </div>

          <p className="mt-6 font-telugu text-lg font-semibold text-maroon">{c.requestHeading}</p>
          <p className="mx-auto mt-1 max-w-2xl font-telugu text-base leading-loose text-ink/85 sm:text-lg">{c.request}</p>

          {/* grandparents · hosts */}
          <div className="mt-8 grid gap-6 border-t border-gold/40 pt-6 md:grid-cols-2 md:items-end">
            <div>
              <p className="font-telugu text-[0.95rem] text-ink/70">{c.grandparents.label}</p>
              <p className="mt-1 font-telugu text-[0.95rem] text-ink/85">{c.grandparents.value}</p>
            </div>
            <div>
              <p className="font-telugu text-[0.95rem] text-ink/70">{c.hosts.label}</p>
              <p className="mt-1 font-telugu text-xl font-semibold text-maroon sm:text-2xl">{c.hosts.value}</p>
              <p className="mt-2 font-telugu text-base text-maroon/90">{c.sibling}</p>
            </div>
          </div>

          <div className="mt-6 border-t border-gold/40 pt-5">
            {c.relatives.map((l) => (
              <p key={l} className="font-telugu text-[0.85rem] leading-relaxed text-ink/70 sm:text-[0.92rem]">
                {l}
              </p>
            ))}
          </div>
        </article>
      </Reveal>
      <div className="mt-6 flex justify-center">
        <PrintedCardButton />
      </div>
    </section>
  );
}
