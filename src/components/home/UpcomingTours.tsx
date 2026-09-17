import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { TourCard } from "@/components/tours/TourCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { getTours } from "@/lib/content";

export async function UpcomingTours() {
  const tours = await getTours();

  return (
    <section className="border-y border-border bg-surface-muted/60 py-16 lg:py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Group Departures" title="Upcoming Group Tours" />
          <Button href="/tour-packages/upcoming" variant="outline" size="sm">
            View All Upcoming Tours
          </Button>
        </div>

        <RevealGroup className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => (
            <RevealItem key={tour.slug}>
              <TourCard tour={tour} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
