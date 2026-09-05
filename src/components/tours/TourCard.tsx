import Link from "next/link";
import { CalendarDays, MapPin, ShieldCheck } from "lucide-react";
import type { TourPackage } from "@/data/tours";

export function TourCard({ tour }: { tour: TourPackage }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface">
      <div className="flex h-32 items-center justify-center bg-gradient-to-br from-charcoal to-primary-dark">
        <MapPin className="text-white/70" size={28} />
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
