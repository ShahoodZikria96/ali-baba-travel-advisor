import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { sampleSuccessStories } from "@/data/placeholders";

export function SuccessStories() {
  return (
    <section className="py-16 lg:py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Client Outcomes" title="Real Clients. Real Journeys." />
          <Button href="/success-stories" variant="outline" size="sm">
            View More Success Stories
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sampleSuccessStories.map((story, i) => (
            <div key={i} className="rounded-[var(--radius-md)] border border-border bg-surface p-5">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-primary-tint px-2.5 py-1 text-xs font-bold text-primary">
                  {story.country}
                </span>
                <span className="text-xs font-medium text-text-muted">{story.period}</span>
              </div>
              <p className="mt-3 font-heading text-sm font-bold text-charcoal">
                {story.category}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
                {story.summary}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
