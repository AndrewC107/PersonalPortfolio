import type { Metadata } from "next";
import { Inter } from "next/font/google";

import portfolio from "@/content/content";
import { cn } from "@/lib/cn";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

// TODO: Set this to your real production domain (e.g., https://yourdomain.com).
const SITE_URL = new URL("https://example.com");

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: {
    default: `${portfolio.basics.name} — ${portfolio.basics.headline}`,
    template: `%s — ${portfolio.basics.name}`,
  },
  description: portfolio.hero.heroBullets[0] ?? portfolio.basics.headline,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: portfolio.basics.name,
    title: `${portfolio.basics.name} — ${portfolio.basics.headline}`,
    description: portfolio.hero.heroBullets[0] ?? portfolio.basics.headline,
    images: [
      {
        url: "/og-image.png", // TODO: add /public/og-image.png (1200x630)
        width: 1200,
        height: 630,
        alt: `${portfolio.basics.name} — ${portfolio.basics.headline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${portfolio.basics.name} — ${portfolio.basics.headline}`,
    description: portfolio.hero.heroBullets[0] ?? portfolio.basics.headline,
    images: ["/og-image.png"], // TODO: add /public/og-image.png (1200x630)
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(inter.variable)}>
      <body className="antialiased">
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[hsl(var(--surface))] focus:px-3 focus:py-2 focus:text-sm focus:shadow"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}


