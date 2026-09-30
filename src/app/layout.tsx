import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SITE_URL } from "@/lib/seo";
import { Analytics } from "@/components/analytics/Analytics";


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ali Baba Travel Advisor | Pakistan's Trusted Visa & Travel Consultancy",
    template: "%s | Ali Baba Travel Advisor",
  },
  description:
    "Professional visa assistance, international tours, flight booking and travel consultancy for individuals, families and businesses across Pakistan.",
  openGraph: {
    type: "website",
    siteName: "Ali Baba Travel Advisor",
    locale: "en_PK",
  },
  twitter: {
    card: "summary_large_image",
  },
  // Google Search Console HTML-tag verification (set GOOGLE_SITE_VERIFICATION in the environment).
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
  formatDetection: { telephone: false },
};

export const viewport = { width: "device-width", initialScale: 1, themeColor: "#9e1b26" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
