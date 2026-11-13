import { BedDouble, Coffee, MapPin, Navigation, Soup, UtensilsCrossed } from "lucide-react";
import { directionsLink, hospitality, mapsLink, venues } from "@/config/wedding";
import { Gopuram } from "./Motifs";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const ORDER = ["chirala", "home", "kalyanaVedika", "megaConvention"] as const;
const HOSPITALITY_ICONS = [BedDouble, Coffee, Soup, UtensilsCrossed];

export function VenueSection() {
  return (
    <section id="venue" aria-labelledby="venue-title" className="paper relative px-4 py-20 sm:px-8 sm:py-28">
      <SectionHeading id="venue-title" telugu="వేదికలు" eyebrow="Where we celebrate" title="Venues & Directions" />

      <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 sm:gap-6">
        {ORDER.map((key, i) => {
          const v = venues[key];
          const main = key === "kalyanaVedika";
          return (
            <Reveal key={key} delay={(i % 2) * 0.1}>
              <article
                className={`relative flex h-full flex-col overflow-hidden rounded-[1.4rem] p-6 sm:p-7 ${
                  main ? "silk border border-gold text-cream" : "gold-border bg-ivory"
                }`}
              >
                <Gopuram
                  className="pointer-events-none absolute -right-6 -bottom-6 h-36 w-40 opacity-15"
                  color={main ? "#E8D3A0" : "#C69A45"}
                />
                <p className="font-display text-[0.62rem] tracking-[0.28em] text-gold uppercase">{v.events}</p>
                <h3 className={`mt-2 font-display text-xl tracking-wide sm:text-2xl ${main ? "text-champagne" : "text-maroon"}`}>{v.name}</h3>
                {main && <p className="text-base text-gold-light italic">Kalyana Vedika</p>}
                <address className={`mt-3 flex gap-2 text-lg leading-snug not-italic ${main ? "text-cream/85" : "text-ink/80"}`}>
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  <span>
                    {v.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </address>
                <div className="relative mt-auto flex flex-wrap gap-3 pt-6">
                  <a
                    href={directionsLink(v)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`focus-ring inline-flex min-h-11 items-center gap-2 rounded-full px-5 font-display text-[0.7rem] tracking-[0.18em] uppercase ${
                      main ? "bg-gold text-burgundy" : "bg-maroon text-champagne"
                    }`}
                  >
                    <Navigation className="h-4 w-4" aria-hidden="true" />
                    Directions
                  </a>
                  <a
                    href={mapsLink(v)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`focus-ring inline-flex min-h-11 items-center rounded-full border px-5 font-display text-[0.7rem] tracking-[0.18em] uppercase ${
                      main ? "border-gold/70 text-champagne" : "border-maroon/40 text-maroon"
                    }`}
                  >
                    View Map
                  </a>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mx-auto mt-12 max-w-4xl">
        <div className="rounded-[1.4rem] border border-gold/50 bg-cream/80 px-5 py-7 text-center sm:px-10">
          <p className="font-display text-[0.65rem] tracking-[0.3em] text-gold uppercase">For our guests</p>
          <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-3">
            {hospitality.items.map((label, i) => {
              const Icon = HOSPITALITY_ICONS[i] ?? Coffee;
              return (
                <li key={label} className="inline-flex items-center gap-2 font-display text-sm tracking-wider text-maroon">
                  <Icon className="h-5 w-5 text-gold" aria-hidden="true" />
                  {label}
                </li>
              );
            })}
          </ul>
          <p className="mx-auto mt-4 max-w-lg text-lg text-ink/75 italic">{hospitality.note}</p>
        </div>
      </Reveal>
    </section>
  );
}
