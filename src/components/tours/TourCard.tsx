import Link from "next/link";
import Image from "next/image";
import { CalendarDays, ShieldCheck } from "lucide-react";
import type { Tour } from "@prisma/client";

export function TourCard({ tour }: { tour: Tour }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface">
      <div className="relative h-32 w-full">
        <Image src={tour.image} alt={tour.destination} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
      </div>
      <div className="p-5">
        <p className="font-heading text-lg font-bold text-charcoal">{tour.destination}</p>
        <div className="mt-2 flex items-center gap-1.5 text-sm text-text-muted">
          <CalendarDays size={14} />
          {tour.departure} &middot; {tour.duration}
        </div>
        {tour.visaAssistance && (
          <div className="mt-1.5 flex items-center gap-1.5 text-sm text-success">
            <ShieldCheck size={14} />
            Visa Assistance Included
          </div>
        )}
        <div className="mt-4 flex items-center justify-between">
          <span className="font-heading text-base font-extrabold text-primary">{tour.price}</span>
          <Link href={`/tour-packages/${tour.slug}`} className="text-sm font-bold text-charcoal hover:text-primary">
            View Package →
          </Link>
        </div>
      </div>
    </div>
  );
}
