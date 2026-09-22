import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, ShieldAlert } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { RefusalCaseForm } from "@/components/forms/RefusalCaseForm";
import { getRefusalPages, getRefusalPage, getCountry, getSiteSettings } from "@/lib/content";

export async function generateStaticParams() {
  const refusalPages = await getRefusalPages();
  return refusalPages.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = await getRefusalPage(slug);
  if (!r) return {};
  return { title: r.metaTitle ?? undefined, description: r.metaDescription ?? undefined };
}

export default async function RefusalCountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [r, settings, country] = await Promise.all([getRefusalPage(slug), getSiteSettings(), getCountry(slug)]);
  if (!r) notFound();

  const commonReasons = r.commonReasons as string[];
  const whatWeReview = r.whatWeReview as string[];
  const faqs = r.faqs as { question: string; answer: string }[];

  const faqJsonLd = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  } : null;

  return (
    <>
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Visa Refusal Assistance", href: "/visa-refusal" },
          { label: r.country },
        ]}
      />
      <PageHero eyebrow="Refusal Guidance" title={`${r.country} Visa Refusal`} description={r.intro}>
        {country && (
          <div className="mt-6">
            <Button href={`/visas/${country.slug}`} variant="outline" icon={<ArrowRight size={16} />} iconPosition="right">
              View {country.name} Visa Requirements
            </Button>
          </div>
        )}
      </PageHero>

      <Container className="grid grid-cols-1 gap-12 py-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="font-heading text-xl font-bold text-charcoal">Common Reasons for Refusal</h2>
          <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-text-muted">
            {commonReasons.map((reason) => (
              <li key={reason} className="flex items-start gap-2">
                <ShieldAlert size={16} className="mt-0.5 shrink-0 text-primary" /> {reason}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">What We Review</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-text-muted">
            {whatWeReview.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> {item}
              </li>
            ))}
          </ul>

          {r.specialNote && (
            <div className="mt-10 rounded-[var(--radius-md)] border border-primary/30 bg-primary-tint p-5 text-sm leading-relaxed text-charcoal">
              {r.specialNote}
            </div>
          )}

          <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Frequently Asked Questions</h2>
          <div className="mt-4">
            <FAQAccordion items={faqs} />
          </div>

          <p className="mt-8 text-xs leading-relaxed text-text-muted">
            Visa decisions are made solely by the relevant embassy, consulate or immigration authority. Ali Baba
            Travel Advisor provides consultancy and documentation assistance and does not guarantee visa approval.
          </p>
        </div>

        <div className="h-fit rounded-[var(--radius-lg)] border border-border bg-surface p-6 lg:sticky lg:top-24">
          <h2 className="font-heading text-lg font-bold text-charcoal">Discuss My Case</h2>
          <p className="mt-1.5 text-sm text-text-muted">Share your refusal details and we&rsquo;ll review your options.</p>
          <div className="mt-5">
            <RefusalCaseForm defaultCountry={r.country} whatsappNumber={settings.whatsappNumber} />
          </div>
        </div>
      </Container>
    </>
  );
}
