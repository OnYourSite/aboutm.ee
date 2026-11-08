# AboutM.ee

Moderne Modemarke – Website mit **Next.js 15, React 19 und TypeScript** (statischer Export), Logo und Illustrationen komplett selbst gezeichnet (SVG).

## Struktur
- `src/app/` – Seiten: Start, Shop, Produktseiten, Lookbook, Über uns, Kontakt, Impressum, Datenschutz, 404
- `src/components/` – Header, Footer, Logo, `Garment` (gezeichnete Kleidungsstücke), `Scene` (Studiobilder) u. a.
- `src/data/` – Produkte, Farben und Looks (hier Preise/Texte ändern)
- `public/brand/` – Logo-Dateien (`logo-on-light.svg`, `logo-on-dark.svg`, `monogram-*.svg`)
- `src/fonts/` – Poppins und Playfair Display, lokal eingebunden

## Entwickeln
```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build      # erzeugt den statischen Ordner out/
```

## Auf einem Server installieren (Docker + HTTPS)
Voraussetzung: Linux-Server (Debian/Ubuntu empfohlen), Root-Zugriff, Ports 80/443 frei und ein **A-Record** der Domain auf die Server-IP.

```bash
git clone https://github.com/onyoursite/aboutm.ee.git && cd aboutm.ee
sudo ./install.sh aboutm.ee du@example.com
```

Der Installer installiert Docker (falls nötig), prüft den DNS-A-Record, öffnet Ports in ufw, baut die Seite im Container und holt automatisch ein Let's-Encrypt-Zertifikat (Caddy) samt Auto-Erneuerung. `www.` wird auf die Hauptdomain weitergeleitet.
