import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SITE } from "@/lib/site";
import "./globals.css";

const sans = localFont({
  variable: "--font-sans",
  display: "swap",
  src: [
    { path: "../fonts/poppins-400.woff2", weight: "400" },
    { path: "../fonts/poppins-500.woff2", weight: "500" },
    { path: "../fonts/poppins-600.woff2", weight: "600" },
    { path: "../fonts/poppins-700.woff2", weight: "700" },
  ],
});

const serif = localFont({
  variable: "--font-serif",
  display: "swap",
  src: [
    { path: "../fonts/playfair-normal-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/playfair-normal-700.woff2", weight: "700", style: "normal" },
    { path: "../fonts/playfair-italic-500.woff2", weight: "500", style: "italic" },
    { path: "../fonts/playfair-italic-700.woff2", weight: "700", style: "italic" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} – ${SITE.claim}`, template: `%s – ${SITE.name}` },
  description: "AboutM.ee ist eine moderne Modemarke: zeitlose Essentials, faire Produktion, limitierte Drops.",
  openGraph: { title: SITE.name, description: SITE.claim, type: "website", locale: "de_DE", siteName: SITE.name },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0d11" },
  ],
};

const themeScript = `try{var t=localStorage.getItem("aboutm-theme");document.documentElement.setAttribute("data-theme",t||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"))}catch(e){}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" data-theme="light" className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip" href="#main">Zum Inhalt springen</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
