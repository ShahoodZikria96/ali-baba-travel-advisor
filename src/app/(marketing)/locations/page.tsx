import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { remoteCities } from "@/data/locationExtras";
import { cities } from "@/data/cityPages";
import Link from "next/link";
import { Clock, MapPin, Phone, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { TiltCard } from "@/components/ui/TiltCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { getOffices } from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Our Offices",
  description: "Visit an Ali Baba Travel Advisor office in Lahore, Islamabad, Wazirabad or Karachi for a face-to-face visa consultation.",
  path: "/locations",
});

function formatOpeningDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function LocationsPage() {
  const offices = await getOffices();
  const now = new Date();

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Locations" }]} />
      <PageHero
        eyebrow="Visit Us"
        title="Our Offices Across Pakistan"
        description="Walk in for a face-to-face consultation, or reach us by phone and WhatsApp."
      />

      <Container className="py-14">
        <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {offices.map((office) => {
            const isUpcoming = office.openingDate && new Date(office.openingDate) > now;
            return (
              <RevealItem key={office.slug}>
                <TiltCard strength={6} className="h-full rounded-[var(--radius-md)]">
                  <div
                    className={cn(
                      "tilt-card-inner h-full rounded-[var(--radius-md)] border bg-surface p-5",
                      isUpcoming ? "border-primary" : "border-border"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-heading text-base font-bold text-charcoal">{office.city}</p>
                      {isUpcoming && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary-tint px-2 py-0.5 text-[0.68rem] font-bold uppercase tracking-wide text-primary">
                          <Sparkles size={11} />
                          New
                        </span>
                      )}
                    </div>
                    {isUpcoming && (
                      <p className="mt-1.5 text-xs font-semibold text-primary">
                        Opening {formatOpeningDate(office.openingDate!)}
                      </p>
                    )}
                    <div className="mt-3 space-y-2 text-sm text-text-muted">
                      <p className="flex items-start gap-2">
                        <MapPin size={15} className="mt-0.5 shrink-0" />
                        {office.address}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock size={15} className="shrink-0" />
                        {office.hours}
                      </p>
                      <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-primary">
                        <Phone size={15} className="shrink-0" />
                        {office.phone}
                      </a>
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                      <Link
                        href={`/locations/${office.slug}`}
                        className="text-sm font-bold text-primary hover:text-primary-dark"
                      >
                        Office Details →
                      </Link>
                      <a
                        href={office.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-charcoal hover:text-primary"
                      >
                        Get Directions
                      </a>
                    </div>
                  </div>
                </TiltCard>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <section className="mt-16 max-w-3xl">
          <h2 className="font-heading text-xl font-bold text-charcoal">Clients From Other Cities</h2>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">
            We do not have offices in every city. If you are in Faisalabad, Multan, Peshawar, Quetta or elsewhere,
            you can begin your visa or travel enquiry by phone or WhatsApp and visit your nearest office only when
            in-person document review is needed.
          </p>
          <ul className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
            {remoteCities.map((c) => (
              <li key={c.city} className="rounded-[var(--radius-sm)] border border-border bg-surface px-4 py-2.5 text-text-muted">
                {cities.some((x) => x.name.toLowerCase() === c.city.toLowerCase()) ? (
                  <Link href={`/travel-agency/${cities.find((x) => x.name.toLowerCase() === c.city.toLowerCase())!.slug}`} className="font-semibold text-charcoal hover:text-primary">{c.city}</Link>
                ) : (
                  <span className="font-semibold text-charcoal">{c.city}</span>
                )}{" "}— nearest office:{" "}
                <Link href={`/locations/${c.nearestSlug}`} className="font-semibold text-primary hover:text-primary-dark">
                  {c.nearestOffice}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm">
            <Link href="/travel-agency" className="font-semibold text-primary hover:text-primary-dark">See every city and province we serve →</Link>
          </p>
        </section>
      </Container>
    </>
  );
}
