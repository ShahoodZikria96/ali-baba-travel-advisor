import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the leadership behind Ali Baba Travel Advisor's visa consultancy and travel advisory services.",
};

export default function TeamPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Team" }]} />
      <PageHero
        eyebrow="Leadership"
        title="Meet Our Team"
        description="The people behind Ali Baba Travel Advisor's visa consultancy and travel planning."
      />

      <Container className="py-14">
        <div className="max-w-sm rounded-[var(--radius-lg)] border border-border bg-surface p-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-tint font-heading text-3xl font-extrabold text-primary">
            SAJ
          </div>
          <p className="mt-4 font-heading text-lg font-bold text-charcoal">Syed Ali Jawad</p>
          <p className="text-sm font-semibold text-primary">Chief Executive Officer</p>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">
            Leads Ali Baba Travel Advisor&rsquo;s visa consultancy and travel advisory operations across Lahore,
            Islamabad, Wazirabad and the newly opened Karachi office.
          </p>
        </div>

        <p className="mt-8 max-w-xl text-sm text-text-muted">
          A full leadership photo and extended team profiles are being finalized and will be added here shortly.
        </p>
      </Container>
    </>
  );
}
