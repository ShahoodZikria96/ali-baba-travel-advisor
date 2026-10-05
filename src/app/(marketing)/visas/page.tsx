import type { Metadata } from "next";
import { thumbSrc } from "@/lib/images";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { siteLinks } from "@/lib/related";
import { pageMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/lib/content";
import { whatsappHref } from "@/lib/whatsapp";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { getCountries } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Visa Countries from Pakistan",
  description: "Visa assistance from Pakistan for the UK, Canada, USA, Australia, Schengen Europe, Turkey, Japan, Thailand, Singapore, South Korea and 40+ destinations.",
  path: "/visas",
});

export default async function VisasPage() {
  const [all, settings] = await Promise.all([getCountries(), getSiteSettings()]);

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Visas" }]} />
      <PageHero
        eyebrow="Visa Destinations"
        title="Popular Visa Destinations from Pakistan"
        description="Select a country to see visa categories, requirements, documents and how our consultants can help."
      />
      <Container className="py-14">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {all.map((country) => (
            <Link
              key={country.slug}
              href={`/visas/${country.slug}`}
              className="group overflow-hidden rounded-[var(--radius-md)] border border-border bg-surface transition-colors hover:border-primary"
            >
              <div className="relative h-24 w-full">
                <Image
                  src={thumbSrc(`/destinations/${country.slug}.webp`)}
                  alt={`${country.name} landmark`}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {country.flagImage && (
                  <Image
                    src={country.flagImage}
                    alt={`${country.name} flag`}
                    width={32}
                    height={20}
                    className="absolute bottom-2 left-2 h-5 w-8 rounded-sm object-cover shadow"
                  />
                )}
              </div>
              <div className="p-4">
                <p className="font-heading text-base font-bold text-charcoal">{country.name}</p>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.04em] text-primary">{country.visaType}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-charcoal group-hover:text-primary">
                  View Visa Guide <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <section className="mt-12 rounded-[var(--radius-lg)] border border-border bg-surface-muted/60 p-6 text-center sm:p-8">
          <h2 className="font-heading text-xl font-bold text-charcoal">Don&apos;t see your destination?</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-text-muted">
            Message us with your travel plan and a consultant will explain the current requirements for any
            country not listed above.
          </p>
          <a
            href={whatsappHref("Hi, I need visa information for a destination not listed on your website.", settings.whatsappNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex h-11 items-center justify-center rounded-[var(--radius-md)] bg-[#14803f] px-6 text-[0.95rem] font-semibold text-white transition-colors hover:bg-[#0f6a33]"
          >
            Ask on WhatsApp
          </a>
        </section>
      </Container>
      <RelatedLinks title="Keep Exploring" links={siteLinks(["consultancy", "process", "refusal", "groupTours", "guides", "faqs"])} />
    </>
  );
}
