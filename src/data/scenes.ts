import type { SceneProps } from "@/components/Scene";

export interface Look {
  no: string;
  title: string;
  text: string;
  scene: SceneProps;
}

export const HERO_SCENE: SceneProps = {
  bg: "var(--stage-bg)",
  shape: "var(--stage-shape)",
  backdrop: "arch",
  items: [
    { kind: "coat", color: "sand", x: 30, y: 54, w: 52, rotate: -5 },
    { kind: "hoodie", color: "midnight", x: 68, y: 58, w: 58, rotate: 4 },
    { kind: "cap", color: "bone", x: 74, y: 22, w: 26, rotate: 8 },
  ],
};

export const LOOKS: Look[] = [
  {
    no: "01",
    title: "Midnight Hour",
    text: "Tiefes Blau, schwerer Fleece und ein Hauch Streetwear für Abende, die länger werden.",
    scene: { bg: "#dfe6f6", shape: "#b9c8ee", backdrop: "arch", items: [{ kind: "hoodie", color: "midnight", x: 50, y: 56, w: 82 }] },
  },
  {
    no: "02",
    title: "Sunday Clay",
    text: "Warme Erdtöne, ruhige Linien: der Mantel für den Spaziergang mit Kaffee.",
    scene: { bg: "#efd5c6", shape: "#e4b39b", backdrop: "circle", items: [{ kind: "coat", color: "sand", x: 50, y: 56, w: 80 }] },
  },
  {
    no: "03",
    title: "Concrete",
    text: "Monochrom, grafisch, urban. Ein Tee, das für sich spricht.",
    scene: { bg: "#d9dade", shape: "#c3c5cc", backdrop: "bars", items: [{ kind: "tee", color: "ink", x: 50, y: 56, w: 84 }] },
  },
  {
    no: "04",
    title: "Olive Grove",
    text: "Weite Hosen, natürliche Farben und ein Look, der nach Sommer in der Stadt riecht.",
    scene: { bg: "#dcdfc9", shape: "#c0c7a3", backdrop: "diag", items: [{ kind: "pants", color: "olive", x: 50, y: 54, w: 80 }] },
  },
  {
    no: "05",
    title: "Cobalt Club",
    text: "Kräftiges Blau, klare Kante: Accessoires, die jedes Outfit aufladen.",
    scene: {
      bg: "#2f5bd8",
      shape: "#4a73ea",
      backdrop: "circle",
      items: [
        { kind: "cap", color: "bone", x: 36, y: 40, w: 52, rotate: -6 },
        { kind: "tote", color: "bone", x: 66, y: 64, w: 50, rotate: 5 },
      ],
    },
  },
  {
    no: "06",
    title: "Everyday",
    text: "Das Alltagsset: Tee, Tote, Cap – alles, was du für einen guten Tag brauchst.",
    scene: {
      bg: "#f1e9d8",
      shape: "#e3d6bb",
      backdrop: "grid",
      items: [
        { kind: "tee", color: "cobalt", x: 38, y: 50, w: 56, rotate: -4 },
        { kind: "tote", color: "ink", x: 70, y: 66, w: 42, rotate: 6 },
      ],
    },
  },
];

export const STORY_SCENE: SceneProps = {
  bg: "#e3e8f6",
  shape: "#c7d2f0",
  backdrop: "circle",
  items: [
    { kind: "tee", color: "bone", x: 36, y: 52, w: 52, rotate: -6 },
    { kind: "hoodie", color: "clay", x: 66, y: 56, w: 56, rotate: 5 },
  ],
};
