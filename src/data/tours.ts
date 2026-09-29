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
    image: "/destinations/malaysia.jpg",
    duration: "10 Days",
    departure: "Last date to book: 5 October 2026 — confirm the departure date with us",
    price: "PKR 560,000 (package price)",
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
      "Booking closes on 5 October 2026. Contact us to confirm seat availability and the exact departure date.",
      "Confirm with our team what the package price covers per traveller before you pay.",
      "Visa decisions are made by each country's immigration authority; a group tour and its price do not guarantee visa approval, and a tour does not guarantee a future visa outcome elsewhere.",
    ],
  },
  {
    slug: "uk-group-tour",
    destination: "United Kingdom",
    image: "/destinations/uk.jpg",
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
    image: "/destinations/azerbaijan.jpg",
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
    image: "/destinations/schengen.jpg",
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
