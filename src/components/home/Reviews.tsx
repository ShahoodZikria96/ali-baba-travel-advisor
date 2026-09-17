import { Star, Quote, BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Avatar } from "@/components/ui/Avatar";
import { getTestimonials } from "@/lib/content";

export async function Reviews() {
  const testimonials = await getTestimonials();

  return (
    <section className="border-y border-border bg-surface-muted/60 py-16 lg:py-20">
      <Container>
        <SectionHeading align="center" eyebrow="Client Reviews" title="What Our Clients Say" className="mx-auto" />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:max-w-2xl sm:mx-auto">
          {testimonials.map((review) => (
            <div
              key={review.id}
              className="card-hover relative overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface p-6"
            >
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
          ))}
        </div>
      </Container>
    </section>
  );
}
