export const SITE = {
  name: "AboutM.ee",
  domain: "aboutm.ee",
  url: "https://aboutm.ee",
  email: "hallo@aboutm.ee",
  claim: "Mode, die über dich spricht.",
} as const;

export const NAV = [
  { href: "/", label: "Start" },
  { href: "/shop/", label: "Shop" },
  { href: "/lookbook/", label: "Lookbook" },
  { href: "/about/", label: "Über uns" },
  { href: "/contact/", label: "Kontakt" },
] as const;
