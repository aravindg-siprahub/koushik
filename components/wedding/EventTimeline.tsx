import { Clock, MapPin, Navigation } from "lucide-react";
import { directionsLink, schedule, venues, type EventDay, type EventIcon, type WeddingEvent } from "@/config/wedding";
import { EventStatus } from "./EventStatus";
import { Corner, EventIllustration, Lotus, Toran } from "./Motifs";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/** Soft festive tint behind each ceremony's illustration. */
const TINT: Record<EventIcon, string> = {
  haldi: "#FFE7A0",
  sangeeth: "#F6D3E6",
  eduru: "#DCEBCB",
  groom: "#D8E3F6",
  upanayanam: "#FFDDBF",
  wedding: "#FFF1D0",
  vratham: "#FBD9E4",
  reception: "#CFE9E3",
};

const TELUGU_DAY: Record<string, string> = {
  Sunday: "ఆదివారం",
  Monday: "సోమవారం",
  Tuesday: "మంగళవారం",
  Wednesday: "బుధవారం",
  Thursday: "గురువారం",
  Friday: "శుక్రవారం",
  Saturday: "శనివారం",
};

function EventRow({ event, festive }: { event: WeddingEvent; festive: boolean }) {
  return (
    <li className="flex min-w-0 items-center gap-2.5 py-3 first:pt-0 last:pb-0 sm:gap-4">
      <span
        className={`grid shrink-0 place-items-center rounded-full border border-gold/60 shadow-[inset_0_0_0_3px_rgb(255_255_255/0.6)] ${
          festive ? "h-16 w-16 sm:h-20 sm:w-20" : "h-12 w-12 sm:h-14 sm:w-14"
        } ${event.highlight ? "ring-2 ring-gold ring-offset-2 ring-offset-burgundy shadow-[0_0_28px_rgb(242_185_43/0.55)]" : ""}`}
        style={{ backgroundColor: TINT[event.icon] }}
        aria-hidden="true"
      >
        <EventIllustration icon={event.icon} className={festive ? "h-11 w-12 sm:h-14 sm:w-16" : "h-8 w-9 sm:h-9 sm:w-10"} />
      </span>
      <span className="min-w-0 flex-1">
        <span className={`block font-display leading-snug tracking-wide ${festive ? "text-lg text-champagne sm:text-xl" : "text-[0.98rem] text-maroon sm:text-[1.05rem]"}`}>
          {event.name}
        </span>
        {event.highlight && (
          <span className="mt-1 mb-0.5 inline-flex items-center gap-1 rounded-full border border-gold/70 bg-gradient-to-r from-[#e6c477] to-[#b88a3c] px-2 py-0.5 font-display text-[0.55rem] tracking-[0.12em] whitespace-nowrap text-burgundy uppercase shadow-[0_0_18px_rgb(242_185_43/0.45)]">
            ✦ Grand Celebration
          </span>
        )}
        <span lang="te" className={`block font-telugu text-[0.85rem] ${festive ? "text-cream/80" : "text-ink/60"}`}>
          {event.telugu}
          {event.note ? <span className={`font-serif italic ${festive ? "text-gold-light" : "text-gold"}`}> · {event.note}</span> : null}
        </span>
      </span>
      <time
        dateTime={event.start}
        className={`inline-flex shrink-0 items-center gap-1.5 rounded-full font-display whitespace-nowrap shadow-sm ${
          festive
            ? "bg-gradient-to-b from-[#e6c477] to-[#b88a3c] px-4 py-2 text-base font-semibold text-burgundy sm:text-lg"
            : "bg-maroon px-3 py-1.5 text-[0.82rem] text-champagne sm:text-sm"
        }`}
      >
        <Clock className={festive ? "h-4 w-4" : "h-3.5 w-3.5"} aria-hidden="true" />
        {event.timeLabel}
      </time>
    </li>
  );
}

