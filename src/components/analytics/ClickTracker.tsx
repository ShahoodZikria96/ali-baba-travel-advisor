"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * One delegated click listener: classifies clicks on WhatsApp, phone, email and
 * CTA links without touching every component. Add data-cta="name" to any link
 * to record it as a cta_click.
 */
export function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest("a");
      if (!el) return;
      const href = el.getAttribute("href") ?? "";
      if (href.startsWith("https://wa.me/")) trackEvent("whatsapp_click", { link_text: el.textContent?.trim().slice(0, 60) });
      else if (href.startsWith("tel:")) trackEvent("phone_click", { phone: href.slice(4) });
      else if (href.startsWith("mailto:")) trackEvent("email_click");
      else if (el.dataset.cta) trackEvent("cta_click", { cta: el.dataset.cta });
      else if (href === "/consultation") trackEvent("consultation_request", { link_text: el.textContent?.trim().slice(0, 60) });
    };
    document.addEventListener("click", onClick, { passive: true });
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
