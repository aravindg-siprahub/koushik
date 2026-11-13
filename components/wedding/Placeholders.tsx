import { Mandala } from "./Motifs";

/** Decorative stand-in shown only when a photo path is set to null in config. Never depicts faces. */
export function CouplePlaceholder() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-burgundy p-6 text-center">
      <Mandala className="absolute inset-0 m-auto w-[90%] opacity-30" />
      <span className="gold-text relative font-script text-6xl">K &amp; S</span>
      <p className="relative mt-2 text-sm text-champagne/70 italic">Photograph coming soon</p>
    </div>
  );
}
