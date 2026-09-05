import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { fontHeading, fontBody } from "@/lib/fonts";

const baseUrl = "https://www.alibabatraveladvisor.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
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
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fontHeading.variable} ${fontBody.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
