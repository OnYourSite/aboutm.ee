#!/usr/bin/env bash
# AboutM.ee Installer – Docker + automatisches HTTPS (Let's Encrypt via Caddy)
# Nutzung:  sudo ./install.sh [domain] [email]
# Unterstützt Debian/Ubuntu und andere Distros mit dem offiziellen Docker-Skript.
set -euo pipefail

REPO_URL="${REPO_URL:-https://github.com/onyoursite/aboutm.ee.git}"
BRANCH="${BRANCH:-main}"
INSTALL_DIR="${INSTALL_DIR:-/opt/aboutm.ee}"

c() { printf '\033[1;36m==> %s\033[0m\n' "$*"; }
err() { printf '\033[1;31mFehler: %s\033[0m\n' "$*" >&2; exit 1; }

[ "$(id -u)" -eq 0 ] || err "Bitte als root ausführen: sudo $0"
command -v curl >/dev/null || { c "Installiere curl"; (apt-get update -qq && apt-get install -y -qq curl ca-certificates) || err "curl fehlt"; }

# --- Eingaben ---------------------------------------------------------------
DOMAIN="${1:-${DOMAIN:-}}"; ACME_EMAIL="${2:-${ACME_EMAIL:-}}"
[ -n "$DOMAIN" ] || read -rp "Domain (z. B. aboutm.ee): " DOMAIN
[ -n "$ACME_EMAIL" ] || read -rp "E-Mail für Let's Encrypt: " ACME_EMAIL
DOMAIN="$(echo "$DOMAIN" | tr 'A-Z' 'a-z' | sed -E 's#^https?://##; s#^www\.##; s#/.*$##')"
[[ "$DOMAIN" =~ ^([a-z0-9-]+\.)+[a-z]{2,}$ ]] || err "Ungültige Domain: $DOMAIN"
[[ "$ACME_EMAIL" =~ ^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$ ]] || err "Ungültige E-Mail"

# --- Docker -----------------------------------------------------------------
if ! command -v docker >/dev/null; then
  c "Installiere Docker"
  curl -fsSL https://get.docker.com | sh
fi
systemctl enable --now docker >/dev/null 2>&1 || true
docker compose version >/dev/null 2>&1 || err "Docker Compose Plugin fehlt (apt install docker-compose-plugin)"

# --- Firewall (nur falls ufw aktiv) -------------------------------------------
if command -v ufw >/dev/null && ufw status | grep -q "Status: active"; then
  c "Öffne Ports 80/443 in ufw"; ufw allow 80/tcp >/dev/null; ufw allow 443/tcp >/dev/null; ufw allow 443/udp >/dev/null
fi

# --- Ports prüfen -------------------------------------------------------------
if [ -z "$(docker ps -q -f name=^aboutm-ee$)" ]; then
  for p in 80 443; do
    ss -ltn "sport = :$p" 2>/dev/null | grep -q LISTEN && err "Port $p ist bereits belegt (anderer Webserver aktiv?)"
  done
fi

# --- DNS prüfen ---------------------------------------------------------------
c "Prüfe DNS-A-Record für $DOMAIN"
SERVER_IP="$(curl -4fsS --max-time 10 https://api.ipify.org || curl -4fsS --max-time 10 https://ifconfig.me || true)"
[ -n "$SERVER_IP" ] || err "Server-IP konnte nicht ermittelt werden"
DNS_IP="$(getent ahostsv4 "$DOMAIN" | awk '{print $1; exit}' || true)"
echo "    Server-IP: $SERVER_IP   |   A-Record: ${DNS_IP:-<keiner>}"
if [ "$DNS_IP" != "$SERVER_IP" ]; then
  echo "Der A-Record von $DOMAIN zeigt nicht auf $SERVER_IP."
  echo "Ohne passenden Eintrag kann Let's Encrypt kein Zertifikat ausstellen."
  echo "Lege an: A  $DOMAIN  ->  $SERVER_IP   (optional auch: www  ->  $SERVER_IP)"
  read -rp "Trotzdem fortfahren? [j/N] " a; [[ "$a" =~ ^[jJyY]$ ]] || exit 1
fi
WWW_IP="$(getent ahostsv4 "www.$DOMAIN" | awk '{print $1; exit}' || true)"
[ "$WWW_IP" = "$SERVER_IP" ] || echo "Hinweis: www.$DOMAIN zeigt nicht auf den Server – www-Weiterleitung bekommt dann kein Zertifikat (Hauptdomain ist nicht betroffen)."

# --- Dateien bereitstellen --------------------------------------------------
SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ -f "$SRC/Dockerfile" ] && [ -f "$SRC/Caddyfile" ]; then
  if [ "$SRC" != "$INSTALL_DIR" ]; then
    c "Kopiere Projekt nach $INSTALL_DIR"; mkdir -p "$INSTALL_DIR"
    cp -a "$SRC"/. "$INSTALL_DIR"/; rm -rf "$INSTALL_DIR/.git"
  fi
else
  command -v git >/dev/null || { apt-get update -qq && apt-get install -y -qq git; }
  c "Lade Projekt von $REPO_URL"
  if [ -d "$INSTALL_DIR/.git" ]; then git -C "$INSTALL_DIR" pull --ff-only
  else rm -rf "$INSTALL_DIR"; git clone --depth 1 -b "$BRANCH" "$REPO_URL" "$INSTALL_DIR"; fi
fi
cd "$INSTALL_DIR"
printf 'DOMAIN=%s\nACME_EMAIL=%s\n' "$DOMAIN" "$ACME_EMAIL" > .env; chmod 600 .env

# --- Starten ----------------------------------------------------------------
c "Baue und starte Container"
docker compose up -d --build

c "Warte auf HTTPS-Zertifikat (bis zu 90 s)"
ok=0
for i in $(seq 1 30); do
  if curl -fsS -o /dev/null --max-time 5 "https://$DOMAIN"; then ok=1; break; fi; sleep 3
done
if [ "$ok" = 1 ]; then
  c "Fertig! https://$DOMAIN ist online."
else
  echo "Noch kein gültiges Zertifikat. Logs ansehen mit:  docker compose -f $INSTALL_DIR/docker-compose.yml logs -f web"
  echo "Meist liegt es am DNS (A-Record) oder an gesperrten Ports 80/443 in der Server-Firewall/beim Hoster."
  exit 1
fi
cat <<EOT

Verwaltung (in $INSTALL_DIR):
  Logs:        docker compose logs -f web
  Update:      git pull && docker compose up -d --build   (bzw. install.sh erneut ausführen)
  Stoppen:     docker compose down
Zertifikate liegen im Volume 'caddy_data' und werden automatisch erneuert.
EOT
