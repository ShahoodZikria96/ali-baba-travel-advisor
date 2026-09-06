import Link from "next/link";
import { Clock, MapPin, Phone, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getOffices } from "@/lib/content";
import { cn } from "@/lib/utils";

function formatOpeningDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function OfficeLocations() {
  const offices = await getOffices();
  const now = new Date();

  return (
    <section className="py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="Visit Us"
          title="Our Offices Across Pakistan"
          description="Walk in for a face-to-face consultation, or reach us by phone and WhatsApp."
        />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {offices.map((office) => {
            const isUpcoming = office.openingDate && new Date(office.openingDate) > now;
            return (
              <div
                key={office.slug}
                className={cn(
                  "rounded-[var(--radius-md)] border bg-surface p-5",
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
            );
          })}
        </div>
      </Container>
    </section>
  );
}
