"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { PenLine, X } from "lucide-react";
import { cn } from "@/lib/utils";

// The form pulls in react-hook-form + zod, so it is only downloaded when the visitor opens it.
const WriteReviewForm = dynamic(
  () => import("@/components/forms/WriteReviewForm").then((m) => m.WriteReviewForm),
  { ssr: false, loading: () => <p className="text-sm text-text-muted">Loading…</p> }
);

export function WriteReviewCTA() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto mt-6 max-w-2xl">
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary-tint px-4 py-2 text-sm font-bold text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white"
        >
          {open ? <X size={15} /> : <PenLine size={15} />}
          {open ? "Close" : "Write a Review"}
        </button>
      </div>

      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          {open && (
            <div className="mt-5 rounded-[var(--radius-lg)] border border-border bg-surface p-6 text-left shadow-[0_16px_40px_rgba(29,26,25,0.08)]">
              <p className="font-heading text-base font-bold text-charcoal">Share Your Experience</p>
              <p className="mt-1 text-sm text-text-muted">
                Your review is checked by our team before it appears publicly.
              </p>
              <div className="mt-4">
                <WriteReviewForm onDone={() => setOpen(false)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
