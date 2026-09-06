import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldAlert } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getRefusalPages } from "@/lib/content";

export const metadata: Metadata = {
  title: "Visa Refusal Assistance",
  description: "Case review and reapplication guidance for applicants who have received a previous visa refusal — UK, Canada, Schengen, Australia and USA.",
};

const commonFactors = [
  "Financial evidence that doesn't match declared income",
  "Weak or unclear ties to Pakistan (home, job, family, business)",
  "Unclear or implausible purpose of visit",
  "Travel history not properly presented",
  "Sponsor documentation not meeting the required standard",
  "Inconsistencies between the application and supporting documents",
];

export default async function VisaRefusalHubPage() {
  const refusalPages = await getRefusalPages();

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Visa Refusal Assistance" }]} />
      <PageHero
        eyebrow="Complex & Refused Cases"
        title="Previously Refused? Get Your Case Reviewed."
        description="Our consultants regularly assist applicants who have received a previous visa refusal, helping assess the refusal grounds and plan a stronger reapplication."
      >
        <div className="mt-6">
          <Button href="/consultation">Discuss My Case</Button>
        </div>
      </PageHero>

      <Container className="py-14">
        <h2 className="font-heading text-xl font-bold text-charcoal">Common Refusal Reasons</h2>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {commonFactors.map((factor) => (
            <div key={factor} className="flex items-start gap-2.5 rounded-[var(--radius-md)] border border-border bg-surface p-4 text-sm text-text-muted">
              <ShieldAlert size={16} className="mt-0.5 shrink-0 text-primary" />
              {factor}
            </div>
          ))}
        </div>

        <h2 className="mt-12 font-heading text-xl font-bold text-charcoal">Country-Specific Refusal Guidance</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {refusalPages.map((r) => (
            <Link
              key={r.slug}
              href={`/visa-refusal/${r.slug}`}
              className="group rounded-[var(--radius-lg)] border border-border bg-surface p-6 transition-colors hover:border-primary"
            >
              <p className="font-heading text-lg font-bold text-charcoal">{r.country}</p>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{r.intro}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-charcoal group-hover:text-primary">
                Refusal Guidance <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-10 max-w-2xl text-xs leading-relaxed text-text-muted">
          Ali Baba Travel Advisor provides visa consultancy and documentation assistance. Where formal legal
          representation is required, such as judicial review proceedings, we coordinate with qualified legal
          counsel — this is distinct from regulated legal representation.
        </p>
      </Container>
    </>
  );
}
