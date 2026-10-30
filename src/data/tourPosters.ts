/** Optional promotional posters shown on tour detail pages, keyed by tour slug. */
export const tourPosters: Record<string, string[]> = {
  "travel-history-group-tour": ["/tours/travel-history-group-tour.webp"],
  // Poster with the group leaders, then the terms and documents poster.
  "usa-group-tour": ["/tours/usa-group-tour-march-april-2027.webp"],
  "canada-group-tour": ["/tours/canada-group-tour-march-2027.webp", "/tours/canada-group-tour-terms-2027.webp"],
};

/** Prices marked "(package price)" are not shown as per-person. */
export function priceSuffix(price: string) {
  if (!/\d/.test(price)) return ""; // "Call for price" has no per-person amount
  return price.toLowerCase().includes("package") ? "" : " / person";
}
