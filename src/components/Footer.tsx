import Link from "next/link";
import { SITE } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot">
          <div>
            <Logo className="foot-logo" />
            <p style={{ maxWidth: "20rem", marginTop: "1rem" }}>Moderne Mode mit Haltung. Zeitlos, fair, limitiert gefertigt.</p>
          </div>
          <div>
            <h4>Shop</h4>
            <ul>
              <li><Link href="/shop/">Alle Produkte</Link></li>
              <li><Link href="/lookbook/">Lookbook</Link></li>
              <li><Link href="/about/">Über uns</Link></li>
            </ul>
          </div>
          <div>
            <h4>Service</h4>
            <ul>
              <li><Link href="/contact/">Kontakt</Link></li>
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            </ul>
          </div>
          <div>
            <h4>Rechtliches</h4>
            <ul>
              <li><Link href="/impressum/">Impressum</Link></li>
              <li><Link href="/datenschutz/">Datenschutz</Link></li>
            </ul>
          </div>
        </div>
        <div className="copy">
          <span>© {new Date().getFullYear()} AboutM.ee – Alle Rechte vorbehalten.</span>
          <span>Designed in Europe.</span>
        </div>
      </div>
    </footer>
  );
}
