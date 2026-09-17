export interface CountryDestination {
  slug: string;
  name: string;
  flag: string;
  flagImage?: string;
  visaType: string;
  description: string;
}

export const popularDestinations: CountryDestination[] = [
  {
    slug: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    flagImage: "/flags/uk.webp",
    visaType: "Visit, Business & Family Visa",
    description: "Standard Visitor visa assistance for tourism, family and business trips.",
  },
  {
    slug: "canada",
    name: "Canada",
    flag: "🇨🇦",
    flagImage: "/flags/canada.webp",
    visaType: "Visitor Visa",
    description: "Temporary Resident Visa documentation and case guidance.",
  },
  {
    slug: "usa",
    name: "United States",
    flag: "🇺🇸",
    flagImage: "/flags/usa.webp",
    visaType: "B1/B2 Visa",
    description: "Interview preparation and documentation support for the US visitor visa.",
  },
  {
    slug: "schengen",
    name: "Schengen Europe",
    flag: "🇪🇺",
    flagImage: "/flags/schengen.webp",
    visaType: "Short-Stay Schengen Visa",
    description: "Guidance across France, Italy, Germany, Spain and other Schengen states.",
  },
  {
    slug: "australia",
    name: "Australia",
    flag: "🇦🇺",
    flagImage: "/flags/australia.webp",
    visaType: "Visitor Visa (Subclass 600)",
    description: "Assessment and documentation support for tourism and family visits.",
  },
  {
    slug: "turkey",
    name: "Turkey",
    flag: "🇹🇷",
    flagImage: "/flags/turkey.webp",
    visaType: "e-Visa & Sticker Visa",
    description: "Fast-track guidance for tourism and business travel to Turkey.",
  },
  {
    slug: "japan",
    name: "Japan",
    flag: "🇯🇵",
    flagImage: "/flags/japan.webp",
    visaType: "Temporary Visitor Visa",
    description: "Documentation support for tourism, business and transit visits.",
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    flag: "🇳🇿",
    flagImage: "/flags/new-zealand.webp",
    visaType: "Visitor Visa",
    description: "Case assessment for tourism and family-visit applications.",
  },
];

export const moreDestinations: CountryDestination[] = [
  {
    slug: "uae",
    name: "UAE",
    flag: "🇦🇪",
    flagImage: "/flags/uae.webp",
    visaType: "Visit Visa",
    description: "Short and long-term visit visa assistance for the UAE.",
  },
  {
    slug: "malaysia",
    name: "Malaysia",
    flag: "🇲🇾",
    flagImage: "/flags/malaysia.webp",
    visaType: "eVisa",
    description: "Tourism and business travel documentation support.",
  },
  {
    slug: "azerbaijan",
    name: "Azerbaijan",
    flag: "🇦🇿",
    flagImage: "/flags/azerbaijan.webp",
    visaType: "e-Visa",
    description: "Popular group-tour destination with fast visa processing.",
  },
  {
    slug: "south-africa",
    name: "South Africa",
    flag: "🇿🇦",
    flagImage: "/flags/south-africa.webp",
    visaType: "Visitor Visa",
    description: "Documentation guidance for tourism and business visits.",
  },
];
