import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, Phone, Plane } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FaqSection } from "@/components/ui/FaqSection";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { VisaAssessmentForm } from "@/components/forms/VisaAssessmentForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, absoluteUrl, orgId, fitTitle } from "@/lib/seo";
import { siteLinks } from "@/lib/related";
import { cities, provinces, getCity, getProvince } from "@/data/cityPages";
import { getPackageDestination } from "@/data/packageDestinations";
import type { PageFaq } from "@/data/pageFaqs";
import { getOffices, getServicePages, getSiteSettings, whatsappHref } from "@/lib/content";

export function generateStaticParams() {
  return [...cities.map((c) => ({ slug: c.slug })), ...provinces.map((p) => ({ slug: p.slug }))];
}

function label(slug: string) {
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const city = getCity(slug);
  if (city) {
    return pageMetadata({
      title: fitTitle([`Travel Agency in ${city.name} | Visa & Tours`, `Travel Agency in ${city.name}`, `${city.name} Travel Agency`]),
      description: `Visa consultancy, tour packages and flight booking for clients in ${city.name}. Start online or by WhatsApp; nearest office: ${label(city.office)}. Free assessment from Ali Baba Travel Advisor.`,
      path: `/travel-agency/${city.slug}`,
    });
  }
  const province = getProvince(slug);
  if (province) {
    return pageMetadata({
      title: fitTitle([`Travel Agency in ${province.name} | Visa & Tours`, `Travel Agency in ${province.name}`, `${province.name} Visa Consultant`]),
      description: `Visa consultant and travel agency for ${province.name}: visa assistance, tour packages and flights for every city, online or at the nearest Ali Baba office.`,
      path: `/travel-agency/${province.slug}`,
    });
  }
  return {};
}

