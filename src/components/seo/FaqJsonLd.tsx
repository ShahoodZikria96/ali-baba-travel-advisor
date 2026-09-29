import { JsonLd } from "@/components/seo/JsonLd";

export function FaqJsonLd({ faqs }: { faqs: { question: string; answer: string }[] | null | undefined }) {
  if (!faqs || faqs.length === 0) return null;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }}
    />
  );
}
