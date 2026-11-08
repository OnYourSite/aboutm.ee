import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Scene } from "@/components/Scene";
import { STORY_SCENE } from "@/data/scenes";

export const metadata: Metadata = { title: "Über uns", description: "Wer wir sind, wie wir arbeiten und warum AboutM.ee weniger, aber besser macht." };

const STEPS = [
  { n: "01", t: "Entwurf", p: "Jedes Teil beginnt mit einer Skizze und einer Frage: Würden wir das in fünf Jahren noch tragen?" },
  { n: "02", t: "Material", p: "Wir wählen Stoffe aus zertifizierter Bio-Baumwolle und recycelter Wolle – und prüfen jede Charge selbst." },
  { n: "03", t: "Fertigung", p: "Gefertigt in kleinen Familienbetrieben in Portugal. Kurze Wege, faire Löhne, offene Türen." },
  { n: "04", t: "Qualität", p: "Tragetest, Waschtest, Nahtkontrolle. Erst wenn alles sitzt, geht ein Teil in den Verkauf." },
];

export default function About() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <span className="eyebrow">Über uns</span>
          <h1 className="serif">Weniger, aber <em className="grad-text">besser</em>.</h1>
          <p className="lead">AboutM.ee ist eine Modemarke für Menschen, die Qualität lieber tragen als erklären.</p>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap story">
          <Reveal>
            <h2 className="serif">Menschen. Material. Moment.</h2>
            <p className="muted">Das „M“ in unserem Namen steht für drei Dinge. Menschen, die unsere Kleidung entwerfen, nähen und tragen. Material, das lange hält und die Umwelt schont. Und den Moment, in dem ein Teil einfach perfekt sitzt.</p>
            <p className="muted">Wir produzieren bewusst kleine Mengen. Das spart Ressourcen, vermeidet Überproduktion und macht jedes Teil ein bisschen besonderer.</p>
          </Reveal>
          <Reveal><Scene {...STORY_SCENE} ratio="1 / 1" /></Reveal>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <Reveal className="head"><span className="eyebrow">So entsteht ein Teil</span><h2 className="serif">Vier Schritte zum Lieblingsstück</h2></Reveal>
          <div className="grid g4">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 70}>
                <div className="card value step"><span className="no serif">{s.n}</span><h3>{s.t}</h3><p>{s.p}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="numbers">
            <div><b className="serif">100 %</b><span>Bio-Baumwolle & recycelte Wolle</span></div>
            <div><b className="serif">120</b><span>Stück pro Farbe und Drop</span></div>
            <div><b className="serif">30</b><span>Tage Rückgaberecht</span></div>
            <div><b className="serif">0</b><span>Tracking-Cookies</span></div>
          </div>
          <div className="center"><Link className="btn btn-primary" href="/shop/">Kollektion ansehen</Link></div>
        </div>
      </section>
    </>
  );
}
