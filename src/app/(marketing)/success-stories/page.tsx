import type { Metadata } from "next";
import { Star, Quote, BadgeCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { WriteReviewCTA } from "@/components/home/WriteReviewCTA";
import { getSuccessStories, getTestimonials } from "@/lib/content";

export const metadata: Metadata = {
  title: "Success Stories",
  description: "Client outcomes and reviews from Ali Baba Travel Advisor's visa consultancy and travel planning clients.",
};

export default async function SuccessStoriesPage() {
  const [sampleSuccessStories, sampleReviews] = await Promise.all([getSuccessStories(), getTestimonials()]);

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Success Stories" }]} />
      <PageHero
        eyebrow="Client Outcomes"
        title="Real Clients. Real Journeys."
        description="A look at the kinds of cases we support — from first-time applications to reapplications after a previous refusal."
      />

      <Container className="py-14">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sampleSuccessStories.map((story) => (
            <div key={story.id} className="card-hover rounded-[var(--radius-md)] border border-border bg-surface p-5">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-primary-tint px-2.5 py-1 text-xs font-bold text-primary">{story.country}</span>
                <span className="text-xs font-medium text-text-muted">{story.period}</span>
              </div>
              <p className="mt-3 font-heading text-sm font-bold text-charcoal">{story.category}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{story.summary}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-16 font-heading text-xl font-bold text-charcoal">What Our Clients Say</h2>
        {sampleReviews.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:max-w-2xl">
            {sampleReviews.map((review) => (
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
                <p className="relative mt-3 text-sm leading-relaxed text-text">&ldquo;{review.text}&rdquo;</p>
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
        )}
        <WriteReviewCTA />

        <div className="mt-10">
          <Button href="/consultation">Get Visa Assessment</Button>
        </div>
      </Container>
    </>
  );
}
