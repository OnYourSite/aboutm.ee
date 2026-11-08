"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV } from "@/lib/site";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <header className="site-header">
      <div className="wrap bar">
        <Link href="/" className="logo" aria-label="AboutM.ee – zur Startseite" onClick={() => setOpen(false)}>
          <Logo />
        </Link>
        <nav id="nav" className={open ? "open" : ""} aria-label="Hauptnavigation">
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className={active(n.href) ? "active" : ""} aria-current={active(n.href) ? "page" : undefined} onClick={() => setOpen(false)}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="actions">
          <ThemeToggle />
          <Link className="btn btn-primary hide-sm" href="/shop/">
            Shop
          </Link>
          <button className="icon-btn menu-btn" aria-label="Menü" aria-expanded={open} aria-controls="nav" type="button" onClick={() => setOpen((o) => !o)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
