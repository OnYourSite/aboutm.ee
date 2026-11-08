export type GarmentKind = "tee" | "hoodie" | "coat" | "cap" | "pants" | "tote";
export type Category = "Oberteile" | "Jacken" | "Hosen" | "Accessoires";

export interface Colorway {
  id: string;
  name: string;
  base: string;
  dark: string;
  light: string;
}

export const COLORWAYS: Record<string, Colorway> = {
  midnight: { id: "midnight", name: "Midnight", base: "#202c4a", dark: "#0e1528", light: "#44588c" },
  bone: { id: "bone", name: "Bone", base: "#ece6d8", dark: "#cbc1ab", light: "#fffdf6" },
  ink: { id: "ink", name: "Ink", base: "#1d1d22", dark: "#09090b", light: "#45454f" },
  cobalt: { id: "cobalt", name: "Cobalt", base: "#2f5bd8", dark: "#17338f", light: "#7a9cf5" },
  sand: { id: "sand", name: "Sand", base: "#cdb58c", dark: "#9f875e", light: "#ead9b8" },
  olive: { id: "olive", name: "Olive", base: "#5d6446", dark: "#383d28", light: "#8e966c" },
  clay: { id: "clay", name: "Clay", base: "#b4583f", dark: "#80382a", light: "#dc8a70" },
};

export interface Product {
  slug: string;
  name: string;
  kind: GarmentKind;
  category: Category;
  price: number;
  tagline: string;
  description: string;
  colors: string[];
  sizes: string[];
  badge?: "Neu" | "Limitiert" | "Bald verfügbar";
  details: { label: string; value: string }[];
}

const CLOTHING = ["XS", "S", "M", "L", "XL"];

export const PRODUCTS: Product[] = [
  {
    slug: "core-tee",
    name: "Core Tee",
    kind: "tee",
    category: "Oberteile",
    price: 39,
    tagline: "Das T-Shirt, das alles andere einfacher macht.",
    description:
      "Schwerer Jersey, kastiger Oversized-Schnitt und ein Kragen, der auch nach dem hundertsten Waschgang in Form bleibt. Vorne dezent bestickt, sonst bewusst ruhig.",
    colors: ["bone", "ink", "cobalt", "olive"],
    sizes: CLOTHING,
    badge: "Neu",
    details: [
      { label: "Material", value: "100 % Bio-Baumwolle, 240 g/m²" },
      { label: "Passform", value: "Oversized, Schulter abgesenkt" },
      { label: "Pflege", value: "30 °C Schonwäsche, nicht in den Trockner" },
      { label: "Produktion", value: "Portugal, GOTS-zertifiziert" },
    ],
  },
  {
    slug: "essential-hoodie",
    name: "Essential Hoodie",
    kind: "hoodie",
    category: "Oberteile",
    price: 89,
    tagline: "Schwer, weich und genau richtig geschnitten.",
    description:
      "Innen angeraut, außen glatt: Der Essential Hoodie hat eine doppelt gelegte Kapuze, ein großes Känguru-Fach und Bündchen, die nicht ausleiern.",
    colors: ["midnight", "bone", "clay", "ink"],
    sizes: CLOTHING,
    badge: "Neu",
    details: [
      { label: "Material", value: "100 % Bio-Baumwolle, 380 g/m²" },
      { label: "Passform", value: "Relaxed, leicht verkürzt" },
      { label: "Pflege", value: "30 °C Schonwäsche, auf links waschen" },
      { label: "Produktion", value: "Portugal, GOTS-zertifiziert" },
    ],
  },
  {
    slug: "longline-coat",
    name: "Longline Coat",
    kind: "coat",
    category: "Jacken",
    price: 229,
    tagline: "Ein Mantel, der jedes Outfit erwachsen macht.",
    description:
      "Lang, klar und ohne Schnickschnack. Der Longline Coat besteht aus einem dichten Wollmix, hat ein Reverskragen mit Zackenspiegel und tiefe Einschubtaschen.",
    colors: ["ink", "sand", "olive"],
    sizes: CLOTHING,
    badge: "Limitiert",
    details: [
      { label: "Material", value: "70 % recycelte Wolle, 30 % Polyamid" },
      { label: "Passform", value: "Gerade, knapp unter dem Knie" },
      { label: "Pflege", value: "Nur chemische Reinigung" },
      { label: "Auflage", value: "Pro Farbe nur 120 Stück" },
    ],
  },
  {
    slug: "signature-cap",
    name: "Signature Cap",
    kind: "cap",
    category: "Accessoires",
    price: 29,
    tagline: "Kleine Fläche, klare Handschrift.",
    description:
      "Sechs Panels, gebogener Schirm, verstellbarer Riemen aus Baumwolle. Das Monogramm ist dicht gestickt und bleibt auch bei Regen scharf.",
    colors: ["ink", "bone", "cobalt", "clay"],
    sizes: ["One Size"],
    details: [
      { label: "Material", value: "100 % Bio-Baumwolle Twill" },
      { label: "Passform", value: "Verstellbar, 54 – 61 cm" },
      { label: "Pflege", value: "Handwäsche, in Form trocknen" },
      { label: "Produktion", value: "Portugal" },
    ],
  },
  {
    slug: "wide-trousers",
    name: "Wide Trousers",
    kind: "pants",
    category: "Hosen",
    price: 79,
    tagline: "Weit geschnitten, sauber gebügelt.",
    description:
      "Hoher Bund, Bundfalten und ein Bein, das schön fällt. Die Wide Trousers stehen zu Sneakern genauso gut wie zu Loafern.",
    colors: ["sand", "ink", "olive", "midnight"],
    sizes: CLOTHING,
    badge: "Bald verfügbar",
    details: [
      { label: "Material", value: "65 % Bio-Baumwolle, 35 % Leinen" },
      { label: "Passform", value: "Weit, hoher Bund, Bundfalten" },
      { label: "Pflege", value: "30 °C, feucht bügeln" },
      { label: "Produktion", value: "Portugal" },
    ],
  },
  {
    slug: "everyday-tote",
    name: "Everyday Tote",
    kind: "tote",
    category: "Accessoires",
    price: 24,
    tagline: "Trägt dein Leben, nicht die Umwelt.",
    description:
      "Extra starker Canvas, doppelt vernähte Henkel und ein Innenfach für Schlüssel. Der Everyday Tote verträgt mehr, als du ihm zutraust.",
    colors: ["bone", "ink", "cobalt"],
    sizes: ["One Size"],
    details: [
      { label: "Material", value: "100 % Bio-Baumwoll-Canvas, 340 g/m²" },
      { label: "Maße", value: "38 × 42 cm, Henkel 65 cm" },
      { label: "Pflege", value: "30 °C Schonwäsche" },
      { label: "Produktion", value: "Portugal" },
    ],
  },
];

export const CATEGORIES: ("Alle" | Category)[] = ["Alle", "Oberteile", "Jacken", "Hosen", "Accessoires"];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const formatPrice = (n: number) => `${n.toLocaleString("de-DE")} €`;
