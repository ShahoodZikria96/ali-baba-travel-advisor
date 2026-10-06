import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { thumbSrc } from "@/lib/images";
import { getPackageDestination } from "@/data/packageDestinations";

const FEATURED = ["europe", "canada", "switzerland", "turkey", "japan", "south-korea", "thailand", "australia"];

export function PackagesFromPakistan() {
  const items = FEATURED.map((s) => getPackageDestination(s)).filter((d): d is NonNullable<typeof d> => Boolean(d));
  return (
    <section className="py-16 lg:py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Tour Packages"
            title="Tour Packages from Pakistan"
            description="Flights, hotels and visa assistance for the destinations our clients ask for most."
          />
          <Button href="/tour-packages/from-pakistan" variant="outline" size="sm">
            All Destinations
          </Button>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {items.map((d) => (
            <li key={d.slug}>
              <Link
                href={`/tour-packages/from-pakistan/${d.slug}`}
                className="group block overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface transition-colors hover:border-primary"
              >
                <div className="relative h-28 w-full overflow-hidden sm:h-32">
                  <Image
                    src={thumbSrc(d.image)}
                    alt={`${d.name} tour packages from Pakistan`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="p-3.5 font-heading text-sm font-bold text-charcoal group-hover:text-primary sm:text-base">{d.name} Packages</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
