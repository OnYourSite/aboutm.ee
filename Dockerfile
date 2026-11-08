# --- Build: Next.js (TypeScript) -> statischer Export in /app/out
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

# --- Runtime: Caddy liefert die Seite aus und holt das HTTPS-Zertifikat
FROM caddy:2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/out /srv
