import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WriteReviewCTA } from "@/components/home/WriteReviewCTA";
import { ReviewsGrid } from "@/components/reviews/ReviewsGrid";
import { GoogleReviewsBadge } from "@/components/reviews/GoogleReviewsBadge";
import { getTestimonials } from "@/lib/content";

export async function Reviews() {
  const testimonials = await getTestimonials();

  return (
    <section className="border-y border-border bg-surface-muted/60 py-16 lg:py-20">
      <Container>
        <SectionHeading align="center" eyebrow="Client Reviews" title="What Our Clients Say" className="mx-auto" />
        <div className="mt-6 flex justify-center"><GoogleReviewsBadge /></div>
        <ReviewsGrid initial={testimonials} tilt showSummary />
        <WriteReviewCTA />
      </Container>
    </section>
  );
}
