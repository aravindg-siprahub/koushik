"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Music2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { audio as audioConfig } from "@/config/wedding";
import type { Track } from "@/lib/tracks";
import { VIDEO_EVENT, type VideoEventDetail } from "./VideoModal";

/**
 * Plays the wedding song as soon as the site opens. Browsers block sound until the guest
 * interacts, so if autoplay is refused the music starts on the first tap, click or key press.
 * If a file fails to load, the next track is tried.
 */
export function MusicPlayer({ tracks }: { tracks: Track[] }) {
  const ref = useRef<HTMLAudioElement | null>(null);
  /** True only after the guest pauses the music with the music button (lasts until reload). */
  const userPaused = useRef(false);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [announce, setAnnounce] = useState(false);
  const track = tracks[index] ?? null;

  const play = useCallback(async () => {
    const el = ref.current;
    if (!el) return false;
    try {
      el.volume = 0;
      await el.play();
      const target = audioConfig.volume;
      const id = window.setInterval(() => {
        el.volume = Math.min(target, el.volume + target / 20);
        if (el.volume >= target) window.clearInterval(id);
      }, 80);
      setWaiting(false);
      return true;
    } catch {
      return false;
    }
  }, []);

  // Try to start immediately; otherwise wait for the guest's first interaction.
  useEffect(() => {
    if (!track) return;

    let done = false;
    // Every event browsers accept as a "user gesture" for starting sound.
    const events = ["pointerdown", "mousedown", "click", "keydown", "touchend"] as const;
    const onInteract = async (e: Event) => {
      if (done || userPaused.current) return;
      // Taps on the music button itself are handled by its own toggle.
      if (e.target instanceof Element && e.target.closest("[data-music-control]")) return;
      if (await play()) {
        done = true;
        events.forEach((e) => document.removeEventListener(e, onInteract, true));
      }
    };

    play().then((ok) => {
      if (ok) done = true;
      else {
        setWaiting(true);
        events.forEach((e) => document.addEventListener(e, onInteract, { capture: true, passive: true }));
      }
    });
    return () => events.forEach((e) => document.removeEventListener(e, onInteract, true));
  }, [track, play]);

  // Pause the song while the invitation video plays (it has its own sound), then resume.
  useEffect(() => {
    let resumeAfterVideo = false;
    const onVideo = (e: Event) => {
      const el = ref.current;
      if (!el) return;
      const detail = (e as CustomEvent<VideoEventDetail>).detail;
      if (detail === "play" && !el.paused) {
        resumeAfterVideo = true;
        el.pause();
      } else if (detail === "stop" && resumeAfterVideo) {
        resumeAfterVideo = false;
        void play();
      }
    };
    window.addEventListener(VIDEO_EVENT, onVideo);
    return () => window.removeEventListener(VIDEO_EVENT, onVideo);
  }, [play]);

  useEffect(() => {
    if (!announce) return;
    const t = window.setTimeout(() => setAnnounce(false), 5000);
    return () => window.clearTimeout(t);
  }, [announce]);

  if (!track) return null;

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      userPaused.current = false;
      void play();
    } else {
      userPaused.current = true;
      el.pause();
    }
  };

  return (
    <>
      <audio
        key={track.src}
        ref={ref}
        src={track.src}
        loop
        preload="auto"
        onPause={() => setPlaying(false)}
        onPlay={() => {
          setPlaying(true);
          setAnnounce(true);
        }}
        onError={() => setIndex((i) => (i + 1 < tracks.length ? i + 1 : i))}
      />
      <div
        data-music-control=""
        className="fixed z-40 flex items-center gap-2"
        style={{ right: "max(12px, env(safe-area-inset-right))", bottom: "max(14px, env(safe-area-inset-bottom))" }}
      >
        <AnimatePresence>
          {waiting && !playing && (
            <motion.button
              type="button"
              onClick={toggle}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              className="focus-ring rounded-full border border-gold/60 bg-burgundy/90 px-4 py-2 font-serif text-sm whitespace-nowrap text-champagne shadow-lg backdrop-blur"
            >
              🎵 Tap for wedding music
            </motion.button>
          )}
          {playing && announce && (
            <motion.p
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              className="max-w-[62vw] truncate rounded-full border border-gold/60 bg-burgundy/90 px-4 py-2 font-serif text-sm text-champagne shadow-lg backdrop-blur"
              role="status"
            >
              ♪ {track.title}
            </motion.p>
          )}
        </AnimatePresence>
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause wedding music" : "Play wedding music"}
          aria-pressed={playing}
          className="focus-ring relative grid h-12 w-12 place-items-center rounded-full border border-gold/70 bg-maroon/95 text-champagne shadow-[0_6px_20px_rgb(64_8_23/0.4)] backdrop-blur transition active:scale-95"
        >
          {playing && (
            <motion.span
              className="absolute inset-[-5px] rounded-full border border-dashed border-gold/70"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, ease: "linear", repeat: Infinity }}
              aria-hidden="true"
            />
          )}
          {playing ? (
            <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <motion.span
                  key={i}
                  className="w-[3px] rounded-full bg-gold"
                  animate={{ height: ["30%", "100%", "45%", "80%", "30%"] }}
                  transition={{ duration: 1.1 + i * 0.15, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }}
                />
              ))}
            </span>
          ) : (
            <Music2 className="h-5 w-5" />
          )}
        </button>
      </div>
    </>
  );
}
