import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { getCountries } from "@/lib/content";

export async function DestinationsGrid() {
  const all = await getCountries();

  return (
    <section className="border-y border-border bg-surface-muted/60 py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="Destinations"
          title="Popular Visa Destinations from Pakistan"
        />

        <RevealGroup className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {all.map((country) => (
            <RevealItem key={country.slug}>
              <TiltCard strength={8} className="rounded-[var(--radius-md)]">
                <Link
                  href={`/visas/${country.slug}`}
                  className="tilt-card-inner flex flex-col items-center gap-2 rounded-[var(--radius-md)] border border-border bg-surface px-3 py-5 text-center"
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
                    <span className="text-2xl">{country.flagEmoji}</span>
                  )}
                  <span className="text-[0.82rem] font-semibold text-charcoal">
                    {country.name}
                  </span>
                </Link>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
