export interface TourPackage {
  slug: string;
  destination: string;
  image: string;
  duration: string;
  departure: string;
  price: string;
  visaAssistance: boolean;
  summary: string;
  highlights: string[];
  included: string[];
  excluded: string[];
  itinerary: { day: string; description: string }[];
  notes: string[];
}

export const tours: TourPackage[] = [
  {
    slug: "travel-history-group-tour",
    destination: "Thailand, Indonesia, Malaysia & Sri Lanka",
    image: "/destinations/malaysia.webp",
    duration: "10 Days",
    departure: "Departure: November 2026 · Last date to book: 31 October 2026",
    price: "PKR 560,000",
    visaAssistance: true,
    summary:
      "A 10-day organised group tour across Thailand, Indonesia, Malaysia and Sri Lanka, designed for travellers who want to build international travel history. Hotel, return ticket, all visa fees, airport pickup and drop-off and breakfast are included.",
    highlights: [
      "Four countries in one 10-day group trip: Thailand, Indonesia, Malaysia and Sri Lanka",
      "All visa fees included in the package price",
      "Organised, guided group travel",
      "Airport pickup and drop-off",
    ],
    included: ["Hotel accommodation (service hotel)", "Return airline ticket", "All visa fees", "Airport pickup and drop-off", "Breakfast only"],
    excluded: ["Lunch and dinner", "Personal expenses and shopping", "Travel insurance", "Anything not listed under What's Included"],
    itinerary: [],
    notes: [
      "Departure is in November 2026 and booking closes on 31 October 2026. Contact us to confirm seat availability and the exact departure date.",
      "The price is per person.",
      "Visa decisions are made by each country's immigration authority; a group tour and its price do not guarantee visa approval, and a tour does not guarantee a future visa outcome elsewhere.",
    ],
  },
  {
    slug: "uk-group-tour",
    destination: "United Kingdom",
    image: "/destinations/uk.webp",
    duration: "6 Days / 5 Nights",
    departure: "Ask for next departure",
    price: "PKR 620,000",
    visaAssistance: true,
    summary:
      "Experience the charm of the UK in a guided group tour covering London, Oxford, Manchester and Edinburgh — iconic landmarks, rich history and vibrant culture, all-inclusive.",
    highlights: ["Guided sightseeing in London, Oxford, Manchester and Edinburgh", "4-star group hotel accommodation", "Private coach transport throughout", "Visa documentation assistance included"],
    included: ["Return international airfare", "Hotel accommodation (5 nights)", "Daily breakfast", "Airport and intercity transfers", "Guided city tours", "Visa documentation assistance"],
    excluded: ["Lunch and dinner (unless specified)", "Personal expenses and shopping", "Travel insurance", "Optional excursions not listed in the itinerary"],
    itinerary: [
      { day: "Day 1", description: "Arrival in London, hotel check-in, welcome briefing." },
      { day: "Day 2", description: "London city tour — Big Ben, London Eye, Buckingham Palace." },
      { day: "Day 3", description: "Day trip to Oxford — university city tour." },
      { day: "Day 4", description: "Travel to Manchester, city sightseeing." },
      { day: "Day 5", description: "Travel to Edinburgh, castle and old town tour." },
      { day: "Day 6", description: "Departure from Edinburgh or return to London for onward flight." },
    ],
    notes: [
      "Group departure dates are updated periodically — contact us for the next confirmed date.",
      "Visa approval is at the discretion of UK Visas and Immigration; the price above does not guarantee visa issuance.",
    ],
  },
  {
    slug: "azerbaijan-group-tour",
    destination: "Azerbaijan",
    image: "/destinations/azerbaijan.webp",
    duration: "6 Days / 5 Nights",
    departure: "Ask for next departure",
    price: "PKR 270,000",
    visaAssistance: true,
    summary:
      "A luxurious Azerbaijan group tour featuring a 5-star stay, scenic city and nature excursions, and all major attraction tickets included — travel in comfort with a private coach.",
    highlights: ["5-star hotel accommodation", "Scenic city and nature excursions", "All major attraction tickets included", "Private Mercedes coach travel"],
    included: ["Return international airfare", "5-star hotel accommodation (5 nights)", "Daily breakfast", "Airport and intercity transfers", "Guided excursions and attraction tickets", "Visa documentation assistance"],
    excluded: ["Lunch and dinner (unless specified)", "Personal expenses and shopping", "Travel insurance"],
    itinerary: [
      { day: "Day 1", description: "Arrival in Baku, hotel check-in, welcome dinner." },
      { day: "Day 2", description: "Baku city tour — Old City, Flame Towers, Heydar Aliyev Center." },
      { day: "Day 3", description: "Gabala excursion — nature and cable car ride." },
      { day: "Day 4", description: "Sheki day trip — historic old town." },
      { day: "Day 5", description: "Free day for shopping or optional excursions." },
      { day: "Day 6", description: "Departure from Baku." },
    ],
    notes: [
      "Group departure dates are updated periodically — contact us for the next confirmed date.",
      "e-Visa processing for Azerbaijan is typically fast, but timelines can vary.",
    ],
  },
  {
    slug: "france-group-tour",
    destination: "France",
    image: "/destinations/schengen.webp",
    duration: "6 Days / 5 Nights",
    departure: "Ask for next departure",
    price: "PKR 550,000",
    visaAssistance: true,
    summary:
      "Experience the charm of France with guided visits to Paris, the Loire castles, Lyon and Nice — iconic landmarks, scenic beauty and cultural highlights, all-inclusive.",
    highlights: ["Guided tour of Paris, Loire Valley, Lyon and Nice", "4-star group hotel accommodation", "Private coach transport throughout", "Schengen visa documentation assistance included"],
    included: ["Return international airfare", "Hotel accommodation (5 nights)", "Daily breakfast", "Airport and intercity transfers", "Guided city tours", "Visa documentation assistance"],
    excluded: ["Lunch and dinner (unless specified)", "Personal expenses and shopping", "Travel insurance"],
    itinerary: [
      { day: "Day 1", description: "Arrival in Paris, hotel check-in, welcome briefing." },
      { day: "Day 2", description: "Paris city tour — Eiffel Tower, Louvre, Notre-Dame." },
      { day: "Day 3", description: "Loire Valley castles day trip." },
      { day: "Day 4", description: "Travel to Lyon, city sightseeing." },
      { day: "Day 5", description: "Travel to Nice, French Riviera tour." },
      { day: "Day 6", description: "Departure from Nice or return to Paris for onward flight." },
    ],
    notes: [
      "Group departure dates are updated periodically — contact us for the next confirmed date.",
      "This tour requires a Schengen visa; approval is at the discretion of the issuing consulate.",
    ],
  },
];

