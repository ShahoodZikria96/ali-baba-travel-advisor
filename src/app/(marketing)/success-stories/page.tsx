import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ReviewsGrid } from "@/components/reviews/ReviewsGrid";
import { WriteReviewCTA } from "@/components/home/WriteReviewCTA";
import { getSuccessStories, getTestimonials } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Client Reviews & Case Examples",
  description: "Client reviews and anonymised examples of the visa and travel cases Ali Baba Travel Advisor supports. No guaranteed outcomes.",
  path: "/success-stories",
});

export default async function SuccessStoriesPage() {
  const [sampleSuccessStories, sampleReviews] = await Promise.all([getSuccessStories(), getTestimonials()]);

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Success Stories" }]} />
      <PageHero
        eyebrow="Case Examples"
        title="The Kinds of Cases We Handle"
        description="A look at the kinds of cases we support — from first-time applications to reapplications after a previous refusal."
      />

      <Container className="py-14">
        <p className="mb-5 max-w-2xl text-xs leading-relaxed text-text-muted">
          These are illustrative summaries of case types, not individual client testimonials, and they do not
          imply that any application will be approved.
        </p>
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
        <ReviewsGrid initial={sampleReviews} />
        <WriteReviewCTA />

        <div className="mt-10">
          <Button href="/consultation">Get Visa Assessment</Button>
        </div>
      </Container>
    </>
  );
}
