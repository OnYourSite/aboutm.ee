"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Blendet Inhalte beim Scrollen weich ein (ohne JS bleibt alles sichtbar). */
export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"ssr" | "hidden" | "in">("ssr");

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setState("in");
      return;
    }
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.95) {
      setState("in");
      return;
    }
    setState("hidden");
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setState("in");
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${state === "hidden" ? "reveal" : state === "in" ? "reveal in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
