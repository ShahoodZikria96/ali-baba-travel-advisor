import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { servicePages } from "@/data/servicePages";

export const metadata: Metadata = {
  title: "Visa Consultancy Services",
  description: "Professional visa consultancy for visit, business, family visit and study visas — documentation support for Pakistani applicants.",
};

export default function VisaConsultancyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Visa Consultancy" }]} />
      <PageHero
        eyebrow="Visa Consultancy"
        title="Professional Visa Consultancy Services"
        description="From visit visas to study visas, our consultants help Pakistani applicants prepare thorough, well-documented visa applications."
      />
      <Container className="py-14">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {servicePages.map((service) => (
            <Link
              key={service.slug}
              href={`/visa-consultancy/${service.slug}`}
              className="group rounded-[var(--radius-lg)] border border-border bg-surface p-6 transition-colors hover:border-primary"
            >
              <p className="font-heading text-lg font-bold text-charcoal">{service.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{service.intro}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-charcoal group-hover:text-primary">
                Learn More <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/consultation">Get Visa Assessment</Button>
          <Button href="/visa-refusal" variant="outline">Previously Refused? Get Help</Button>
        </div>
      </Container>
    </>
  );
}
