import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { TourEnquiryForm } from "@/components/forms/TourEnquiryForm";

export const metadata: Metadata = {
  title: "Customized Tours",
  description: "Personalized, custom-built international itineraries from Pakistan for families, couples and small groups.",
};

const highlights = [
  "Private or small-group itineraries built around your dates and budget",
  "Choice of hotels, from comfortable 3-star to luxury 5-star stays",
  "Honeymoon, family and multi-generational trip planning",
  "Visa documentation assistance for every traveler on the itinerary",
];

export default function CustomizedToursPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tours", href: "/tour-packages" }, { label: "Customized Tours" }]} />
      <PageHero
        eyebrow="Tailored Travel"
        title="Customized Tour Packages"
        description="Prefer to travel on your own schedule? We build private itineraries around your destination, dates, budget and travel style."
      />
      <Container className="grid grid-cols-1 gap-12 py-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="font-heading text-xl font-bold text-charcoal">What We Plan For You</h2>
          <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-text-muted">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> {h}
              </li>
            ))}
          </ul>
        </div>
        <div className="h-fit rounded-[var(--radius-lg)] border border-border bg-surface p-6">
          <h2 className="font-heading text-lg font-bold text-charcoal">Tell Us About Your Trip</h2>
          <p className="mt-1.5 text-sm text-text-muted">Share your destination and dates and we&rsquo;ll get back with options.</p>
          <div className="mt-5">
            <TourEnquiryForm />
          </div>
        </div>
      </Container>
    </>
  );
}
