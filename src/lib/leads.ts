export type LeadType = "visa_assessment" | "tour_enquiry" | "flight_enquiry" | "refusal_case" | "contact";

export function submitLead(type: LeadType, data: Record<string, unknown>) {
  const source = typeof window !== "undefined" ? window.location.pathname : undefined;
  fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, data, source }),
    keepalive: true,
  }).catch(() => {
    // Non-fatal: WhatsApp remains the primary submission path.
  });
}
