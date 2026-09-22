import type { Metadata } from "next";
import { Plane, Clock, Headset } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { FlightEnquiryForm } from "@/components/forms/FlightEnquiryForm";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Flight Booking from Pakistan",
  description: "International and domestic airline ticket booking support from Ali Baba Travel Advisor.",
};

const points = [
  { icon: Plane, title: "International & Domestic Routes", description: "Airline ticketing for both local travel within Pakistan and international connections." },
  { icon: Clock, title: "Timely Fare & Schedule Updates", description: "We track fare changes and schedule updates so you're not caught off guard." },
  { icon: Headset, title: "Support If Plans Change", description: "Walk-in or call for help with rebooking, refunds, or coordinating your ticket with a visa timeline." },
];

export default async function FlightsPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Flights" }]} />
      <PageHero
        eyebrow="Air Ticketing"
        title="Book Your Flight with Ali Baba Travel Advisor"
        description="International and domestic airline booking support for every trip — coordinated with your visa timeline where relevant."
      />
      <Container className="grid grid-cols-1 gap-12 py-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="space-y-6">
            {points.map((p) => (
              <div key={p.title} className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-primary-tint text-primary">
                  <p.icon size={20} />
                </span>
                <div>
                  <p className="font-heading text-base font-bold text-charcoal">{p.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-text-muted">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-xl text-sm leading-relaxed text-text-muted">
            If your trip also involves a visa application, we recommend timing your ticket purchase around your
            visa decision rather than before it, to avoid unnecessary cancellation costs.
          </p>
        </div>
        <div className="h-fit rounded-[var(--radius-lg)] border border-border bg-surface p-6">
          <h2 className="font-heading text-lg font-bold text-charcoal">Request a Flight Quote</h2>
          <p className="mt-1.5 text-sm text-text-muted">Share your travel dates and we&rsquo;ll get back with fare options.</p>
          <div className="mt-5">
            <FlightEnquiryForm whatsappNumber={settings.whatsappNumber} />
          </div>
        </div>
      </Container>
    </>
  );
}
