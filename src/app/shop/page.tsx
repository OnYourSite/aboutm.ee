import type { Metadata } from "next";
import { ShopGrid } from "@/components/ShopGrid";

export const metadata: Metadata = { title: "Shop", description: "Alle Produkte von AboutM.ee: Tees, Hoodies, Mäntel, Hosen und Accessoires." };

export default function Shop() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <span className="eyebrow">Shop</span>
          <h1 className="serif">Alle Produkte</h1>
          <p className="lead">Zeitlose Essentials in kleinen Auflagen. Wähle Farbe und Größe und bestelle direkt per E-Mail.</p>
        </div>
      </section>
      <section style={{ paddingTop: 0 }}>
        <div className="wrap"><ShopGrid /></div>
      </section>
    </>
  );
}
