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
  /** Documents the visa application needs (shown on the tour page when present). */
  documents?: string[];
  /** Optional long-form sections, FAQs and SEO overrides. */
  sections?: { heading: string; paragraphs?: string[]; bullets?: string[] }[];
  faqs?: { question: string; answer: string }[];
  metaTitle?: string;
  metaDescription?: string;
  /** Page H1 when the destination name alone is too short for SEO. */
  heading?: string;
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
    slug: "usa-group-tour",
    destination: "USA",
    image: "/destinations/usa.webp",
    duration: "Duration: ask us for the full itinerary",
    departure: "Departure: March to April 2027",
    price: "Call for price",
    visaAssistance: false,
    heading: "USA Group Tour, March to April 2027",
    metaTitle: "USA Group Tour from Pakistan, March 2027",
    metaDescription:
      "Guided USA group tour from Pakistan, March to April 2027. Limited seats. Call 0311-1666076 for the route, price, booking terms and US visa guidance.",
    summary:
      "A guided USA group tour from Pakistan planned for March to April 2027. Seats are limited. Call or WhatsApp 0311-1666076 for the route, the price and the booking terms.",
    highlights: [
      "Guided USA group tour, March to April 2027",
      "Limited seats: check availability before you plan",
      "US visa guidance from our consultants (the visa is decided only by the US authorities)",
      "Route, price and booking terms confirmed in writing before you pay",
    ],
    included: [],
    excluded: [],
    itinerary: [],
    notes: [
      "The route, hotels, flights, price and what the package includes are shared when you enquire, and confirmed in writing before you pay.",
      "A valid US visa is required to join. The visa is issued only by the US embassy or consulate, which can approve or refuse any application, so approval is never guaranteed.",
      "US visa interview waiting times change by city and season. Start your visa file early and ask us when tickets will be issued.",
      "Cancellations and refunds follow our Refund & Cancellation Policy and the booking terms we give you in writing.",
    ],
    sections: [
      {
        heading: "About this USA group tour",
        paragraphs: [
          "We are taking a group of travellers from Pakistan to the USA in March to April 2027. A group departure means flights, hotels and the programme are arranged together, and you travel with the same group. Group seats are limited and are given in order of booking, so the first step is to check that a seat is available.",
          "We do not publish a price on this page. Call or WhatsApp 0311-1666076 and we will share the route, the current price, the booking amount and what is included, and we put it in writing before you pay anything.",
        ],
      },
      {
        heading: "The US visa: what to know before you book",
        paragraphs: [
          "Pakistani passport holders need a visa to visit the USA. Most tourists apply for the B1/B2 visitor visa: you complete the online DS-160 form, pay the visa fee, book an appointment and attend an interview at a US embassy or consulate. The officer looks at your purpose of travel, your finances and your ties to Pakistan, such as a job, a business or family.",
          "Appointment waiting times and visa fees are set by the US authorities and change, so check them on the official US visa website before you plan. For a March to April 2027 trip, starting your visa file early gives you the most time.",
        ],
      },
      {
        heading: "How we help with your US visa file",
        bullets: [
          "A personal assessment of your profile and a document checklist",
          "Help completing the DS-160 form accurately and consistently with your documents",
          "A review of your financial, employment or business documents before you submit",
          "Guidance on booking your appointment and preparing for the interview",
          "A review of any earlier US or other visa refusal, so you know what to fix first",
        ],
      },
      {
        heading: "Documents to start gathering now",
        bullets: [
          "Passport that is valid for your travel, plus all old passports",
          "CNIC and family details",
          "Bank statements and proof of income that match your declared work",
          "Employment letter, or business registration, NTN and tax returns",
          "Previous travel history and visas, if any",
        ],
      },
    ],
    faqs: [
      { question: "When does the USA group tour leave?", answer: "The tour is planned for March to April 2027. We confirm the exact dates when you enquire." },
      { question: "How much does the USA group tour cost?", answer: "Call or WhatsApp 0311-1666076 for the current price, the booking amount and what is included. We confirm everything in writing before you pay." },
      { question: "Are seats really limited?", answer: "Yes. A group departure has a fixed number of seats, given in order of booking. Message us to check whether a seat is available." },
      { question: "Do I need a US visa to join the tour?", answer: "Yes. Pakistani citizens need a valid US visa to travel. The visa is decided only by the US embassy or consulate." },
      { question: "Can you help me get my US visa?", answer: "We guide your application: assessment, document checklist, DS-160 help, appointment and interview preparation. We cannot guarantee a visa, because the US authorities make that decision." },
      { question: "What happens if my US visa is refused?", answer: "Refund and cancellation terms are stated in writing before you pay and follow our Refund & Cancellation Policy. Ask us about this before you book, and we can review the refusal with you." },
    ],
  },
  {
    slug: "canada-group-tour",
    destination: "Canada",
    image: "/destinations/canada.webp",
    duration: "Duration: ask us for the full itinerary",
    departure: "Departure: March 2027 · Last date to book: 31 October 2026",
    price: "PKR 885,000",
    visaAssistance: true,
    summary:
      "A guided Canada group tour departing in March 2027, travelling with our CEO Syed Ali Jawad and Usman Molvi. The tour covers Niagara Falls, Toronto, Banff and Ottawa. The total price is PKR 885,000, with a booking amount of PKR 120,000 per person (embassy fee included). Return tickets, hotel bookings, daily tours and visa assistance are included.",
    highlights: [
      "Niagara Falls, Toronto, Banff and Ottawa on one group itinerary",
      "Travel with CEO Syed Ali Jawad and Usman Molvi",
      "Total price PKR 885,000; booking amount PKR 120,000 per person (embassy fee included)",
      "Booking closes on 31 October 2026; departure March 2027",
    ],
    included: ["Return tickets", "Hotel bookings (4-star hotels)", "Daily tours and activities", "Visa assistance", "Breakfast"],
    excluded: ["Lunch and dinner (unless specified)", "Personal expenses and shopping", "Travel insurance", "Anything not listed under What's Included"],
    itinerary: [],
    notes: [
      "Booking can be done online or by visiting our office.",
      "The booking amount is PKR 120,000 per person, and the embassy fee is included in it.",
      "Departure dates are confirmed and will not be changed under any circumstances.",
      "The visa is issued by the embassy, and the embassy reserves the right to approve or refuse any application.",
      "The booking amount (PKR 120,000) is charged upfront and is non-refundable in case of a change of mind or a visa refusal.",
      "Booking must be completed before 31 October 2026. Travel date: March 2027.",
    ],
    documents: [
      "Valid passport with at least 8 months of validity",
      "All previous passports, visas and entry and exit stamps",
      "CNIC",
      "FRC",
      "MRC (for married persons)",
      "NTN",
      "Last year's tax returns",
      "Chamber of Commerce certificate (if available)",
      "Last 4 months of bank statements (minimum balance PKR 2,000,000)",
      "Account maintenance letter",
      "Job letter and last 4 salary slips (for salaried persons)",
      "Parents' dates of birth",
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
