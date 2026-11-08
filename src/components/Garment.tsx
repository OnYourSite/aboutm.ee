import { useId } from "react";
import type { Colorway, GarmentKind } from "@/data/products";

interface Props {
  kind: GarmentKind;
  color: Colorway;
  /** Monogramm-Stickerei anzeigen */
  mark?: boolean;
  className?: string;
  title?: string;
}

/**
 * Handgezeichnete Kleidungsstücke als SVG: Stoffschattierung, Falten, Nähte und Stickerei.
 * Alles wird aus der Farbwelt (base / dark / light) abgeleitet.
 */
export function Garment({ kind, color, mark = true, className, title }: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const { base, dark, light } = color;
  const g = (n: string) => `${n}${uid}`;
  const isDark = luminance(base) < 0.25;
  const thread = isDark ? "#f1ece0" : "#16161a";

  const Defs = (
    <defs>
      <linearGradient id={g("sh")} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor={dark} stopOpacity=".55" />
        <stop offset=".22" stopColor={dark} stopOpacity="0" />
        <stop offset=".72" stopColor={dark} stopOpacity="0" />
        <stop offset="1" stopColor={dark} stopOpacity=".5" />
      </linearGradient>
      <linearGradient id={g("hi")} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor={light} stopOpacity=".45" />
        <stop offset=".35" stopColor={light} stopOpacity="0" />
        <stop offset="1" stopColor={dark} stopOpacity=".25" />
      </linearGradient>
      <radialGradient id={g("sd")} cx=".5" cy=".5" r=".5">
        <stop offset="0" stopColor="#000" stopOpacity=".32" />
        <stop offset="1" stopColor="#000" stopOpacity="0" />
      </radialGradient>
    </defs>
  );

  /** Grundfläche mit Seiten- und Höhenschattierung */
  const Shell = ({ d }: { d: string }) => (
    <>
      <path d={d} fill={base} />
      <path d={d} fill={`url(#${g("hi")})`} />
      <path d={d} fill={`url(#${g("sh")})`} />
      <path d={d} fill="none" stroke={dark} strokeOpacity=".5" strokeWidth="1.6" strokeLinejoin="round" />
    </>
  );
  const Fold = ({ d, o = 0.22 }: { d: string; o?: number }) => (
    <path d={d} fill="none" stroke={dark} strokeOpacity={o} strokeWidth="3" strokeLinecap="round" />
  );
  const Glow = ({ d, o = 0.28 }: { d: string; o?: number }) => (
    <path d={d} fill="none" stroke={light} strokeOpacity={o} strokeWidth="5" strokeLinecap="round" />
  );
  const Stitch = ({ d }: { d: string }) => (
    <path d={d} fill="none" stroke={dark} strokeOpacity=".55" strokeWidth="1.4" strokeDasharray="4 4" strokeLinecap="round" />
  );
  const Mark = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) =>
    mark ? (
      <g transform={`translate(${x} ${y}) scale(${s})`} fill={thread}>
        <text
          x="0"
          y="0"
          textAnchor="middle"
          fontFamily="var(--font-serif), Georgia, serif"
          fontStyle="italic"
          fontWeight="700"
          fontSize="40"
        >
          M
        </text>
        <circle cx="19" cy="-2" r="3.2" fill={isDark ? "#7da2ff" : "#2f5bd8"} />
      </g>
    ) : null;

  let body: React.ReactNode;

  if (kind === "tee") {
    const d =
      "M150 58 L82 82 L22 168 L78 202 L106 170 L106 424 C106 431 110 433 117 433 L283 433 C290 433 294 431 294 424 L294 170 L322 202 L378 168 L318 82 L250 58 C240 92 160 92 150 58 Z";
    body = (
      <>
        <Shell d={d} />
        <path d="M150 58 C170 70 230 70 250 58 C240 92 160 92 150 58 Z" fill={dark} fillOpacity=".7" />
        <path d="M150 58 C160 92 240 92 250 58" fill="none" stroke={dark} strokeOpacity=".65" strokeWidth="7" strokeLinecap="round" />
        <path d="M152 61 C162 90 238 90 248 61" fill="none" stroke={light} strokeOpacity=".35" strokeWidth="1.5" />
        <Fold d="M126 190 C138 240 118 300 128 372" />
        <Fold d="M272 214 C262 276 282 330 270 396" />
        <Fold d="M170 118 C182 150 168 170 176 210" o={0.14} />
        <Glow d="M146 150 C150 200 148 250 152 300" />
        <Glow d="M250 150 C254 200 252 250 248 300" o={0.18} />
        <Fold d="M82 84 C100 90 104 130 106 170" o={0.3} />
        <Fold d="M318 84 C300 90 296 130 294 170" o={0.3} />
        <Stitch d="M114 418 L286 418" />
        <Stitch d="M36 176 L84 197" />
        <Stitch d="M364 176 L316 197" />
        <Mark x={162} y={160} s={0.62} />
      </>
    );
  } else if (kind === "hoodie") {
    const d =
      "M140 66 L92 92 C66 110 44 250 34 388 L84 398 C92 330 100 260 112 214 L114 420 L286 420 L288 214 C300 260 308 330 316 398 L366 388 C356 250 334 110 308 92 L260 66 C240 100 160 100 140 66 Z";
    body = (
      <>
        <Shell d={d} />
        <Fold d="M92 130 C80 220 72 300 74 372" />
        <Fold d="M308 130 C320 220 328 300 326 372" />
        <Fold d="M136 200 C146 250 130 300 138 340" o={0.18} />
        <Fold d="M264 200 C254 250 270 300 262 340" o={0.18} />
        <Glow d="M96 140 C84 220 76 290 78 350" />
        <Glow d="M304 140 C316 220 324 290 322 350" o={0.18} />
        {/* Känguru-Tasche */}
        <path d="M138 296 L262 296 L284 398 L116 398 Z" fill={dark} fillOpacity=".12" stroke={dark} strokeOpacity=".5" strokeWidth="1.6" strokeLinejoin="round" />
        <Stitch d="M144 306 L256 306" />
        <path d="M138 296 L116 398 M262 296 L284 398" fill="none" stroke={light} strokeOpacity=".3" strokeWidth="2" />
        {/* Bündchen */}
        <path d="M33 372 L85 382 L88 402 L33 392 Z" fill={dark} fillOpacity=".35" />
        <path d="M367 372 L315 382 L312 402 L367 392 Z" fill={dark} fillOpacity=".35" />
        <path d="M113 398 L287 398 L287 422 L113 422 Z" fill={dark} fillOpacity=".3" />
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={i} x1={122 + i * 12.4} y1="400" x2={122 + i * 12.4} y2="421" stroke={dark} strokeOpacity=".35" strokeWidth="1.4" />
        ))}
        {/* Kapuze */}
        <path d="M136 74 C112 22 156 6 200 6 C244 6 288 22 264 74 C252 100 148 100 136 74 Z" fill={base} />
        <path d="M136 74 C112 22 156 6 200 6 C244 6 288 22 264 74 C252 100 148 100 136 74 Z" fill={`url(#${g("hi")})`} />
        <path d="M136 74 C112 22 156 6 200 6 C244 6 288 22 264 74 C252 100 148 100 136 74 Z" fill={`url(#${g("sh")})`} />
        <path d="M136 74 C112 22 156 6 200 6 C244 6 288 22 264 74 C252 100 148 100 136 74 Z" fill="none" stroke={dark} strokeOpacity=".5" strokeWidth="1.6" />
        <path d="M158 66 C150 34 180 26 200 26 C220 26 250 34 242 66 C232 90 168 90 158 66 Z" fill={dark} fillOpacity=".78" />
        <path d="M162 60 C160 40 182 32 200 32 C218 32 240 40 238 60" fill="none" stroke={light} strokeOpacity=".22" strokeWidth="2" />
        <Stitch d="M146 70 C140 40 160 20 200 18" />
        {/* Kordeln */}
        <path d="M178 94 L176 168 M222 94 L224 160" stroke={light} strokeOpacity=".85" strokeWidth="3.2" strokeLinecap="round" />
        <circle cx="176" cy="172" r="4.5" fill={dark} />
        <circle cx="224" cy="164" r="4.5" fill={dark} />
        <Mark x={252} y={196} s={0.5} />
      </>
    );
  } else if (kind === "coat") {
    const d =
      "M150 52 L96 72 C70 90 50 200 42 402 L90 410 C96 332 102 252 110 204 L112 454 L288 454 L290 204 C298 252 304 332 310 410 L358 402 C350 200 330 90 304 72 L250 52 C240 70 160 70 150 52 Z";
    body = (
      <>
        <Shell d={d} />
        <path d="M150 52 C170 36 230 36 250 52 L200 70 Z" fill={dark} fillOpacity=".7" />
        <Fold d="M82 120 C70 220 62 320 62 388" />
        <Fold d="M318 120 C330 220 338 320 338 388" />
        <Fold d="M140 240 C150 310 132 380 140 440" o={0.18} />
        <Fold d="M260 240 C250 310 268 380 260 440" o={0.18} />
        <Glow d="M88 130 C76 220 70 310 70 380" />
        <Glow d="M312 130 C324 220 330 310 330 380" o={0.16} />
        <path d="M200 176 L200 454" stroke={dark} strokeOpacity=".55" strokeWidth="2" />
        <path d="M204 176 L204 454" stroke={light} strokeOpacity=".25" strokeWidth="1.5" />
        {/* Revers */}
        <path d="M150 52 L200 178 L170 188 L136 108 L120 90 Z" fill={light} fillOpacity=".12" stroke={dark} strokeOpacity=".6" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M250 52 L200 178 L230 188 L264 108 L280 90 Z" fill={light} fillOpacity=".12" stroke={dark} strokeOpacity=".6" strokeWidth="1.8" strokeLinejoin="round" />
        <Stitch d="M154 62 L196 168" />
        <Stitch d="M246 62 L204 168" />
        {/* Taschen */}
        <path d="M128 330 L176 322" stroke={dark} strokeOpacity=".7" strokeWidth="3" strokeLinecap="round" />
        <path d="M272 330 L224 322" stroke={dark} strokeOpacity=".7" strokeWidth="3" strokeLinecap="round" />
        <path d="M130 336 L176 328" stroke={light} strokeOpacity=".25" strokeWidth="2" strokeLinecap="round" />
        <path d="M270 336 L224 328" stroke={light} strokeOpacity=".25" strokeWidth="2" strokeLinecap="round" />
        {[226, 292, 358].map((y) => (
          <g key={y}>
            <circle cx="188" cy={y} r="6.5" fill={dark} fillOpacity=".85" />
            <circle cx="186.5" cy={y - 1.5} r="2.2" fill={light} fillOpacity=".5" />
          </g>
        ))}
        <Stitch d="M52 392 L90 398" />
        <Stitch d="M348 392 L310 398" />
        <Stitch d="M118 442 L282 442" />
      </>
    );
  } else if (kind === "cap") {
    const crown = "M66 292 C62 156 138 106 214 106 C292 106 338 172 336 292 Z";
    body = (
      <g transform="translate(0 24)">
        <Shell d={crown} />
        <path d="M66 292 L336 292 L336 304 C336 308 332 310 328 310 L74 310 C70 310 66 308 66 304 Z" fill={base} />
        <path d="M66 292 L336 292 L336 304 C336 308 332 310 328 310 L74 310 C70 310 66 308 66 304 Z" fill={dark} fillOpacity=".35" />
        <path d="M300 288 C336 270 392 282 394 308 C394 326 358 334 300 324 Z" fill={base} />
        <path d="M300 288 C336 270 392 282 394 308 C394 326 358 334 300 324 Z" fill={dark} fillOpacity=".38" />
        <path d="M300 288 C336 270 392 282 394 308" fill="none" stroke={light} strokeOpacity=".45" strokeWidth="2" />
        <path d="M300 288 C336 270 392 282 394 308 C394 326 358 334 300 324 Z" fill="none" stroke={dark} strokeOpacity=".6" strokeWidth="1.6" />
        <Stitch d="M308 300 C340 290 380 296 384 310" />
        <path d="M214 106 C196 170 196 240 202 292" fill="none" stroke={dark} strokeOpacity=".4" strokeWidth="2" />
        <path d="M214 106 C256 150 276 220 280 292" fill="none" stroke={dark} strokeOpacity=".4" strokeWidth="2" />
        <path d="M214 106 C170 140 140 210 130 292" fill="none" stroke={dark} strokeOpacity=".3" strokeWidth="2" />
        <Glow d="M120 160 C100 200 92 250 92 280" o={0.3} />
        <circle cx="214" cy="106" r="9" fill={base} stroke={dark} strokeOpacity=".5" strokeWidth="1.5" />
        <circle cx="211" cy="103" r="3" fill={light} fillOpacity=".5" />
        {/* Verschlussriemen */}
        <rect x="46" y="262" width="26" height="30" rx="4" fill={dark} fillOpacity=".55" />
        <rect x="52" y="272" width="14" height="6" rx="2" fill={light} fillOpacity=".5" />
        <Mark x={282} y={238} s={0.55} />
      </g>
    );
  } else if (kind === "pants") {
    const d = "M122 38 L278 38 L286 96 L334 448 L224 448 L200 204 L176 448 L66 448 L114 96 Z";
    body = (
      <>
        <Shell d={d} />
        <path d="M122 38 L278 38 L279 66 L121 66 Z" fill={dark} fillOpacity=".4" />
        <path d="M122 38 L278 38" stroke={light} strokeOpacity=".4" strokeWidth="2" />
        {[140, 200, 260].map((x) => (
          <rect key={x} x={x - 4} y="34" width="8" height="38" rx="3" fill={dark} fillOpacity=".5" />
        ))}
        <circle cx="200" cy="82" r="5" fill={light} fillOpacity=".55" stroke={dark} strokeOpacity=".5" />
        <path d="M200 66 L200 204" stroke={dark} strokeOpacity=".55" strokeWidth="2" />
        <Stitch d="M206 70 L206 190" />
        <Fold d="M162 66 L150 250" o={0.3} />
        <Fold d="M238 66 L250 250" o={0.3} />
        <path d="M122 74 C150 92 158 118 156 146" fill="none" stroke={dark} strokeOpacity=".55" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M278 74 C250 92 242 118 244 146" fill="none" stroke={dark} strokeOpacity=".55" strokeWidth="2.4" strokeLinecap="round" />
        <Glow d="M140 120 C132 220 118 330 108 430" o={0.22} />
        <Glow d="M260 120 C268 220 282 330 292 430" o={0.22} />
        <Fold d="M170 300 C172 360 168 400 170 438" o={0.16} />
        <Fold d="M230 300 C228 360 232 400 230 438" o={0.16} />
        <path d="M70 430 L180 430 M220 430 L330 430" stroke={dark} strokeOpacity=".35" strokeWidth="1.5" />
        <Stitch d="M74 438 L176 438" />
        <Stitch d="M224 438 L326 438" />
      </>
    );
  } else {
    const d = "M94 150 L306 150 L322 442 L78 442 Z";
    body = (
      <>
        <path d="M138 152 C132 40 268 40 262 152" fill="none" stroke={dark} strokeOpacity=".55" strokeWidth="16" strokeLinecap="round" />
        <path d="M138 152 C132 40 268 40 262 152" fill="none" stroke={base} strokeWidth="12" strokeLinecap="round" />
        <path d="M138 152 C132 44 268 44 262 152" fill="none" stroke={light} strokeOpacity=".4" strokeWidth="3" strokeLinecap="round" />
        <Shell d={d} />
        <path d="M94 150 L306 150 L304 178 L96 178 Z" fill={dark} fillOpacity=".25" />
        <Stitch d="M100 166 L300 166" />
        <Fold d="M128 220 C134 290 122 350 130 420" o={0.16} />
        <Fold d="M276 230 C268 300 282 360 272 424" o={0.16} />
        <Glow d="M112 200 C116 280 110 360 112 420" o={0.2} />
        <Stitch d="M88 430 L312 430" />
        <g transform="translate(200 300)" fill={thread}>
          <text textAnchor="middle" fontFamily="var(--font-serif), Georgia, serif" fontStyle="italic" fontWeight="700" fontSize="78" y="0">M</text>
          <circle cx="38" cy="-4" r="6.5" fill={isDark ? "#7da2ff" : "#2f5bd8"} />
          <text textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontWeight="600" fontSize="11" letterSpacing="5" y="38">ABOUTM.EE</text>
        </g>
      </>
    );
  }

  return (
    <svg viewBox="0 0 400 480" className={className} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      {Defs}
      <ellipse cx="200" cy="462" rx="150" ry="13" fill={`url(#${g("sd")})`} />
      {body}
    </svg>
  );
}

function luminance(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
