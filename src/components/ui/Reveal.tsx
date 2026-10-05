"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll-reveal without a JS animation library: an IntersectionObserver flips
 * `data-in`, and the transition itself lives in CSS (see `.reveal` in
 * globals.css). This keeps hundreds of reveal wrappers cheap to hydrate.
 */
function useSeenOnce<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setSeen(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);

  return [ref, seen] as const;
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const [ref, seen] = useSeenOnce<HTMLDivElement>();
  return (
    <div
      ref={ref}
      data-in={seen}
      className={cn("reveal", className)}
      style={{ "--reveal-y": `${y}px`, "--reveal-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}

export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const [ref, seen] = useSeenOnce<HTMLDivElement>();
  return (
    <div ref={ref} data-in={seen} className={cn(className)} style={{ "--stagger": `${stagger}s` } as CSSProperties}>
      {children}
    </div>
  );
}

export function RevealItem({ children, className, y = 20 }: { children: ReactNode; className?: string; y?: number }) {
  return (
    <div className={cn("reveal-item", className)} style={{ "--reveal-y": `${y}px` } as CSSProperties}>
      {children}
    </div>
  );
}
