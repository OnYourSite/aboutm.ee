"use client";

import { useState } from "react";
import { CATEGORIES, PRODUCTS, type Category } from "@/data/products";
import { ProductCard } from "./ProductCard";

export function ShopGrid() {
  const [cat, setCat] = useState<"Alle" | Category>("Alle");
  const list = cat === "Alle" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);
  return (
    <>
      <div className="chips" role="tablist" aria-label="Kategorie">
        {CATEGORIES.map((c) => (
          <button key={c} role="tab" aria-selected={cat === c} className={cat === c ? "chip on" : "chip"} onClick={() => setCat(c)} type="button">
            {c}
          </button>
        ))}
      </div>
      <div className="grid g3" aria-live="polite">
        {list.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </>
  );
}
