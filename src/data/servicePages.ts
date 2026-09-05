export interface ServicePageContent {
  slug: string;
  title: string;
  metaDescription: string;
  intro: string;
  highlights: string[];
  process: string[];
  faqs: { question: string; answer: string }[];
}

export const servicePages: ServicePageContent[] = [
  {
    slug: "visit-visa",
    title: "Visit Visa Consultancy",
    metaDescription: "Professional visit visa consultancy for Pakistani travelers — documentation, requirements and application support.",
    intro:
      "Whether you're planning a holiday, visiting family, or exploring a new destination, our visit visa consultancy helps you understand requirements, prepare documentation and submit a well-organized application.",
    highlights: [
      "Country-specific document checklists",
      "Financial evidence review and guidance",
      "Application form completion support",
      "Appointment booking and submission assistance",
    ],
    process: [
      "Consultation to understand your travel goal and eligibility",
      "Document checklist tailored to your destination country",
      "Application form preparation and review",
      "Submission and status tracking",
    ],
    faqs: [
      { question: "Which countries do you assist with visit visas for?", answer: "We regularly assist with UK, Canada, USA, Australia, Schengen Europe, Turkey, Japan and New Zealand, among others." },
      { question: "Do you guarantee visa approval?", answer: "No consultancy can guarantee an outcome, as the decision rests solely with the relevant embassy or consulate. We focus on presenting a strong, genuine and well-documented application." },
    ],
  },
  {
    slug: "business-visa",
    title: "Business Visa Consultancy",
    metaDescription: "Business visa consultancy for meetings, conferences and corporate travel from Pakistan.",
    intro:
      "For business owners, executives and employees traveling for meetings, conferences, negotiations or site visits, we prepare documentation that clearly reflects the corporate purpose of your trip.",
    highlights: [
      "Company registration and business documentation review",
      "Invitation letter guidance for host-company visits",
      "Corporate financial evidence preparation",
      "Support for multiple traveler / group business applications",
    ],
    process: [
      "Understanding your business travel purpose and itinerary",
      "Reviewing company and personal financial documentation",
      "Preparing invitation letters and supporting business evidence",
      "Application submission and tracking",
    ],
    faqs: [
      { question: "Can employees apply on behalf of a company?", answer: "Yes — we help prepare company sponsorship letters and supporting documents for employees traveling on business." },
    ],
  },
  {
    slug: "family-visit-visa",
    title: "Family Visit Visa Consultancy",
    metaDescription: "Family visit visa consultancy for Pakistani applicants visiting relatives abroad.",
    intro:
      "Visiting family abroad involves its own documentation — from sponsor letters to relationship evidence. We help both the applicant in Pakistan and the sponsor abroad prepare a consistent, well-supported application.",
    highlights: [
      "Sponsor invitation letter guidance",
      "Relationship evidence preparation (marriage, birth certificates, photos)",
      "Sponsor's financial and immigration status documentation",
      "Coordination between applicant and overseas sponsor",
    ],
    process: [
      "Understanding the relationship and purpose of the visit",
      "Coordinating documentation with the overseas sponsor",
      "Preparing the applicant's financial and personal documents",
      "Application submission and tracking",
    ],
    faqs: [
      { question: "What documents does my sponsor abroad need to provide?", answer: "Typically an invitation letter, proof of their immigration status, and evidence they can support your visit — the exact list depends on the destination country." },
    ],
  },
  {
    slug: "study-visa",
    title: "Study Visa Assistance",
    metaDescription: "Study visa assistance for Pakistani students planning to study abroad.",
    intro:
      "For students planning to study abroad, we help prepare the visa documentation that accompanies your university offer — from financial evidence to statement of purpose guidance.",
    highlights: [
      "Document checklist aligned with your offer letter",
      "Financial sponsorship and evidence guidance",
      "Statement of purpose review",
      "Application submission and tracking",
    ],
    process: [
      "Reviewing your university offer and study plan",
      "Preparing financial and sponsorship documentation",
      "Reviewing your statement of purpose and supporting documents",
      "Application submission and tracking",
    ],
    faqs: [
      { question: "Do you help with university applications too?", answer: "Our focus is visa documentation and consultancy once you have an offer or are close to one; we can guide you on what admissions offices typically expect alongside your visa file." },
    ],
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((s) => s.slug === slug);
}
