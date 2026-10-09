import { Star } from "lucide-react";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Link to the business's Google reviews. The count (and the rating, once it is set in
 * data/site.ts) is typed in by hand, not pulled from Google, so keep it in step with the profile.
 */
export function GoogleReviewsBadge({ className, align = "left" }: { className?: string; align?: "left" | "center" }) {
  const { url, count, rating } = siteConfig.googleReviews;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-3 rounded-full border border-border bg-surface px-4 py-2 text-sm transition-colors hover:border-primary",
        align === "center" && "mx-auto",
        className
      )}
    >
      <span className="flex items-center gap-0.5 text-[#f5a623]" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
        ))}
      </span>
      <span className="font-semibold text-charcoal">
        {rating ? `${rating} on Google` : "Rated on Google"}
        <span className="font-normal text-text-muted"> · {count} reviews</span>
      </span>
      <span className="font-semibold text-primary">Read reviews →</span>
    </a>
  );
}
