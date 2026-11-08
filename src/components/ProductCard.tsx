import Link from "next/link";
import { COLORWAYS, formatPrice, type Product } from "@/data/products";
import { Garment } from "./Garment";

const TONES: Record<string, string> = {
  tee: "var(--tone-1)",
  hoodie: "var(--tone-2)",
  coat: "var(--tone-3)",
  cap: "var(--tone-4)",
  pants: "var(--tone-5)",
  tote: "var(--tone-6)",
};

export function ProductCard({ product }: { product: Product }) {
  const first = COLORWAYS[product.colors[0]];
  return (
    <Link href={`/shop/${product.slug}/`} className="card product">
      <div className="pic" style={{ background: TONES[product.kind] }}>
        {product.badge && <span className={`badge ${product.badge === "Neu" ? "new" : ""}`}>{product.badge}</span>}
        <Garment kind={product.kind} color={first} title={`${product.name} in ${first.name}`} />
      </div>
      <div className="info">
        <div>
          <h3>{product.name}</h3>
          <p>{product.category} · {product.colors.length} Farben</p>
        </div>
        <span className="price">{formatPrice(product.price)}</span>
      </div>
      <div className="dots" aria-hidden="true">
        {product.colors.map((c) => (
          <i key={c} style={{ background: COLORWAYS[c].base }} />
        ))}
      </div>
    </Link>
  );
}

export { TONES };
