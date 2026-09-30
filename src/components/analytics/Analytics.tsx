"use client";

import { useEffect } from "react";
import { loadRuntimeConfig } from "@/lib/site-config";
import { ClickTracker } from "@/components/analytics/ClickTracker";

const ID_PATTERN = /^(GTM-[A-Z0-9]+|G-[A-Z0-9]+)$/;

/**
 * Loads Google Tag Manager or GA4 using the IDs in /site-config.json, after
 * the page is interactive. Does nothing when both IDs are empty.
 */
export function Analytics() {
  useEffect(() => {
    let cancelled = false;
    loadRuntimeConfig().then(({ gtmId, gaId }) => {
      if (cancelled) return;
      const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };
      w.dataLayer = w.dataLayer || [];
      if (gtmId && ID_PATTERN.test(gtmId)) {
        w.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
        const s = document.createElement("script");
        s.async = true;
        s.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
        document.head.appendChild(s);
      } else if (gaId && ID_PATTERN.test(gaId)) {
        w.gtag = function () {
          // eslint-disable-next-line prefer-rest-params
          w.dataLayer!.push(arguments);
        };
        w.gtag("js", new Date());
        w.gtag("config", gaId);
        const s = document.createElement("script");
        s.async = true;
        s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        document.head.appendChild(s);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return <ClickTracker />;
}
