"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FAQItem {
  question: string;
  answer: string;
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border rounded-[var(--radius-md)] border border-border bg-surface">
      {items.map((item, i) => (
        <div key={item.question}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[0.95rem] font-semibold text-charcoal"
          >
            {item.question}
            <ChevronDown
              size={18}
              className={cn("shrink-0 text-text-muted transition-transform", open === i && "rotate-180")}
            />
          </button>
          {open === i && (
            <div className="px-5 pb-4 text-sm leading-relaxed text-text-muted">{item.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
}
