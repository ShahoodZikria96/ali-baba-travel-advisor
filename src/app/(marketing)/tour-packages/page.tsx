import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { TourCard } from "@/components/tours/TourCard";
import { getTours } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "International Tour Packages from Pakistan",
  description: "International group tour packages from Pakistan with visa assistance included — Thailand, Turkey, Japan, South Korea, Hong Kong and more.",
  path: "/tour-packages",
});

export default async function TourPackagesPage() {
  const tours = await getTours();

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tour Packages" }]} />
      <PageHero
        eyebrow="International Packages"
        title="Discover Our Tour Packages"
        description="Handpicked group tours with flights, hotels and visa documentation assistance bundled together."
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
