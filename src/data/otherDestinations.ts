/**
 * Full list of destinations the business handles (confirmed by the owner).
 * Used for the destination dropdown on the visa assessment form; the public
 * country pages themselves are managed in Admin → Visa Countries.
 */
export interface DestinationEntry {
  name: string;
  /** Existing page to link to, if any. */
  href?: string;
}

export interface DestinationRegion {
  region: string;
  note?: string;
  items: DestinationEntry[];
}

const S = "/visas/schengen";

export const destinationRegions: DestinationRegion[] = [
  {
    region: "Schengen Europe",
    note: "One Schengen visa covers the Schengen area; apply through the country where you will spend the most nights.",
    items: [
      { name: "Austria", href: S }, { name: "Belgium", href: S }, { name: "Bulgaria", href: S },
      { name: "Czech Republic", href: S }, { name: "Denmark", href: S }, { name: "Finland", href: S },
      { name: "France", href: S }, { name: "Germany", href: S }, { name: "Greece", href: S },
      { name: "Hungary", href: S }, { name: "Italy", href: S }, { name: "Luxembourg", href: S },
      { name: "Netherlands", href: S }, { name: "Norway", href: S }, { name: "Romania", href: S },
      { name: "Spain", href: S }, { name: "Sweden", href: S }, { name: "Switzerland", href: S },
    ],
  },
  {
    region: "Other Europe",
    items: [
      { name: "United Kingdom", href: "/visas/uk" },
      { name: "Ireland" }, { name: "Albania" }, { name: "Serbia" },
    ],
  },
  {
    region: "North & South America",
    items: [
      { name: "USA", href: "/visas/usa" }, { name: "Canada", href: "/visas/canada" },
      { name: "Brazil" }, { name: "Colombia" },
    ],
  },
  {
    region: "Asia & Pacific",
    items: [
      { name: "Australia", href: "/visas/australia" }, { name: "New Zealand", href: "/visas/new-zealand" },
      { name: "Japan", href: "/visas/japan" }, { name: "South Korea" }, { name: "Hong Kong" },
      { name: "Singapore" }, { name: "Thailand" }, { name: "Malaysia", href: "/visas/malaysia" },
      { name: "Indonesia" }, { name: "Cambodia" },
    ],
  },
  {
    region: "Middle East, Caucasus & Africa",
    items: [
      { name: "Turkey", href: "/visas/turkey" }, { name: "Azerbaijan", href: "/visas/azerbaijan" },
      { name: "Egypt" }, { name: "Morocco" }, { name: "South Africa", href: "/visas/south-africa" },
    ],
  },
];

/** Flat, alphabetical list for form dropdowns. */
export const allDestinationNames: string[] = Array.from(
  new Set(destinationRegions.flatMap((r) => r.items.map((i) => i.name)))
).sort((a, b) => a.localeCompare(b));
