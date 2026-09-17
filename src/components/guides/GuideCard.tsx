import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import type { Guide } from "@prisma/client";

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="card-hover group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface"
    >
      <div className="relative h-40 w-full">
        <Image
          src={guide.image}
          alt={guide.title}
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs font-bold uppercase tracking-[0.06em] text-primary">{guide.category}</span>
        <p className="mt-2 font-heading text-base font-bold leading-snug text-charcoal">{guide.title}</p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{guide.excerpt}</p>
        <div className="mt-4 flex items-center gap-3 text-xs text-text-muted">
          <span>{new Date(guide.publishedDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
          <span className="flex items-center gap-1">
            <Clock size={12} /> {guide.readingTime}
          </span>
        </div>
      </div>
    </Link>
  );
}
