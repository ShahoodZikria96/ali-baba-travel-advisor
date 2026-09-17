import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Reveal } from "@/components/ui/Reveal";
import { getFaqs } from "@/lib/content";

export async function FaqPreview() {
  const faqs = await getFaqs();
  if (faqs.length === 0) return null;

  return (
    <section className="py-16 lg:py-20">
      <Container className="mx-auto max-w-3xl">
        <SectionHeading
          align="center"
          eyebrow="Have Questions?"
          title="Frequently Asked Questions"
          description="Quick answers to the questions we hear most from clients planning a visa application or trip."
          className="mx-auto"
        />

        <Reveal className="mt-10">
          <FAQAccordion items={faqs.slice(0, 6).map((f) => ({ question: f.question, answer: f.answer }))} />
        </Reveal>

        <div className="mt-8 text-center">
          <Link
            href="/faqs"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-dark"
          >
            View All FAQs
            <ArrowRight size={16} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
