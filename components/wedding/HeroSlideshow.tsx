"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { images, video } from "@/config/wedding";

const INTERVAL = 5500;

/** How long to wait for the background video before showing the photo slideshow instead. */
const VIDEO_GRACE_MS = 3500;

/**
 * Full-bleed hero background.
 * The first photo appears instantly; the invitation video fades in over it as soon as it is
 * actually playing. If the phone won't play it (iPhone Low Power Mode, data saver, slow network,
 * an error), the couple's photos crossfade as a slideshow instead — never a frozen poster.
 */
export function HeroSlideshow() {
  const reduce = useReducedMotion();
  const slides = images.hero;
  const [active, setActive] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false); // slideshow mode (also loads the other photos)
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || videoFailed) return;

    // Guests who asked their phone to save data get the light photo slideshow.
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) {
      setVideoFailed(true);
      setShowPhotos(true);
      return;
    }

    // iPhones only autoplay a video that is muted *as an attribute* (React sets only the property).
    el.muted = true;
    el.defaultMuted = true;
    el.setAttribute("muted", "");
    el.setAttribute("playsinline", "");
    el.setAttribute("webkit-playsinline", "");

    const tryPlay = () => {
      if (el.paused) el.play().catch(() => {});
    };
    // Low Power Mode may refuse autoplay but allow it after a touch — retry then, and on tab return.
    const gestures = ["touchstart", "pointerdown", "click", "scroll", "keydown"] as const;
    const onGesture = () => tryPlay();
    const onVisible = () => document.visibilityState === "visible" && tryPlay();
    // "timeupdate" keeps firing while the video runs, so we catch playback even if it began before this code.
    const onPlaying = () => {
      if (el.paused || el.currentTime <= 0) return;
      setVideoPlaying(true);
      el.removeEventListener("timeupdate", onPlaying);
      gestures.forEach((g) => window.removeEventListener(g, onGesture, true));
    };
    const grace = window.setTimeout(() => {
      if (el.paused || el.readyState < 3) setShowPhotos(true);
    }, VIDEO_GRACE_MS);

    onPlaying();
    tryPlay();
    el.addEventListener("canplay", tryPlay);
    el.addEventListener("playing", onPlaying);
    el.addEventListener("timeupdate", onPlaying);
    gestures.forEach((g) => window.addEventListener(g, onGesture, { capture: true, passive: true }));
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearTimeout(grace);
      el.removeEventListener("canplay", tryPlay);
      el.removeEventListener("playing", onPlaying);
      el.removeEventListener("timeupdate", onPlaying);
      gestures.forEach((g) => window.removeEventListener(g, onGesture, true));
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [videoFailed]);

  const slideshow = showPhotos && !videoPlaying;

  useEffect(() => {
    if (!slideshow || reduce || slides.length < 2) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % slides.length), INTERVAL);
    return () => window.clearInterval(id);
  }, [slideshow, reduce, slides.length]);

  return (
    <div className="absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
      {slides.map((s, i) => {
        if (i > 0 && !showPhotos) return null;
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
              fetchPriority={i === 0 ? "high" : "low"}
              quality={70}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: s.position }}
            />
          </motion.div>
        );
      })}
      {/* the family's invitation video loops silently on top, fading in once it is really playing */}
      {!videoFailed && (
        <video
          ref={videoRef}
          className={`hero-bg-video pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${videoPlaying ? "opacity-100" : "opacity-0"}`}
          src={video.background}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          controls={false}
          onError={() => {
            setVideoPlaying(false);
            setVideoFailed(true);
            setShowPhotos(true);
          }}
        />
      )}
      {/* light warm veil: the video stays bright, with a soft shadow only behind the text */}
      <div className="absolute inset-0 bg-[#400817]/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_42%_48%_at_50%_45%,rgb(30_3_10/0.5)_0%,rgb(30_3_10/0.2)_60%,transparent_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgb(30_3_10/0.35)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#400817]/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#400817]/80 to-transparent" />

      {/* slide indicator */}
      <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 gap-2 ${slideshow ? "hidden lg:flex" : "hidden"}`}>
        {slides.map((s, i) => (
          <span key={s.src} className={`h-1.5 rounded-full transition-all duration-700 ${i === active ? "w-6 bg-gold" : "w-1.5 bg-champagne/40"}`} />
        ))}
      </div>
    </div>
  );
}
