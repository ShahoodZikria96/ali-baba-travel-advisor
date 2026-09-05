import Link from "next/link";
import { CalendarDays, MapPin, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { sampleTours } from "@/data/placeholders";

export function UpcomingTours() {
  return (
    <section className="border-y border-border bg-surface-muted/60 py-16 lg:py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Group Departures" title="Upcoming Group Tours" />
          <Button href="/tour-packages/upcoming" variant="outline" size="sm">
            View All Upcoming Tours
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sampleTours.map((tour) => (
            <div key={tour.slug} className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface">
              <div className="flex h-32 items-center justify-center bg-gradient-to-br from-charcoal to-primary-dark">
                <MapPin className="text-white/70" size={28} />
              </div>
              <div className="p-5">
                <p className="font-heading text-lg font-bold text-charcoal">{tour.destination}</p>
                <div className="mt-2 flex items-center gap-1.5 text-sm text-text-muted">
                  <CalendarDays size={14} />
                  {tour.departure} &middot; {tour.duration}
                </div>
                {tour.visaAssistance && (
                  <div className="mt-1.5 flex items-center gap-1.5 text-sm text-success">
                    <ShieldCheck size={14} />
                    Visa Assistance Included
                  </div>
                )}
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-heading text-base font-extrabold text-primary">
                    {tour.price}
                  </span>
                  <Link
                    href={`/tour-packages/${tour.slug}`}
                    className="text-sm font-bold text-charcoal hover:text-primary"
                  >
                    View Package →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
