import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-head">
      <div className="wrap" style={{ textAlign: "center" }}>
        <span className="eyebrow">Fehler 404</span>
        <h1 className="serif">Diese Seite ist aus der Mode.</h1>
        <p className="lead" style={{ margin: "1rem auto 2rem" }}>Die gesuchte Seite gibt es nicht (mehr).</p>
        <Link className="btn btn-primary" href="/">Zur Startseite</Link>
      </div>
    </section>
  );
}
