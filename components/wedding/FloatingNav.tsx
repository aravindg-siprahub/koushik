"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Monogram } from "./Monogram";

const LINKS = [
  { href: "#invitation", label: "Invitation", mobile: false },
  { href: "#couple", label: "Couple", mobile: false },
  { href: "#events", label: "Events", mobile: true },
  { href: "#gallery", label: "Gallery", mobile: true },
  { href: "#venue", label: "Venue", mobile: true },
];

/** Slim glass navigation that appears once the guest scrolls past the hero. */
export function FloatingNav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = LINKS.map((l) => document.querySelector(l.href)).filter((el): el is Element => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label="Sections"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 top-0 z-30 flex justify-center px-3 pt-[max(10px,env(safe-area-inset-top))]"
        >
          <div className="flex w-full max-w-3xl items-center justify-between gap-2 rounded-full border border-gold/50 bg-burgundy/85 py-1.5 pr-1.5 pl-2 shadow-[0_10px_30px_-10px_rgb(0_0_0/0.5)] backdrop-blur-md">
            <a href="#home" className="focus-ring -my-3 shrink-0" aria-label="Back to top">
              <Monogram id="mono-nav" className="h-14 w-auto" />
            </a>
            <ul className="flex items-center gap-0.5 sm:gap-1">
              {LINKS.map((l) => (
                <li key={l.href} className={l.mobile ? "" : "hidden md:block"}>
                  <a
                    href={l.href}
                    aria-current={active === l.href ? "true" : undefined}
                    className={`focus-ring inline-flex min-h-10 items-center rounded-full px-2.5 font-display text-[0.62rem] tracking-[0.16em] uppercase transition sm:px-3 sm:text-[0.68rem] ${
                      active === l.href ? "bg-gold text-burgundy" : "text-champagne/85 hover:text-champagne"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
