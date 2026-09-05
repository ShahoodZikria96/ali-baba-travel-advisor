export interface ServiceItem {
  slug: string;
  title: string;
  description: string;
}

export const coreServices: ServiceItem[] = [
  {
    slug: "visa-consultancy",
    title: "Visa Consultancy",
    description: "Professional application assessment and documentation assistance for visit, business and family visas.",
  },
  {
    slug: "visa-refusal",
    title: "Visa Refusal Case Review",
    description: "Case assessment and guidance for applicants who have received a previous refusal.",
  },
  {
    slug: "tour-packages",
    title: "International Tours",
    description: "Group departures and customized international itineraries for individuals and families.",
  },
  {
    slug: "flights",
    title: "Air Ticketing",
    description: "International and domestic airline booking support for your travel dates.",
  },
  {
    slug: "hotel-booking",
    title: "Hotel Booking",
    description: "Worldwide accommodation assistance matched to your itinerary and budget.",
  },
  {
    slug: "travel-documentation",
    title: "Travel Documentation",
    description: "Support with documentation, itinerary planning and application requirements.",
  },
];

export const refusalServices: ServiceItem[] = [
  {
    slug: "uk-refusal",
    title: "UK Visit Visa Refusal",
    description: "Assessment of refusal grounds and guidance on reapplication strategy.",
  },
  {
    slug: "uk-pre-action-protocol",
    title: "UK Pre-Action Protocol",
    description: "Guidance on the Pre-Action Protocol process for eligible UK refusal cases.",
  },
  {
    slug: "canada-refusal",
    title: "Canada Visit Visa Refusal",
    description: "Case review and reconsideration guidance for refused Canada applications.",
  },
  {
    slug: "canada-judicial-review",
    title: "Canada Judicial Review Consultancy",
    description: "Guidance on the judicial review pathway, in coordination with qualified legal counsel where required.",
  },
  {
    slug: "schengen-refusal",
    title: "Schengen Refusal / Appeal Guidance",
    description: "Assessment of Schengen refusal letters and appeal documentation support.",
  },
  {
    slug: "usa-consultation",
    title: "USA Visa Consultation",
    description: "Interview preparation and documentation review for B1/B2 applicants.",
  },
];
