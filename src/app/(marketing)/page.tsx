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
      <FinalCTA />
    </>
  );
}
