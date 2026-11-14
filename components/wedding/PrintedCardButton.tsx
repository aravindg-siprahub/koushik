"use client";

import { Play } from "lucide-react";
import { useState } from "react";
import { printedCard } from "@/config/wedding";
import { VideoModal } from "./VideoModal";

/** Plays the cinematic video of the family's printed invitation card (శుభలేఖ). */
export function PrintedCardButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="focus-ring group inline-flex min-h-12 items-center gap-3 rounded-full border border-maroon/40 py-1.5 pr-6 pl-1.5 text-maroon transition hover:bg-maroon hover:text-champagne"
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-b from-[#d8b061] to-[#b0843a] text-burgundy shadow-md transition group-hover:scale-105" aria-hidden="true">
          <Play className="ml-0.5 h-4 w-4 fill-current" />
        </span>
        <span className="flex flex-col items-start leading-tight">
          <span className="font-display text-[0.68rem] tracking-[0.2em] uppercase">Watch Invitation Video</span>
          <span lang="te" className="font-telugu text-[0.78rem] opacity-80">
            శుభలేఖ వీడియో చూడండి
          </span>
        </span>
      </button>
      <VideoModal open={open} onClose={() => setOpen(false)} source={printedCard.video} />
    </>
  );
}
