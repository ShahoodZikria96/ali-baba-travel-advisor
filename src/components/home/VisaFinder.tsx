import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedCountries } from "@/lib/content";

export async function VisaFinder() {
  const popularDestinations = await getFeaturedCountries();

  return (
    <section className="py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="Visa Finder"
          title="Where Do You Want to Travel?"
          description="Select a destination to see visa categories, requirements and how our consultants can help."
        />

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {popularDestinations.map((country) => (
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
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.04em] text-primary">
                  {country.visaType}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{country.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-charcoal group-hover:text-primary">
                  View Visa Guide
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/visas"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-dark"
          >
            View All Countries
            <ArrowRight size={16} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
