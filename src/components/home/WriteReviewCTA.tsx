"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PenLine, X } from "lucide-react";
import { WriteReviewForm } from "@/components/forms/WriteReviewForm";

export function WriteReviewCTA() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto mt-6 max-w-2xl">
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary-tint px-4 py-2 text-sm font-bold text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white"
        >
          {open ? <X size={15} /> : <PenLine size={15} />}
          {open ? "Close" : "Write a Review"}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-5 rounded-[var(--radius-lg)] border border-border bg-surface p-6 text-left shadow-[0_16px_40px_rgba(29,26,25,0.08)]">
              <p className="font-heading text-base font-bold text-charcoal">Share Your Experience</p>
              <p className="mt-1 text-sm text-text-muted">
                Your review is checked by our team before it appears publicly.
              </p>
              <div className="mt-4">
                <WriteReviewForm onDone={() => setOpen(false)} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
