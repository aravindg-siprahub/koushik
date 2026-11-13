"use client";

import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useContext, useRef } from "react";
import { blessing, couple, dateRangeLabel } from "@/config/wedding";
import { HeroFrames } from "./HeroFrames";
import { HeroSlideshow } from "./HeroSlideshow";
import { Diya, Divider, Ganesha, JasmineStrand, Toran } from "./Motifs";
import { InvitationOpenedContext } from "./WeddingExperience";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.9 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

function AnimatedName({ text, show, delay, className }: { text: string; show: boolean; delay: number; className?: string }) {
  return (
    <span className={`block lg:inline-block ${className ?? ""}`} aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="gold-text -mx-[0.1em] -my-[0.25em] inline-block px-[0.1em] py-[0.25em]"
          initial={{ opacity: 0, y: 30 }}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: delay + i * 0.06, ease: EASE }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

/** Lord Ganesha in a glowing halo between two brass lamps — the first blessing on the page. */
function DivineHeader({ show }: { show: boolean }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={show ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 1, ease: EASE }}
      className="relative z-10 flex flex-col items-center text-center"
    >
      <div className="flex items-end justify-center gap-3 sm:gap-6">
        <Diya className="h-14 w-9 sm:h-16 sm:w-11" />
        <div className="relative grid h-24 w-24 place-items-center sm:h-28 sm:w-28">
          <motion.div
            className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgb(255_210_110/0.55)_0%,rgb(198_154_69/0.18)_45%,transparent_70%)]"
            animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <span className="absolute inset-1 rounded-full border border-gold/50" aria-hidden="true" />
          <span className="spin-slow absolute -inset-1 rounded-full border border-dashed border-gold/30" aria-hidden="true" />
          <Ganesha className="relative h-[4.6rem] w-auto sm:h-[5.4rem]" bg="#4a0c1b" title="Lord Ganesha" />
        </div>
        <Diya className="h-14 w-9 sm:h-16 sm:w-11" />
      </div>
      <p lang="te" className="mt-2 font-telugu text-[1.05rem] text-champagne sm:text-xl">
        {blessing.telugu}
      </p>
      <p className="mt-0.5 font-display text-[0.58rem] tracking-[0.32em] text-gold uppercase sm:text-[0.62rem]">{blessing.invocationEnglish}</p>
    </motion.div>
  );
}

export function HeroSection() {
  const opened = useContext(InvitationOpenedContext);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0.3]);

  return (
    <section ref={ref} id="home" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-burgundy text-center">
      <HeroSlideshow />

      <Toran id="toran-hero" className="relative z-10 shrink-0" />

      {/* side garlands */}
      <div className="pointer-events-none absolute top-8 left-1 z-0 flex gap-2 sm:left-4" aria-hidden="true">
        <JasmineStrand length={16} className="w-3 sm:w-4" />
        <JasmineStrand length={10} className="hidden w-4 sm:block" />
      </div>
      <div className="pointer-events-none absolute top-8 right-1 z-0 flex gap-2 sm:right-4" aria-hidden="true">
        <JasmineStrand length={10} className="hidden w-4 sm:block" />
        <JasmineStrand length={16} className="w-3 sm:w-4" />
      </div>

      <div className="-mt-6 sm:-mt-4">
        <DivineHeader show={opened} />
      </div>

      <motion.div style={{ opacity: fade }} className="relative flex flex-1 flex-col justify-center gap-4 pb-12 lg:gap-2 lg:pb-14">
        {/* scrolling photo frames — first on phones, below the names on desktop */}
        <motion.div
          className="order-1 lg:order-2"
          initial={{ opacity: 0, y: 24 }}
          animate={opened ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
        >
          <HeroFrames />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={opened ? "show" : "hidden"}
          className="order-2 mx-auto w-full max-w-3xl px-6 lg:order-1"
        >
          <motion.p variants={item} className="mx-auto max-w-xl text-lg leading-snug text-cream/90 italic">
            With the blessings of our elders and hearts full of joy, we warmly invite you to the wedding celebrations of
          </motion.p>

          <motion.h1 id="hero-title" variants={item} className="mt-3 leading-[0.92] lg:mt-1">
            <AnimatedName show={opened} delay={1.2} text={couple.groom.firstName} className="font-script text-[4.2rem] sm:text-[5.4rem] lg:text-[5.6rem]" />
            <motion.span variants={item} className="-my-1 block font-display text-2xl text-champagne/90 sm:text-3xl lg:mx-5 lg:my-0 lg:inline-block lg:align-middle">
              &amp;
            </motion.span>
            <AnimatedName show={opened} delay={1.7} text={couple.bride.firstName} className="font-script text-[4.2rem] sm:text-[5.4rem] lg:text-[5.6rem]" />
          </motion.h1>

          <motion.p variants={item} lang="te" className="mt-2 font-telugu text-lg text-champagne/90">
            {couple.groom.telugu} <span className="text-gold">❀</span> {couple.bride.telugu}
          </motion.p>

          <motion.div variants={item}>
            <Divider className="mx-auto mt-3 h-5 w-52" />
            <p className="mt-2 font-display text-[0.95rem] tracking-[0.22em] text-champagne uppercase sm:text-lg">{dateRangeLabel}</p>
          </motion.div>

          <motion.div variants={item} className="mt-5 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
            <div className="inline-flex flex-col items-center rounded-2xl border border-gold/50 bg-burgundy/55 px-6 py-2.5 backdrop-blur-sm">
              <span className="font-display text-[0.6rem] tracking-[0.3em] text-gold uppercase">Subha Muhurtham · Bapatla</span>
              <span className="mt-0.5 text-xl text-cream">Saturday, 21 Nov · 8:52 PM</span>
            </div>
            <div className="flex gap-3">
              <a
                href="#events"
                className="focus-ring inline-flex min-h-12 items-center rounded-full bg-gradient-to-b from-[#d8b061] to-[#b0843a] px-6 font-display text-xs tracking-[0.22em] text-burgundy uppercase shadow-lg"
              >
                View Events
              </a>
              <a
                href="#venue"
                className="focus-ring inline-flex min-h-12 items-center rounded-full border border-gold/70 bg-burgundy/30 px-6 font-display text-xs tracking-[0.22em] text-champagne uppercase backdrop-blur-sm transition hover:bg-gold/10"
              >
                Venues
              </a>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#blessings"
        aria-label="Scroll to blessings"
        className="focus-ring absolute bottom-3 left-6 hidden text-gold lg:block"
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="h-7 w-7" />
      </motion.a>
    </section>
  );
}
