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
}

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Visas",
    columns: [
      {
        heading: "Visa Categories",
        links: [
          { label: "Visit Visa", href: "/visa-consultancy/visit-visa" },
          { label: "Business Visa", href: "/visa-consultancy/business-visa" },
          { label: "Family Visit Visa", href: "/visa-consultancy/family-visit-visa" },
          { label: "Study Visa Assistance", href: "/visa-consultancy/study-visa" },
        ],
      },
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
    columns: [
      {
        heading: "Popular Destinations",
        links: [
          { label: "United Kingdom", href: "/visas/uk" },
          { label: "Canada", href: "/visas/canada" },
          { label: "USA", href: "/visas/usa" },
          { label: "Australia", href: "/visas/australia" },
        ],
      },
      {
        heading: "More Destinations",
        links: [
          { label: "Schengen Europe", href: "/visas/schengen" },
          { label: "Turkey", href: "/visas/turkey" },
          { label: "Japan", href: "/visas/japan" },
          { label: "New Zealand", href: "/visas/new-zealand" },
        ],
      },
    ],
    viewAll: { label: "View All Countries", href: "/visas" },
  },
  {
    label: "Tours",
    columns: [
      {
        heading: "Tour Packages",
        links: [
          { label: "Group Tours", href: "/tour-packages/group-tours" },
          { label: "International Packages", href: "/tour-packages" },
          { label: "Upcoming Departures", href: "/tour-packages/upcoming" },
          { label: "Customized Tours", href: "/tour-packages/customized" },
        ],
      },
    ],
  },
  { label: "Flights", href: "/flights" },
  { label: "Success Stories", href: "/success-stories" },
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
        ],
      },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const mobileQuickLinks = [
  { label: "Visa Consultancy", href: "/visa-consultancy" },
  { label: "Visa Refusal Help", href: "/visa-refusal" },
  { label: "Tour Packages", href: "/tour-packages" },
  { label: "Flights", href: "/flights" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Office Locations", href: "/locations" },
];
