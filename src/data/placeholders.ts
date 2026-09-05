/**
 * Real testimonials and tour pricing pulled from alibabatraveladvisor.com.
 * Departure dates were not carried over (the source site listed months that
 * have already passed) — confirm current departure dates with the client
 * before launch. Success stories and video cards remain illustrative sample
 * content; replace with real case studies and video titles before launch.
 */

export const sampleSuccessStories = [
  { country: "UK", category: "Family Visit Visa", period: "2026", summary: "Assisted with documentation for a family visit application to attend a wedding." },
  { country: "Canada", category: "Visitor Visa", period: "2026", summary: "Guided a reapplication following a previous refusal, focusing on stronger financial evidence." },
  { country: "Schengen", category: "Tourist Visa", period: "2025", summary: "Supported a first-time applicant through the Schengen documentation process." },
  { country: "Australia", category: "Visitor Visa", period: "2025", summary: "Helped a business owner prepare a visit visa case for a trade conference." },
];

export const sampleReviews = [
  {
    name: "Sara Malik",
    location: "Islamabad",
    rating: 5,
    text: "Alibaba Travel made my dream trip to Canada a reality, and I'm so grateful for their amazing service! Their team was patient, understanding, and went above and beyond to ensure everything was perfect.",
    photo: "/testimonials/sara-malik.webp",
  },
  {
    name: "Zeeshan Shah",
    location: "Lahore",
    rating: 5,
    text: "I recently booked a trip to the UK through Alibaba Travel, and I can't praise their service enough! From start to finish, the team was incredibly professional and attentive.",
    photo: "/testimonials/zeeshan-shah.webp",
  },
];

export const sampleTours = [
  { slug: "uk-group-tour", destination: "United Kingdom", duration: "6 Days / 5 Nights", departure: "Ask for next departure", price: "PKR 620,000", visaAssistance: true },
  { slug: "azerbaijan-group-tour", destination: "Azerbaijan", duration: "6 Days / 5 Nights", departure: "Ask for next departure", price: "PKR 270,000", visaAssistance: true },
  { slug: "france-group-tour", destination: "France", duration: "6 Days / 5 Nights", departure: "Ask for next departure", price: "PKR 550,000", visaAssistance: true },
];

export const sampleVideos = [
  { title: "UK Visit Visa: Documents You Actually Need", category: "Visa Guides", duration: "8:42" },
  { title: "Why Visa Applications Get Refused", category: "Refusal Guidance", duration: "11:15" },
  { title: "Inside Our Azerbaijan Group Tour", category: "Group Tours", duration: "6:03" },
];
