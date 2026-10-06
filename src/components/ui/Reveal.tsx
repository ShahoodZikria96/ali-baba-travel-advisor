"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll-reveal without a JS animation library: an element flips `data-in` once its
 * top edge has entered the viewport (or been scrolled past), and the transition itself
 * lives in CSS (see `.reveal` in globals.css).
 *
 * One shared passive scroll listener checks every waiting element. An IntersectionObserver
 * was not enough: it only fires when an element *crosses* the viewport, so after a reload at
 * a scrolled position, an anchor jump or a fast fling, sections above the viewport were never
 * revealed and showed up as empty (dark or blank) bands.
 */
type Waiter = { el: HTMLElement; reveal: () => void };
const waiting = new Set<Waiter>();
let ticking = false;
let listening = false;

function check() {
  ticking = false;
  const limit = window.innerHeight - 80;
  for (const w of [...waiting]) {
    if (w.el.getBoundingClientRect().top < limit) {
      waiting.delete(w);
      w.reveal();
    }
  }
  if (waiting.size === 0 && listening) {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    listening = false;
  }
}

function onScroll() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(check);
  }
}

function useSeenOnce<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const waiter: Waiter = { el, reveal: () => setSeen(true) };
    waiting.add(waiter);
    if (!listening) {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      listening = true;
    }
    onScroll(); // reveal anything already on screen, or above it, right away
    return () => {
      waiting.delete(waiter);
    };
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
