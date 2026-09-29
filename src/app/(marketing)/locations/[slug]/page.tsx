import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, MapPin, Phone, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { pageMetadata, absoluteUrl, orgId } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { locationExtras } from "@/data/locationExtras";
import { siteConfig } from "@/data/site";
import { coreServices } from "@/data/services";
import { getOffices, getOffice, getSiteSettings, whatsappHref } from "@/lib/content";

export async function generateStaticParams() {
  const offices = await getOffices();
  return offices.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const office = await getOffice(slug);
  if (!office) return {};
  return pageMetadata({
    title: `Visa Consultant & Travel Agency in ${office.city}`,
    description: `Ali Baba Travel Advisor's ${office.city} office — visa consultancy, tour packages and flight booking. ${office.address}.`,
    path: `/locations/${slug}`,
  });
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [office, settings, allOffices] = await Promise.all([getOffice(slug), getSiteSettings(), getOffices()]);
  if (!office) notFound();
  const isUpcoming = office.openingDate && new Date(office.openingDate) > new Date();
  const servicesOffered = office.servicesOffered as string[];
  const otherOffices = allOffices.filter((o) => o.slug !== office.slug);
  const extra = locationExtras[office.slug];
  const branchJsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": absoluteUrl(`/locations/${office.slug}#branch`),
    name: `${siteConfig.name} — ${office.city}`,
    url: absoluteUrl(`/locations/${office.slug}`),
    parentOrganization: { "@id": orgId },
    telephone: office.phone,
    email: settings.email,
    hasMap: office.mapUrl,
    image: absoluteUrl("/brand/logo.webp"),
    address: { "@type": "PostalAddress", streetAddress: office.address, addressLocality: office.city, addressCountry: "PK" },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: siteConfig.openingHours.days,
      opens: siteConfig.openingHours.opens,
      closes: siteConfig.openingHours.closes,
    },
    areaServed: extra?.areasServed.map((name) => ({ "@type": "Place", name })),
    ...(office.slug === "lahore" ? { geo: { "@type": "GeoCoordinates", latitude: siteConfig.geo.latitude, longitude: siteConfig.geo.longitude } } : {}),
  };

  return (
    <>
      <JsonLd data={branchJsonLd} />
      <FaqJsonLd faqs={extra?.faqs} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Locations", href: "/locations" }, { label: office.city }]} />
      <PageHero
        eyebrow={isUpcoming ? "Opening Soon" : "Visit Us"}
        title={`Visa Consultant & Travel Agency in ${office.city}`}
        description={office.intro}
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            href={whatsappHref(`Hi, I would like to visit the ${office.city} office.`, settings.whatsappNumber)}
            external
            variant="whatsapp"
          >
            WhatsApp This Office
          </Button>
          <Button href="/consultation" variant="outline">Book Consultation</Button>
        </div>
      </PageHero>

      <Container className="grid grid-cols-1 gap-12 py-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          {isUpcoming && office.openingDate && (
            <div className="mb-8 flex items-center gap-2 rounded-[var(--radius-md)] border border-primary/30 bg-primary-tint px-4 py-3 text-sm font-semibold text-primary">
              <Sparkles size={16} /> Opening {new Date(office.openingDate).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </div>
          )}

          <h2 className="font-heading text-xl font-bold text-charcoal">About This Office</h2>
          <p className="mt-4 text-sm leading-relaxed text-text-muted">{office.localContext}</p>

          <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Services Offered Here</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-text-muted">
            {servicesOffered.map((s) => (
              <li key={s} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> {s}
              </li>
            ))}
          </ul>

          {extra && (
            <>
              <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Areas We Commonly Serve</h2>
              <p className="mt-4 text-sm leading-relaxed text-text-muted">
                Clients regularly visit this office from {extra.areasServed.join(", ")}.
              </p>
              <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">{office.city} Office FAQs</h2>
              <div className="mt-4">
                <FAQAccordion items={extra.faqs} />
              </div>
            </>
          )}

          <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Popular Visa Destinations</h2>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {[["UK", "uk"], ["Canada", "canada"], ["USA", "usa"], ["Schengen", "schengen"], ["Australia", "australia"], ["Turkey", "turkey"]].map(([label, cs]) => (
              <Link key={cs} href={`/visas/${cs}`} className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-charcoal hover:border-primary hover:text-primary">
                {label} visa
              </Link>
            ))}
          </div>

          <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Explore Our Services</h2>
          <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {coreServices.map((service) => (
              <Link
                key={service.slug}
                href={`/${service.slug}`}
                className="group flex items-center justify-between rounded-[var(--radius-sm)] border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-charcoal transition-colors hover:border-primary hover:text-primary"
              >
                {service.title}
                <ArrowRight size={14} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>

          {otherOffices.length > 0 && (
            <>
              <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Our Other Offices</h2>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {otherOffices.map((o) => (
                  <Link
                    key={o.slug}
                    href={`/locations/${o.slug}`}
                    className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-charcoal hover:border-primary hover:text-primary"
                  >
                    {o.city}
                  </Link>
                ))}
                <Link
                  href="/locations"
                  className="rounded-full border border-primary/30 bg-primary-tint px-4 py-2 text-sm font-bold text-primary hover:border-primary"
                >
                  View All Locations →
                </Link>
              </div>
            </>
          )}
        </div>

        <div className="h-fit rounded-[var(--radius-lg)] border border-border bg-surface p-6">
          <p className="font-heading text-lg font-bold text-charcoal">{office.city} Office</p>
          <div className="mt-4 space-y-3 text-sm text-text-muted">
            <p className="flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 shrink-0" /> {office.address}
            </p>
            <p className="flex items-center gap-2">
              <Clock size={15} className="shrink-0" /> {office.hours}
            </p>
            <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-primary">
              <Phone size={15} className="shrink-0" /> {office.phone}
            </a>
          </div>
          <a
            href={office.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block text-sm font-bold text-primary hover:text-primary-dark"
          >
            Get Directions →
          </a>
        </div>
      </Container>
    </>
  );
}
