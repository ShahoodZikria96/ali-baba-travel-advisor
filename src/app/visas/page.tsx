import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { popularDestinations, moreDestinations } from "@/data/countries";

export const metadata: Metadata = {
  title: "Visa Countries",
  description: "Explore visa guidance for the UK, Canada, USA, Australia, Schengen Europe, Turkey, Japan, New Zealand and more.",
};

const all = [...popularDestinations, ...moreDestinations];

export default function VisasPage() {
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
              className="group rounded-[var(--radius-md)] border border-border bg-surface p-5 transition-colors hover:border-primary"
            >
              {country.flagImage ? (
                <Image src={country.flagImage} alt={`${country.name} flag`} width={40} height={26} className="h-6 w-10 rounded-sm object-cover" />
              ) : (
                <span className="text-3xl">{country.flag}</span>
              )}
              <p className="mt-3 font-heading text-base font-bold text-charcoal">{country.name}</p>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.04em] text-primary">{country.visaType}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-charcoal group-hover:text-primary">
                View Visa Guide <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
