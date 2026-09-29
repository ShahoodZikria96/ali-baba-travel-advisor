import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/legal/LegalPage";

// REQUIRED BUSINESS INFORMATION: the owner must confirm these terms match
// actual practice (fee refundability, tour deposit rules) before launch.
export const metadata: Metadata = pageMetadata({
  title: "Refund & Cancellation Policy",
  description: "How refunds and cancellations work for Ali Baba Travel Advisor consultancy fees, tour packages, flight tickets and hotel bookings.",
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return (
    <LegalPage title="Refund & Cancellation Policy" crumb="Refund Policy" updated="September 2026">
      <p>
        We agree fees and cancellation terms in writing before you pay. This page summarises the principles that
        apply. The written booking or service agreement you receive takes precedence.
      </p>
      <h2>Consultancy and application-support fees</h2>
      <p>
        Our fee covers professional time and work performed (assessment, document review, preparation, guidance).
        Because a visa decision is made by an embassy or immigration authority, a refusal is not by itself a
        ground for refund of fees for work already carried out. Where no work has started, you may ask for a refund
        in writing.
      </p>
      <h2>Embassy, visa-centre and government fees</h2>
      <p>These are paid to third parties and are generally non-refundable under their own rules, whether or not a visa is granted.</p>
      <h2>Airline tickets and hotels</h2>
      <p>Refunds, changes and penalties are set by the airline or hotel fare rules. We pass on any refund we receive, less any agreed service charge, once the supplier has paid it.</p>
      <h2>Tour packages</h2>
      <p>Deposit, instalment and cancellation terms for each departure are stated at booking. If we cancel a departure, you will be offered a refund or an alternative departure.</p>
      <h2>How to request a refund</h2>
      <p>Email us via the <Link href="/contact">contact page</Link> with your name, booking details and reason. We respond in writing.</p>
    </LegalPage>
  );
}
