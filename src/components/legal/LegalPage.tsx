import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";

export function LegalPage({ title, crumb, updated, children }: { title: string; crumb: string; updated: string; children: ReactNode }) {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: crumb }]} />
      <PageHero eyebrow="Legal" title={title} />
      <Container className="py-14">
        <div className="mx-auto max-w-[760px] space-y-5 text-sm leading-relaxed text-text-muted [&_h2]:pt-3 [&_h2]:font-heading [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-charcoal [&_a]:font-semibold [&_a]:text-primary [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
          <p className="text-xs">Last updated: {updated}</p>
          {children}
        </div>
      </Container>
    </>
  );
}
