import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { popularDestinations, moreDestinations } from "@/data/countries";

const all = [...popularDestinations, ...moreDestinations];

export function DestinationsGrid() {
  return (
    <section className="border-y border-border bg-surface-muted/60 py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="Destinations"
          title="Popular Visa Destinations from Pakistan"
        />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {all.map((country) => (
            <Link
              key={country.slug}
              href={`/visas/${country.slug}`}
              className="flex flex-col items-center gap-2 rounded-[var(--radius-md)] border border-border bg-surface px-3 py-5 text-center transition-colors hover:border-primary"
            >
              {country.flagImage ? (
                <Image
                  src={country.flagImage}
                  alt={`${country.name} flag`}
                  width={32}
                  height={20}
                  className="h-5 w-8 rounded-sm object-cover"
                />
              ) : (
                <span className="text-2xl">{country.flag}</span>
              )}
              <span className="text-[0.82rem] font-semibold text-charcoal">
                {country.name}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
