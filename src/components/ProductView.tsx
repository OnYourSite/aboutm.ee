"use client";

import { useState } from "react";
import { COLORWAYS, formatPrice, type Product } from "@/data/products";
import { SITE } from "@/lib/site";
import { Garment } from "./Garment";
import { TONES } from "./ProductCard";

export function ProductView({ product }: { product: Product }) {
  const [colorId, setColorId] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sizes.length === 1 ? product.sizes[0] : "");
  const color = COLORWAYS[colorId];

  const subject = encodeURIComponent(`Bestellanfrage: ${product.name} (${color.name}, ${size || "Größe offen"})`);
  const body = encodeURIComponent(`Hallo AboutM.ee Team,\n\nich möchte gerne bestellen:\n${product.name}\nFarbe: ${color.name}\nGröße: ${size || "-"}\n\nViele Grüße`);
  const unavailable = product.badge === "Bald verfügbar";

  return (
    <div className="pdp">
      <div className="pdp-pic" style={{ background: TONES[product.kind] }}>
        {product.badge && <span className={`badge ${product.badge === "Neu" ? "new" : ""}`}>{product.badge}</span>}
        <Garment kind={product.kind} color={color} title={`${product.name} in ${color.name}`} />
      </div>

      <div className="pdp-info">
        <span className="eyebrow">{product.category}</span>
        <h1>{product.name}</h1>
        <p className="price-lg">{formatPrice(product.price)} <small>inkl. MwSt.</small></p>
        <p className="lead">{product.tagline}</p>
        <p className="muted">{product.description}</p>

        <fieldset>
          <legend>Farbe: <b>{color.name}</b></legend>
          <div className="swatches">
            {product.colors.map((c) => (
              <button key={c} type="button" className={c === colorId ? "sw on" : "sw"} style={{ background: COLORWAYS[c].base }} onClick={() => setColorId(c)} aria-label={COLORWAYS[c].name} aria-pressed={c === colorId} />
            ))}
          </div>
        </fieldset>

        {product.sizes.length > 1 && (
          <fieldset>
            <legend>Größe: <b>{size || "bitte wählen"}</b></legend>
            <div className="sizes">
              {product.sizes.map((s) => (
                <button key={s} type="button" className={s === size ? "size on" : "size"} onClick={() => setSize(s)} aria-pressed={s === size}>
                  {s}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <div className="cta">
          {unavailable ? (
            <button className="btn btn-primary" disabled>Bald verfügbar</button>
          ) : (
            <a className={`btn btn-primary ${size ? "" : "disabled"}`} aria-disabled={!size} href={size ? `mailto:${SITE.email}?subject=${subject}&body=${body}` : undefined}>
              {size ? "Per E-Mail bestellen" : "Erst Größe wählen"}
            </a>
          )}
        </div>

        <ul className="perks">
          <li>Versand in 2–4 Werktagen</li>
          <li>30 Tage Rückgabe</li>
          <li>Fair & in Europa gefertigt</li>
        </ul>

        <dl className="specs">
          {product.details.map((d) => (
            <div key={d.label}>
              <dt>{d.label}</dt>
              <dd>{d.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
