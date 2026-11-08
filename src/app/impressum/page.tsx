import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Impressum" };

export default function Impressum() {
  return (
    <section className="page-head legal">
      <div className="wrap narrow">
        <h1 className="serif">Impressum</h1>
        <p className="notice">Platzhalter – bitte vor dem Livegang mit den echten Angaben ausfüllen (Pflicht nach § 5 DDG).</p>
        <h2>Angaben gemäß § 5 DDG</h2>
        <p>[Vor- und Nachname / Firma]<br />[Straße und Hausnummer]<br />[PLZ Ort]<br />[Land]</p>
        <h2>Kontakt</h2>
        <p>E-Mail: {SITE.email}<br />Telefon: [optional]</p>
        <h2>Umsatzsteuer-ID</h2>
        <p>[USt-IdNr. gemäß § 27a UStG, falls vorhanden]</p>
        <h2>Verantwortlich für den Inhalt</h2>
        <p>[Name, Anschrift]</p>
      </div>
    </section>
  );
}
