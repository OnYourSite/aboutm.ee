import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Datenschutz" };

export default function Datenschutz() {
  return (
    <section className="page-head legal">
      <div className="wrap narrow">
        <h1 className="serif">Datenschutzerklärung</h1>
        <p className="notice">Vorlage – bitte rechtlich prüfen lassen und mit den Angaben des Verantwortlichen ergänzen.</p>
        <h2>Verantwortlicher</h2>
        <p>[Name, Anschrift] · {SITE.email}</p>
        <h2>Hosting & Server-Logfiles</h2>
        <p>Diese Website wird auf einem Server in [Land] betrieben. Beim Aufruf werden technisch notwendige Daten (IP-Adresse, Zeitpunkt, aufgerufene Seite) in Server-Logfiles verarbeitet (Art. 6 Abs. 1 lit. f DSGVO).</p>
        <h2>Schriften & externe Dienste</h2>
        <p>Alle Schriften werden lokal ausgeliefert. Es werden keine Tracking- oder Analyse-Dienste und keine externen Ressourcen geladen.</p>
        <h2>Kontakt & Bestellung per E-Mail</h2>
        <p>Wenn du uns per Formular oder E-Mail kontaktierst, verarbeiten wir deine Angaben zur Bearbeitung der Anfrage (Art. 6 Abs. 1 lit. b/f DSGVO). Das Formular öffnet dein E-Mail-Programm; es werden keine Daten auf dieser Website gespeichert.</p>
        <h2>Deine Rechte</h2>
        <p>Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch sowie auf Beschwerde bei einer Aufsichtsbehörde.</p>
        <h2>Theme-Einstellung</h2>
        <p>Deine Wahl zwischen hellem und dunklem Design speichern wir lokal in deinem Browser (localStorage). Es erfolgt keine Übermittlung an uns.</p>
      </div>
    </section>
  );
}
