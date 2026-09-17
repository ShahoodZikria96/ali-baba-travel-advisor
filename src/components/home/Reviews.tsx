import { Star, Quote, BadgeCheck, MessageSquareHeart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Avatar } from "@/components/ui/Avatar";
import { TiltCard } from "@/components/ui/TiltCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { WriteReviewCTA } from "@/components/home/WriteReviewCTA";
import { getTestimonials } from "@/lib/content";

export async function Reviews() {
  const testimonials = await getTestimonials();
  const count = testimonials.length;
  const average = count > 0 ? testimonials.reduce((sum, r) => sum + r.rating, 0) / count : 0;

  return (
    <section className="border-y border-border bg-surface-muted/60 py-16 lg:py-20">
      <Container>
        <SectionHeading align="center" eyebrow="Client Reviews" title="What Our Clients Say" className="mx-auto" />

        {count > 0 && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex items-center gap-0.5 text-primary">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  size={16}
                  fill={idx < Math.round(average) ? "currentColor" : "none"}
                  strokeWidth={idx < Math.round(average) ? 0 : 1.5}
                />
              ))}
            </div>
            <p className="text-sm font-semibold text-text-muted">
              {average.toFixed(1)} out of 5 &middot; {count} review{count === 1 ? "" : "s"}
            </p>
          </div>
        )}

        {count > 0 ? (
          <RevealGroup className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:max-w-2xl sm:mx-auto">
            {testimonials.map((review) => (
              <RevealItem key={review.id}>
                <TiltCard strength={5} className="h-full rounded-[var(--radius-lg)]">
                  <div className="tilt-card-inner relative h-full overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface p-6">
                    <Quote size={64} className="pointer-events-none absolute -right-2 -top-3 text-primary-tint" strokeWidth={0} fill="currentColor" />
                    <div className="relative flex items-center gap-0.5 text-primary">
                      {Array.from({ length: review.rating }).map((_, idx) => (
                        <Star key={idx} size={14} fill="currentColor" strokeWidth={0} />
                      ))}
                    </div>
                    <p className="relative mt-3 text-sm leading-relaxed text-text">
                      &ldquo;{review.text}&rdquo;
                    </p>
                    <div className="relative mt-5 flex items-center gap-3 border-t border-border pt-4">
                      <Avatar src={review.photo} name={review.name} size={38} />
                      <div>
                        <p className="flex items-center gap-1 text-sm font-bold text-charcoal">
                          {review.name}
                          <BadgeCheck size={14} className="text-primary" />
                        </p>
                        <p className="text-xs font-medium text-text-muted">{review.location} &middot; Verified Client</p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <div className="mx-auto mt-10 max-w-md rounded-[var(--radius-lg)] border border-dashed border-border bg-surface p-8 text-center">
            <MessageSquareHeart size={28} className="mx-auto text-primary" />
            <p className="mt-3 font-heading text-base font-bold text-charcoal">Be the First to Share Your Experience</p>
            <p className="mt-1.5 text-sm text-text-muted">
              We&rsquo;re just getting started collecting reviews here — yours could be the first one visitors see.
            </p>
          </div>
        )}

        <WriteReviewCTA />
      </Container>
    </section>
  );
}
