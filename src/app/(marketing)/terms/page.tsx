import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for using Ali Baba Travel Advisor's visa consultancy and travel services.",
};

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms" }]} />
      <PageHero eyebrow="Legal" title="Terms & Conditions" />
      <Container className="py-14">
        <div className="mx-auto max-w-[760px] space-y-6 text-sm leading-relaxed text-text-muted">
          <p>
            These terms govern your use of Ali Baba Travel Advisor&rsquo;s website and services, including visa
            consultancy, documentation assistance, tour packages, flight and hotel booking.
          </p>
          <h2 className="font-heading text-lg font-bold text-charcoal">No Guaranteed Outcomes</h2>
          <p>
            Visa decisions are made solely by the relevant embassy, consulate or immigration authority. Ali Baba
            Travel Advisor provides professional consultancy and documentation assistance and does not guarantee
            visa approval, processing time, or any other outcome controlled by a third-party authority.
          </p>
          <h2 className="font-heading text-lg font-bold text-charcoal">Tour Packages</h2>
          <p>
            Tour package pricing, itineraries and departure dates are subject to change and confirmation at the
            time of booking. A specific departure is only confirmed once a booking deposit has been accepted.
          </p>
          <h2 className="font-heading text-lg font-bold text-charcoal">Payments & Cancellations</h2>
          <p>
            Payment terms and cancellation policies for visa consultancy fees, tour packages and bookings will be
            communicated in writing at the time of booking.
          </p>
          <h2 className="font-heading text-lg font-bold text-charcoal">Contact</h2>
          <p>
            Questions about these terms can be sent to{" "}
            <a href={`mailto:${siteConfig.email}`} className="font-semibold text-primary">{siteConfig.email}</a>.
          </p>
          <p className="text-xs italic">
            This is a general template and should be reviewed by legal counsel before publication to reflect your
            actual business terms and comply with applicable law.
          </p>
        </div>
      </Container>
    </>
  );
}
