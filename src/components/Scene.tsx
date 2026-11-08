import { COLORWAYS, type GarmentKind } from "@/data/products";
import { Garment } from "./Garment";

export interface SceneItem {
  kind: GarmentKind;
  color: keyof typeof COLORWAYS;
  /** Position in % (Mittelpunkt) */
  x: number;
  y: number;
  /** Breite in % der Szene */
  w: number;
  rotate?: number;
}

export type Backdrop = "arch" | "circle" | "bars" | "diag" | "grid" | "plain";

export interface SceneProps {
  bg: string;
  shape: string;
  backdrop: Backdrop;
  items: SceneItem[];
  className?: string;
  ratio?: string;
}

/** Studiobild: Farbfläche + grafische Form + Kleidungsstücke. */
export function Scene({ bg, shape, backdrop, items, className = "", ratio = "4 / 5" }: SceneProps) {
  return (
    <div className={`scene ${className}`} style={{ background: bg, aspectRatio: ratio }}>
      {backdrop === "arch" && <div className="sh arch" style={{ background: shape }} />}
      {backdrop === "circle" && <div className="sh circle" style={{ background: shape }} />}
      {backdrop === "bars" && (
        <div className="sh bars">
          {[0, 1, 2, 3, 4].map((i) => (
            <i key={i} style={{ background: shape }} />
          ))}
        </div>
      )}
      {backdrop === "diag" && <div className="sh diag" style={{ background: shape }} />}
      {backdrop === "grid" && <div className="sh gridlines" style={{ ["--c" as string]: shape }} />}
      {items.map((it, i) => (
        <div key={i} className="piece" style={{ left: `${it.x}%`, top: `${it.y}%`, width: `${it.w}%`, transform: `translate(-50%, -50%) rotate(${it.rotate ?? 0}deg)` }}>
          <Garment kind={it.kind} color={COLORWAYS[it.color]} />
        </div>
      ))}
    </div>
  );
}
