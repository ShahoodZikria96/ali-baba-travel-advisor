import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { CalendarDays, CheckCircle2, XCircle, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TourEnquiryForm } from "@/components/forms/TourEnquiryForm";
import { TourCard } from "@/components/tours/TourCard";
import { pageMetadata, absoluteUrl, orgId, fitTitle } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { tourPosters, priceSuffix } from "@/data/tourPosters";
import Link from "next/link";
import { bannerSrc } from "@/lib/images";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { countriesForTour, siteLinks } from "@/lib/related";
import { getTours, getTour, getSiteSettings, getCountries, whatsappHref } from "@/lib/content";

export async function generateStaticParams() {
  const tours = await getTours();
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTour(slug);
  if (!tour) return {};
  return pageMetadata({ title: fitTitle([`${tour.destination} Group Tour from Pakistan`, `${tour.destination} Tour from Pakistan`, `${tour.destination} Group Tour`]), description: `${tour.summary} Visa assistance included. Book with Ali Baba Travel Advisor.`, path: `/tour-packages/${slug}`, image: tour.image });
}

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [tour, settings, allTours, allCountries] = await Promise.all([getTour(slug), getSiteSettings(), getTours(), getCountries()]);
  if (!tour) notFound();
  const tourCountries = countriesForTour(tour, allCountries);

  const poster = tourPosters[slug];
  const otherTours = allTours.filter((t) => t.slug !== slug);
  const highlights = tour.highlights as string[];
  const included = tour.included as string[];
  const excluded = tour.excluded as string[];
  const itinerary = tour.itinerary as { day: string; description: string }[];
  const notes = tour.notes as string[];

  const priceNumber = Number((tour.price.match(/[d,]+/)?.[0] ?? "").replace(/,/g, ""));
  const tripJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: `${tour.destination} Group Tour from Pakistan`,
    description: tour.summary,
    image: absoluteUrl(tour.image),
    url: absoluteUrl(`/tour-packages/${slug}`),
    touristType: "Group tour",
    provider: { "@id": orgId },
    ...(itinerary.length > 0
      ? {
          itinerary: {
            "@type": "ItemList",
            itemListElement: itinerary.map((d, i) => ({ "@type": "ListItem", position: i + 1, name: d.day, description: d.description })),
          },
        }
      : {}),
    ...(priceNumber > 0
      ? {
          offers: {
            "@type": "Offer",
            price: priceNumber,
            priceCurrency: "PKR",
            availability: "https://schema.org/InStock",
            url: absoluteUrl(`/tour-packages/${slug}`),
            seller: { "@id": orgId },
          },
        }
      : {}),
  };

  return (
    <>
      <JsonLd data={tripJsonLd} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Tours", href: "/tour-packages" },
          { label: tour.destination },
        ]}
      />

      <section className="relative flex h-56 items-center justify-center overflow-hidden text-white sm:h-64">
        <Image src={bannerSrc(tour.image)} alt={tour.destination} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-charcoal/55" />
        <div className="relative text-center">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/70">Group Tour</p>
          <h1 className="mt-2 font-heading text-3xl font-extrabold sm:text-4xl">{tour.destination}</h1>
        </div>
      </section>

      <Container className="grid grid-cols-1 gap-12 py-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="flex flex-wrap items-center gap-4 rounded-[var(--radius-md)] border border-border bg-surface-muted/50 p-5 text-sm">
            <span className="flex items-center gap-1.5 font-semibold text-charcoal">
              <CalendarDays size={16} /> {tour.duration}
            </span>
            <span className="text-text-muted">{tour.departure}</span>
            {tour.visaAssistance && (
              <span className="flex items-center gap-1.5 font-semibold text-success">
                <ShieldCheck size={16} /> Visa Assistance Included
              </span>
            )}
            <span className="ml-auto font-heading text-lg font-extrabold text-primary">{tour.price}{priceSuffix(tour.price)}</span>
          </div>

          <p className="mt-6 text-[1.02rem] leading-relaxed text-text-muted">{tour.summary}</p>

          <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Tour Highlights</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-text-muted">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-2">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success" /> {h}
              </li>
            ))}
          </ul>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <h2 className="font-heading text-lg font-bold text-charcoal">What&rsquo;s Included</h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-text-muted">
                {included.map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-success" /> {i}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-heading text-lg font-bold text-charcoal">What&rsquo;s Not Included</h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-text-muted">
                {excluded.map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <XCircle size={15} className="mt-0.5 shrink-0 text-text-muted" /> {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {itinerary.length > 0 && (
            <>
              <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Day-by-Day Itinerary</h2>
              <ol className="mt-4 space-y-4">
                {itinerary.map((day) => (
                  <li key={day.day} className="flex gap-4">
                    <span className="w-16 shrink-0 font-heading text-sm font-bold text-primary">{day.day}</span>
                    <span className="text-sm leading-relaxed text-text-muted">{day.description}</span>
                  </li>
                ))}
              </ol>
            </>
          )}
          {poster && (
            <>
              <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Tour Poster</h2>
              <Image src={poster} alt={`${tour.destination} group tour poster with package details`} width={1080} height={1080} sizes="(max-width: 1024px) 100vw, 560px" className="mt-4 h-auto w-full max-w-md rounded-[var(--radius-md)] border border-border" />
            </>
          )}

          <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Important Notes</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-text-muted">
            {notes.map((n) => (
              <li key={n} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> {n}
              </li>
            ))}
          </ul>

          {tourCountries.length > 0 && (
            <>
              <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Visa Requirements for This Trip</h2>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                Visa assistance is included, but it helps to know what each destination asks for. Read the document
                checklist for every country on this itinerary:
              </p>
              <ul className="mt-3 space-y-1.5 text-sm">
                {tourCountries.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/visas/${c.slug}`} className="font-semibold text-primary hover:text-primary-dark">
                      {c.name} visa requirements from Pakistan →
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/visa-consultancy" className="font-semibold text-primary hover:text-primary-dark">
                    Visa consultancy services for your group tour →
                  </Link>
                </li>
              </ul>
            </>
          )}
        </div>

        <div className="h-fit rounded-[var(--radius-lg)] border border-border bg-surface p-6 lg:sticky lg:top-24">
          <p className="font-heading text-lg font-bold text-charcoal">{tour.price} <span className="text-sm font-normal text-text-muted">{priceSuffix(tour.price)}</span></p>
          <div className="mt-4 flex flex-col gap-2.5">
            <Button
              href={whatsappHref(`Hi, I would like details about the ${tour.destination} group tour.`, settings.whatsappNumber)}
              external
              variant="whatsapp"
            >
              WhatsApp Enquiry
            </Button>
          </div>
          <div className="mt-6 border-t border-border pt-5">
            <h2 className="font-heading text-base font-bold text-charcoal">Package Enquiry</h2>
            <div className="mt-4">
              <TourEnquiryForm defaultDestination={tour.destination} whatsappNumber={settings.whatsappNumber} />
            </div>
          </div>
        </div>
      </Container>

      {otherTours.length > 0 && (
        <Container className="border-t border-border py-14">
          <h2 className="font-heading text-xl font-bold text-charcoal">Other Group Tours</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {otherTours.map((t) => (
              <TourCard key={t.slug} tour={t} />
            ))}
          </div>
        </Container>
      )}

      <RelatedLinks
        title="Plan Your Trip"
        links={siteLinks(["groupTours", "upcoming", "customized", "flights", "hotels", "visas"])}
      />
    </>
  );
}
