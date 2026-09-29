import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";

export const metadata: Metadata = pageMetadata({
  title: "Our Visa Process: How We Help Step by Step",
  description:
    "See how a visa application works with Ali Baba Travel Advisor: profile assessment, document checklist, application filing support, appointment guidance and what happens after submission.",
  path: "/visa-process",
});

const steps = [
  { title: "1. Free profile assessment", body: "Tell us your destination, purpose of travel, occupation and travel history by WhatsApp, phone or in person. We explain which visa category fits and what the main risks are." },
  { title: "2. Personalised document checklist", body: "You receive a checklist based on your case — identity, employment or business proof, financial evidence, travel plan and any previous refusal letters." },
  { title: "3. Document review", body: "We check that documents are complete, consistent with each other and with your application answers. We do not create or alter documents." },
  { title: "4. Application and appointment guidance", body: "We guide you through the online form, fee payment and biometric or appointment booking where the destination requires them. Appointment slots are controlled by the embassy or its visa centre." },
  { title: "5. After you submit", body: "Processing times are set by the authority and can change. We can help you understand tracking, extra document requests and what to do if a decision is refused." },
];

const faqs = [
  { question: "How long does the whole process take?", answer: "It depends on the destination, the season and how quickly your documents are ready. The authority's processing time is outside our control; we will tell you the current published guidance for your destination." },
  { question: "What do I need to bring to the first consultation?", answer: "Your passport, CNIC, any previous visas or refusal letters, and a short description of your travel plan. We will send the full checklist afterwards." },
  { question: "Can you guarantee my visa?", answer: "No. Only the embassy or immigration authority can decide. We focus on presenting a complete, honest and well-organised application." },
];

export default function VisaProcessPage() {
  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Visa Process" }]} />
      <PageHero
        eyebrow="How It Works"
        title="Our Visa Process, Step by Step"
        description="A clear, honest workflow from first enquiry to submission — with realistic expectations at every stage."
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/consultation">Get Visa Consultation</Button>
          <Button href="/visa-consultancy" variant="outline">View Visa Services</Button>
        </div>
      </PageHero>
      <Container className="py-14">
        <ol className="mx-auto max-w-[760px] space-y-6">
          {steps.map((s) => (
            <li key={s.title} className="rounded-[var(--radius-md)] border border-border bg-surface p-5">
              <h2 className="font-heading text-lg font-bold text-charcoal">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="mx-auto mt-12 max-w-[760px]">
          <h2 className="font-heading text-xl font-bold text-charcoal">Process FAQs</h2>
          <div className="mt-4"><FAQAccordion items={faqs} /></div>
          <p className="mt-8 text-xs leading-relaxed text-text-muted">
            Visa decisions are made solely by the relevant authority. Read our <Link href="/visa-disclaimer" className="text-primary underline">visa disclaimer</Link>. Browse{" "}
            <Link href="/visas" className="text-primary underline">country requirements</Link> or{" "}
            <Link href="/visa-refusal" className="text-primary underline">refusal case review</Link>.
          </p>
        </div>
      </Container>
    </>
  );
}