export default async function TravelAgencyAreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = getCity(slug);
  const province = city ? getProvince(city.province) : getProvince(slug);
  if (!city && !province) notFound();
  const [settings, offices, services] = await Promise.all([getSiteSettings(), getOffices(), getServicePages()]);
  const name = city ? city.name : province!.name;
  const officeSlugs = city ? [city.office] : province!.offices;
  const nearOffices = offices.filter((o) => officeSlugs.includes(o.slug));
  const provinceCities = city ? [] : cities.filter((c) => c.province === province!.slug);
  const siblingCities = city ? cities.filter((c) => c.province === city.province && c.slug !== city.slug).slice(0, 8) : [];
  const popular = (city?.popular ?? ["europe", "uk", "dubai", "turkey"]).map((s) => getPackageDestination(s)).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const path = `/travel-agency/${slug}`;

  const faqs: PageFaq[] = city
    ? [
        {
          question: `Do you have an office in ${city.name}?`,
          answer: `We do not have a branch in ${city.name}, but we serve ${city.name} clients by phone, WhatsApp and online document sharing. Our nearest office is in ${label(city.office)}, and you only need to visit when a step has to be done in person.`,
        },
        {
          question: `How can I apply for a visa from ${city.name}?`,
          answer: `Start with a free assessment using the form on this page or WhatsApp. We tell you the documents required, you share them digitally, and we prepare the application. Biometrics or an interview, where a country requires one, take place at that country's visa centre or embassy, usually in a major city such as Islamabad, Lahore or Karachi.`,
        },
        {
          question: `Which airport should I use to travel from ${city.name}?`,
          answer: city.airport,
        },
        {
          question: `Do you arrange tour packages from ${city.name}?`,
          answer: `Yes. We plan tour packages and group tours for clients from ${city.name}, with flights from the most convenient airport, hotels and visa assistance. Send your dates and group size for a quote.`,
        },
      ]
    : [
        {
          question: `Do you serve clients in ${province!.name}?`,
          answer: `Yes. We serve clients across ${province!.name} by phone, WhatsApp and online document sharing, with our ${nearOffices.map((o) => o.city).join(" and ")} office available for in-person help.`,
        },
        {
          question: `Which services can I get from ${province!.name}?`,
          answer: "Visa consultancy, visa refusal case review, tour packages and group tours, flight booking and hotel booking.",
        },
      ];

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Travel agency and visa consultancy in ${name}`,
    serviceType: "Visa consultancy and travel agency",
    url: absoluteUrl(path),
    areaServed: { "@type": city ? "City" : "AdministrativeArea", name },
    provider: { "@id": orgId },
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Travel Agency in Pakistan", href: "/travel-agency" },
          ...(city ? [{ label: province!.name, href: `/travel-agency/${province!.slug}` }] : []),
          { label: name },
        ]}
      />
      <PageHero
        eyebrow={city ? province!.name : "Province"}
        title={`Travel Agency and Visa Consultant in ${name}`}
        description={
          city
            ? `${city.name} is ${city.known}. Ali Baba Travel Advisor helps ${city.name} clients with visas, tour packages, flights and hotels, online and by phone, with our ${label(city.office)} office as your nearest branch.`
            : `${province!.about} Ali Baba Travel Advisor helps clients across ${province!.name} with visas, tour packages, flights and hotels.`
        }
      />

      <Container className="grid grid-cols-1 gap-12 py-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="font-heading text-xl font-bold text-charcoal">How We Serve {name}</h2>
          <ol className="mt-4 space-y-3 text-sm leading-relaxed text-text-muted">
            {[
              `Contact us by phone, WhatsApp or the form on this page and tell us where you want to travel.`,
              `We assess your profile for free and send a document checklist for your destination.`,
              `You share documents digitally. We review them, prepare the application and itinerary, and tell you if any step must be done in person.`,
              `We guide you until the decision, and help with flights, hotels and tour packages if you wish.`,
            ].map((s, i) => (
              <li key={s} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">{i + 1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>

          {nearOffices.length > 0 && (
            <>
              <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">{city ? "Your Nearest Office" : "Offices Serving This Region"}</h2>
              <ul className="mt-4 space-y-3">
                {nearOffices.map((o) => (
                  <li key={o.slug} className="rounded-[var(--radius-md)] border border-border bg-surface p-4 text-sm">
                    <Link href={`/locations/${o.slug}`} className="font-heading font-bold text-charcoal hover:text-primary">{o.city} office</Link>
                    <p className="mt-1 flex items-start gap-1.5 text-text-muted"><MapPin size={14} className="mt-0.5 shrink-0 text-primary" /> {o.address}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-text-muted"><Phone size={14} className="shrink-0 text-primary" /> {o.phone}</p>
                  </li>
                ))}
              </ul>
            </>
          )}

          {city && (
            <>
              <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Flying from {city.name}</h2>
              <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-text-muted">
                <Plane size={16} className="mt-0.5 shrink-0 text-primary" /> {city.airport}
              </p>
            </>
          )}

          <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Our Services for {name}</h2>
          <ul className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/visa-consultancy/${s.slug}`} className="font-semibold text-primary hover:text-primary-dark">{s.title} →</Link>
              </li>
            ))}
            <li><Link href="/tour-packages" className="font-semibold text-primary hover:text-primary-dark">Tour packages and group tours →</Link></li>
            <li><Link href="/flights" className="font-semibold text-primary hover:text-primary-dark">Flight booking →</Link></li>
            <li><Link href="/hotel-booking" className="font-semibold text-primary hover:text-primary-dark">Hotel booking →</Link></li>
            <li><Link href="/visa-refusal" className="font-semibold text-primary hover:text-primary-dark">Visa refusal assistance →</Link></li>
          </ul>

          <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Popular Trips from {name}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {popular.map((d) => (
              <li key={d.slug} className="flex items-center gap-2">
                <ArrowRight size={14} className="shrink-0 text-primary" />
                <Link href={`/tour-packages/from-pakistan/${d.slug}`} className="font-semibold text-primary hover:text-primary-dark">
                  {d.name} tour packages from {name}
                </Link>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <ArrowRight size={14} className="shrink-0 text-primary" />
              <Link href="/tour-packages/from-pakistan" className="font-semibold text-primary hover:text-primary-dark">All tour packages from Pakistan</Link>
            </li>
          </ul>

          {provinceCities.length > 0 && (
            <>
              <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Cities We Serve in {name}</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {provinceCities.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/travel-agency/${c.slug}`} className="inline-block rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-semibold text-charcoal hover:border-primary hover:text-primary">
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="h-fit rounded-[var(--radius-lg)] border border-border bg-surface p-6 lg:sticky lg:top-24">
          <p className="font-heading text-lg font-bold text-charcoal">Free assessment for {name}</p>
          <p className="mt-1 text-sm text-text-muted">Tell us your plan and we reply with the next steps.</p>
          <div className="mt-4">
            <Button href={whatsappHref(`Hi, I am in ${name} and would like help with a visa or tour package.`, settings.whatsappNumber)} external variant="whatsapp">
              WhatsApp Enquiry
            </Button>
          </div>
          <div className="mt-6 border-t border-border pt-5">
            <VisaAssessmentForm whatsappNumber={settings.whatsappNumber} />
          </div>
        </div>
      </Container>

      <FaqSection title={`Travel Agency in ${name}: FAQs`} faqs={faqs} />

      {siblingCities.length > 0 && (
        <RelatedLinks
          title={`Other Cities in ${province!.name}`}
          links={[
            { href: `/travel-agency/${province!.slug}`, label: `Travel agency in ${province!.name}`, description: province!.about },
            ...siblingCities.map((c) => ({ href: `/travel-agency/${c.slug}`, label: `Travel agency in ${c.name}` })),
          ]}
        />
      )}
      <RelatedLinks title="Explore Our Services" links={siteLinks(["consultancy", "tours", "flights", "hotels", "visas", "locations"])} />
    </>
  );
}
