"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { images, video } from "@/config/wedding";

const INTERVAL = 5500;

/** Full-bleed background: the couple's photos crossfade with a slow Ken Burns zoom. */
export function HeroSlideshow() {
  const reduce = useReducedMotion();
  const slides = images.hero;
  const [active, setActive] = useState(0);
  const [videoOk, setVideoOk] = useState(true);

  useEffect(() => {
    if (videoOk || reduce || slides.length < 2) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % slides.length), INTERVAL);
    return () => window.clearInterval(id);
  }, [videoOk, reduce, slides.length]);

  return (
    <div className="absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
      {slides.map((s, i) => {
        const on = i === active;
        return (
          <motion.div
            key={s.src}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: on ? 1 : 0, scale: on ? 1.02 : 1.14 }}
            transition={{ opacity: { duration: 1.6, ease: "easeInOut" }, scale: { duration: on ? INTERVAL / 1000 + 1.6 : 1.6, ease: "linear" } }}
          >
            <Image
              src={s.src}
              alt=""
              fill
              priority={i === 0}
              loading={i === 0 ? undefined : "eager"}
              quality={70}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: s.position }}
            />
          </motion.div>
        );
      })}
      {/* the family's invitation video loops silently on top; photos remain as a fallback */}
      {videoOk && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={video.background}
          poster={video.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={() => setVideoOk(false)}
        />
      )}
      {/* light warm veil: the video stays bright, with a soft shadow only behind the text */}
      <div className="absolute inset-0 bg-[#400817]/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_42%_48%_at_50%_45%,rgb(30_3_10/0.5)_0%,rgb(30_3_10/0.2)_60%,transparent_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgb(30_3_10/0.35)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#400817]/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#400817]/80 to-transparent" />

      {/* slide indicator */}
      <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 gap-2 ${videoOk ? "hidden" : "hidden lg:flex"}`}>
        {slides.map((s, i) => (
          <span key={s.src} className={`h-1.5 rounded-full transition-all duration-700 ${i === active ? "w-6 bg-gold" : "w-1.5 bg-champagne/40"}`} />
        ))}
      </div>
    </div>
  );
}