function DayPanel({ day, number }: { day: EventDay; number: number }) {
  const star = day.events.find((e) => e.highlight);
  const festive = Boolean(star);
  const first = Date.parse(day.events[0].start);
  const last = Date.parse(day.events[day.events.length - 1].start);
  const spanH = (last - first) / 3_600_000 + 3;
  const venue = day.events[0].venue ? venues[day.events[0].venue] : undefined;

  return (
    <article
      className={`relative h-full overflow-hidden rounded-[1.6rem] p-[1.5px] ${
        festive
          ? "bg-gradient-to-br from-[#e6c477] via-[#9c7430] to-[#e6c477] shadow-[0_26px_50px_-26px_rgb(64_8_23/0.9)]"
          : "bg-gradient-to-br from-[#e2c27a] via-[#f5ebd7] to-[#c69a45] shadow-[0_20px_40px_-28px_rgb(64_8_23/0.55)]"
      }`}
    >
      <div className={`relative flex h-full flex-col rounded-[1.5rem] ${festive ? "silk text-cream" : "bg-ivory"}`}>
        <span className={`pointer-events-none absolute inset-1.5 rounded-[1.25rem] border border-dashed ${festive ? "border-gold/35" : "border-gold/40"}`} aria-hidden="true" />
        <Corner className="pointer-events-none absolute top-1 left-1 h-8 w-8" color={festive ? "#E8D3A0" : "#C69A45"} />
        <Corner className="pointer-events-none absolute top-1 right-1 h-8 w-8 -scale-x-100" color={festive ? "#E8D3A0" : "#C69A45"} />
        {festive && <Toran id="toran-wedding-panel" className="pointer-events-none absolute inset-x-0 top-0 opacity-95" />}

        {/* day header */}
        <header className={`relative flex items-center gap-3 px-5 sm:px-6 ${festive ? "pt-16" : "pt-6"}`}>
          <div
            className={`grid h-16 w-16 shrink-0 place-items-center rounded-full border-2 text-center ${
              festive ? "border-gold bg-gradient-to-b from-[#e6c477] to-[#b88a3c] text-burgundy" : "border-gold bg-gradient-to-b from-maroon to-burgundy text-champagne"
            }`}
          >
            <span className="leading-none">
              <span className="block font-display text-[0.62rem] tracking-[0.15em] uppercase">{day.month}</span>
              <span className="block font-display text-2xl font-semibold">{day.day}</span>
              <span className="block font-display text-[0.6rem] tracking-[0.15em] uppercase">{day.weekday.slice(0, 3)}</span>
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className={`font-display text-[0.58rem] tracking-[0.3em] uppercase ${festive ? "text-gold-light" : "text-gold"}`}>Day {number} of 4</p>
            <h3 className={`font-display text-xl leading-tight tracking-wide ${festive ? "text-champagne" : "text-maroon"}`}>
              {star ? <span className="gold-text -ml-0.5 inline-block px-0.5 font-script text-4xl tracking-normal">The {star.name}</span> : day.weekday}
            </h3>
            <p lang="te" className={`font-telugu text-sm ${festive ? "text-cream/75" : "text-ink/55"}`}>
              {TELUGU_DAY[day.weekday]}
              {festive ? ` · ${day.weekday}` : ""}
            </p>
          </div>
          <div className="hidden shrink-0 sm:block">
            <EventStatus start={day.events[0].start} durationH={spanH} tone={festive ? "dark" : "light"} />
          </div>
        </header>

        <div className="relative mx-5 my-4 flex items-center gap-2 sm:mx-6" aria-hidden="true">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/60" />
          <Lotus className="h-3 w-6" color={festive ? "#E8D3A0" : "#C69A45"} />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/60" />
        </div>

        <ul className={`relative flex-1 divide-y divide-dashed px-5 sm:px-6 ${festive ? "divide-gold/25" : "divide-gold/30"}`}>
          {day.events.map((e) => (
            <EventRow key={e.id} event={e} festive={festive} />
          ))}
        </ul>

        {/* venue footer */}
        {venue && (
          <footer
            className={`relative mx-3 mt-5 mb-3 flex items-center gap-3 rounded-2xl px-3 py-2.5 sm:mx-4 ${
              festive ? "bg-burgundy/60" : "bg-cream/80"
            }`}
          >
            <MapPin className={`h-4 w-4 shrink-0 ${festive ? "text-gold" : "text-maroon"}`} aria-hidden="true" />
            <p className={`min-w-0 flex-1 text-[0.98rem] leading-snug ${festive ? "text-cream" : "text-ink/85"}`}>
              <span className="font-semibold">{venue.name}</span>, {venue.city}
            </p>
            <a
              href={directionsLink(venue)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Directions to ${venue.name}`}
              className={`focus-ring inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-full px-3 font-display text-[0.6rem] tracking-[0.15em] uppercase transition ${
                festive ? "bg-gold text-burgundy hover:bg-champagne" : "bg-maroon text-champagne hover:bg-burgundy"
              }`}
            >
              <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
              Map
            </a>
          </footer>
        )}
      </div>
    </article>
  );
}

export function EventTimeline() {
  return (
    <section
      id="events"
      aria-labelledby="events-title"
      className="relative bg-ivory px-4 py-20 sm:px-8 sm:py-24"
      style={{
        backgroundImage:
          "radial-gradient(circle at 8% 12%, rgb(255 212 92 / 0.22), transparent 32%), radial-gradient(circle at 92% 30%, rgb(247 168 196 / 0.2), transparent 32%), radial-gradient(circle at 12% 80%, rgb(62 138 74 / 0.1), transparent 32%), radial-gradient(circle at 88% 92%, rgb(240 123 31 / 0.14), transparent 32%)",
      }}
    >
      <SectionHeading
        id="events-title"
        telugu="శుభ కార్యక్రమాలు"
        eyebrow="November 15 – 22, 2026"
        title="Wedding Festivities"
        subtitle="Eight sacred celebrations across four joyous days."
      />

      <ol className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-7">
        {schedule.map((day, i) => (
          <li key={day.date} id={`day-${day.date}`} className="min-w-0 scroll-mt-24">
            <Reveal delay={(i % 2) * 0.1} className="h-full">
              <DayPanel day={day} number={i + 1} />
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
