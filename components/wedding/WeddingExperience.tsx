"use client";

import { MotionConfig } from "framer-motion";
import { createContext, useEffect, useState } from "react";
import { FlowerPetals } from "./FlowerPetals";
import { MusicPlayer } from "./MusicPlayer";
import type { Track } from "@/lib/tracks";

/** Becomes true right after the page mounts — lets the hero choreograph its entrance. */
export const InvitationOpenedContext = createContext(false);

/** Client shell: entrance choreography, welcome petal shower and music. Sections stay server-rendered. */
export function WeddingExperience({ children, tracks }: { children: React.ReactNode; tracks: Track[] }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 0);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <InvitationOpenedContext.Provider value={ready}>{children}</InvitationOpenedContext.Provider>
      {ready && <FlowerPetals count={30} />}
      <MusicPlayer tracks={tracks} />
    </MotionConfig>
  );
}
