/**
 * Hand-built SVG motifs — traditional Telugu wedding ornaments.
 * Pure presentational server components (no client JS).
 */
import type { EventIcon } from "@/config/wedding";

const GOLD = "#C69A45";
const GOLD_LIGHT = "#E8D3A0";
const GOLD_DARK = "#9C7430";
const MAROON = "#641326";
const BURGUNDY = "#400817";
const LEAF = "#5D7A3A";
const LEAF_DARK = "#3F5A26";
const MARIGOLD = "#E8961E";
const MARIGOLD_DEEP = "#D4691A";
const TURMERIC = "#F2B92B";
const JASMINE = "#FFFDF5";
const ROSE = "#C8344B";

type Box = { x?: number; y?: number; width?: number; height?: number };
type P = { className?: string; box?: Box };

/* ------------------------------------------------------------------ */
/* Mandala                                                             */
/* ------------------------------------------------------------------ */
export function Mandala({ className, color = GOLD }: P & { color?: string }) {
  const ring = (n: number, r: number, len: number, w: number) =>
    Array.from({ length: n }, (_, i) => (
      <path
        key={`${r}-${i}`}
        transform={`rotate(${(360 / n) * i} 100 100)`}
        d={`M100 ${100 - r} C${100 + w} ${100 - r - len * 0.4} ${100 + w * 0.6} ${100 - r - len} 100 ${100 - r - len} C${100 - w * 0.6} ${100 - r - len} ${100 - w} ${100 - r - len * 0.4} 100 ${100 - r}Z`}
      />
    ));
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <g fill="none" stroke={color} strokeWidth="0.8">
        <circle cx="100" cy="100" r="97" />
        <circle cx="100" cy="100" r="93" strokeDasharray="1 3" />
        {ring(32, 70, 22, 5)}
        {ring(16, 48, 22, 9)}
        {ring(8, 24, 22, 10)}
        <circle cx="100" cy="100" r="70" />
        <circle cx="100" cy="100" r="48" />
        <circle cx="100" cy="100" r="24" />
        <circle cx="100" cy="100" r="10" />
        {Array.from({ length: 32 }, (_, i) => (
          <circle key={i} cx="100" cy="8" r="1.6" transform={`rotate(${(360 / 32) * i + 5.6} 100 100)`} fill={color} />
        ))}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Toran — mango leaves & marigolds strung across the top              */
/* ------------------------------------------------------------------ */
export function Toran({ className, id = "toran" }: P & { id?: string }) {
  return (
    <svg className={className} width="100%" height="70" aria-hidden="true" preserveAspectRatio="none">
      <defs>
        <pattern id={id} width="52" height="70" patternUnits="userSpaceOnUse">
          <path d="M0 7 Q26 15 52 7" fill="none" stroke={GOLD_DARK} strokeWidth="1.5" />
          {/* mango leaf */}
          <path d="M26 12 C34 26 33 44 26 60 C19 44 18 26 26 12Z" fill={LEAF} />
          <path d="M26 14 L26 58" stroke={LEAF_DARK} strokeWidth="0.8" />
          <path d="M26 12 C30 24 30 38 26 52" fill="none" stroke="#7E9C55" strokeWidth="0.6" opacity="0.7" />
          {/* marigolds on the joins */}
          {[0, 52].map((x) => (
            <g key={x}>
              <circle cx={x} cy="9" r="8" fill={MARIGOLD_DEEP} />
              <circle cx={x} cy="9" r="6" fill={MARIGOLD} />
              <circle cx={x} cy="9" r="3" fill={TURMERIC} />
              <circle cx={x} cy="22" r="4.5" fill={MARIGOLD} />
              <circle cx={x} cy="30" r="2" fill={ROSE} />
            </g>
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="70" fill={`url(#${id})`} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Jasmine strand (hanging garland)                                    */
/* ------------------------------------------------------------------ */
export function JasmineStrand({ className, length = 14 }: P & { length?: number }) {
  const step = 11;
  const h = length * step + 26;
  return (
    <svg viewBox={`0 0 16 ${h}`} className={className} aria-hidden="true">
      <line x1="8" y1="0" x2="8" y2={length * step} stroke={GOLD_DARK} strokeWidth="0.6" />
      {Array.from({ length }, (_, i) => {
        const y = 5 + i * step;
        const accent = i % 5 === 4;
        return accent ? (
          <g key={i}>
            <circle cx="8" cy={y} r="4.6" fill={MARIGOLD} />
            <circle cx="8" cy={y} r="2.2" fill={TURMERIC} />
          </g>
        ) : (
          <g key={i}>
            <ellipse cx="5.2" cy={y} rx="2.6" ry="4" fill={JASMINE} transform={`rotate(-25 5.2 ${y})`} />
            <ellipse cx="10.8" cy={y} rx="2.6" ry="4" fill={JASMINE} transform={`rotate(25 10.8 ${y})`} />
            <circle cx="8" cy={y + 2} r="1.2" fill="#E9E2C8" />
          </g>
        );
      })}
      <circle cx="8" cy={length * step + 6} r="4" fill={ROSE} />
      <path d={`M8 ${length * step + 9} l-3 12 h6z`} fill={GOLD} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Ornamental divider                                                  */
/* ------------------------------------------------------------------ */
export function Divider({ className, color = GOLD }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 240 24" className={className} aria-hidden="true">
      <g fill="none" stroke={color} strokeWidth="1">
        <path d="M0 12 H86" />
        <path d="M154 12 H240" />
        <path d="M86 12 C96 2 104 2 110 12 C104 22 96 22 86 12Z" />
        <path d="M154 12 C144 2 136 2 130 12 C136 22 144 22 154 12Z" />
        <path d="M120 2 C128 8 128 16 120 22 C112 16 112 8 120 2Z" fill={color} fillOpacity="0.85" />
      </g>
      <circle cx="78" cy="12" r="1.8" fill={color} />
      <circle cx="162" cy="12" r="1.8" fill={color} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Corner flourish for frames                                          */
/* ------------------------------------------------------------------ */
export function Corner({ className, color = GOLD }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
      <g fill="none" stroke={color} strokeWidth="1.2">
        <path d="M4 76 V20 Q4 4 20 4 H76" />
        <path d="M12 76 V26 Q12 12 26 12 H76" strokeWidth="0.7" />
        <path d="M20 20 C30 22 36 30 34 40 C28 34 22 30 20 20Z" fill={color} fillOpacity="0.8" />
        <path d="M20 20 C22 30 30 36 40 34 C34 28 30 22 20 20Z" fill={color} fillOpacity="0.5" />
        <circle cx="20" cy="20" r="3" fill={color} />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Lotus                                                               */
/* ------------------------------------------------------------------ */
export function Lotus({ className, color = GOLD }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 100 60" className={className} aria-hidden="true">
      <g fill={color}>
        <path d="M50 4 C60 18 60 34 50 50 C40 34 40 18 50 4Z" />
        <path d="M50 50 C44 34 32 22 18 18 C20 34 32 46 50 50Z" opacity="0.85" />
        <path d="M50 50 C56 34 68 22 82 18 C80 34 68 46 50 50Z" opacity="0.85" />
        <path d="M50 52 C36 46 20 42 4 44 C14 54 32 58 50 52Z" opacity="0.6" />
        <path d="M50 52 C64 46 80 42 96 44 C86 54 68 58 50 52Z" opacity="0.6" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Peacock feather                                                     */
/* ------------------------------------------------------------------ */
export function PeacockFeather({ className }: P) {
  return (
    <svg viewBox="0 0 60 160" className={className} aria-hidden="true">
      <path d="M30 158 Q28 90 30 30" stroke={GOLD_DARK} strokeWidth="1.4" fill="none" />
      {Array.from({ length: 22 }, (_, i) => {
        const y = 150 - i * 5.4;
        return (
          <g key={i} stroke="#4E7F4A" strokeWidth="0.7" opacity="0.8">
            <path d={`M30 ${y} Q${14 - (i % 3)} ${y - 8} ${8 + i * 0.3} ${y - 14}`} fill="none" />
            <path d={`M30 ${y} Q${46 + (i % 3)} ${y - 8} ${52 - i * 0.3} ${y - 14}`} fill="none" />
          </g>
        );
      })}
      <ellipse cx="30" cy="32" rx="18" ry="24" fill="#2E6B5E" />
      <ellipse cx="30" cy="34" rx="12" ry="16" fill="#C69A45" />
      <ellipse cx="30" cy="36" rx="8" ry="10" fill="#1F4E8C" />
      <ellipse cx="30" cy="38" rx="4" ry="5" fill="#0E2147" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Kalash                                                              */
/* ------------------------------------------------------------------ */
export function Kalash({ className, box }: P) {
  return (
    <svg viewBox="0 0 100 110" className={className} aria-hidden="true" {...box}>
      {/* mango leaves */}
      {[-58, -32, -10, 10, 32, 58].map((r) => (
        <path key={r} d="M50 34 C56 22 56 10 50 0 C44 10 44 22 50 34Z" fill={r % 2 === 0 ? LEAF : LEAF_DARK} transform={`rotate(${r} 50 34)`} />
      ))}
      {/* coconut */}
      <ellipse cx="50" cy="26" rx="13" ry="12" fill="#8A5A2B" />
      <path d="M40 22 Q50 14 60 22" stroke="#6B4320" strokeWidth="1.5" fill="none" />
      {/* rim */}
      <ellipse cx="50" cy="38" rx="20" ry="5" fill={GOLD_DARK} />
      <path d="M34 40 Q50 46 66 40 L64 48 Q50 52 36 48Z" fill={GOLD} />
      {/* body */}
      <path d="M36 48 C10 56 12 100 36 104 H64 C88 100 90 56 64 48 Q50 52 36 48Z" fill={GOLD} />
      <path d="M36 48 C20 58 20 96 38 104" fill="none" stroke={GOLD_LIGHT} strokeWidth="2" opacity="0.7" />
      <path d="M22 72 Q50 82 78 72" stroke={MAROON} strokeWidth="3" fill="none" />
      <path d="M24 80 Q50 90 76 80" stroke={GOLD_DARK} strokeWidth="1" fill="none" />
      <circle cx="50" cy="66" r="4" fill={ROSE} />
      <path d="M40 104 H60 L64 110 H36Z" fill={GOLD_DARK} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Diya (brass lamp)                                                   */
/* ------------------------------------------------------------------ */
export function Diya({ className, box, lit = true }: P & { lit?: boolean }) {
  return (
    <svg viewBox="0 0 60 90" className={className} aria-hidden="true" {...box}>
      {lit && (
        <g className="diya-flame">
          <ellipse cx="30" cy="24" rx="9" ry="18" fill="#F6C14B" opacity="0.35" />
          <path d="M30 6 C38 18 36 30 30 34 C24 30 22 18 30 6Z" fill="#F4A21E" />
          <path d="M30 16 C34 22 33 30 30 32 C27 30 26 22 30 16Z" fill="#FFF1B8" />
        </g>
      )}
      <path d="M8 38 Q30 52 52 38 Q50 48 30 50 Q10 48 8 38Z" fill={GOLD} />
      <path d="M8 38 Q30 44 52 38" stroke={GOLD_DARK} strokeWidth="1" fill="none" />
      <rect x="27" y="50" width="6" height="22" fill={GOLD_DARK} />
      <ellipse cx="30" cy="60" rx="7" ry="3" fill={GOLD} />
      <path d="M14 82 Q30 70 46 82 Z" fill={GOLD} />
      <rect x="12" y="82" width="36" height="4" rx="2" fill={GOLD_DARK} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Mandapam                                                            */
/* ------------------------------------------------------------------ */
export function Mandapam({ className }: P) {
  return (
    <svg viewBox="0 0 160 140" className={className} aria-hidden="true">
      {/* dome */}
      <path d="M80 6 L84 14 H76Z" fill={GOLD} />
      <path d="M30 42 Q80 -4 130 42Z" fill={GOLD} />
      <path d="M40 42 Q80 6 120 42" fill="none" stroke={GOLD_LIGHT} strokeWidth="1.5" />
      <rect x="22" y="40" width="116" height="9" rx="2" fill={GOLD_DARK} />
      {/* scalloped canopy edge */}
      {Array.from({ length: 10 }, (_, i) => (
        <path key={i} d={`M${24 + i * 11.2} 49 q5.6 9 11.2 0`} fill={MAROON} />
      ))}
      {/* garlands */}
      <path d="M30 52 Q55 74 80 52 Q105 74 130 52" fill="none" stroke={MARIGOLD} strokeWidth="4" strokeLinecap="round" strokeDasharray="0.1 6" />
      <path d="M30 52 Q55 70 80 52 Q105 70 130 52" fill="none" stroke={JASMINE} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="0.1 5" />
      {/* pillars */}
      {[28, 54, 100, 126].map((x) => (
        <g key={x}>
          <rect x={x} y="50" width="6" height="74" fill={GOLD} />
          <rect x={x - 2} y="50" width="10" height="4" fill={GOLD_DARK} />
          <rect x={x - 2} y="120" width="10" height="5" fill={GOLD_DARK} />
          <path d={`M${x + 3} 56 V118`} stroke={GOLD_LIGHT} strokeWidth="1" />
          {Array.from({ length: 6 }, (_, j) => (
            <circle key={j} cx={x + 3} cy={62 + j * 10} r="1.8" fill={j % 2 ? JASMINE : MARIGOLD} />
          ))}
        </g>
      ))}
      {/* sacred fire & platform */}
      <path d="M80 92 C86 100 84 108 80 110 C76 108 74 100 80 92Z" fill="#F4A21E" />
      <rect x="66" y="110" width="28" height="8" fill={MAROON} />
      <rect x="14" y="125" width="132" height="8" rx="2" fill={MAROON} />
      <rect x="6" y="133" width="148" height="5" rx="2" fill={BURGUNDY} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Gopuram                                                             */
/* ------------------------------------------------------------------ */
export function Gopuram({ className, color = GOLD }: P & { color?: string }) {
  const tiers = [
    { y: 94, w: 120, h: 18 },
    { y: 76, w: 100, h: 18 },
    { y: 60, w: 82, h: 16 },
    { y: 46, w: 64, h: 14 },
    { y: 34, w: 48, h: 12 },
  ];
  return (
    <svg viewBox="0 0 160 140" className={className} aria-hidden="true">
      <g fill="none" stroke={color} strokeWidth="1.1">
        <rect x="16" y="112" width="128" height="26" />
        <path d="M68 138 V122 Q80 110 92 122 V138" />
        {tiers.map((t, i) => (
          <g key={i}>
            <rect x={80 - t.w / 2} y={t.y} width={t.w} height={t.h} />
            {Array.from({ length: Math.floor(t.w / 12) }, (_, j) => (
              <path key={j} d={`M${80 - t.w / 2 + 6 + j * 12} ${t.y + t.h} v-${t.h * 0.55} q3 -4 6 0 v${t.h * 0.55}`} strokeWidth="0.7" />
            ))}
          </g>
        ))}
        <path d="M52 34 Q80 6 108 34Z" />
        {[62, 71, 80, 89, 98].map((x) => (
          <path key={x} d={`M${x} ${x === 80 ? 10 : 18} v-6`} />
        ))}
        <circle cx="80" cy="3" r="2" fill={color} />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Caparisoned elephant (faces right; flip with -scale-x-100)          */
/* ------------------------------------------------------------------ */
export function Elephant({ className }: P) {
  const body = "#F3E7CF";
  const shade = "#DCCBA8";
  return (
    <svg viewBox="0 0 160 120" className={className} aria-hidden="true">
      {/* legs */}
      {[34, 54, 92, 110].map((x, i) => (
        <g key={x}>
          <rect x={x} y="76" width="16" height="36" rx="5" fill={i % 2 ? shade : body} />
          <rect x={x - 1} y="104" width="18" height="6" rx="2" fill={GOLD} />
        </g>
      ))}
      {/* body */}
      <path d="M22 70 C18 38 50 24 88 26 C112 27 124 36 128 52 L128 84 C110 90 50 92 26 86 Z" fill={body} />
      <path d="M14 66 Q8 76 12 88" stroke={shade} strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* head + trunk */}
      <path d="M116 34 C140 24 158 40 152 62 C150 74 146 84 148 98 C149 106 144 110 140 104 C136 92 138 80 132 74 L124 70 Z" fill={body} />
      <path d="M150 102 q4 2 2 6" stroke={shade} strokeWidth="2" fill="none" />
      {/* tusk */}
      <path d="M136 70 Q142 82 154 82 Q144 76 140 68Z" fill="#FFFDF5" stroke={shade} strokeWidth="0.6" />
      {/* ear */}
      <path d="M112 34 C98 36 96 64 110 70 C120 72 124 52 120 40 Z" fill={shade} />
      <circle cx="136" cy="46" r="2.2" fill={BURGUNDY} />
      {/* head ornament */}
      <path d="M128 30 C136 26 146 30 148 38 L140 50 C134 44 130 38 128 30Z" fill={MAROON} />
      <path d="M128 30 C136 26 146 30 148 38" stroke={GOLD} strokeWidth="1.6" fill="none" />
      <circle cx="140" cy="40" r="2" fill={GOLD} />
      {/* caparison cloth */}
      <path d="M44 28 C62 24 90 24 106 30 L104 76 C86 82 62 82 46 76 Z" fill={MAROON} />
      <path d="M46 70 C62 76 86 76 104 70 L104 76 C86 82 62 82 46 76 Z" fill={GOLD} />
      {Array.from({ length: 7 }, (_, i) => (
        <path key={i} d={`M${48 + i * 8.6} 78 l4.3 7 l4.3 -7`} fill={GOLD} />
      ))}
      <path d="M58 36 H92 V62 H58Z" fill="none" stroke={GOLD} strokeWidth="1.2" />
      <path d="M75 40 l7 9 l-7 9 l-7 -9z" fill={GOLD} />
      {/* howdah canopy hint */}
      <path d="M58 24 Q75 8 92 24Z" fill={GOLD} />
      <circle cx="75" cy="12" r="2" fill={GOLD} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Event illustrations                                                 */
/* ------------------------------------------------------------------ */
function HaldiIcon({ className }: P) {
  return (
    <svg viewBox="0 0 80 64" className={className} aria-hidden="true">
      <path d="M14 34 Q40 70 66 34Z" fill={GOLD} />
      <path d="M14 34 H66" stroke={GOLD_DARK} strokeWidth="2" />
      <path d="M22 34 Q40 16 58 34Z" fill={TURMERIC} />
      <path d="M28 34 Q40 24 52 34" fill="none" stroke="#E2A114" strokeWidth="1.2" />
      {[
        [10, 18],
        [66, 14],
        [70, 30],
      ].map(([x, y], i) => (
        <g key={i}>
          {Array.from({ length: 8 }, (_, j) => (
            <ellipse key={j} cx={x} cy={y - 4} rx="2.4" ry="4" fill={MARIGOLD} transform={`rotate(${j * 45} ${x} ${y})`} />
          ))}
          <circle cx={x} cy={y} r="2.6" fill={MARIGOLD_DEEP} />
        </g>
      ))}
      <path d="M40 56 Q40 60 36 62 H44 Q40 60 40 56" fill={GOLD_DARK} />
    </svg>
  );
}

function SangeethIcon({ className }: P) {
  return (
    <svg viewBox="0 0 80 64" className={className} aria-hidden="true">
      {/* dholak */}
      <path d="M14 30 Q12 46 14 58 H50 Q52 46 50 30Z" fill={MAROON} />
      <ellipse cx="14" cy="44" rx="4" ry="14" fill={GOLD_LIGHT} stroke={GOLD_DARK} />
      <ellipse cx="50" cy="44" rx="4" ry="14" fill={GOLD_LIGHT} stroke={GOLD_DARK} />
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M${16 + i * 7} 31 L${20 + i * 7} 57`} stroke={GOLD} strokeWidth="1" />
      ))}
      {/* notes */}
      <path d="M58 8 V30" stroke={GOLD_DARK} strokeWidth="2" />
      <path d="M58 8 L72 4 V24" stroke={GOLD_DARK} strokeWidth="2" fill="none" />
      <ellipse cx="54" cy="31" rx="5" ry="3.6" fill={GOLD_DARK} />
      <ellipse cx="68" cy="25" rx="5" ry="3.6" fill={GOLD_DARK} />
      <path d="M30 6 V20" stroke={GOLD} strokeWidth="1.6" />
      <ellipse cx="27" cy="21" rx="4" ry="3" fill={GOLD} />
    </svg>
  );
}

function GroomIcon({ className }: P) {
  return (
    <svg viewBox="0 0 80 64" className={className} aria-hidden="true">
      {/* turban */}
      <path d="M16 44 C12 22 30 10 42 12 C58 12 68 26 64 44 Z" fill={GOLD_LIGHT} />
      <path d="M18 40 C30 30 50 30 62 40" stroke={GOLD} strokeWidth="3" fill="none" />
      <path d="M20 32 C32 22 50 24 60 32" stroke={GOLD} strokeWidth="2" fill="none" />
      <path d="M24 24 C34 16 48 18 56 24" stroke={GOLD} strokeWidth="1.5" fill="none" />
      <rect x="14" y="42" width="52" height="8" rx="3" fill={MAROON} />
      <path d="M14 46 H66" stroke={GOLD} strokeWidth="1" />
      {/* kalgi plume */}
      <path d="M40 14 C44 4 52 2 54 6 C48 6 44 10 42 16Z" fill={GOLD} />
      <circle cx="40" cy="18" r="4" fill={ROSE} stroke={GOLD} strokeWidth="1.5" />
      {/* hanging pearls */}
      {[22, 30, 38, 46, 54].map((x) => (
        <g key={x}>
          <line x1={x + 2} y1="50" x2={x + 2} y2={56 + (x % 3)} stroke={GOLD_DARK} strokeWidth="0.6" />
          <circle cx={x + 2} cy={57 + (x % 3)} r="1.6" fill={JASMINE} stroke={GOLD_DARK} strokeWidth="0.4" />
        </g>
      ))}
    </svg>
  );
}

function UpanayanamIcon({ className }: P) {
  return (
    <svg viewBox="0 0 80 64" className={className} aria-hidden="true">
      {/* sacred thread loop */}
      <path d="M8 10 C30 4 52 4 72 12" stroke={GOLD_LIGHT} strokeWidth="1.5" fill="none" />
      <path d="M8 13 C30 7 52 7 72 15" stroke={GOLD} strokeWidth="1" fill="none" />
      {/* homa kundam */}
      <path d="M40 18 C50 30 48 40 40 44 C32 40 30 30 40 18Z" fill="#F4A21E" />
      <path d="M40 28 C44 34 43 40 40 42 C37 40 36 34 40 28Z" fill="#FFF1B8" />
      <path d="M30 26 C34 34 34 40 31 44 C26 40 26 32 30 26Z" fill="#E8701E" opacity="0.8" />
      <path d="M50 26 C54 32 54 40 49 44 C46 40 46 32 50 26Z" fill="#E8701E" opacity="0.8" />
      <path d="M16 44 H64 L58 52 H22Z" fill={MAROON} />
      <path d="M12 52 H68 V58 H12Z" fill={GOLD_DARK} />
      <path d="M16 44 H64" stroke={GOLD} strokeWidth="1.5" />
      <path d="M22 48 H58" stroke={GOLD} strokeWidth="0.8" strokeDasharray="2 2" />
    </svg>
  );
}

function VrathamIcon({ className }: P) {
  return (
    <svg viewBox="0 0 80 64" className={className} aria-hidden="true">
      <Kalash box={{ x: 22, y: 0, width: 36, height: 62 }} />
      <Diya box={{ x: 2, y: 22, width: 22, height: 40 }} />
      <Diya box={{ x: 56, y: 22, width: 22, height: 40 }} />
    </svg>
  );
}

function ReceptionIcon({ className }: P) {
  return (
    <svg viewBox="0 0 80 64" className={className} aria-hidden="true">
      {/* two rings */}
      <circle cx="32" cy="38" r="13" fill="none" stroke={GOLD} strokeWidth="4" />
      <circle cx="48" cy="38" r="13" fill="none" stroke={GOLD_DARK} strokeWidth="4" />
      <path d="M40 18 l4 -6 h-8z" fill={ROSE} />
      <path d="M40 22 l-4 -4 l4 -6 l4 6z" fill="#F8E6EA" stroke={GOLD} strokeWidth="0.8" />
      {[10, 70].map((x) => (
        <g key={x}>
          {Array.from({ length: 5 }, (_, i) => (
            <circle key={i} cx={x + Math.cos(i * 1.26) * 4} cy={14 + Math.sin(i * 1.26) * 4} r="1.4" fill={GOLD} />
          ))}
        </g>
      ))}
    </svg>
  );
}

export function EventIllustration({ icon, className }: { icon: EventIcon; className?: string }) {
  switch (icon) {
    case "haldi":
      return <HaldiIcon className={className} />;
    case "sangeeth":
      return <SangeethIcon className={className} />;
    case "eduru":
      return <Kalash className={className} />;
    case "groom":
      return <GroomIcon className={className} />;
    case "upanayanam":
      return <UpanayanamIcon className={className} />;
    case "wedding":
      return <Mandapam className={className} />;
    case "vratham":
      return <VrathamIcon className={className} />;
    case "reception":
      return <ReceptionIcon className={className} />;
  }
}

/* ------------------------------------------------------------------ */
/* Sri Ganesha — line-art emblem for blessings                         */
/* `bg` must match the surface so the hollow trunk reads correctly.    */
/* ------------------------------------------------------------------ */
export function Ganesha({ className, color = GOLD, bg = MAROON, title }: P & { color?: string; bg?: string; title?: string }) {
  const trunk = "M60 57 C58 75 57 91 61 101 C64 109 73 110 74 103 C75 98 70 97 68 101";
  return (
    <svg viewBox="0 0 120 128" className={className} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <g fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {/* ears */}
        <path d="M45 44 C30 35 15 45 17 62 C19 77 34 81 45 72" fill={bg} />
        <path d="M42 50 C32 46 25 54 27 63 C29 70 36 72 42 68" strokeWidth="1.1" />
        <path d="M75 44 C90 35 105 45 103 62 C101 77 86 81 75 72" fill={bg} />
        <path d="M78 50 C88 46 95 54 93 63 C91 70 84 72 78 68" strokeWidth="1.1" />
        {Array.from({ length: 4 }, (_, i) => (
          <g key={i} strokeWidth="0.8">
            <circle cx={24 + i * 3} cy={58 + i * 3} r="0.9" fill={color} />
            <circle cx={96 - i * 3} cy={58 + i * 3} r="0.9" fill={color} />
          </g>
        ))}
        {/* face */}
        <path d="M45 39 C42 52 44 63 51 71 C55 76 65 76 69 71 C76 63 78 52 75 39" fill={bg} />
        {/* crown (kireetam) */}
        <path d="M46 37 L43 21 L52 26 L60 6 L68 26 L77 21 L74 37 Z" fill={bg} />
        <path d="M51 30 L60 14 L69 30" strokeWidth="1" />
        <circle cx="60" cy="24" r="2.2" fill={color} />
        <circle cx="47" cy="27" r="1.2" fill={color} />
        <circle cx="73" cy="27" r="1.2" fill={color} />
        <path d="M43 37.5 H77" strokeWidth="2.6" />
        <path d="M45 41 H75" strokeWidth="0.9" strokeDasharray="1.5 2" />
        {/* tilak */}
        <path d="M56 43 Q60 51 64 43" />
        <path d="M60 45 V50" stroke={ROSE} strokeWidth="2" />
        {/* tusks */}
        <path d="M53 66 C46 71 45 80 49 85 C49 79 52 73 57 70" fill={JASMINE} strokeWidth="1.1" />
        <path d="M67 66 C72 69 73 73 71 76" strokeWidth="1.4" />
        {/* trunk — drawn hollow over the face */}
        <path d={trunk} strokeWidth="11" />
        <path d={trunk} stroke={bg} strokeWidth="7.6" />
        {[68, 76, 84, 92].map((y) => (
          <path key={y} d={`M${55.6 - (y - 68) * 0.06} ${y} Q60 ${y + 2} ${64.4 - (y - 68) * 0.06} ${y}`} strokeWidth="0.9" />
        ))}
        {/* eyes */}
        <path d="M49.5 55 Q53.5 51.5 57 55 Q53.5 57.2 49.5 55Z" fill={color} />
        <path d="M63 55 Q66.5 51.5 70.5 55 Q66.5 57.2 63 55Z" fill={color} />
        {/* necklace */}
        <path d="M36 84 Q48 96 56 96" />
        <path d="M84 84 Q72 96 64 96" />
        {[40, 45, 50, 70, 75, 80].map((x) => (
          <circle key={x} cx={x} cy={x < 60 ? 87 + (x - 40) * 0.45 : 87 + (80 - x) * 0.45} r="1.3" fill={color} />
        ))}
        {/* lotus seat */}
        <path d="M30 116 Q60 128 90 116" />
        <path d="M60 116 C66 108 66 102 60 98 C54 102 54 108 60 116Z" strokeWidth="1.2" />
        <path d="M60 118 C52 110 44 108 36 110 C40 117 50 120 60 118Z" strokeWidth="1.2" />
        <path d="M60 118 C68 110 76 108 84 110 C80 117 70 120 60 118Z" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Sri Venkateswara — Shankha, Tirunamam and Sudarshana Chakra         */
/* ------------------------------------------------------------------ */
export function VenkateswaraEmblem({ className, title }: P & { title?: string }) {
  const cx = 168;
  const cy = 50;
  return (
    <svg viewBox="0 0 200 104" className={className} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      {/* Shankha (conch) */}
      <g stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 10 C43 16 49 31 47 47 C45 63 39 74 32 79 C25 74 19 63 17 47 C15 31 21 16 32 10Z" fill={JASMINE} />
        <path d="M32 21 C39 25 39 34 32 36 C26 37 25 31 29.5 29.5" fill="none" />
        <path d="M21 50 Q32 55 43 50" fill="none" />
        <path d="M23 60 Q32 64 41 60" fill="none" />
        <path d="M26 69 Q32 72 38 69" fill="none" />
        <path d="M32 79 V88" />
        <path d="M24 92 Q32 84 40 92Z" fill={GOLD} />
      </g>
      {/* Tirunamam */}
      <path d="M86 16 V66 Q100 88 114 66 V16" fill="none" stroke={GOLD} strokeWidth="11" strokeLinecap="round" />
      <path d="M86 16 V66 Q100 88 114 66 V16" fill="none" stroke={JASMINE} strokeWidth="7.5" strokeLinecap="round" />
      <path d="M100 26 V74" stroke={ROSE} strokeWidth="5" strokeLinecap="round" />
      <path d="M100 26 V74" stroke="#E8961E" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
      <path d="M78 92 Q100 80 122 92" fill="none" stroke={GOLD} strokeWidth="1.6" />
      <circle cx="100" cy="94" r="2.4" fill={GOLD} />
      {/* Sudarshana Chakra */}
      <g>
        {Array.from({ length: 16 }, (_, i) => (
          <path key={i} d={`M${cx} ${cy - 34} l4 9 h-8z`} fill={GOLD} transform={`rotate(${i * 22.5} ${cx} ${cy})`} />
        ))}
        <circle cx={cx} cy={cy} r="25" fill={MAROON} stroke={GOLD} strokeWidth="2.4" />
        <circle cx={cx} cy={cy} r="19" fill="none" stroke={GOLD_LIGHT} strokeWidth="0.8" strokeDasharray="2 2" />
        {Array.from({ length: 8 }, (_, i) => (
          <path key={i} d={`M${cx} ${cy} L${cx} ${cy - 18}`} stroke={GOLD} strokeWidth="1.6" transform={`rotate(${i * 45} ${cx} ${cy})`} />
        ))}
        <circle cx={cx} cy={cy} r="6" fill={GOLD} />
        <circle cx={cx} cy={cy} r="2.4" fill={ROSE} />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Sri Shiva-Parvathi — trishul, damaru and crescent moon              */
/* ------------------------------------------------------------------ */
export function ShivaEmblem({ className, title }: P & { title?: string }) {
  return (
    <svg viewBox="0 0 90 120" className={className} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      {/* crescent moon */}
      <path d="M20 10 A13 13 0 1 0 30 32 A10 10 0 1 1 20 10Z" fill={GOLD_LIGHT} />
      <g fill="none" stroke={GOLD} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {/* trishul */}
        <path d="M45 10 V112" />
        <path d="M45 10 l-5 9 M45 10 l5 9" strokeWidth="2.4" />
        <path d="M27 18 C24 36 32 46 45 48 C58 46 66 36 63 18" />
        <path d="M27 18 l-4 7 M27 18 l5 5 M63 18 l4 7 M63 18 l-5 5" strokeWidth="2.2" />
        <path d="M38 50 H52" strokeWidth="2.4" />
      </g>
      {/* damaru */}
      <path d="M35 60 H55 L45 72 Z" fill={MAROON} stroke={GOLD} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M35 84 H55 L45 72 Z" fill={MAROON} stroke={GOLD} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M38 72 H52" stroke={GOLD} strokeWidth="2" />
      <path d="M52 72 C62 70 66 76 62 82" fill="none" stroke={ROSE} strokeWidth="1.4" />
      <circle cx="62" cy="83" r="2.2" fill={GOLD} />
      {/* sacred ash stripes */}
      <path d="M38 96 H52 M38 100 H52 M38 104 H52" stroke={JASMINE} strokeWidth="1.4" />
      <circle cx="45" cy="100" r="2" fill={ROSE} />
    </svg>
  );
}
