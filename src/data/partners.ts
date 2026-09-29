/**
 * Affiliate / partner links for informational pages. Leave empty until a real
 * affiliate agreement exists. Every entry renders with rel="sponsored" and a
 * disclosure (see AffiliateNotice).
 */
export interface Partner {
  topic: "hotels" | "flights" | "insurance";
  label: string;
  href: string;
}

export const partners: Partner[] = [];
