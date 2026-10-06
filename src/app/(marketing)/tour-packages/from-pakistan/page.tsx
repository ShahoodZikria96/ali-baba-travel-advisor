import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { FaqSection } from "@/components/ui/FaqSection";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { pageMetadata } from "@/lib/seo";
import { thumbSrc } from "@/lib/images";
import { siteLinks } from "@/lib/related";
import { packageDestinations, type PackageDestination } from "@/data/packageDestinations";
import type { PageFaq } from "@/data/pageFaqs";

export const metadata: Metadata = pageMetadata({
  title: "International Tour Packages from Pakistan",
  description: "Tour packages from Pakistan to Europe, Canada, Dubai, Turkey, Japan and 20+ more destinations, with flights, hotels and visa assistance. Free quote.",
  path: "/tour-packages/from-pakistan",
});

const regions: PackageDestination["region"][] = ["Europe", "Asia", "Middle East & Africa", "Americas & Oceania"];

const faqs: PageFaq[] = [
  {
    question: "Which countries do your tour packages from Pakistan cover?",
    answer: "We plan packages for Europe, the UK, Canada, the USA, Australia, New Zealand, Dubai, Turkey, Egypt, Morocco, South Africa, Japan, South Korea, Thailand, Malaysia, Singapore, Indonesia, Hong Kong, the Maldives and more. If your destination is not listed, ask us and we will quote it.",
  },
  {
    question: "Do you publish package prices?",
    answer: "Prices depend on dates, hotel level, flights and group size, so we quote each package individually after you share your plan. A group tour page shows its price when one is fixed.",
  },
  {
    question: "Is visa support included in your tour packages?",
    answer: "Yes. We prepare the document checklist, itinerary and application for your destination. Approval is decided by the embassy or immigration authority and is never guaranteed.",
  },
  {
    question: "Can I book from outside Lahore?",
    answer: "Yes. We serve clients across Pakistan by phone and WhatsApp, with offices in Lahore, Islamabad, Wazirabad and Karachi.",
  },
];

export default function TourPackagesFromPakistanPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tour Packages", href: "/tour-packages" }, { label: "From Pakistan" }]} />
      <PageHero
        eyebrow="Tour Packages"
        title="International Tour Packages from Pakistan"
        description="Choose a destination to see places to visit, the best time to travel, visa information and how to get a free quote. Every package includes visa assistance, and departures run from Lahore, Islamabad and Karachi."
      />

      {regions.map((region) => {
        const items = packageDestinations.filter((d) => d.region === region);
        if (items.length === 0) return null;
        return (
          <Container key={region} className="py-10">
            <h2 className="font-heading text-xl font-bold text-charcoal">{region}</h2>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((d) => (
                <Link
                  key={d.slug}
                  href={`/tour-packages/from-pakistan/${d.slug}`}
                  className="group overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface transition-colors hover:border-primary"
                >
                  <div className="relative h-36 w-full overflow-hidden">
                    <Image src={thumbSrc(d.image)} alt={`${d.name} tour packages from Pakistan`} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <p className="font-heading text-lg font-bold text-charcoal group-hover:text-primary">{d.name} tour packages</p>
                    <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-text-muted">{d.intro}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        );
      })}

      <FaqSection title="Tour Package FAQs" faqs={faqs} />
      <RelatedLinks title="Plan Your Trip" links={siteLinks(["groupTours", "upcoming", "customized", "flights", "hotels", "visas"])} />
    </>
  );
}
