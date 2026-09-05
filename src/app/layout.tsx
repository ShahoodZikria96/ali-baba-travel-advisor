import type { Metadata } from "next";
import "./globals.css";
import { fontHeading, fontBody } from "@/lib/fonts";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { siteConfig } from "@/data/site";
import { offices } from "@/data/offices";

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

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Ali Baba Travel Advisor",
  url: baseUrl,
  logo: `${baseUrl}/brand/logo.webp`,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  sameAs: [siteConfig.socials.facebook, siteConfig.socials.instagram, siteConfig.socials.youtube],
  address: offices.map((o) => ({
    "@type": "PostalAddress",
    streetAddress: o.address,
    addressLocality: o.city,
    addressCountry: "PK",
  })),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fontHeading.variable} ${fontBody.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <AnnouncementBar />
        <Header />
        <main className="flex-1 pb-16 lg:pb-0">{children}</main>
        <Footer />
        <StickyMobileCTA />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
