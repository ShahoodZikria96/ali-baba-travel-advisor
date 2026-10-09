import type { ReactNode } from "react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { getCountries, getOffices, getServicePages, getSiteSettings, getTours } from "@/lib/content";
import { buildPrimaryNav } from "@/data/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, absoluteUrl, orgId, websiteId } from "@/lib/seo";
import { siteConfig } from "@/data/site";

export default async function MarketingLayout({ children }: { children: ReactNode }) {
  const [settings, offices, countries, services, tours] = await Promise.all([
    getSiteSettings(),
    getOffices(),
    getCountries(),
    getServicePages(),
    getTours(),
  ]);
  const nav = buildPrimaryNav(countries, services, tours);
  const openOffices = offices.filter((o) => !o.openingDate || new Date(o.openingDate) <= new Date());
  const lahore = openOffices.find((o) => o.slug === "lahore");
  const phones = [settings.phone, settings.phoneSecondary].filter(Boolean) as string[];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": orgId,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        alternateName: ["AliBaba Travel Advisor", "Alibaba Travel Advisor"],
        foundingDate: "2024",
        founder: { "@type": "Person", "@id": `${SITE_URL}/#founder`, name: "Syed Ali Jawad", jobTitle: "Founder and CEO", worksFor: { "@id": orgId } },
        url: SITE_URL,
        logo: absoluteUrl("/brand/logo.webp"),
        image: absoluteUrl("/brand/logo.webp"),
        description:
          "Visa consultancy, international tour packages, airline tickets and hotel booking for travellers across Pakistan, headquartered in Lahore.",
        telephone: settings.phone,
        email: settings.email,
        contactPoint: phones.map((p) => ({
          "@type": "ContactPoint",
          telephone: p,
          contactType: "customer service",
          areaServed: "PK",
          availableLanguage: ["English", "Urdu"],
        })),
        sameAs: [settings.facebookUrl, siteConfig.socials.facebookPage, siteConfig.socials.whatsappChannel, settings.instagramUrl, settings.youtubeUrl, siteConfig.googleBusinessProfileUrl],
        areaServed: { "@type": "Country", name: "Pakistan" },
        knowsAbout: ["Visit visas", "Business visas", "Visa refusal case review", "Tour packages", "Airline tickets", "Hotel booking"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Travel and visa services",
          itemListElement: [
            "Visa consultancy",
            "Visa refusal case review",
            "International group tours",
            "Airline ticketing",
            "Hotel booking",
          ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
        },
        ...(lahore ? { geo: { "@type": "GeoCoordinates", latitude: siteConfig.geo.latitude, longitude: siteConfig.geo.longitude } } : {}),
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: siteConfig.openingHours.days,
          opens: siteConfig.openingHours.opens,
          closes: siteConfig.openingHours.closes,
        },
        address: openOffices.map((o) => ({
          "@type": "PostalAddress",
          streetAddress: o.address,
          addressLocality: o.city,
          addressCountry: "PK",
        })),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE_URL,
        name: siteConfig.name,
        inLanguage: "en-PK",
        publisher: { "@id": orgId },
      },
    ],
  };

  return (
    <>
      <noscript>
        <style>{".reveal,.reveal-item{opacity:1!important;transform:none!important}"}</style>
      </noscript>
      <JsonLd data={structuredData} />
      {settings.announcementActive && (
        <AnnouncementBar text={settings.announcementText} href={settings.announcementHref} />
      )}
      <Header phone={settings.phone} whatsappNumber={settings.whatsappNumber} nav={nav} />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-white">Skip to content</a>
      <main id="main" className="flex-1 pb-16 lg:pb-0">{children}</main>
      <Footer />
      <StickyMobileCTA phone={settings.phone} whatsappNumber={settings.whatsappNumber} />
      <FloatingWhatsApp whatsappNumber={settings.whatsappNumber} />
    </>
  );
}
