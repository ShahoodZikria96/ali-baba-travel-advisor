"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRatingInput({
  value,
  onChange,
  error,
}: {
  value: number;
  onChange: (value: number) => void;
  error?: boolean;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const active = hovered ?? value;

  return (
    <div className="flex items-center gap-1.5" onMouseLeave={() => setHovered(null)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          className={cn(
            "rounded-sm p-0.5 transition-transform hover:scale-110",
            error && "outline outline-1 outline-primary/40"
          )}
        >
          <Star
            size={26}
            className={active >= n ? "text-primary" : "text-border"}
            fill={active >= n ? "currentColor" : "none"}
            strokeWidth={active >= n ? 0 : 1.5}
          />
        </button>
      ))}
    </div>
  );
}
