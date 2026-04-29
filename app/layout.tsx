import type { Metadata } from "next";
import Script from "next/script";
import {
  Source_Serif_4,
  Inter,
  IBM_Plex_Mono,
  Cormorant_Garamond,
} from "next/font/google";
import localFont from "next/font/local";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "mapbox-gl/dist/mapbox-gl.css";
import "./globals.css";

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const tifinagh = localFont({
  src: "../public/fonts/NotoSansTifinagh-Regular.ttf",
  variable: "--font-tifinagh",
  display: "swap",
});

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tamazgha.africa";
// TODO: replace with the real GA4 Measurement ID once the property is created.
const GA_ID = "G-PLACEHOLDER-TAMAZGHA";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Tamazgha — A synthesis archive of the Amazigh world",
    template: "%s — Tamazgha",
  },
  description:
    "Language, land, lineage, symbol, story, and struggle across the Amazigh world: from the Canary Islands to Siwa, from the Atlas to the Sahel.",
  applicationName: "Tamazgha",
  keywords: [
    "Amazigh",
    "Berber",
    "Tamazight",
    "Tifinagh",
    "Kabyle",
    "Tuareg",
    "Chleuh",
    "Tachelhit",
    "Tarifit",
    "Chaoui",
    "Mozabite",
    "Siwi",
    "Guanche",
    "North Africa",
    "Maghreb",
    "Sahara",
    "Sahel",
    "Canary Islands",
    "Siwa",
  ],
  authors: [{ name: "Tamazgha Archive" }],
  creator: "Tamazgha Archive",
  publisher: "Tamazgha Archive",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE,
    siteName: "Tamazgha",
    title: "Tamazgha — A synthesis archive of the Amazigh world",
    description:
      "Language, land, lineage, symbol, story, and struggle across the Amazigh world.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tamazgha",
    description:
      "Language, land, lineage, symbol, story, and struggle across the Amazigh world.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  category: "history",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${display.variable} ${sans.variable} ${mono.variable} ${tifinagh.variable}`}
    >
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { anonymize_ip: true });
          `}
        </Script>
      </body>
    </html>
  );
}
