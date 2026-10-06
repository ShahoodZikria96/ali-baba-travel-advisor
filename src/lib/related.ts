import type { Country, Tour } from "@/lib/types";

export interface RelatedLink {
  href: string;
  label: string;
  description?: string;
}

/** Descriptive, keyword-bearing links to the site's core pages (used for cross-linking). */
export const SITE_LINKS = {
  visas: { href: "/visas", label: "Visa requirements by country", description: "Documents and guidance for 40+ destinations" },
  consultancy: { href: "/visa-consultancy", label: "Visa consultancy services", description: "Visit, business, family and study visa support" },
  refusal: { href: "/visa-refusal", label: "Visa refusal assistance", description: "Case review if you were refused before" },
  process: { href: "/visa-process", label: "How our visa process works", description: "From free assessment to submission, step by step" },
  tours: { href: "/tour-packages", label: "International tour packages", description: "Group tours with visa assistance included" },
  packagesFromPakistan: { href: "/tour-packages/from-pakistan", label: "Tour packages from Pakistan", description: "Europe, Canada, Turkey, Japan and 20+ destinations" },
  travelAgency: { href: "/travel-agency", label: "Travel agency in your city", description: "Serving every province of Pakistan" },
  groupTours: { href: "/tour-packages/group-tours", label: "Group tours from Pakistan", description: "Fixed itineraries, flights and hotels in one price" },
  upcoming: { href: "/tour-packages/upcoming", label: "Upcoming tour departures", description: "Current group departures and booking dates" },
  customized: { href: "/tour-packages/customized", label: "Customized tours", description: "A trip planned around your dates and budget" },
  flights: { href: "/flights", label: "Flight booking from Pakistan", description: "International and domestic airline tickets" },
  hotels: { href: "/hotel-booking", label: "Hotel booking worldwide", description: "Accommodation matched to your itinerary" },
  documentation: { href: "/travel-documentation", label: "Travel documentation help", description: "Checklists, forms and itinerary support" },
  guides: { href: "/guides", label: "Visa & travel guides", description: "Practical advice for Pakistani travellers" },
  guideTravel: { href: "/guides/travel", label: "Travel guides", description: "Trip planning advice for Pakistani travellers" },
  guideUpdates: { href: "/guides/updates", label: "Latest visa and travel updates", description: "News that affects your application" },
  faqs: { href: "/faqs", label: "Visa and travel FAQs", description: "Answers to the questions we hear most" },
  stories: { href: "/success-stories", label: "Client reviews and case examples", description: "What our clients say about working with us" },
  about: { href: "/about", label: "About Ali Baba Travel Advisor", description: "Who we are and how we work" },
  team: { href: "/team", label: "Meet our visa consultants", description: "The team behind your application" },
  contact: { href: "/contact", label: "Contact our offices", description: "Lahore, Islamabad, Wazirabad and Karachi" },
  locations: { href: "/locations", label: "Office locations", description: "Find your nearest Ali Baba office" },
  consultation: { href: "/consultation", label: "Book a free consultation", description: "Get a personalised visa assessment" },
  urdu: { href: "/urdu", label: "اردو میں معلومات", description: "ویزا اور ٹریول کی معلومات اردو میں" },
} satisfies Record<string, RelatedLink>;

export function siteLinks(keys: (keyof typeof SITE_LINKS)[]): RelatedLink[] {
  return keys.map((k) => SITE_LINKS[k]);
}

/**
 * Countries grouped by region. Each country links to the next few siblings in
 * its group (wrapping around), which spreads internal links evenly instead of
 * funnelling everything to the same handful of popular pages.
 */
const REGION_GROUPS: string[][] = [
  [
    "schengen", "france", "germany", "italy", "spain", "netherlands", "belgium", "austria", "switzerland",
    "sweden", "norway", "denmark", "finland", "greece", "ireland", "hungary", "czech-republic",
    "luxembourg", "albania", "bulgaria", "romania", "serbia", "uk",
  ],
  ["japan", "south-korea", "hong-kong", "singapore", "thailand", "malaysia", "indonesia", "cambodia", "australia", "new-zealand"],
  ["turkey", "azerbaijan", "egypt", "morocco", "south-africa", "usa", "canada", "brazil", "colombia"],
];

export function relatedCountries(slug: string, all: Country[], count = 6): Country[] {
  const group = REGION_GROUPS.find((g) => g.includes(slug));
  const bySlug = new Map(all.map((c) => [c.slug, c]));
  const ordered: Country[] = [];
  if (group) {
    const start = group.indexOf(slug);
    for (let i = 1; i < group.length && ordered.length < count; i++) {
      const c = bySlug.get(group[(start + i) % group.length]);
      if (c) ordered.push(c);
    }
  }
  // Countries added later through the admin panel (not in any group) fall back to the full list.
  if (ordered.length < count) {
    for (const c of all) {
      if (c.slug !== slug && !ordered.includes(c) && ordered.length < count) ordered.push(c);
    }
  }
  return ordered;
}

/** Group tours whose destination mentions the given country. */
export function toursForCountry(country: Pick<Country, "name">, tours: Tour[]): Tour[] {
  const name = country.name.toLowerCase();
  return tours.filter((t) => t.destination.toLowerCase().includes(name));
}

/** Countries (with a visa page) that a tour's destination mentions. */
export function countriesForTour(tour: Pick<Tour, "destination">, countries: Country[]): Country[] {
  const dest = tour.destination.toLowerCase();
  return countries.filter((c) => dest.includes(c.name.toLowerCase()));
}

/** Countries whose name appears in a piece of text (used for guide articles). */
export function countriesMentioned(text: string, countries: Country[], limit = 4): Country[] {
  const hay = text.toLowerCase();
  return countries.filter((c) => c.slug !== "schengen" && hay.includes(c.name.toLowerCase())).slice(0, limit);
}
