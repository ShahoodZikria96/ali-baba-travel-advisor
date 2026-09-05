import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { popularDestinations } from "@/data/countries";

export function VisaFinder() {
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
              className="group rounded-[var(--radius-md)] border border-border bg-surface p-5 transition-colors hover:border-primary"
            >
              <span className="text-3xl">{country.flag}</span>
              <p className="mt-3 font-heading text-base font-bold text-charcoal">
                {country.name}
              </p>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.04em] text-primary">
                {country.visaType}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {country.description}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-charcoal group-hover:text-primary">
                View Visa Guide
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </span>
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
