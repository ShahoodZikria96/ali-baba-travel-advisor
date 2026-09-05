import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { TourCard } from "@/components/tours/TourCard";
import { tours } from "@/data/tours";

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
          {tours.map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>
      </Container>
    </section>
  );
}
