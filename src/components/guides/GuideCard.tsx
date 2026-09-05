import Link from "next/link";
import { Clock } from "lucide-react";
import type { Guide } from "@/data/guides";

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group flex flex-col rounded-[var(--radius-lg)] border border-border bg-surface p-6 transition-colors hover:border-primary"
    >
      <span className="text-xs font-bold uppercase tracking-[0.06em] text-primary">{guide.category}</span>
      <p className="mt-2 font-heading text-base font-bold leading-snug text-charcoal">{guide.title}</p>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{guide.excerpt}</p>
      <div className="mt-4 flex items-center gap-3 text-xs text-text-muted">
        <span>{new Date(guide.publishedDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
        <span className="flex items-center gap-1">
          <Clock size={12} /> {guide.readingTime}
        </span>
      </div>
    </Link>
  );
}
