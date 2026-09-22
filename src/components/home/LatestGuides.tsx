import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { GuideCard } from "@/components/guides/GuideCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { getGuides } from "@/lib/content";

export async function LatestGuides() {
  const guides = await getGuides();
  if (guides.length === 0) return null;

  return (
    <section className="border-y border-border bg-surface-muted/60 py-16 lg:py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Visa &amp; Travel Guides" title="Latest From Our Blog" />
          <Button href="/guides" variant="outline" size="sm">
            View All Guides
          </Button>
        </div>

        <RevealGroup className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guides.slice(0, 3).map((guide) => (
            <RevealItem key={guide.slug}>
              <GuideCard guide={guide} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
