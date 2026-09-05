export interface LocationContent {
  slug: string;
  intro: string;
  localContext: string;
  servicesOffered: string[];
}

export const locationContent: LocationContent[] = [
  {
    slug: "lahore",
    intro:
      "Our Lahore office, located at Siddique Trade Center in Gulberg II, is Ali Baba Travel Advisor's main branch — serving families, students and business travelers across the city with visa consultancy, tour packages and flight bookings.",
    localContext:
      "Gulberg II is one of Lahore's central commercial areas, making our office an easy walk-in stop for clients from Model Town, Garden Town, DHA and the wider Gulberg corridor. Our Lahore consultants handle the highest volume of UK, Canada, USA and Schengen visit visa cases in our network.",
    servicesOffered: ["Visit, business and family visit visa consultancy", "Visa refusal case review", "Group and customized tour bookings", "Air ticketing and hotel booking"],
  },
  {
    slug: "islamabad",
    intro:
      "Our Islamabad office at Al-Anayat Mall, G-11 Markaz, supports clients across Islamabad and Rawalpindi with visa documentation, tour planning and travel consultancy.",
    localContext:
      "G-11 Markaz is a well-connected commercial hub in Islamabad, convenient for clients from G, F and E sector residential areas as well as nearby Rawalpindi. Our Islamabad team frequently assists diplomatic-adjacent professionals and families applying for family visit and business visas.",
    servicesOffered: ["Visit, business and family visit visa consultancy", "Visa refusal case review", "Group and customized tour bookings", "Air ticketing and hotel booking"],
  },
  {
    slug: "wazirabad",
    intro:
      "Our Wazirabad office on Arif Shaheed Road, near Bank Alfalah, brings the same visa consultancy and travel planning services to clients in Wazirabad and the surrounding Gujranwala division.",
    localContext:
      "Wazirabad's growing trade and expatriate community means many of our local clients are applying for family visit visas to join relatives already settled abroad, alongside business and tourist travel.",
    servicesOffered: ["Visit and family visit visa consultancy", "Visa documentation support", "Tour package bookings", "Air ticketing"],
  },
  {
    slug: "karachi",
    intro:
      "Our newest office opens on Monday, 7 September 2026 at Office No. 3, Mezzanine Floor, 10C Building, 12 Commercial Street, near Cafe Musa, DHA Phase 2 Extension, Karachi — bringing Ali Baba Travel Advisor's visa consultancy and travel services to Pakistan's largest city.",
    localContext:
      "DHA Phase 2 Extension is a fast-growing commercial and residential area of Karachi. Our Karachi office is being set up to serve clients across the city with the same consultancy standards as our Lahore, Islamabad and Wazirabad branches.",
    servicesOffered: ["Visit, business and family visit visa consultancy", "Visa refusal case review", "Group and customized tour bookings", "Air ticketing and hotel booking"],
  },
];

export function getLocationContent(slug: string) {
  return locationContent.find((l) => l.slug === slug);
}
