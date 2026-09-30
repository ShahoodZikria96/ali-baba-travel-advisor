"use client";

import { useEffect, useMemo, useState } from "react";
import { Star, Quote, BadgeCheck, MessageSquareHeart } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { TiltCard } from "@/components/ui/TiltCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { Testimonial } from "@/lib/types";

type Live = { name: string; location: string; rating: number; text: string };

/**
 * Renders reviews. The build-time reviews appear immediately (and for search
 * engines); reviews approved in the PHP admin (/admin/) are fetched from
 * /api/reviews.php and added at runtime, so new reviews need no rebuild.
 */
export function ReviewsGrid({ initial, tilt = false, showSummary = false }: { initial: Testimonial[]; tilt?: boolean; showSummary?: boolean }) {
  const [live, setLive] = useState<Live[]>([]);

  useEffect(() => {
    let alive = true;
    fetch("/api/reviews.php", { cache: "no-cache" })
      .then((r) => (r.ok ? r.json() : []))
      .then((rows: unknown) => {
        if (alive && Array.isArray(rows)) setLive(rows as Live[]);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const reviews = useMemo(() => {
    const seen = new Set(initial.map((r) => `${r.name}|${r.text}`));
    const extra = live
      .filter((r) => r && typeof r.text === "string" && !seen.has(`${r.name}|${r.text}`))
      .map((r, i) => ({ id: `live${i}`, name: r.name, location: r.location, rating: Number(r.rating) || 5, text: r.text, photo: null as string | null }));
    return [...initial, ...extra];
  }, [initial, live]);

  const count = reviews.length;
  const average = count > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / count : 0;

  if (count === 0) {
    return (
      <div className="mx-auto mt-10 max-w-md rounded-[var(--radius-lg)] border border-dashed border-border bg-surface p-8 text-center">
        <MessageSquareHeart size={28} className="mx-auto text-primary" />
        <p className="mt-3 font-heading text-base font-bold text-charcoal">Be the First to Share Your Experience</p>
        <p className="mt-1.5 text-sm text-text-muted">Your review could be the first one visitors see.</p>
      </div>
    );
  }

  const card = (review: (typeof reviews)[number]) => (
    <div className="tilt-card-inner relative h-full overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface p-6">
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
          <p className="text-xs font-medium text-text-muted">{review.location} &middot; Client review</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {showSummary && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="flex items-center gap-0.5 text-primary">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star key={idx} size={16} fill={idx < Math.round(average) ? "currentColor" : "none"} strokeWidth={idx < Math.round(average) ? 0 : 1.5} />
            ))}
          </div>
          <p className="text-sm font-semibold text-text-muted">
            {average.toFixed(1)} out of 5 &middot; {count} review{count === 1 ? "" : "s"}
          </p>
        </div>
      )}
      <RevealGroup className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <RevealItem key={review.id}>
            {tilt ? (
              <TiltCard strength={5} className="h-full rounded-[var(--radius-lg)]">{card(review)}</TiltCard>
            ) : (
              card(review)
            )}
          </RevealItem>
        ))}
      </RevealGroup>
    </>
  );
}
