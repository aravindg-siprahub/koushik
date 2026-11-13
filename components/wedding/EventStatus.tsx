"use client";

import { useEffect, useState } from "react";

const HOUR = 3600_000;
const DAY = 24 * HOUR;

function describe(start: number, durationH: number, now: number): { label: string; live: boolean; done: boolean } {
  const diff = start - now;
  if (diff > 0) {
    if (diff >= DAY) {
      const d = Math.ceil(diff / DAY);
      return { label: `In ${d} day${d === 1 ? "" : "s"}`, live: false, done: false };
    }
    if (diff >= HOUR) {
      const h = Math.floor(diff / HOUR);
      return { label: `Today · in ${h} hr${h === 1 ? "" : "s"}`, live: false, done: false };
    }
    return { label: `Starts in ${Math.max(1, Math.round(diff / 60000))} min`, live: true, done: false };
  }
  if (now - start < durationH * HOUR) return { label: "Happening now", live: true, done: false };
  return { label: "Celebrated ✓", live: false, done: true };
}

/** Live status chip: "In 2 days", "Happening now", "Celebrated". */
export function EventStatus({ start, durationH = 2, tone }: { start: string; durationH?: number; tone: "light" | "dark" }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (now === null) return <span className="inline-block h-7" aria-hidden="true" />;
  const s = describe(Date.parse(start), durationH, now);
  const base =
    tone === "dark" ? "bg-white/15 text-cream border-white/25" : "bg-burgundy/10 text-burgundy border-burgundy/20";
  return (
    <span className={`inline-flex h-7 items-center gap-1.5 rounded-full border px-3 font-display text-[0.62rem] tracking-[0.14em] uppercase backdrop-blur-sm ${base}`}>
      {s.live && (
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ade80] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
        </span>
      )}
      {!s.live && !s.done && <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" aria-hidden="true" />}
      {s.label}
    </span>
  );
}
