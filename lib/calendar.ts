import { schedule, venues, type WeddingEvent } from "@/config/wedding";

const pad = (n: number) => String(n).padStart(2, "0");
const toUtc = (d: Date) =>
  `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/[,;]/g, (m) => `\\${m}`).replace(/\n/g, "\\n");

function location(e: WeddingEvent) {
  if (!e.venue) return "";
  const v = venues[e.venue];
  return [v.name, ...v.address].join(", ");
}

/** All eight events as an iCalendar file (works with Google, Apple and Outlook calendars). */
export function buildIcs(): string {
  const stamp = toUtc(new Date());
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Koushik & Srija//Wedding//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH"];
  for (const day of schedule) {
    for (const e of day.events) {
      const start = new Date(e.start);
      const end = new Date(start.getTime() + (e.highlight ? 3 : 2) * 3600_000);
      lines.push(
        "BEGIN:VEVENT",
        `UID:${e.id}-2026@koushik-srija`,
        `DTSTAMP:${stamp}`,
        `DTSTART:${toUtc(start)}`,
        `DTEND:${toUtc(end)}`,
        `SUMMARY:${esc(`${e.name} · Koushik & Srija Wedding`)}`,
        `LOCATION:${esc(location(e))}`,
        `DESCRIPTION:${esc(`${e.name} (${e.telugu}) at ${e.timeLabel} IST`)}`,
        "END:VEVENT",
      );
    }
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

/** Google Calendar link for the muhurtham itself. */
export function googleCalendarLink(): string {
  const e = schedule.flatMap((d) => d.events).find((x) => x.highlight)!;
  const start = new Date(e.start);
  const end = new Date(start.getTime() + 3 * 3600_000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "Koushik & Srija · Wedding Muhurtham",
    dates: `${toUtc(start)}/${toUtc(end)}`,
    location: location(e),
    details: "Subha Muhurtham at 8:52 PM IST. With love, the Penugonda & Thatavarthy families.",
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

/** Google Calendar link for a single event. */
export function eventGoogleLink(e: WeddingEvent): string {
  const start = new Date(e.start);
  const end = new Date(start.getTime() + (e.highlight ? 3 : 2) * 3600_000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${e.name} · Koushik & Srija Wedding`,
    dates: `${toUtc(start)}/${toUtc(end)}`,
    location: location(e),
    details: `${e.name} (${e.telugu}) at ${e.timeLabel} IST. With love, the Penugonda & Thatavarthy families.`,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}
