"use client";

import { Eye } from "lucide-react";
import { useState } from "react";
import { printedCard } from "@/config/wedding";
import { Lightbox } from "./Lightbox";

/** Opens a photograph of the family's printed invitation card. */
export function PrintedCardButton() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(0)}
        className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-full border border-maroon/40 px-5 font-display text-[0.68rem] tracking-[0.2em] text-maroon uppercase transition hover:bg-maroon hover:text-champagne"
      >
        <Eye className="h-4 w-4" aria-hidden="true" />
        View printed card
      </button>
      <Lightbox
        images={[{ src: printedCard.photo, alt: "The printed Telugu wedding invitation card", w: 1400, h: 973 }]}
        index={open}
        onClose={() => setOpen(null)}
        onIndex={setOpen}
      />
    </>
  );
}
