/**
 * Koushik & Srija gold monogram — lotus-petal mandala ring with intertwined K and S.
 * `id` must be unique per instance on the page (it scopes the SVG gradients).
 */
export function Monogram({ id, className, title = "Koushik & Srija" }: { id: string; className?: string; title?: string }) {
  const gold = `url(#${id}-gold)`;
  const petals = Array.from({ length: 16 }, (_, i) => i * 22.5);
  const beads = Array.from({ length: 48 }, (_, i) => i * 7.5);
  return (
    <svg viewBox="0 0 240 260" className={className} role="img" aria-label={title}>
      <defs>
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8a5f1f" />
          <stop offset="22%" stopColor="#f6e2a4" />
          <stop offset="45%" stopColor="#c99a45" />
          <stop offset="62%" stopColor="#fff1c4" />
          <stop offset="82%" stopColor="#b8862f" />
          <stop offset="100%" stopColor="#6e4a17" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="50%" cy="46%" r="50%">
          <stop offset="0%" stopColor="#ffd98a" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#c69a45" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#c69a45" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="120" cy="118" r="116" fill={`url(#${id}-glow)`} />

      {/* lotus petal crown */}
      <g fill="none" stroke={gold} strokeWidth="2">
        {petals.map((a) => (
          <path key={a} transform={`rotate(${a} 120 118)`} d="M120 22 C131 34 133 46 120 58 C107 46 109 34 120 22Z" fill={gold} fillOpacity="0.22" />
        ))}
        {petals.map((a) => (
          <path key={`s${a}`} transform={`rotate(${a + 11.25} 120 118)`} d="M120 34 C126 42 126 50 120 56 C114 50 114 42 120 34Z" />
        ))}
      </g>

      {/* double ring with beads */}
      <circle cx="120" cy="118" r="64" fill="#2a0610" fillOpacity="0.55" stroke={gold} strokeWidth="3.2" />
      <circle cx="120" cy="118" r="57" fill="none" stroke={gold} strokeWidth="1" />
      {beads.map((a) => (
        <circle key={a} cx="120" cy="58" r="1.6" fill={gold} transform={`rotate(${a} 120 118)`} />
      ))}

      {/* leafy vines */}
      <g fill={gold}>
        <path d="M66 150 C58 128 62 104 76 86 C70 108 70 128 80 146Z" opacity="0.9" />
        <path d="M174 150 C182 128 178 104 164 86 C170 108 170 128 160 146Z" opacity="0.9" />
      </g>

      {/* letters */}
      <text x="104" y="140" textAnchor="middle" fontFamily="Cinzel, Georgia, serif" fontWeight="600" fontSize="70" fill={gold}>
        K
      </text>
      <text x="138" y="150" textAnchor="middle" fontFamily="'Great Vibes', cursive" fontSize="86" fill={gold}>
        S
      </text>

      {/* kalash pendant */}
      <g fill={gold}>
        <path d="M120 182 L126 192 L120 202 L114 192Z" />
        <circle cx="120" cy="212" r="6.5" />
        <path d="M110 222 Q120 232 130 222 L127 238 Q120 244 113 238Z" />
        <circle cx="120" cy="252" r="3" />
      </g>
      <path d="M86 186 Q120 204 154 186" fill="none" stroke={gold} strokeWidth="1.6" />
    </svg>
  );
}
