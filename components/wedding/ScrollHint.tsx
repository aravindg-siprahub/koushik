"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronsDown } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * A clear "scroll down" cue for guests who may not know the page continues (elders especially).
 * Appears a moment after the page opens, bobs gently, and hides for good once the guest scrolls.
 * Tapping it glides down to the next section.
 */
export function ScrollHint({ target = "blessings" }: { target?: string }) {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false); // a short pause so the hero animates in first
  const [atTop, setAtTop] = useState(true);
  const [done, setDone] = useState(false); // the guest has clearly scrolled on — never show again
  const show = ready && atTop && !done;

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 2200);
    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 80);
      if (y > window.innerHeight * 0.6) setDone(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const go = () => {
    document.getElementById(target)?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
    setDone(true);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="scroll-hint"
          className="pointer-events-none fixed inset-x-0 z-30 flex justify-center"
          style={{ bottom: "max(10px, env(safe-area-inset-bottom))" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.45 }}
        >
          <button
            type="button"
            onClick={go}
            aria-label="Scroll down to see the full invitation"
            className="focus-ring pointer-events-auto flex items-center gap-2 rounded-full border border-gold/70 bg-burgundy/90 py-1 pr-4 pl-2 text-champagne shadow-[0_8px_28px_rgb(30_3_10/0.6)] backdrop-blur"
          >
            <motion.span
              aria-hidden="true"
              className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-b from-[#d8b061] to-[#b0843a] text-burgundy"
              animate={reduce ? undefined : { y: [0, 4, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronsDown className="h-5 w-5" />
            </motion.span>
            <span className="flex flex-col items-start leading-tight">
              <span lang="te" className="font-telugu text-[0.95rem] whitespace-nowrap">
                కిందికి జరపండి
              </span>
              <span className="font-display text-[0.56rem] tracking-[0.2em] whitespace-nowrap text-gold uppercase">Scroll down</span>
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
