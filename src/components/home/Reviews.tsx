import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sampleReviews } from "@/data/placeholders";

export function Reviews() {
  return (
    <section className="border-y border-border bg-surface-muted/60 py-16 lg:py-20">
      <Container>
        <SectionHeading align="center" eyebrow="Client Reviews" title="What Our Clients Say" className="mx-auto" />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {sampleReviews.map((review, i) => (
            <div key={i} className="rounded-[var(--radius-md)] border border-border bg-surface p-6">
              <div className="flex items-center gap-0.5 text-primary">
                {Array.from({ length: review.rating }).map((_, idx) => (
                  <Star key={idx} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="mt-4 text-xs font-semibold text-text-muted">
                {review.name} &middot; {review.source}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
