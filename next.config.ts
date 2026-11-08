import type { NextConfig } from "next";

// Statischer Export: `next build` erzeugt den Ordner `out/`, der von Caddy ausgeliefert wird.
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default config;
