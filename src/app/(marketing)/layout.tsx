import type { ReactNode } from "react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { siteConfig } from "@/data/site";
import { offices } from "@/data/offices";

const baseUrl = "https://www.alibabatraveladvisor.com";

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

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
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
    </>
  );
}
