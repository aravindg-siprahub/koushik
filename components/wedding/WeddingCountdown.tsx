"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { muhurtham } from "@/config/wedding";

/** Absolute instant of the muhurtham (the ISO string carries the +05:30 IST offset). */
const TARGET = Date.parse(muhurtham.iso);

function split(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), seconds: s % 60 };
}

function Unit({ value, label }: { value: number | null; label: string }) {
  const text = value === null ? "--" : String(value).padStart(2, "0");
  return (
    <div className="relative flex flex-col items-center rounded-2xl border border-gold/60 bg-burgundy/50 px-2 py-4 sm:px-4 sm:py-6">
      <span className="absolute inset-1 rounded-xl border border-gold/20" aria-hidden="true" />
      <span className="relative h-[2.6rem] overflow-hidden sm:h-[3.6rem]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            initial={{ y: "-60%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "60%", opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="gold-text block font-display text-[2.2rem] leading-[2.6rem] font-semibold tabular-nums sm:text-[3.2rem] sm:leading-[3.6rem]"
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="relative mt-1 font-display text-[0.6rem] tracking-[0.25em] text-champagne/80 uppercase sm:text-xs">{label}</span>
    </div>
  );
}

export function WeddingCountdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const remaining = now === null ? null : TARGET - now;
  const parts = remaining === null ? null : split(remaining);
  const done = remaining !== null && remaining <= 0;

  return (
    <div className="mx-auto max-w-3xl text-center">
      {done ? (
        <p className="gold-text font-script text-5xl sm:text-6xl">Happily married!</p>
      ) : (
        <div className="grid grid-cols-4 gap-2 sm:gap-4" role="timer" aria-live="off" aria-label="Time remaining until the wedding muhurtham">
          <Unit value={parts?.days ?? null} label="Days" />
          <Unit value={parts?.hours ?? null} label="Hours" />
          <Unit value={parts?.minutes ?? null} label="Minutes" />
          <Unit value={parts?.seconds ?? null} label="Seconds" />
        </div>
      )}
      <p className="mt-6 text-lg text-cream/85 italic">{muhurtham.label}</p>
      <p className="mt-1 font-display text-[0.6rem] tracking-[0.3em] text-gold uppercase">India Standard Time · {muhurtham.timeZone}</p>
    </div>
  );
}
