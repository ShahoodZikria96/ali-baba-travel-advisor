"use client";

import { useState, type ComponentType } from "react";
import { PenLine, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ReviewForm = ComponentType<{ onDone?: () => void }>;

export function WriteReviewCTA() {
  const [open, setOpen] = useState(false);
  // The form pulls in react-hook-form + zod (~90KB), so it is fetched only on the first click
  // (a plain import() on demand, not next/dynamic, which would preload the chunk).
  const [Form, setForm] = useState<ReviewForm | null>(null);

  function toggle() {
    setOpen((v) => !v);
    if (!Form) {
      import("@/components/forms/WriteReviewForm").then((m) => setForm(() => m.WriteReviewForm as ReviewForm));
    }
  }

  return (
    <div className="mx-auto mt-6 max-w-2xl">
      <div className="flex justify-center">
        <button
          type="button"
          onClick={toggle}
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
                {Form ? <Form onDone={() => setOpen(false)} /> : <p className="text-sm text-text-muted">Loading…</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
