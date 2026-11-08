# AboutM.ee

Statische Website der Modemarke AboutM.ee, gestaltet im Look von vylaris.eu (Poppins, blau→indigo Verlauf, Karten mit feinen Rahmen, Light/Dark-Theme).

- `index.html`, `styles.css`, `script.js` – die Seite, ohne Build-Schritt
- `assets/img/` – Logo (`logo-on-light.svg`, `logo-on-dark.svg`), Monogramm (`mark.svg`), Favicon
- `assets/fonts/` – Poppins, lokal eingebunden (keine Google-Fonts-Anfragen)

Lokal ansehen: `python3 -m http.server` und http://localhost:8000 öffnen.

## Installation auf einem Server (Docker + HTTPS)

Voraussetzung: Linux-Server (Debian/Ubuntu empfohlen), Root-Zugriff, Ports 80/443 frei und ein **A-Record** der Domain auf die Server-IP.

```bash
git clone https://github.com/onyoursite/aboutm.ee.git && cd aboutm.ee
sudo ./install.sh aboutm.ee du@example.com
```

Der Installer installiert Docker (falls nötig), prüft den DNS-A-Record, öffnet Ports in ufw, baut den Container (Caddy) und holt automatisch ein Let's-Encrypt-Zertifikat samt Auto-Erneuerung. `www.` wird auf die Hauptdomain weitergeleitet.
