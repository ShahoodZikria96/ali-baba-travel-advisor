import type { Metadata } from "next";
import Image from "next/image";
import { Star } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { sampleSuccessStories, sampleReviews } from "@/data/placeholders";

export const metadata: Metadata = {
  title: "Success Stories",
  description: "Client outcomes and reviews from Ali Baba Travel Advisor's visa consultancy and travel planning clients.",
};

export default function SuccessStoriesPage() {
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
          {sampleSuccessStories.map((story, i) => (
            <div key={i} className="rounded-[var(--radius-md)] border border-border bg-surface p-5">
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
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:max-w-2xl">
          {sampleReviews.map((review) => (
            <div key={review.name} className="rounded-[var(--radius-md)] border border-border bg-surface p-6">
              <div className="flex items-center gap-0.5 text-primary">
                {Array.from({ length: review.rating }).map((_, idx) => (
                  <Star key={idx} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text">&ldquo;{review.text}&rdquo;</p>
              <div className="mt-4 flex items-center gap-2.5">
                <Image src={review.photo} alt={review.name} width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
                <p className="text-xs font-semibold text-text-muted">{review.name} &middot; {review.location}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Button href="/consultation">Get Visa Assessment</Button>
        </div>
      </Container>
    </>
  );
}
