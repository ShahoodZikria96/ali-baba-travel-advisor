import { trackEvent } from "@/lib/analytics";

export type LeadType = "visa_assessment" | "tour_enquiry" | "flight_enquiry" | "refusal_case" | "contact";

const EVENT_BY_TYPE: Record<LeadType, string> = {
  visa_assessment: "visa_inquiry",
  refusal_case: "visa_inquiry",
  tour_enquiry: "tour_inquiry",
  flight_enquiry: "flight_inquiry",
  contact: "contact_inquiry",
};

export function submitLead(type: LeadType, data: Record<string, unknown>) {
  const source = typeof window !== "undefined" ? window.location.pathname : undefined;
  const hp = (document.querySelector('input[name="hp_website"]') as HTMLInputElement | null)?.value ?? "";
  trackEvent("generate_lead", { lead_type: type });
  trackEvent(EVENT_BY_TYPE[type]);
  fetch("/api/leads.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, data, source, hp }),
    keepalive: true,
  }).catch(() => {
    // Non-fatal: WhatsApp remains the primary submission path.
  });
}
