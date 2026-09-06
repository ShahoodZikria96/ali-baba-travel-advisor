import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { TourCard } from "@/components/tours/TourCard";
import { getTours } from "@/lib/content";

export const metadata: Metadata = {
  title: "Group Tours",
  description: "Guided international group tours from Pakistan — all-inclusive travel with fellow travelers and visa assistance included.",
};

export default async function GroupToursPage() {
  const tours = await getTours();

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tours", href: "/tour-packages" }, { label: "Group Tours" }]} />
      <PageHero
        eyebrow="Group Departures"
        title="International Group Tours"
        description="Travel together with fellow Pakistani travelers on a fixed itinerary — flights, hotels, guided sightseeing and visa documentation assistance all bundled in one price."
      />
      <Container className="py-14">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>
      </Container>
    </>
  );
}
