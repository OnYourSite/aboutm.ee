import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Kontakt", description: "Schreib uns – wir antworten in der Regel innerhalb eines Werktags." };

export default function Contact() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <span className="eyebrow">Kontakt</span>
          <h1 className="serif">Sag Hallo.</h1>
          <p className="lead">Fragen zu Größen, Bestellungen oder Kooperationen? Wir antworten in der Regel innerhalb eines Werktags.</p>
        </div>
      </section>
      <section style={{ paddingTop: 0 }}>
        <div className="wrap contact">
          <ContactForm />
          <aside className="card value">
            <h3>Direkt erreichen</h3>
            <p><a href={`mailto:${SITE.email}`} className="link">{SITE.email}</a></p>
            <h3 style={{ marginTop: "1.5rem" }}>Antwortzeit</h3>
            <p>Montag bis Freitag, 9–17 Uhr.</p>
            <h3 style={{ marginTop: "1.5rem" }}>Versand & Rückgabe</h3>
            <p>Versand in 2–4 Werktagen. 30 Tage Rückgabe, ungetragen und mit Etikett.</p>
          </aside>
        </div>
      </section>
    </>
  );
}
