"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const COLORS = ["#E8961E", "#F2B92B", "#C8344B", "#FFFDF5", "#E26D5A", "#F7D9DF"];

interface Petal {
  id: number;
  left: number;
  size: number;
  drift: number;
  rotate: number;
  duration: number;
  delay: number;
  color: string;
  shape: 0 | 1;
}

/** A one-time shower of marigold, rose and jasmine petals. */
export function FlowerPetals({ count = 26, lifetimeMs = 13000 }: { count?: number; lifetimeMs?: number }) {
  const reduce = useReducedMotion();
  const [alive, setAlive] = useState(true);

  const petals = useMemo<Petal[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 10 + Math.random() * 12,
        drift: (Math.random() - 0.5) * 160,
        rotate: (Math.random() - 0.5) * 720,
        duration: 6 + Math.random() * 5,
        delay: Math.random() * 2.8,
        color: COLORS[i % COLORS.length],
        shape: (i % 2) as 0 | 1,
      })),
    [count],
  );

  useEffect(() => {
    const t = window.setTimeout(() => setAlive(false), lifetimeMs);
    return () => window.clearTimeout(t);
  }, [lifetimeMs]);

  if (reduce || !alive) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <motion.svg
          key={p.id}
          viewBox="0 0 20 20"
          width={p.size}
          height={p.size}
          className="absolute -top-8"
          style={{ left: `${p.left}%` }}
          initial={{ y: -40, x: 0, rotate: 0, opacity: 0 }}
          animate={{ y: "110vh", x: p.drift, rotate: p.rotate, opacity: [0, 1, 1, 0.9, 0] }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
        >
          {p.shape === 0 ? (
            <path d="M10 1 C16 6 16 14 10 19 C4 14 4 6 10 1Z" fill={p.color} />
          ) : (
            <path d="M2 10 C4 3 12 1 18 4 C16 12 10 18 2 10Z" fill={p.color} />
          )}
        </motion.svg>
      ))}
    </div>
  );
}
