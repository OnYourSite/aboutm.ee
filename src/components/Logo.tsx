import { MONOGRAM, WORDMARK } from "./logo-paths";

/** Wortmarke – nutzt currentColor, der Akzent kommt aus --accent. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${WORDMARK.w} ${WORDMARK.h}`} className={className} role="img" aria-label="AboutM.ee">
      <path d={WORDMARK.a} fill="currentColor" />
      <path d={WORDMARK.m} fill="var(--accent)" />
      <path d={WORDMARK.e} fill="currentColor" />
    </svg>
  );
}

/** Monogramm im Kreis. */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="AboutM.ee">
      <circle cx="32" cy="32" r="32" fill="currentColor" />
      <path d={MONOGRAM.m} fill="var(--surface)" />
      <circle cx={MONOGRAM.dotX} cy={MONOGRAM.dotY} r="3.6" fill="var(--accent)" />
    </svg>
  );
}
