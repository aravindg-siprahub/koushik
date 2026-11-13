"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export interface LightboxImage {
  src: string;
  alt: string;
  w: number;
  h: number;
}

/**
 * Full-screen photo viewer.
 * - Rendered into <body> through a portal, so no section, animation or stacking order can sit on top of it.
 * - The phone / browser Back button closes it (it adds one history step while open).
 * - Arrow keys, on-screen arrows and swipe change photos; Escape, ✕ or tapping outside closes.
 */
export function Lightbox({
  images,
  index,
  onClose,
  onIndex,
}: {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const [mounted, setMounted] = useState(false);
  const isOpen = index !== null;
  const many = images.length > 1;
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const onCloseRef = useRef(onClose);
  const touchX = useRef<number | null>(null);
  const openRef = useRef(isOpen);
  openRef.current = isOpen;

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const go = useCallback(
    (d: number) => {
      if (index === null) return;
      onIndex((index + d + images.length) % images.length);
    },
    [index, images.length, onIndex],
  );

  // Keyboard navigation.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, go]);

  // While open: lock page scroll, let Back close the viewer, and manage focus.
  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const ours = () => (window.history.state as { ksLightbox?: boolean } | null)?.ksLightbox === true;
    let closedByBack = false;
    // Add one history step (only once, even if this effect runs twice in development).
    if (!ours()) window.history.pushState({ ksLightbox: true }, "");
    const onPop = () => {
      if (ours()) return;
      closedByBack = true;
      onCloseRef.current();
    };
    window.addEventListener("popstate", onPop);
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 50);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("popstate", onPop);
      document.documentElement.style.overflow = prevOverflow;
      // Really closed with ✕ / Escape / outside tap: drop the history step we added.
      if (!openRef.current && !closedByBack && ours()) window.history.back();
      if (!openRef.current) previousFocus?.focus?.({ preventScroll: true });
    };
  }, [isOpen]);

  if (!mounted) return null;
  const img = index === null ? null : images[index];

  return createPortal(
    <AnimatePresence>
      {img && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={img.alt}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1a0309]/95 p-3 backdrop-blur-sm sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onCloseRef.current()}
          onTouchStart={(e) => {
            touchX.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null || !many) return;
            const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          }}
        >
          <motion.div
            key={img.src}
            className="relative h-full max-h-[82svh] w-full max-w-6xl"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={img.src} alt={img.alt} fill sizes="100vw" className="object-contain" />
          </motion.div>

          <button
            ref={closeRef}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onCloseRef.current();
            }}
            aria-label="Close photo"
            className="focus-ring absolute top-[max(14px,env(safe-area-inset-top))] right-3 grid h-12 w-12 place-items-center rounded-full border border-gold/60 bg-burgundy/90 text-champagne shadow-lg sm:right-6"
          >
            <X className="h-5 w-5" />
          </button>

          {many && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                aria-label="Previous photo"
                className="focus-ring absolute top-1/2 left-2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-gold/60 bg-burgundy/90 text-champagne shadow-lg sm:left-6"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                aria-label="Next photo"
                className="focus-ring absolute top-1/2 right-2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-gold/60 bg-burgundy/90 text-champagne shadow-lg sm:right-6"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              <p className="pointer-events-none absolute bottom-[max(18px,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 font-display text-xs tracking-[0.3em] text-champagne/80">
                {(index ?? 0) + 1} / {images.length}
              </p>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
