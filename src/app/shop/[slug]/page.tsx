import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { ProductView } from "@/components/ProductView";
import { PRODUCTS, getProduct } from "@/data/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  return p ? { title: p.name, description: p.tagline } : {};
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const more = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 3);
  return (
    <>
      <section className="pdp-wrap">
        <div className="wrap">
          <nav className="crumbs" aria-label="Brotkrumen">
            <Link href="/shop/">Shop</Link> <span>/</span> <span>{product.name}</span>
          </nav>
          <ProductView product={product} />
        </div>
      </section>
      <section className="alt">
        <div className="wrap">
          <div className="head"><h2 className="serif">Dazu passt</h2></div>
          <div className="grid g3">{more.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
        </div>
      </section>
    </>
  );
}
