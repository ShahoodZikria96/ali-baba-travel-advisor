import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { VisaAssessmentForm } from "@/components/forms/VisaAssessmentForm";
import { getCountries, getCountry, getRefusalPage, getOffices, getSiteSettings } from "@/lib/content";

export async function generateStaticParams() {
  const countries = await getCountries();
  return countries.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const country = await getCountry(slug);
  if (!country) return {};
  return {
    title: country.metaTitle ?? `${country.name} Visa from Pakistan`,
    description: country.metaDescription ?? country.description,
  };
}

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = await getCountry(slug);
  if (!country) notFound();

  const [refusalPage, offices, settings] = await Promise.all([getRefusalPage(slug), getOffices(), getSiteSettings()]);
  const hasRefusalPage = Boolean(refusalPage);
  const hasRichContent = Boolean(country.whoCanApply);

  const whoCanApply = country.whoCanApply as string[] | null;
  const visaTypes = country.visaTypes as { name: string; description: string }[] | null;
  const documents = country.documents as string[] | null;
  const steps = country.steps as string[] | null;
  const refusalReasons = country.refusalReasons as string[] | null;
  const faqs = country.faqs as { question: string; answer: string }[] | null;

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Visas", href: "/visas" }, { label: country.name }]} />
      <div className="relative h-48 w-full overflow-hidden sm:h-64">
        <Image
          src={country.heroImage ?? `/destinations/${slug}.jpg`}
          alt={`${country.name} landmark`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
      </div>
      <PageHero
        eyebrow={country.visaType}
        title={`${country.name} Visit Visa from Pakistan`}
        description={country.intro ?? country.description}
      >
        <div className="mt-3 flex items-center gap-3">
          {country.flagImage && (
            <Image src={country.flagImage} alt={`${country.name} flag`} width={48} height={30} className="h-7 w-11 rounded-sm object-cover" />
          )}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/consultation">Get Visa Assessment</Button>
          <Button href={hasRefusalPage ? `/visa-refusal/${slug}` : "/visa-refusal"} variant="outline">
            Previously Refused for {country.name}?
          </Button>
        </div>
      </PageHero>

      {hasRichContent ? (
        <Container className="grid grid-cols-1 gap-12 py-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="font-heading text-xl font-bold text-charcoal">Who Can Apply</h2>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-text-muted">
              {whoCanApply?.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success" /> {item}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Visa Types</h2>
            <div className="mt-4 space-y-3">
              {visaTypes?.map((type) => (
                <div key={type.name} className="rounded-[var(--radius-md)] border border-border bg-surface p-4">
                  <p className="font-semibold text-charcoal">{type.name}</p>
                  <p className="mt-1 text-sm text-text-muted">{type.description}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Required Documents</h2>
            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {documents?.map((doc) => (
                <li key={doc} className="flex items-start gap-2 text-sm leading-relaxed text-text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> {doc}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Financial Documentation</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">{country.financialNote}</p>

            <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Processing Information</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">{country.processingTime}</p>

            <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Application Process</h2>
            <ol className="mt-4 space-y-3">
              {steps?.map((step, i) => (
                <li key={step} className="flex items-start gap-3 text-sm leading-relaxed text-text-muted">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-tint text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

            <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Common Reasons for Refusal</h2>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-text-muted">
              {refusalReasons?.map((reason) => (
                <li key={reason} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> {reason}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">How Ali Baba Travel Advisor Can Help</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              Our consultants assess your case, prepare a tailored document checklist, and guide you through
              submission — whether this is your first application or a reapplication after a previous refusal.
            </p>

            <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Frequently Asked Questions</h2>
            <div className="mt-4">
              <FAQAccordion items={faqs ?? []} />
            </div>

            <p className="mt-8 text-xs leading-relaxed text-text-muted">
              Visa decisions are made solely by the relevant embassy, consulate or immigration authority. Ali Baba
              Travel Advisor provides consultancy and documentation assistance and does not guarantee visa approval.
            </p>
          </div>

          <div className="h-fit rounded-[var(--radius-lg)] border border-border bg-surface p-6 lg:sticky lg:top-24">
            <h2 className="font-heading text-lg font-bold text-charcoal">Get Your {country.name} Visa Assessed</h2>
            <p className="mt-1.5 text-sm text-text-muted">Tell us about your travel plan and we&rsquo;ll get back to you.</p>
            <div className="mt-5">
              <VisaAssessmentForm defaultCountry={country.name} whatsappNumber={settings.whatsappNumber} />
            </div>
            <div className="mt-6 border-t border-border pt-5">
              <p className="text-xs font-bold uppercase tracking-wide text-text-muted">Nearest Office</p>
              <p className="mt-1.5 text-sm text-charcoal">{offices[0].city} — {offices[0].address}</p>
            </div>
          </div>
        </Container>
      ) : (
        <Container className="py-14">
          <p className="max-w-2xl text-sm leading-relaxed text-text-muted">
            {country.description} Contact our consultants for a full assessment of {country.name} visa requirements,
            documentation and processing timelines.
          </p>
          <div className="mt-6">
            <Button href="/consultation">Get Visa Assessment</Button>
          </div>
        </Container>
      )}
    </>
  );
}
