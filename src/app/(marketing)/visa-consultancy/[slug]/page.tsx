import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { VisaAssessmentForm } from "@/components/forms/VisaAssessmentForm";
import { getServicePages, getServicePage, getSiteSettings } from "@/lib/content";

export async function generateStaticParams() {
  const servicePages = await getServicePages();
  return servicePages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServicePage(slug);
  if (!service) return {};
  return { title: service.title, description: service.metaDescription ?? undefined };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [service, settings] = await Promise.all([getServicePage(slug), getSiteSettings()]);
  if (!service) notFound();

  const highlights = service.highlights as string[];
  const process = service.process as string[];
  const faqs = service.faqs as { question: string; answer: string }[];

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Visa Consultancy", href: "/visa-consultancy" },
          { label: service.title },
        ]}
      />
      <PageHero eyebrow="Visa Consultancy" title={service.title} description={service.intro}>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/consultation">Get Visa Assessment</Button>
        </div>
      </PageHero>

      <Container className="grid grid-cols-1 gap-12 py-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="font-heading text-xl font-bold text-charcoal">What&rsquo;s Included</h2>
          <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-text-muted">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {h}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Our Process</h2>
          <ol className="mt-4 space-y-3">
            {process.map((step, i) => (
              <li key={step} className="flex items-start gap-3 text-sm leading-relaxed text-text-muted">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-tint text-xs font-bold text-primary">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>

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
          <h2 className="font-heading text-lg font-bold text-charcoal">Request an Assessment</h2>
          <p className="mt-1.5 text-sm text-text-muted">Tell us about your travel plan and we&rsquo;ll get back to you.</p>
          <div className="mt-5">
            <VisaAssessmentForm whatsappNumber={settings.whatsappNumber} />
          </div>
        </div>
      </Container>
    </>
  );
}
