import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { offices } from "@/data/offices";

export function OfficeLocations() {
  return (
    <section className="py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="Visit Us"
          title="Our Offices Across Pakistan"
          description="Walk in for a face-to-face consultation, or reach us by phone and WhatsApp."
        />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {offices.map((office) => (
            <div key={office.slug} className="rounded-[var(--radius-md)] border border-border bg-surface p-5">
              <p className="font-heading text-base font-bold text-charcoal">{office.city}</p>
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
              <Link
                href={`/locations/${office.slug}`}
                className="mt-4 inline-block text-sm font-bold text-primary hover:text-primary-dark"
              >
                Office Details &amp; Directions →
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
