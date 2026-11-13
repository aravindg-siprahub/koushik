"use client";

import { Expand, Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { images, video } from "@/config/wedding";
import { Lightbox } from "./Lightbox";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { VideoModal } from "./VideoModal";

// Phones: stacked. Tablets: the two tall cards side by side. Desktop: tall photo · video card · two stacked landscapes.
const LAYOUT = [
  "aspect-[4/5] lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:aspect-auto",
  "aspect-[3/2] sm:col-span-2 lg:col-start-3 lg:row-start-1 lg:aspect-auto",
  "aspect-[3/2] sm:col-span-2 lg:col-start-3 lg:row-start-2 lg:aspect-auto",
];
const POSITION = ["50% 72%", "50% 35%", "50% 40%"];

const card =
  "focus-ring group relative block h-full w-full overflow-hidden rounded-2xl border border-gold/50 bg-cream shadow-[0_18px_40px_-24px_rgb(64_8_23/0.6)]";

export function GallerySection() {
  const photos = images.gallery.slice(0, 3);
  const [open, setOpen] = useState<number | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  if (photos.length === 0) return null;

  const photoCard = (i: number) => {
    const img = photos[i];
    return (
      <Reveal key={img.src} delay={i * 0.08} className={LAYOUT[i]}>
        <button type="button" onClick={() => setOpen(i)} aria-label={`View photo: ${img.alt}`} className={card}>
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes={i === 0 ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" : "(max-width: 640px) 100vw, 50vw"}
            className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
            style={{ objectPosition: POSITION[i] }}
          />
          <span className="pointer-events-none absolute inset-2 rounded-xl border border-ivory/50" aria-hidden="true" />
          <span className="absolute inset-0 bg-gradient-to-t from-burgundy/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="absolute right-4 bottom-4 grid h-10 w-10 place-items-center rounded-full border border-gold/70 bg-burgundy/70 text-champagne backdrop-blur-sm">
            <Expand className="h-4 w-4" aria-hidden="true" />
          </span>
        </button>
      </Reveal>
    );
  };

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="paper-cream px-4 py-20 sm:px-8 sm:py-28">
      <SectionHeading id="gallery-title" telugu="మధుర క్షణాలు" eyebrow="Cherished moments" title="Our Story in Frames" />
      <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[300px_300px]">
        {photoCard(0)}

        {/* invitation video card */}
        <Reveal delay={0.08} className="aspect-[4/5] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:aspect-auto">
          <button type="button" onClick={() => setVideoOpen(true)} aria-label="Play our wedding invitation video" className={`${card} border-gold bg-burgundy`}>
            <Image
              src={video.poster}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-burgundy/85 via-burgundy/20 to-burgundy/10" aria-hidden="true" />
            <span className="pointer-events-none absolute inset-2 rounded-xl border border-gold/60" aria-hidden="true" />
            <span className="absolute inset-0 grid place-items-center" aria-hidden="true">
              <span className="relative grid h-20 w-20 place-items-center rounded-full border-2 border-gold bg-gradient-to-b from-[#e6c477] to-[#b0843a] text-burgundy shadow-[0_0_40px_rgb(242_185_43/0.6)] transition-transform duration-500 group-hover:scale-110">
                <span className="absolute inset-0 animate-ping rounded-full border-2 border-gold/60" />
                <Play className="ml-1 h-8 w-8 fill-current" />
              </span>
            </span>
            <span className="absolute inset-x-4 bottom-5 text-center">
              <span className="block font-display text-[0.62rem] tracking-[0.3em] text-gold uppercase">Watch</span>
              <span className="block font-script text-3xl text-champagne">Our Invitation Video</span>
              <span className="mt-1 block text-sm text-cream/75 italic">Tap to play with sound</span>
            </span>
          </button>
        </Reveal>

        {photoCard(1)}
        {photoCard(2)}
      </div>
      <Lightbox images={photos} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </section>
  );
}
