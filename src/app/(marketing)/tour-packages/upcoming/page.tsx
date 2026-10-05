import type { Metadata } from "next";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { siteLinks } from "@/lib/related";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { TourCard } from "@/components/tours/TourCard";
import { getTours } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Upcoming Tours",
  description: "Upcoming group tour departures from Pakistan with visa assistance included. See current itineraries, prices and booking dates from Ali Baba Travel Advisor.",
  path: "/tour-packages/upcoming",
});

export default async function UpcomingToursPage() {
  const tours = await getTours();

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tours", href: "/tour-packages" }, { label: "Upcoming Tours" }]} />
      <PageHero
        eyebrow="Departures"
        title="Upcoming Tour Departures"
        description="Our current group departures. Contact us for the next confirmed date for any destination below — expired departures are removed from this list as new ones are confirmed."
      />
      <Container className="py-14">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>
      </Container>
      <RelatedLinks title="More Ways to Travel" links={siteLinks(["groupTours", "customized", "tours", "visas", "flights", "consultation"])} />
    </>
  );
}
