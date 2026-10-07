// Client-safe analytics helper. Pushes to the GTM dataLayer (preferred) and to
// gtag when GA4 is loaded directly. No-ops when neither is configured, so it is
// always safe to call.
type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Event names (GA4 snake_case): whatsapp_click, phone_click, email_click,
 * cta_click, generate_lead (form submit; `lead_type` = visa_assessment |
 * tour_enquiry | flight_enquiry | refusal_case | contact), consultation_request,
 * tour_inquiry, visa_inquiry.
 */
// Meta Pixel standard events for the actions that matter to ads.
const META_EVENT: Record<string, string> = { generate_lead: "Lead", whatsapp_click: "Contact", phone_click: "Contact" };

export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  if (window.fbq && META_EVENT[name]) window.fbq("track", META_EVENT[name]);
  const payload = { ...params, page_path: window.location.pathname };
  // Tag Manager reads plain {event} objects from the dataLayer; GA4 loaded directly needs a gtag event call.
  window.dataLayer?.push({ event: name, ...payload });
  if (window.gtag) window.gtag("event", name, payload);
}
