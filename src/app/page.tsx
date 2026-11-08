import Link from "next/link";
import { Newsletter } from "@/components/Newsletter";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { Scene } from "@/components/Scene";
import { HERO_SCENE, LOOKS, STORY_SCENE } from "@/data/scenes";
import { PRODUCTS } from "@/data/products";

const MARQUEE = ["Drop 01 · Herbst/Winter 26", "Bio-Baumwolle", "Fair in Europa gefertigt", "Kleine Auflagen", "Zeitlos statt Trend"];

const VALUES = [
  { t: "Nachhaltige Materialien", p: "Bio-Baumwolle, recycelte Wolle und Farben ohne Schadstoffe – schonend für Haut und Umwelt.", i: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10ZM2 21c0-3 1.9-5.4 5.4-6.8" },
  { t: "Faire Produktion", p: "Kurze Wege, feste Partner und faire Löhne. Wir wissen, wer unsere Kleidung näht.", i: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" },
  { t: "Zeitlos & limitiert", p: "Kleine Auflagen statt Massenware. Teile, die du jahrelang trägst und gerne wiedersiehst.", i: "m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.5 6.6 19.5l1.2-6L3.3 9.3l6.1-.7Z" },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="badge new">Neu · Herbst/Winter 26</span>
            <h1 className="serif">
              Mode, die <em className="grad-text">über dich</em> spricht.
            </h1>
            <p className="lead">
              AboutM.ee steht für zeitlose Essentials mit klarer Haltung: reduziert im Schnitt, hochwertig im Material und in kleinen Auflagen gefertigt. Kleidung, die bleibt, wenn Trends gehen.
            </p>
            <div className="cta">
              <Link className="btn btn-primary" href="/shop/">Kollektion entdecken</Link>
              <Link className="btn btn-ghost" href="/lookbook/">Zum Lookbook</Link>
            </div>
            <div className="stats">
              <div><b>100 %</b><span>Bio-Baumwolle</span></div>
              <div><b>EU</b><span>Fair gefertigt</span></div>
              <div><b>120</b><span>Stück pro Farbe</span></div>
            </div>
          </div>
          <Scene {...HERO_SCENE} className="hero-scene" ratio="4 / 5" />
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="track">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i}>{m}<i>✦</i></span>
          ))}
        </div>
      </div>

      <section>
        <div className="wrap">
          <Reveal className="head">
            <span className="eyebrow">Kollektion</span>
            <h2 className="serif">Die Essentials der Saison</h2>
            <p className="lead">Sechs Teile, unzählige Looks. Alles aufeinander abgestimmt und für jeden Tag gemacht.</p>
          </Reveal>
          <div className="grid g3">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
          <div className="center"><Link className="btn btn-ghost" href="/shop/">Alle Produkte ansehen</Link></div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap story">
          <Reveal>
            <span className="eyebrow">Unsere Story</span>
            <h2 className="serif" style={{ marginTop: ".9rem" }}>Alles über <em className="grad-text">M</em>.</h2>
            <p className="muted">AboutM.ee ist aus einer einfachen Idee entstanden: Mode soll sich nach dir anfühlen, nicht nach dem nächsten Trend. Das „M“ in unserem Logo steht für Menschen, Material und Moment – die drei Dinge, um die sich bei uns alles dreht.</p>
            <p className="muted">Jedes Teil entsteht in kleinen Serien, wird auf Tragekomfort getestet und erst freigegeben, wenn wir es selbst am liebsten anbehalten würden.</p>
            <div className="cta"><Link className="btn btn-ghost" href="/about/">Mehr über uns</Link></div>
          </Reveal>
          <Reveal><Scene {...STORY_SCENE} ratio="1 / 1" /></Reveal>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal className="head">
            <span className="eyebrow">Unsere Werte</span>
            <h2 className="serif">Gutes Aussehen, gutes Gewissen.</h2>
          </Reveal>
          <div className="grid g3">
            {VALUES.map((v, i) => (
              <Reveal key={v.t} delay={i * 80}>
                <div className="card value">
                  <div className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={v.i} /></svg></div>
                  <h3>{v.t}</h3>
                  <p>{v.p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <Reveal className="head">
            <span className="eyebrow">Lookbook</span>
            <h2 className="serif">Drei Looks, ein Gefühl.</h2>
          </Reveal>
          <div className="grid g3">
            {LOOKS.slice(0, 3).map((l, i) => (
              <Reveal key={l.no} delay={i * 80}>
                <Link href="/lookbook/" className="look">
                  <Scene {...l.scene} />
                  <div className="cap"><span>Look {l.no}</span><b>{l.title}</b></div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal>
            <blockquote className="quote card">
              <p className="serif">„Mode muss nicht laut sein, um gesehen zu werden. Sie muss nur ehrlich sein.“</p>
              <small>– Das AboutM.ee Team</small>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <Reveal className="narrow">
            <span className="eyebrow">Newsletter</span>
            <h2 className="serif" style={{ marginTop: ".9rem" }}>Als Erste:r beim nächsten Drop.</h2>
            <p className="lead" style={{ marginTop: ".9rem" }}>Neue Kollektionen, Vorab-Zugang und 10 % Willkommensrabatt – ohne Spam, jederzeit abbestellbar.</p>
            <Newsletter />
          </Reveal>
        </div>
      </section>
    </>
  );
}
