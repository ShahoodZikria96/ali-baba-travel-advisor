import type { Metadata } from "next";
import { BedDouble, Wallet, MapPinned } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getSiteSettings, whatsappHref } from "@/lib/content";

export const metadata: Metadata = {
  title: "Hotel Booking",
  description: "Worldwide hotel and accommodation booking assistance from Ali Baba Travel Advisor.",
};

const points = [
  { icon: BedDouble, title: "Worldwide Accommodation", description: "From budget-friendly stays to luxury hotels, matched to your itinerary." },
  { icon: Wallet, title: "Matched to Your Budget", description: "We compare options so your accommodation fits your overall trip budget." },
  { icon: MapPinned, title: "Location-Aware Recommendations", description: "Stays chosen for proximity to your sightseeing plans or meeting locations." },
];

export default async function HotelBookingPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Hotel Booking" }]} />
      <PageHero
        eyebrow="Accommodation"
        title="Hotel Booking Assistance"
        description="Worldwide accommodation assistance matched to your itinerary, budget and travel style."
      />
      <Container className="py-14">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {points.map((p) => (
            <div key={p.title} className="rounded-[var(--radius-md)] border border-border bg-surface p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] bg-primary-tint text-primary">
                <p.icon size={20} />
              </span>
              <p className="mt-4 font-heading text-base font-bold text-charcoal">{p.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{p.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={whatsappHref("Hi, I would like help booking a hotel for my trip.", settings.whatsappNumber)} external variant="whatsapp">
            WhatsApp for Hotel Options
          </Button>
          <Button href="/consultation" variant="outline">General Enquiry</Button>
        </div>
      </Container>
    </>
  );
}
