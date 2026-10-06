import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, CheckCircle2, MapPin, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FaqSection } from "@/components/ui/FaqSection";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { TourEnquiryForm } from "@/components/forms/TourEnquiryForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, absoluteUrl, orgId, fitTitle } from "@/lib/seo";
import { bannerSrc } from "@/lib/images";
import { siteLinks } from "@/lib/related";
import { getPackageDestination, packageDestinations } from "@/data/packageDestinations";
import type { PageFaq } from "@/data/pageFaqs";
import { getSiteSettings, getTours, whatsappHref } from "@/lib/content";

export function generateStaticParams() {
  return packageDestinations.map((d) => ({ dest: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ dest: string }> }): Promise<Metadata> {
  const { dest } = await params;
  const d = getPackageDestination(dest);
  if (!d) return {};
  return pageMetadata({
    title: fitTitle([`${d.name} Tour Packages from Pakistan`, `${d.name} Tour Packages`, `${d.name} Packages`]),
    description: `${d.name} tour packages from Pakistan with flights, hotels and visa assistance. Visit ${d.places.slice(0, 3).join(", ")} and more. Free quote from Ali Baba Travel Advisor.`,
    path: `/tour-packages/from-pakistan/${d.slug}`,
    image: d.image,
  });
}

export default async function PackageDestinationPage({ params }: { params: Promise<{ dest: string }> }) {
  const { dest } = await params;
  const d = getPackageDestination(dest);
  if (!d) notFound();
  const [settings, allTours] = await Promise.all([getSiteSettings(), getTours()]);
  const tour = d.tourSlug ? allTours.find((t) => t.slug === d.tourSlug) : undefined;
  const related = d.related.map((s) => getPackageDestination(s)).filter((x): x is NonNullable<typeof x> => Boolean(x));

  const faqs: PageFaq[] = [
    ...d.faqs,
    {
      question: `How much does a ${d.name} tour package from Pakistan cost?`,
      answer: `The price depends on your travel dates, hotel level, flights, number of travellers and the activities you choose. Send us your dates and group size and we will quote a package price with no hidden extras. We do not publish a fixed price because it changes with the season.`,
    },
    {
      question: `Can you arrange ${d.name} packages from Lahore, Islamabad and Karachi?`,
      answer: `Yes. We plan departures from Lahore, Islamabad and Karachi, and from other Pakistani cities through the nearest international airport. Our offices in Lahore, Islamabad, Wazirabad and Karachi can meet you in person.`,
    },
    {
      question: `Is the visa included in a ${d.name} package?`,
      answer: `Visa assistance is part of our service: we prepare your document checklist, itinerary and application. The visa fee and the decision belong to the embassy or immigration authority, and approval is never guaranteed.`,
    },
  ];

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${d.name} Tour Packages from Pakistan`,
    serviceType: "Tour package",
    description: d.intro,
    url: absoluteUrl(`/tour-packages/from-pakistan/${d.slug}`),
    image: absoluteUrl(d.image),
    areaServed: { "@type": "Country", name: "Pakistan" },
    provider: { "@id": orgId },
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Tour Packages", href: "/tour-packages" },
          { label: "From Pakistan", href: "/tour-packages/from-pakistan" },
          { label: d.name },
        ]}
      />

      <section className="relative flex h-56 items-center justify-center overflow-hidden text-white sm:h-64">
        <Image src={bannerSrc(d.image)} alt={`${d.name} tour packages from Pakistan`} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-charcoal/55" />
        <div className="relative px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/70">Tour Packages</p>
          <h1 className="mt-2 font-heading text-3xl font-extrabold text-white sm:text-4xl">{d.name} Tour Packages from Pakistan</h1>
        </div>
      </section>

      <Container className="grid grid-cols-1 gap-12 py-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-[1.02rem] leading-relaxed text-text-muted">{d.intro}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4 rounded-[var(--radius-md)] border border-border bg-surface-muted/50 p-5 text-sm">
            <span className="flex items-center gap-1.5 font-semibold text-charcoal">
              <CalendarDays size={16} /> Departures from Lahore, Islamabad and Karachi
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-success">
              <ShieldCheck size={16} /> Visa assistance included
            </span>
          </div>

          {tour && (
            <div className="mt-6 rounded-[var(--radius-md)] border border-primary/30 bg-primary/5 p-5">
              <p className="font-heading text-base font-bold text-charcoal">Group tour available</p>
              <p className="mt-1 text-sm leading-relaxed text-text-muted">
                We run a fixed-departure group tour that covers {d.name}: {tour.destination}.
              </p>
              <Link href={`/tour-packages/${tour.slug}`} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark">
                View the {tour.destination} group tour <ArrowRight size={14} />
              </Link>
            </div>
          )}

          <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Places to See in {d.name}</h2>
          <ul className="mt-4 grid grid-cols-1 gap-2 text-sm text-text-muted sm:grid-cols-2">
            {d.places.map((p) => (
              <li key={p} className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 shrink-0 text-primary" /> {p}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Popular {d.name} Trip Ideas</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-text-muted">
            {d.ideas.map((i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success" /> {i}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Best Time to Visit</h2>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">{d.bestTime}</p>

          <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">What Our {d.name} Packages Include</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-text-muted">
            {[
              "Return flights from Lahore, Islamabad or Karachi, matched to your dates",
              "Hotels chosen for location and your budget",
              "Airport and city transfers",
              "Sightseeing and activities from the ideas above",
              "Visa documentation and application assistance",
              "Phone and WhatsApp support before and during your trip",
            ].map((i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success" /> {i}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">
            You pick the level: budget, standard or premium. We quote exactly what is included, so you can compare it with any other offer.
          </p>

          <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Visa for {d.name}</h2>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">{d.visaNote}</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {d.visaSlug && (
              <li>
                <Link href={`/visas/${d.visaSlug}`} className="font-semibold text-primary hover:text-primary-dark">
                  {d.name} visa requirements and document checklist →
                </Link>
              </li>
            )}
            <li>
              <Link href="/visa-consultancy" className="font-semibold text-primary hover:text-primary-dark">
                Visa consultancy services →
              </Link>
            </li>
            <li>
              <Link href="/visa-process" className="font-semibold text-primary hover:text-primary-dark">
                How our visa process works →
              </Link>
            </li>
          </ul>

          <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">How to Book</h2>
          <ol className="mt-4 space-y-3 text-sm leading-relaxed text-text-muted">
            {[
              "Send your dates, number of travellers and budget through the form or WhatsApp.",
              "We reply with a quote and itinerary options.",
              "You choose the package; we start the visa file and hold hotels and flights as your timeline allows.",
              "We support you until you return.",
            ].map((s, i) => (
              <li key={s} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">{i + 1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="h-fit rounded-[var(--radius-lg)] border border-border bg-surface p-6 lg:sticky lg:top-24">
          <p className="font-heading text-lg font-bold text-charcoal">Get a free {d.name} quote</p>
          <p className="mt-1 text-sm text-text-muted">Tell us your plan and we reply with a package price.</p>
          <div className="mt-4">
            <Button href={whatsappHref(`Hi, I would like a quote for a ${d.name} tour package from Pakistan.`, settings.whatsappNumber)} external variant="whatsapp">
              WhatsApp Enquiry
            </Button>
          </div>
          <div className="mt-6 border-t border-border pt-5">
            <h2 className="font-heading text-base font-bold text-charcoal">Package Enquiry</h2>
            <div className="mt-4">
              <TourEnquiryForm defaultDestination={d.name} whatsappNumber={settings.whatsappNumber} />
            </div>
          </div>
        </div>
      </Container>

      <FaqSection title={`${d.name} Tour Package FAQs`} faqs={faqs} />

      {related.length > 0 && (
        <RelatedLinks
          title="More Tour Packages from Pakistan"
          links={related.map((r) => ({
            href: `/tour-packages/from-pakistan/${r.slug}`,
            label: `${r.name} tour packages from Pakistan`,
            description: r.intro.split(". ")[0] + ".",
          }))}
        />
      )}
      <RelatedLinks title="Plan Your Trip" links={siteLinks(["groupTours", "upcoming", "customized", "flights", "hotels", "visas"])} />
    </>
  );
}
