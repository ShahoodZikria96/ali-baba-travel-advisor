import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { generalFaqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Frequently asked questions about visa consultancy, documentation, processing times and travel services.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: generalFaqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function FAQsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQs" }]} />
      <PageHero eyebrow="Help Centre" title="Frequently Asked Questions" description="Answers to the questions we hear most often from clients." />
      <Container className="py-14">
        <div className="mx-auto max-w-[760px]">
          <FAQAccordion items={generalFaqs} />
        </div>
      </Container>
    </>
  );
}
