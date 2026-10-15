"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { loadRuntimeConfig } from "@/lib/site-config";
import { ClickTracker } from "@/components/analytics/ClickTracker";

type Fbq = ((...args: unknown[]) => void) & { callMethod?: (...a: unknown[]) => void; queue: unknown[][]; loaded?: boolean; version?: string; push?: unknown };
type Win = { fbq?: Fbq; _fbq?: Fbq; dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };

/** Meta Pixel stub: queues calls until fbevents.js (loaded later) takes over. Safe to call repeatedly. */
function ensureFbq(): Fbq {
  const w = window as unknown as Win;
  if (w.fbq) return w.fbq;
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as Fbq;
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.push = fbq;
  w.fbq = fbq;
  w._fbq = fbq;
  return fbq;
}

function loadMetaPixel(id: string) {
  const fbq = ensureFbq();
  if (document.querySelector('script[src*="fbevents.js"]')) return;
  // init must run before any event that was queued while the script was still waiting.
  fbq.queue.unshift(["init", id]);
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);
  fbq("track", "PageView");
}

const ID_PATTERN = /^(GTM-[A-Z0-9]+|G-[A-Z0-9]+)$/;

// Third-party tags (GA4, Tag Manager, Meta Pixel) weigh about 490 KB and a lot of main-thread time. They are
// started on the first interaction, or a few seconds after the page has loaded, so they never compete with
// the first paint, the largest contentful paint or the first taps (Core Web Vitals). Events fired in the
// meantime are queued by the stubs below and are sent once the scripts arrive.
const INTERACTION_EVENTS = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
const IDLE_START_MS = 3000;

function startTags() {
  loadRuntimeConfig().then(({ gtmId, gaId, metaPixelId }) => {
    const w = window as unknown as Win;
    w.dataLayer = w.dataLayer || [];
    if (metaPixelId && /^\d{10,20}$/.test(metaPixelId)) loadMetaPixel(metaPixelId);
    if (gtmId && ID_PATTERN.test(gtmId)) {
      w.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
      document.head.appendChild(s);
    }
    // GA4 direct and GTM are independent: use GA4 direct for plain tracking, and add GTM for extra tags.
    // Do not also create a GA4 tag inside GTM for the same property, or every hit is counted twice.
    if (gaId && ID_PATTERN.test(gaId)) {
      w.gtag?.("js", new Date());
      w.gtag?.("config", gaId);
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(s);
    }
  });
}

/**
 * Starts analytics using the IDs in /site-config.json. Does nothing when all IDs are empty.
 */
export function Analytics() {
  const pathname = usePathname();
  const firstPath = useRef(true);

  // The pixel records the first page load itself; this site navigates between pages without a full
  // reload, so every later page change needs its own PageView or Meta only ever sees the landing page.
  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    (window as unknown as Win).fbq?.("track", "PageView");
  }, [pathname]);

  useEffect(() => {
    const w = window as unknown as Win;
    // Stubs first, so clicks and form submits that happen before the scripts arrive are queued, not lost.
    w.dataLayer = w.dataLayer || [];
    w.gtag =
      w.gtag ||
      function () {
        // eslint-disable-next-line prefer-rest-params
        w.dataLayer!.push(arguments);
      };
    ensureFbq();
    loadRuntimeConfig(); // warm the cached config request so starting later is instant

    let started = false;
    let timer = 0;
    const go = () => {
      if (started) return;
      started = true;
      window.clearTimeout(timer);
      INTERACTION_EVENTS.forEach((e) => window.removeEventListener(e, go));
      window.removeEventListener("load", schedule);
      startTags();
    };
    const schedule = () => {
      timer = window.setTimeout(() => {
        if ("requestIdleCallback" in window) window.requestIdleCallback(go, { timeout: 2000 });
        else go();
      }, IDLE_START_MS);
    };
    INTERACTION_EVENTS.forEach((e) => window.addEventListener(e, go, { passive: true }));
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      window.clearTimeout(timer);
      INTERACTION_EVENTS.forEach((e) => window.removeEventListener(e, go));
      window.removeEventListener("load", schedule);
    };
  }, []);

  return <ClickTracker />;
}
