import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { VisaAssessmentForm } from "@/components/forms/VisaAssessmentForm";
import { pageMetadata, absoluteUrl, orgId } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { officialSources } from "@/data/officialSources";
import { getGuides } from "@/lib/content";
import { getCountries, getCountry, getRefusalPage, getOffices, getSiteSettings, getServicePages, getTours } from "@/lib/content";
import { relatedCountries as getRelatedCountries, toursForCountry } from "@/lib/related";

export async function generateStaticParams() {
  const countries = await getCountries();
  return countries.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const country = await getCountry(slug);
  if (!country) return {};
  return pageMetadata({
    title: country.metaTitle || `${country.name} Visa from Pakistan`,
    description: country.metaDescription || country.description,
    path: `/visas/${slug}`,
    image: country.heroImage ?? `/destinations/${slug}.webp`,
  });
}

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = await getCountry(slug);
  if (!country) notFound();

  const [refusalPage, offices, settings, allCountries, services, allTours] = await Promise.all([
    getRefusalPage(slug),
    getOffices(),
    getSiteSettings(),
    getCountries(),
    getServicePages(),
    getTours(),
  ]);
  const hasRefusalPage = Boolean(refusalPage);
  const relatedCountries = getRelatedCountries(slug, allCountries, 6);
  const countryTours = toursForCountry(country, allTours);

  const whoCanApply = country.whoCanApply as string[] | null;
  const visaTypes = country.visaTypes as { name: string; description: string }[] | null;
  const documents = country.documents as string[] | null;
  const steps = country.steps as string[] | null;
  const refusalReasons = country.refusalReasons as string[] | null;
  const faqs = country.faqs as { question: string; answer: string }[] | null;
  const filled = (a: unknown[] | null | undefined) => Array.isArray(a) && a.length > 0;
  const hasRichContent = [whoCanApply, visaTypes, documents, steps, refusalReasons, faqs].some(filled);

  const [allGuides] = await Promise.all([getGuides()]);
  const matchedGuides = allGuides.filter(
    (g) => g.slug.includes(slug) || g.title.toLowerCase().includes(country.name.toLowerCase())
  );
  // No guide for this country: fall back to the evergreen guides that apply to any destination.
  const evergreenGuides = allGuides.filter((g) => /business-visa|travel-history/.test(g.slug));
  const relatedGuides = (matchedGuides.length > 0 ? matchedGuides : evergreenGuides).slice(0, 3);
  const sources = officialSources[slug] ?? [];
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${country.name} visa consultancy for Pakistani applicants`,
    serviceType: "Visa consultancy and application assistance",
    description: country.description,
    url: absoluteUrl(`/visas/${slug}`),
    provider: { "@id": orgId },
    areaServed: { "@type": "Country", name: "Pakistan" },
  };

  return (
    <>
      <FaqJsonLd faqs={faqs} />
      <JsonLd data={serviceJsonLd} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Visas", href: "/visas" }, { label: country.name }]} />
      <div className="relative h-48 w-full overflow-hidden sm:h-64">
        <Image
          src={country.heroImage ?? `/destinations/${slug}.webp`}
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
            {filled(whoCanApply) && (
              <>
                <h2 className="mb-4 font-heading text-xl font-bold text-charcoal">Who Can Apply</h2>
                <ul className="mb-10 space-y-2 text-sm leading-relaxed text-text-muted">
                  {whoCanApply?.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success" /> {item}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {filled(visaTypes) && (
              <>
                <h2 className="mb-4 font-heading text-xl font-bold text-charcoal">Visa Types</h2>
                <div className="mb-10 space-y-3">
                  {visaTypes?.map((type) => (
                    <div key={type.name} className="rounded-[var(--radius-md)] border border-border bg-surface p-4">
                      <p className="font-semibold text-charcoal">{type.name}</p>
                      <p className="mt-1 text-sm text-text-muted">{type.description}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {filled(documents) && (
              <>
                <h2 className="mb-4 font-heading text-xl font-bold text-charcoal">Required Documents</h2>
                <ul className="mb-10 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {documents?.map((doc) => (
                    <li key={doc} className="flex items-start gap-2 text-sm leading-relaxed text-text-muted">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> {doc}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {country.financialNote && (
              <>
                <h2 className="mb-3 font-heading text-xl font-bold text-charcoal">Financial Documentation</h2>
                <p className="mb-10 text-sm leading-relaxed text-text-muted">{country.financialNote}</p>
              </>
            )}

            {country.processingTime && (
              <>
                <h2 className="mb-3 font-heading text-xl font-bold text-charcoal">Processing Information</h2>
                <p className="mb-10 text-sm leading-relaxed text-text-muted">{country.processingTime}</p>
              </>
            )}

            {filled(steps) && (
              <>
                <h2 className="mb-4 font-heading text-xl font-bold text-charcoal">Application Process</h2>
                <ol className="mb-10 space-y-3">
                  {steps?.map((step, i) => (
                    <li key={step} className="flex items-start gap-3 text-sm leading-relaxed text-text-muted">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-tint text-xs font-bold text-primary">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </>
            )}

            {filled(refusalReasons) && (
              <>
                <h2 className="mb-4 font-heading text-xl font-bold text-charcoal">Common Reasons for Refusal</h2>
                <ul className="mb-10 space-y-2 text-sm leading-relaxed text-text-muted">
                  {refusalReasons?.map((reason) => (
                    <li key={reason} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> {reason}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <h2 className="font-heading text-xl font-bold text-charcoal">How Ali Baba Travel Advisor Can Help</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              Our consultants assess your case, prepare a tailored document checklist, and guide you through
              submission — whether this is your first application or a reapplication after a previous refusal.
              See <Link href="/visa-process" className="font-semibold text-primary hover:text-primary-dark">how our visa process works</Link>
              {services.some((s) => s.slug === "bank-statement-assistance") && (
                <>
                  {" "}or get help with your{" "}
                  <Link href="/visa-consultancy/bank-statement-assistance" className="font-semibold text-primary hover:text-primary-dark">bank statement</Link>
                </>
              )}
              {services.some((s) => s.slug === "file-submission") && (
                <>
                  {" "}and{" "}
                  <Link href="/visa-consultancy/file-submission" className="font-semibold text-primary hover:text-primary-dark">{country.name} visa file submission</Link>
                </>
              )}
              .
            </p>

            {filled(faqs) && (
              <>
                <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Frequently Asked Questions</h2>
                <div className="mt-4">
                  <FAQAccordion items={faqs ?? []} />
                </div>
              </>
            )}

            {sources.length > 0 && (
              <>
                <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Official Sources</h2>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  Requirements, fees and processing times change. Always confirm the current position on the
                  official website before you apply.
                </p>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {sources.map((src) => (
                    <li key={src.href}>
                      <a href={src.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:text-primary-dark">
                        {src.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Related Help</h2>
            <ul className="mt-3 space-y-1.5 text-sm sm:columns-2 sm:gap-8 sm:space-y-0 [&>li]:break-inside-avoid [&>li]:py-0.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/visa-consultancy/${s.slug}`} className="font-semibold text-primary hover:text-primary-dark">
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={hasRefusalPage ? `/visa-refusal/${slug}` : "/visa-refusal"} className="font-semibold text-primary hover:text-primary-dark">
                  {hasRefusalPage ? `${country.name} visa refusal case review` : "Visa refusal assistance"}
                </Link>
              </li>
              {countryTours.map((t) => (
                <li key={t.slug}>
                  <Link href={`/tour-packages/${t.slug}`} className="font-semibold text-primary hover:text-primary-dark">
                    {t.destination} group tour from Pakistan
                  </Link>
                </li>
              ))}
              <li><Link href="/flights" className="font-semibold text-primary hover:text-primary-dark">Flight booking for your {country.name} trip</Link></li>
              <li><Link href="/hotel-booking" className="font-semibold text-primary hover:text-primary-dark">Hotel booking worldwide</Link></li>
              <li><Link href="/faqs" className="font-semibold text-primary hover:text-primary-dark">Visa and travel FAQs</Link></li>
              {relatedGuides.map((g) => (
                <li key={g.slug}><Link href={`/guides/${g.slug}`} className="font-semibold text-primary hover:text-primary-dark">{g.title}</Link></li>
              ))}
            </ul>

            <p className="mt-8 text-xs leading-relaxed text-text-muted">
              Information last reviewed {new Date(country.updatedAt).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}.
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
              <Link href={`/locations/${offices[0].slug}`} className="mt-1.5 block text-sm text-charcoal hover:text-primary">
                {offices[0].city} — {offices[0].address}
              </Link>
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

      {relatedCountries.length > 0 && (
        <Container className="border-t border-border py-14">
          <h2 className="font-heading text-xl font-bold text-charcoal">Related Visa Destinations</h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {relatedCountries.map((c) => (
              <Link
                key={c.slug}
                href={`/visas/${c.slug}`}
                className="group flex items-center justify-between gap-2 rounded-[var(--radius-md)] border border-border bg-surface px-4 py-3 text-sm font-semibold text-charcoal hover:border-primary hover:text-primary"
              >
                {c.name} visa from Pakistan
                <ArrowRight size={14} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
          <p className="mt-5 text-sm">
            <Link href="/visas" className="font-semibold text-primary hover:text-primary-dark">Browse visa requirements for all countries →</Link>
          </p>
        </Container>
      )}
    </>
  );
}
