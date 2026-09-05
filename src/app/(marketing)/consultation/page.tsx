import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { VisaAssessmentForm } from "@/components/forms/VisaAssessmentForm";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description: "Book a free visa consultation with Ali Baba Travel Advisor — share your travel plan and get a case assessment.",
};

const points = [
  "Personalized review of your travel goal and visa category",
  "Guidance from consultants who work with your destination country regularly",
  "Clear next steps, whether this is a first application or a reapplication",
  "No guaranteed-outcome promises — just honest, professional guidance",
];

export default function ConsultationPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Consultation" }]} />
      <PageHero
        eyebrow="Free Assessment"
        title="Book Your Visa Consultation"
        description="Tell us about your travel plan and one of our consultants will get back to you with a case assessment."
      />

      <Container className="grid grid-cols-1 gap-12 py-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="font-heading text-xl font-bold text-charcoal">What to Expect</h2>
          <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-text-muted">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-2">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success" /> {p}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xs leading-relaxed text-text-muted">
            Visa decisions are made solely by the relevant embassy, consulate or immigration authority. Ali Baba
            Travel Advisor provides consultancy and documentation assistance and does not guarantee visa approval.
          </p>
        </div>

        <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-6">
          <VisaAssessmentForm />
        </div>
      </Container>
    </>
  );
}
