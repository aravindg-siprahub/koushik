"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { video } from "@/config/wedding";

/** Event the music player listens to: background music pauses while the video plays. */
export const VIDEO_EVENT = "ks:video";
export type VideoEventDetail = "play" | "stop";
const announce = (d: VideoEventDetail) => window.dispatchEvent(new CustomEvent<VideoEventDetail>(VIDEO_EVENT, { detail: d }));

/** Full-screen player for the invitation video, with sound. Back / ✕ / Escape / outside tap closes it. */
export function VideoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const onCloseRef = useRef(onClose);
  const openRef = useRef(open);
  openRef.current = open;
  const closeBtn = useRef<HTMLButtonElement | null>(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    announce("play");
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const ours = () => (window.history.state as { ksVideo?: boolean } | null)?.ksVideo === true;
    let closedByBack = false;
    if (!ours()) window.history.pushState({ ksVideo: true }, "");
    const onPop = () => {
      if (ours()) return;
      closedByBack = true;
      onCloseRef.current();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onCloseRef.current();
    window.addEventListener("popstate", onPop);
    document.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => closeBtn.current?.focus(), 50);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("popstate", onPop);
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevOverflow;
      if (!openRef.current) {
        announce("stop");
        if (!closedByBack && ours()) window.history.back();
      }
    };
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={video.title}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1a0309]/95 p-3 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onCloseRef.current()}
        >
          <motion.video
            key="invitation-video"
            src={video.full}
            poster={video.poster}
            controls
            autoPlay
            playsInline
            className="max-h-[88svh] w-auto max-w-full rounded-2xl border-2 border-gold shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)]"
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35 }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            ref={closeBtn}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onCloseRef.current();
            }}
            aria-label="Close video"
            className="focus-ring absolute top-[max(14px,env(safe-area-inset-top))] right-3 grid h-12 w-12 place-items-center rounded-full border border-gold/60 bg-burgundy/90 text-champagne shadow-lg sm:right-6"
          >
            <X className="h-5 w-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
