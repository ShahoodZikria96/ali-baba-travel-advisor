export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavColumn {
  heading: string;
  links: NavLink[];
}

export interface NavItem {
  label: string;
  href?: string;
  columns?: NavColumn[];
  viewAll?: NavLink;
  /** Dropdown panel width in px (desktop). Defaults to 520. */
  width?: number;
}

interface NavCountry { slug: string; name: string }
interface NavService { slug: string; title: string }
interface NavTour { slug: string; destination: string }

const VISA_CATEGORY_SLUGS = ["visit-visa", "business-visa", "family-visit-visa", "study-visa"];

const POPULAR_COUNTRIES = ["uk", "usa", "canada", "australia", "schengen", "new-zealand", "turkey", "japan"];
const EUROPE_COUNTRIES = [
  "france", "germany", "italy", "spain", "netherlands", "belgium", "austria",
  "switzerland", "sweden", "norway", "denmark",
];
const MORE_EUROPE_COUNTRIES = [
  "finland", "greece", "ireland", "hungary", "czech-republic", "luxembourg",
  "albania", "bulgaria", "romania", "serbia",
];
const ASIA_COUNTRIES = ["south-korea", "hong-kong", "singapore", "thailand", "malaysia", "indonesia", "cambodia"];
const MIDDLE_EAST_AFRICA_AMERICAS_COUNTRIES = ["azerbaijan", "egypt", "morocco", "south-africa", "brazil", "colombia"];

function pick(countries: NavCountry[], slugs: string[]): NavLink[] {
  return slugs
    .map((slug) => countries.find((c) => c.slug === slug))
    .filter((c): c is NavCountry => Boolean(c))
    .map((c) => ({ label: c.name, href: `/visas/${c.slug}` }));
}

