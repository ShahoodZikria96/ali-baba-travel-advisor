"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, X } from "lucide-react";
import { whatsappHref } from "@/lib/whatsapp";
import { DaysLeft } from "@/components/ui/DaysLeft";
import { trackEvent } from "@/lib/analytics";

// The offer stops being shown when booking closes (31 October 2026, end of day in Pakistan, UTC+5).
const OFFER_ENDS = Date.parse("2026-10-31T18:59:59Z");
const STORAGE_KEY = "ab_canada_popup_closed";
const HIDE_FOR_MS = 3 * 24 * 60 * 60 * 1000; // once closed, do not show again for 3 days
const SHOW_AFTER_MS = 9000; // never an instant interstitial: wait, or show after the visitor has scrolled a bit
const SHOW_AFTER_SCROLL = 0.35;

function recentlyClosed(): boolean {
  try {
    const t = Number(window.localStorage.getItem(STORAGE_KEY) ?? 0);
    return t > 0 && Date.now() - t < HIDE_FOR_MS;
  } catch {
    return false;
  }
}

/**
 * Promotional popup for the Canada group tour. Shown once per few days, only while booking is open,
 * never on the tour's own pages or the ad landing pages, and not instantly on arrival (Google dislikes
 * full-screen popups that cover a page the moment it opens).
 */
export function CanadaTourPopup({ whatsappNumber }: { whatsappNumber: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const shown = useRef(false);

  const excluded = pathname.startsWith("/lp/") || pathname.includes("canada-group-tour");

  const close = useCallback(() => {
    setOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      /* storage unavailable: the popup may reappear on the next page, which is acceptable */
    }
  }, []);

  useEffect(() => {
    if (excluded || shown.current || Date.now() > OFFER_ENDS || recentlyClosed()) return;
    const show = () => {
      if (shown.current) return;
      shown.current = true;
      setOpen(true);
      trackEvent("cta_click", { cta: "canada_popup_view" });
    };
    const timer = window.setTimeout(show, SHOW_AFTER_MS);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > SHOW_AFTER_SCROLL) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [excluded, pathname]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open || excluded) return null;

  const message = "Hi, I would like details and the price for the Canada group tour (March 2027).";

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-charcoal/60 p-0 sm:items-center sm:p-4" onClick={close}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="canada-popup-title"
        className="animate-fade-in relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-[var(--radius-lg)] bg-surface shadow-2xl sm:rounded-[var(--radius-lg)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-charcoal/70 text-white hover:bg-charcoal"
        >
          <X size={18} />
        </button>

        <Image
          src="/tours/canada-group-tour-march-2027.webp"
          alt="Canada group tour, March 2027: travel with Ali Jawad and Molvi Usman"
          width={1080}
          height={1080}
          sizes="(max-width: 640px) 100vw, 448px"
          className="h-auto max-h-[46vh] w-full object-cover object-top sm:max-h-none"
        />

        <div className="p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
            Featured group tour <DaysLeft until="2026-10-31" className="ml-1 rounded-full bg-primary px-2 py-0.5 normal-case tracking-normal text-white" />
          </p>
          <h2 id="canada-popup-title" className="mt-1 font-heading text-xl font-extrabold text-charcoal">
            Canada Group Tour, March 2027
          </h2>
          <p className="mt-1 text-sm text-text-muted">Niagara Falls · Toronto · Banff · Ottawa</p>
          <p className="mt-3 text-sm text-charcoal">
            <b>PKR 885,000</b> total · booking amount PKR 120,000 per person (embassy fee included). Book before <b>31 October 2026</b>.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <a
              href={whatsappHref(message, whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 items-center justify-center gap-1.5 rounded-[var(--radius-md)] bg-[#14803f] text-sm font-semibold text-white hover:bg-[#0f6a33]"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
            <Link
              href="/tour-packages/canada-group-tour"
              data-cta="canada_popup_details"
              onClick={close}
              className="flex h-11 items-center justify-center rounded-[var(--radius-md)] bg-primary text-sm font-semibold text-white hover:bg-primary-dark"
            >
              View details
            </Link>
          </div>
          <button type="button" onClick={close} className="mt-3 w-full text-center text-xs font-semibold text-text-muted hover:text-charcoal">
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
