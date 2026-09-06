import type { ReactNode } from "react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { getOffices, getSiteSettings } from "@/lib/content";

const baseUrl = "https://www.alibabatraveladvisor.com";

export default async function MarketingLayout({ children }: { children: ReactNode }) {
  const [settings, offices] = await Promise.all([getSiteSettings(), getOffices()]);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Ali Baba Travel Advisor",
    url: baseUrl,
    logo: `${baseUrl}/brand/logo.webp`,
    telephone: settings.phone,
    email: settings.email,
    sameAs: [settings.facebookUrl, settings.instagramUrl, settings.youtubeUrl],
    address: offices.map((o) => ({
      "@type": "PostalAddress",
      streetAddress: o.address,
      addressLocality: o.city,
      addressCountry: "PK",
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      {settings.announcementActive && (
        <AnnouncementBar text={settings.announcementText} href={settings.announcementHref} />
      )}
      <Header phone={settings.phone} whatsappNumber={settings.whatsappNumber} />
      <main className="flex-1 pb-16 lg:pb-0">{children}</main>
      <Footer />
      <StickyMobileCTA phone={settings.phone} whatsappNumber={settings.whatsappNumber} />
      <FloatingWhatsApp whatsappNumber={settings.whatsappNumber} />
    </>
  );
}
