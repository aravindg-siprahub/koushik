"use client";

import { CalendarPlus, Check, Link2, Share2 } from "lucide-react";
import { useState } from "react";
import { couple, dateRangeLabel } from "@/config/wedding";
import { buildIcs, googleCalendarLink } from "@/lib/calendar";

const btn =
  "focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 font-display text-[0.7rem] tracking-[0.2em] uppercase transition active:scale-[0.98]";

/** Add-to-calendar and share actions. */
export function SaveTheDate() {
  const [copied, setCopied] = useState(false);

  function downloadIcs() {
    const blob = new Blob([buildIcs()], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "koushik-srija-wedding.ics";
    a.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function share() {
    const url = window.location.origin + window.location.pathname;
    const text = `🌸 శ్రీరస్తు శుభమస్తు 🌸\nYou are warmly invited to the wedding of ${couple.display}, ${dateRangeLabel}.`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `${couple.display} · Wedding Invitation`, text, url });
        return;
      } catch {
        return; // guest cancelled the share sheet
      }
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`, "_blank", "noopener,noreferrer");
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.origin + window.location.pathname);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="mx-auto mt-10 grid max-w-sm gap-3 sm:flex sm:max-w-3xl sm:flex-wrap sm:justify-center">
      <button type="button" onClick={downloadIcs} className={`${btn} bg-gradient-to-b from-[#d8b061] to-[#b0843a] text-burgundy shadow-lg`}>
        <CalendarPlus className="h-4 w-4" aria-hidden="true" />
        Save all dates
      </button>
      <a href={googleCalendarLink()} target="_blank" rel="noopener noreferrer" className={`${btn} border border-gold/70 text-champagne hover:bg-gold/10`}>
        Google Calendar
      </a>
      <button type="button" onClick={share} className={`${btn} border border-gold/70 text-champagne hover:bg-gold/10`}>
        <Share2 className="h-4 w-4" aria-hidden="true" />
        Share invitation
      </button>
      <button type="button" onClick={copyLink} className={`${btn} text-champagne/80 hover:text-champagne`}>
        {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Link2 className="h-4 w-4" aria-hidden="true" />}
        <span aria-live="polite">{copied ? "Link copied" : "Copy link"}</span>
      </button>
    </div>
  );
}
