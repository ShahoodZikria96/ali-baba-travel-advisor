/**
 * Central business information (single source of truth for NAP data).
 *
 * The admin "Settings" page overrides phone / WhatsApp / email / socials at
 * runtime (stored in the DB); these values seed the DB and act as the fallback
 * used by schema markup and static helpers. Keep them identical to the Google
 * Business Profile listing.
 *
 * REQUIRED BUSINESS INFORMATION — items marked TODO must be confirmed by the
 * business owner before launch (see docs/REQUIRED-BUSINESS-INFO.md).
 */
export const siteConfig = {
  name: "Ali Baba Travel Advisor",
  // TODO: confirm the registered legal entity name (shown in policies + schema legalName).
  legalName: "Ali Baba Travel Advisor",
  tagline: "Visa consultancy, tours, flights & hotel booking from Lahore, Pakistan",
  whatsappNumber: "923111666076",
  phone: "+92 311 1666076",
  phoneSecondary: "+92 309 6611955",
  // Additional office / consultant lines (shown on the contact page only).
  otherPhones: ["+92 321 4419469", "+92 300 3567312", "+92 300 4044443", "+92 323 8814614"],
  email: "info@alibabatraveladvisor.com",
  socials: {
    facebook: "https://www.facebook.com/share/19K6oKut5R/",
    /** Public Facebook page where visa approvals are posted. */
    facebookPage: "https://www.facebook.com/AliBabaTravelAdvisor",
    /** WhatsApp Channel for daily visa and tour updates. */
    whatsappChannel: "https://whatsapp.com/channel/0029VaIIM5L8V0tk3fb18q2t",
    instagram: "https://www.instagram.com/alibabatraveladvisor/",
    youtube: "https://www.youtube.com/@AliBabaTravelAdvisor",
  },
  // TODO: add LinkedIn / TikTok / Google Business Profile URLs when they exist.
  // Set as soon as the Google Business Profile is verified — it feeds `sameAs` and the "Leave a review" link.
  googleBusinessProfileUrl:
    "https://www.google.com/maps/place/Ali+Baba+Travel+Advisor/@31.5314837,74.3526375,17z/data=!3m1!4b1!4m6!3m5!1s0x39190545cf1e5eab:0x7b86c4a6068a7238!8m2!3d31.5314837!4d74.3526375!16s%2Fg%2F11vwmyf0pr",
  /** Google reviews badge. Keep `count` (and `rating`, a string like "4.9", once confirmed) in step with the Google profile. */
  googleReviews: { url: "https://share.google/jMBlwaingAvMIZZEj", count: "200+", rating: null as string | null },
  // Lahore head-office coordinates (from the Google Maps listing).
  geo: { latitude: 31.5314837, longitude: 74.3526375 },
  openingHours: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:00", closes: "18:00" },
};

/**
 * Public numbers and the announcement bar. Edit here, rebuild, re-upload.
 * (Analytics IDs and ads are NOT here: they live in site-config.json on the
 * server so they can be changed without a rebuild.)
 */
export const publicSettings = {
  happyCustomersStat: "7,500+",
  youtubeSubscribers: "58,500+",
  announcement: { text: "Now open in Karachi — visit our DHA Phase 2 Extension office.", href: "/locations/karachi", active: true },
  /** Shown as "last reviewed" on country pages and in the sitemap. Update when content is re-checked. */
  contentReviewed: "2026-09-30",
};

export function whatsappHref(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function telHref(phone: string = siteConfig.phone) {
  return `tel:${phone.replace(/\s/g, "")}`;
}
