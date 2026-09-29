// Client-safe analytics helper. Pushes to the GTM dataLayer (preferred) and to
// gtag when GA4 is loaded directly. No-ops when neither is configured, so it is
// always safe to call.
type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Event names (GA4 snake_case): whatsapp_click, phone_click, email_click,
 * cta_click, generate_lead (form submit; `lead_type` = visa_assessment |
 * tour_enquiry | flight_enquiry | refusal_case | contact), consultation_request,
 * tour_inquiry, visa_inquiry.
 */
export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  const payload = { ...params, page_path: window.location.pathname };
  window.dataLayer?.push({ event: name, ...payload });
  if (!window.dataLayer && window.gtag) window.gtag("event", name, payload);
}
