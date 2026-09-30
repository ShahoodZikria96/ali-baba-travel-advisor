"use client";

import { useRuntimeConfig } from "@/lib/site-config";

/**
 * Monetization-ready placeholder for informational pages ONLY (guides/blog).
 * Never render on service, country, contact or consultation pages — those stay
 * lead-generation focused.
 *
 * Disabled by default. To go live, set "adsEnabled": true and "adsenseClient" in
 * /site-config.json on the server (after AdSense approval),
 * then render the network's slot markup inside the reserved box below.
 * The box has a fixed min-height so ads can never cause layout shift (CLS).
 */
export function AdSlot({ placement }: { placement: "in-article" | "end-of-article" }) {
  const cfg = useRuntimeConfig();
  if (!cfg?.adsEnabled) return null;
  return (
    <aside
      aria-label="Advertisement"
      data-ad-placement={placement}
      className="my-8 min-h-[250px] rounded-[var(--radius-md)] border border-dashed border-border bg-surface-muted/40 p-2 text-center"
    >
      <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-text-muted">Advertisement</p>
      {/* Ad network snippet goes here once approved. */}
    </aside>
  );
}