export function buildPrimaryNav(
  countries: NavCountry[],
  services: NavService[],
  tours: NavTour[]
): NavItem[] {
  const categoryLinks = VISA_CATEGORY_SLUGS
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is NavService => Boolean(s))
    .map((s) => ({ label: s.title, href: `/visa-consultancy/${s.slug}` }));
  const supportLinks = services
    .filter((s) => !VISA_CATEGORY_SLUGS.includes(s.slug))
    .map((s) => ({ label: s.title, href: `/visa-consultancy/${s.slug}` }));

  const known = new Set([
    ...POPULAR_COUNTRIES, ...EUROPE_COUNTRIES, ...MORE_EUROPE_COUNTRIES,
    ...ASIA_COUNTRIES, ...MIDDLE_EAST_AFRICA_AMERICAS_COUNTRIES,
  ]);
  // Countries added later through the admin panel land here automatically.
  const otherLinks = countries
    .filter((c) => !known.has(c.slug))
    .map((c) => ({ label: c.name, href: `/visas/${c.slug}` }));

  const countryColumns: NavColumn[] = [
    { heading: "Popular Destinations", links: pick(countries, POPULAR_COUNTRIES) },
    { heading: "Europe", links: pick(countries, EUROPE_COUNTRIES) },
    { heading: "More Europe", links: pick(countries, MORE_EUROPE_COUNTRIES) },
    { heading: "Asia & Pacific", links: pick(countries, ASIA_COUNTRIES) },
    {
      heading: "Middle East, Africa & Americas",
      links: [...pick(countries, MIDDLE_EAST_AFRICA_AMERICAS_COUNTRIES), ...otherLinks],
    },
  ].filter((col) => col.links.length > 0);

  const tourColumns: NavColumn[] = [
    {
      heading: "Tour Packages",
      links: [
        { label: "Group Tours", href: "/tour-packages/group-tours" },
        { label: "International Packages", href: "/tour-packages" },
        { label: "Packages from Pakistan", href: "/tour-packages/from-pakistan" },
        { label: "Upcoming Departures", href: "/tour-packages/upcoming" },
        { label: "Customized Tours", href: "/tour-packages/customized" },
        { label: "Hotel Booking", href: "/hotel-booking" },
      ],
    },
  ];
  tourColumns.push({
    heading: "Popular Packages",
    links: [
      ["europe", "Europe"], ["turkey", "Turkey"], ["canada", "Canada"],
      ["switzerland", "Switzerland"], ["thailand", "Thailand"], ["japan", "Japan"],
    ].map(([slug, label]) => ({ label: `${label} Packages`, href: `/tour-packages/from-pakistan/${slug}` })),
  });
  if (tours.length > 0) {
    tourColumns.push({
      heading: "Current Group Tours",
      links: tours.map((t) => ({ label: t.destination, href: `/tour-packages/${t.slug}` })),
    });
  }

  return [
    { label: "Home", href: "/" },
    {
      label: "Visas",
      width: supportLinks.length > 0 ? 760 : 520,
      columns: [
        {
          heading: "Visa Categories",
          links: [...categoryLinks, { label: "Our Visa Process", href: "/visa-process" }],
        },
        ...(supportLinks.length > 0 ? [{ heading: "Application Support", links: supportLinks }] : []),
        {
          heading: "Refusal Cases",
          links: [
            { label: "Visa Refusal Assistance", href: "/visa-refusal" },
            { label: "UK Pre-Action Protocol", href: "/visa-refusal/uk" },
            { label: "Canada Reconsideration", href: "/visa-refusal/canada" },
          ],
        },
      ],
      viewAll: { label: "All Visa Services", href: "/visa-consultancy" },
    },
    {
      label: "Countries",
      width: countryColumns.length >= 5 ? 1020 : countryColumns.length === 4 ? 860 : 640,
      columns: countryColumns,
      viewAll: { label: "View All Countries", href: "/visas" },
    },
    {
      label: "Tours",
      width: tourColumns.length > 2 ? 780 : tourColumns.length > 1 ? 640 : 520,
      columns: tourColumns,
    },
    { label: "Flights & Hotels", href: "/flights" },
    {
      label: "Cities",
      width: 640,
      columns: [
        {
          heading: "Provinces",
          links: [
            { label: "Punjab", href: "/travel-agency/punjab" },
            { label: "Sindh", href: "/travel-agency/sindh" },
            { label: "Khyber Pakhtunkhwa", href: "/travel-agency/khyber-pakhtunkhwa" },
            { label: "Balochistan", href: "/travel-agency/balochistan" },
            { label: "Islamabad", href: "/travel-agency/islamabad-capital-territory" },
            { label: "Azad Kashmir", href: "/travel-agency/azad-kashmir" },
            { label: "Gilgit-Baltistan", href: "/travel-agency/gilgit-baltistan" },
          ],
        },
        {
          heading: "Popular Cities",
          links: [
            { label: "Rawalpindi", href: "/travel-agency/rawalpindi" },
            { label: "Faisalabad", href: "/travel-agency/faisalabad" },
            { label: "Multan", href: "/travel-agency/multan" },
            { label: "Peshawar", href: "/travel-agency/peshawar" },
            { label: "Sialkot", href: "/travel-agency/sialkot" },
            { label: "Gujranwala", href: "/travel-agency/gujranwala" },
            { label: "Quetta", href: "/travel-agency/quetta" },
            { label: "Hyderabad", href: "/travel-agency/hyderabad" },
          ],
        },
        {
          heading: "Our Offices",
          links: [
            { label: "Lahore", href: "/locations/lahore" },
            { label: "Islamabad", href: "/locations/islamabad" },
            { label: "Wazirabad", href: "/locations/wazirabad" },
            { label: "Karachi", href: "/locations/karachi" },
          ],
        },
      ],
      viewAll: { label: "All Cities and Provinces", href: "/travel-agency" },
    },
    {
      label: "Resources",
      columns: [
        {
          heading: "Knowledge Centre",
          links: [
            { label: "Visa Guides", href: "/guides" },
            { label: "Travel Guides", href: "/guides/travel" },
            { label: "Latest Updates", href: "/guides/updates" },
            { label: "FAQs", href: "/faqs" },
            { label: "Success Stories", href: "/success-stories" },
          ],
        },
      ],
    },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];
}

export const mobileQuickLinks = [
  { label: "Visa Consultancy", href: "/visa-consultancy" },
  { label: "Visa Refusal Help", href: "/visa-refusal" },
  { label: "Tour Packages", href: "/tour-packages" },
  { label: "Flights & Hotels", href: "/flights" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Office Locations", href: "/locations" },
  { label: "Cities We Serve", href: "/travel-agency" },
  { label: "Packages from Pakistan", href: "/tour-packages/from-pakistan" },
];