export function getTour(slug: string) {
  return tours.find((t) => t.slug === slug);
}

/**
 * Tours defined in code. They are merged into the list the admin panel provides
 * (see getTours in lib/content.ts): a tour with the same slug in the admin panel
 * wins, so once Canada is added or edited there this entry simply steps aside.
 */
export const extraTours: TourPackage[] = [
  {
    slug: "canada-group-tour",
    destination: "Canada",
    image: "/destinations/canada.webp",
    duration: "Duration: ask us for the full itinerary",
    departure: "Departure: March 2027, travelling with CEO Syed Ali Jawad and Usman Molvi",
    price: "Call for price",
    visaAssistance: true,
    summary:
      "A guided Canada group tour departing in March 2027, travelling with our CEO Syed Ali Jawad and Usman Molvi. The tour covers Niagara Falls, Toronto, Banff and Ottawa, and includes visa support, 4-star hotels, daily activities, return flight tickets and breakfast.",
    highlights: [
      "Niagara Falls, Toronto, Banff and Ottawa on one group itinerary",
      "Travel with CEO Syed Ali Jawad and Usman Molvi",
      "Canada visa support included",
      "4-star hotels and daily activities",
    ],
    included: ["Visa support", "4-star hotels", "Daily activities", "Return flight tickets", "Breakfast"],
    excluded: ["Lunch and dinner (unless specified)", "Personal expenses and shopping", "Travel insurance", "Anything not listed under What's Included"],
    itinerary: [],
    notes: [
      "Departure is in March 2027. Seats are limited, so contact us for the exact dates, the full day-by-day itinerary and the current package price.",
      "Visa decisions are made by the Canadian immigration authority; support from us and a group tour do not guarantee visa approval.",
    ],
  },
];

/**
 * Booking-date correction for the Travel History group tour: the deadline was extended from
 * 5 October to 31 October 2026. getTours applies it to the admin-panel copy too; once the admin
 * entry says 31 October the replacement simply finds nothing to change.
 */
export const tourTextFixes: Record<string, [string, string][]> = {
  "travel-history-group-tour": [["5 October 2026", "31 October 2026"]],
};
