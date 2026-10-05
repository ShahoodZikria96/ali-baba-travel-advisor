import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { StatsBar } from "@/components/home/StatsBar";
import { VisaFinder } from "@/components/home/VisaFinder";
import { CoreServices } from "@/components/home/CoreServices";
import { RefusalAssistance } from "@/components/home/RefusalAssistance";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { DestinationsGrid } from "@/components/home/DestinationsGrid";
import { SuccessStories } from "@/components/home/SuccessStories";
import { HowItWorks } from "@/components/home/HowItWorks";
import { UpcomingTours } from "@/components/home/UpcomingTours";
import { VideoUpdates } from "@/components/home/VideoUpdates";
import { LatestGuides } from "@/components/home/LatestGuides";
import { Reviews } from "@/components/home/Reviews";
import { OfficeLocations } from "@/components/home/OfficeLocations";
import { FaqPreview } from "@/components/home/FaqPreview";
import { FinalCTA } from "@/components/home/FinalCTA";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { siteLinks } from "@/lib/related";

export const metadata: Metadata = pageMetadata({
  title: "Visa Consultant & Travel Agency in Lahore, Pakistan",
  description:
    "Ali Baba Travel Advisor: visa consultancy, tour packages, airline tickets and hotel booking for travellers across Pakistan. Offices in Lahore, Islamabad, Wazirabad and Karachi.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <VisaFinder />
      <CoreServices />
      <RefusalAssistance />
      <WhyChooseUs />
      <DestinationsGrid />
      <SuccessStories />
      <HowItWorks />
      <UpcomingTours />
      <VideoUpdates />
      <LatestGuides />
      <Reviews />
      <OfficeLocations />
      <FaqPreview />
      <RelatedLinks
        title="More About Ali Baba Travel Advisor"
        links={siteLinks(["about", "process", "team", "documentation", "urdu", "contact"])}
      />
      <FinalCTA />
    </>
  );
}
