"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { blessing, couple, dateRangeLabel } from "@/config/wedding";
import { HeroSlideshow } from "./HeroSlideshow";
import { ScrollHint } from "./ScrollHint";
import { Diya, Divider, Ganesha, JasmineStrand, Lotus, Toran } from "./Motifs";

function AnimatedName({ text, delay, className }: { text: string; delay: number; className?: string }) {
  return (
    <span className={`block lg:inline-block ${className ?? ""}`} aria-label={text}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="hero-rise gold-text -mx-[0.1em] -my-[0.25em] inline-block px-[0.1em] py-[0.25em]"
          style={{ animationDelay: `${delay + i * 0.06}s` }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

/** Lord Ganesha in a glowing halo between two brass lamps — the first blessing on the page. */
function DivineHeader() {
  const reduce = useReducedMotion();
  return (
    <div className="hero-rise relative z-10 flex flex-col items-center text-center">
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
    </div>
  );
}

export function HeroSection() {
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
        <DivineHeader />
      </div>

      <motion.div style={{ opacity: fade }} className="relative flex flex-1 flex-col justify-start gap-4 pt-4 pb-12 lg:justify-center lg:gap-2 lg:pt-0 lg:pb-14">
        <div
          className="mx-auto w-full max-w-3xl px-6"
        >
          {/* family title: classical Telugu lettering in gold, on a soft glow so it reads over the video */}
          <div className="hero-rise relative mx-auto mt-1 mb-4 w-fit max-w-full px-2">
            <span
              className="absolute -inset-x-6 -inset-y-3 -z-10 rounded-full bg-[radial-gradient(ellipse_at_center,rgb(40_4_14/0.7)_0%,rgb(40_4_14/0.4)_50%,transparent_75%)] blur-md"
              aria-hidden="true"
            />
            <p
              lang="te"
              className="gold-text px-2 font-telugu-display leading-[1.25]"
              style={{
                fontSize: "clamp(1.5rem, 8vw, 3.75rem)",
                filter: "drop-shadow(0 2px 1px rgb(40 4 14 / 0.9)) drop-shadow(0 0 16px rgb(242 185 43 / 0.35))",
              }}
            >
              పెనుగొండ వారి పెండ్లి పిలుపు
            </p>
            <div className="mt-1 flex items-center justify-center gap-2">
              <span className="hidden h-px w-14 bg-gradient-to-r from-transparent to-gold sm:block" aria-hidden="true" />
              <Lotus className="h-3 w-6 shrink-0" color="#E8D3A0" />
              <span className="font-display text-[0.6rem] tracking-[0.28em] whitespace-nowrap text-champagne uppercase sm:text-xs">
                Penugonda vari Pendli Pilupu
              </span>
              <Lotus className="h-3 w-6 shrink-0" color="#E8D3A0" />
              <span className="hidden h-px w-14 bg-gradient-to-l from-transparent to-gold sm:block" aria-hidden="true" />
            </div>
          </div>
          <p style={{ animationDelay: "0.2s" }} className="hero-rise mx-auto max-w-xl text-lg leading-snug text-cream/90 italic">
            With the blessings of our elders and hearts full of joy, we warmly invite you to the wedding celebrations of
          </p>

          <h1 id="hero-title" className="mt-3 leading-[0.92] lg:mt-1">
            <AnimatedName delay={0.5} text={couple.groom.firstName} className="font-script text-[4.2rem] sm:text-[5.4rem] lg:text-[5.6rem]" />
            <span style={{ animationDelay: "0.9s" }} className="hero-rise -my-1 block font-display text-2xl text-champagne/90 sm:text-3xl lg:mx-5 lg:my-0 lg:inline-block lg:align-middle">
              &amp;
            </span>
            <AnimatedName delay={1} text={couple.bride.firstName} className="font-script text-[4.2rem] sm:text-[5.4rem] lg:text-[5.6rem]" />
          </h1>

          <p style={{ animationDelay: "1.4s" }} lang="te" className="hero-rise mt-2 font-telugu text-lg text-champagne/90">
            {couple.groom.telugu} <span className="text-gold">❀</span> {couple.bride.telugu}
          </p>

          <div style={{ animationDelay: "1.55s" }} className="hero-rise">
            <Divider className="mx-auto mt-3 h-5 w-52" />
            <p className="mt-2 font-display text-[0.95rem] tracking-[0.22em] text-champagne uppercase sm:text-lg">{dateRangeLabel}</p>
          </div>

          <div style={{ animationDelay: "1.7s" }} className="hero-rise mt-5 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
            <div className="inline-flex flex-col items-center rounded-2xl border border-gold/50 bg-burgundy/55 px-6 py-2.5 backdrop-blur-sm">
              <span className="font-display text-[0.6rem] tracking-[0.3em] text-gold uppercase">Grand Reception · Narasaraopet</span>
              <span className="mt-0.5 text-xl text-cream">Sunday, 22 Nov · 8:00 PM</span>
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
          </div>
        </div>
      </motion.div>

      <ScrollHint target="blessings" />
    </section>
  );
}
