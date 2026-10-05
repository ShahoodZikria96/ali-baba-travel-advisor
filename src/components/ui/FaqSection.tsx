import { Container } from "@/components/ui/Container";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import type { PageFaq } from "@/data/pageFaqs";

export function FaqSection({ title = "Frequently Asked Questions", faqs }: { title?: string; faqs: PageFaq[] }) {
  if (faqs.length === 0) return null;
  return (
    <section className="border-t border-border py-12">
      <FaqJsonLd faqs={faqs} />
      <Container>
        <div className="mx-auto max-w-[760px]">
          <h2 className="font-heading text-xl font-bold text-charcoal">{title}</h2>
          <div className="mt-5">
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </Container>
    </section>
  );
}
