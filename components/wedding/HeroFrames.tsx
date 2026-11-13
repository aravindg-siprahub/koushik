"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { images, video } from "@/config/wedding";
import { Lightbox } from "./Lightbox";
import { Lotus } from "./Motifs";
import { VideoModal } from "./VideoModal";

type Item = { kind: "video" } | { kind: "photo"; index: number };

const frameBtn = "focus-ring group relative block w-32 sm:w-40 lg:w-44";
const arch =
  "relative block aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-xl border-2 border-gold bg-burgundy shadow-[0_18px_36px_-14px_rgb(0_0_0/0.7)]";

/** Endless strip of gold temple-arch frames: the invitation video first, then the photos. */
export function HeroFrames() {
  const photos = images.hero;
  const [photo, setPhoto] = useState<number | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  const items: Item[] = [{ kind: "video" }, ...photos.map((_, index) => ({ kind: "photo" as const, index }))];
  // Two identical halves → translateX(-50%) loops seamlessly.
  const loop = [...items, ...items];

  return (
    <div className="relative">
      <div
        className="marquee relative overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]"
        aria-label="Invitation video and photographs of Koushik and Srija"
        role="region"
      >
        <ul className="marquee-track flex w-max">
          {loop.map((item, i) => {
            const duplicate = i >= items.length;
            const lift = i % 2 ? "translate-y-3" : "-translate-y-1";
            return (
              <li key={i} className="pr-4 sm:pr-6" aria-hidden={duplicate || undefined}>
                {item.kind === "video" ? (
                  <button
                    type="button"
                    tabIndex={duplicate ? -1 : 0}
                    onClick={() => setVideoOpen(true)}
                    aria-label="Play our wedding invitation video"
                    className={`${frameBtn} ${lift}`}
                  >
                    <span className="absolute -inset-1.5 rounded-t-[999px] rounded-b-2xl border border-gold/70" aria-hidden="true" />
                    <span className={arch}>
                      <Image src={video.poster} alt="" fill loading="eager" sizes="(max-width: 640px) 128px, 176px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                      <span className="absolute inset-0 bg-burgundy/35" aria-hidden="true" />
                      <span className="absolute inset-0 grid place-items-center" aria-hidden="true">
                        <span className="relative grid h-14 w-14 place-items-center rounded-full border-2 border-gold bg-gradient-to-b from-[#e6c477] to-[#b0843a] text-burgundy shadow-[0_0_30px_rgb(242_185_43/0.6)] transition-transform group-hover:scale-110">
                          <span className="absolute inset-0 animate-ping rounded-full border-2 border-gold/60" />
                          <Play className="ml-1 h-6 w-6 fill-current" />
                        </span>
                      </span>
                      <span className="absolute inset-x-0 bottom-3 font-display text-[0.6rem] tracking-[0.25em] text-champagne uppercase" aria-hidden="true">
                        Play video
                      </span>
                    </span>
                    <span className="absolute -bottom-3 left-1/2 grid h-7 w-7 -translate-x-1/2 place-items-center rounded-full border border-gold bg-ivory shadow" aria-hidden="true">
                      <Lotus className="h-3 w-5" />
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    tabIndex={duplicate ? -1 : 0}
                    onClick={() => setPhoto(item.index)}
                    aria-label={`View photo: ${photos[item.index].alt}`}
                    className={`${frameBtn} ${lift}`}
                  >
                    <span className="absolute -inset-1.5 rounded-t-[999px] rounded-b-2xl border border-gold/50" aria-hidden="true" />
                    <span className={arch}>
                      <Image
                        src={photos[item.index].src}
                        alt={duplicate ? "" : photos[item.index].alt}
                        fill
                        loading="eager"
                        sizes="(max-width: 640px) 128px, 176px"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        style={{ objectPosition: photos[item.index].position }}
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-burgundy/45 via-transparent to-transparent" aria-hidden="true" />
                    </span>
                    <span className="absolute -bottom-3 left-1/2 grid h-7 w-7 -translate-x-1/2 place-items-center rounded-full border border-gold bg-ivory shadow" aria-hidden="true">
                      <Lotus className="h-3 w-5" />
                    </span>
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <Lightbox images={photos} index={photo} onClose={() => setPhoto(null)} onIndex={setPhoto} />
      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </div>
  );
}
