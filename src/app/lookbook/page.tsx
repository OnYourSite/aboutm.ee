import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Scene } from "@/components/Scene";
import { LOOKS } from "@/data/scenes";

export const metadata: Metadata = { title: "Lookbook", description: "Das Lookbook von AboutM.ee – Drop 01, Herbst/Winter 26." };

export default function Lookbook() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <span className="eyebrow">Lookbook · Drop 01</span>
          <h1 className="serif">Herbst / Winter 26</h1>
          <p className="lead">Sechs Looks, sechs Stimmungen. Alle Teile gibt es im Shop.</p>
        </div>
      </section>
      <section style={{ paddingTop: 0 }}>
        <div className="wrap lookbook">
          {LOOKS.map((l, i) => (
            <Reveal key={l.no} className={i % 3 === 1 ? "lift" : ""}>
              <figure className="look big">
                <Scene {...l.scene} />
                <figcaption><span>Look {l.no}</span><b className="serif">{l.title}</b><p>{l.text}</p></figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <div className="center" style={{ marginTop: "3rem" }}><Link className="btn btn-primary" href="/shop/">Looks im Shop kaufen</Link></div>
      </section>
    </>
  );
}
