import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { destinationRegions } from "@/data/otherDestinations";
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
                  src={`/destinations/${country.slug}.jpg`}
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

        <section className="mt-16">
          <h2 className="font-heading text-2xl font-bold text-charcoal">All Destinations We Handle</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
            We assist with visa applications for the destinations below. Detailed guides exist for the countries
            above; for any other destination, message us with your travel plan and a consultant will explain the
            current requirements.
          </p>
          <div className="mt-8 space-y-8">
            {destinationRegions.map((r) => (
              <div key={r.region}>
                <h3 className="font-heading text-base font-bold text-charcoal">{r.region}</h3>
                {r.note && <p className="mt-1 text-xs text-text-muted">{r.note}</p>}
                <ul className="mt-3 flex flex-wrap gap-2.5">
                  {r.items.map((d) => (
                    <li key={d.name}>
                      <a
                        href={d.href ?? whatsappHref(`Hi, I need visa information for ${d.name}.`, settings.whatsappNumber)}
                        {...(d.href ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                        className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-charcoal hover:border-primary hover:text-primary"
                      >
                        {d.name}
                        {d.groupTour && (
                          <span className="rounded-full bg-primary-tint px-2 py-0.5 text-[0.65rem] font-bold uppercase text-primary">Group tour</span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
