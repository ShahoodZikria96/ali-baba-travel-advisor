/** Optional promotional posters shown on tour detail pages, keyed by tour slug. */
export const tourPosters: Record<string, string> = {
  "travel-history-group-tour": "/tours/travel-history-group-tour.webp",
};

/** Prices marked "(package price)" are not shown as per-person. */
export function priceSuffix(price: string) {
  return price.toLowerCase().includes("package") ? "" : " / person";
}
