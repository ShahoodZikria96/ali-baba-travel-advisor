/**
 * Safe, generic content shown on a country page ONLY when the admin has not
 * filled the matching field. It avoids country-specific claims (fees, dates,
 * processing times) so it can never contradict an embassy's current rules.
 */
export const defaultWhoCanApply = [
  "Tourists planning a leisure trip",
  "Applicants visiting family or friends",
  "Business travellers attending meetings, conferences or exhibitions",
];

export const defaultDocuments = [
  "Valid passport (scan visa and stamp pages)",
  "CNIC (both sides)",
  "Recent passport-size photographs",
  "Bank statement (last 6 months) and account maintenance letter",
  "Employment letter and salary slips, or business registration documents",
  "Tax returns / NTN details",
  "Travel itinerary and accommodation details",
];

export const defaultSteps = [
  "Free initial consultation to understand your travel plan",
  "Personalised document checklist and review",
  "Application form preparation",
  "Appointment booking and submission where required",
  "Tracking and guidance until a decision is issued",
];

export const defaultRefusalReasons = [
  "Insufficient or unclear financial evidence",
  "Incomplete or inconsistent documents",
  "Weak ties to Pakistan or limited travel history",
  "Unclear purpose of travel",
];

export function defaultFaqs(country: string) {
  return [
    {
      question: `How long does the ${country} visa process take?`,
      answer:
        "Processing times are set by the embassy or visa centre and change with the season and visa type. Contact us for the current estimate for your case.",
    },
    {
      question: `Which documents do I need for a ${country} visa from Pakistan?`,
      answer:
        "Requirements depend on your profile (salaried, business owner, student) and the visa type. We review your situation and give you a personalised checklist.",
    },
    {
      question: "Do you guarantee visa approval?",
      answer:
        "No consultant can guarantee approval, because the decision rests with the embassy. We help you prepare an accurate, complete application to present your case as clearly as possible.",
    },
  ];
}
