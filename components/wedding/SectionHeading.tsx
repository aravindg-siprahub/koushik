import { Divider } from "./Motifs";
import { Reveal } from "./Reveal";

interface Props {
  telugu?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  tone?: "light" | "dark";
  id?: string;
}

export function SectionHeading({ telugu, eyebrow, title, subtitle, tone = "light", id }: Props) {
  const dark = tone === "dark";
  return (
    <Reveal className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
      {telugu && (
        <p lang="te" className={`font-telugu text-base sm:text-lg ${dark ? "text-champagne/90" : "text-maroon/80"}`}>
          {telugu}
        </p>
      )}
      {eyebrow && (
        <p className={`mt-1 font-display text-[0.7rem] tracking-[0.35em] uppercase ${dark ? "text-gold" : "text-gold"}`}>
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={`mt-3 font-display text-[1.75rem] leading-tight font-medium tracking-[0.06em] sm:text-4xl ${
          dark ? "gold-text shimmer" : "text-maroon"
        }`}
      >
        {title}
      </h2>
      <Divider className="mx-auto mt-4 h-5 w-48 sm:w-56" />
      {subtitle && (
        <p className={`mx-auto mt-4 max-w-xl text-lg italic sm:text-xl ${dark ? "text-cream/85" : "text-ink/75"}`}>{subtitle}</p>
      )}
    </Reveal>
  );
}
