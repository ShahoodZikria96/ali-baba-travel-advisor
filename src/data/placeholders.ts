/**
 * Google reviews (googleReviews) were supplied by the owner from the public Google Business Profile.
 * Real testimonials, tour pricing and video links pulled from
 * alibabatraveladvisor.com / the client's YouTube channel.
 * Departure dates were not carried over (the source site listed months that
 * have already passed) — confirm current departure dates with the client
 * before launch. Success stories remain illustrative sample content; replace
 * with real case studies before launch.
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

export const googleReviews = [
  {
    name: "Ahmad Nasir",
    location: "Google Review",
    rating: 5,
    text: "Not like other consultants who just ask for payments. They provide solutions for every issue in Visa process and most importantly they have grip on all countries. I have applied Australia, France, UK and New Zealand visas through them and all of the visas were approved. I was not expecting such good services but when I visited them I found that they are professional and they know the process entirely.",
    photo: null as string | null,
  },
  {
    name: "Mubashar Iqbal",
    location: "Google Review",
    rating: 5,
    text: "I have received my Japan visa through their services. I have never visited any other consultant afterwards.",
    photo: null as string | null,
  },
  {
    name: "Umair Ahmad",
    location: "Google Review",
    rating: 5,
    text: "Ali Baba always reliable and very efficient personality.",
    photo: null as string | null,
  },
];

export const sampleVideos = [
  {
    title: "How to Apply for a Spain Visa from Pakistan? | Complete Application Process 2026",
    category: "Visa Guides",
    duration: "10:55",
    youtubeUrl: "https://www.youtube.com/watch?v=AedYZXUmxKc",
    thumbnail: "https://i.ytimg.com/vi/AedYZXUmxKc/hqdefault.jpg",
  },
  {
    title: "Canada Visa Approved After Multiple Refusals! | Refusal se Approval Tak Complete Guide",
    category: "Refusal Guidance",
    duration: "9:54",
    youtubeUrl: "https://www.youtube.com/watch?v=0OzxNNQuFQI",
    thumbnail: "https://i.ytimg.com/vi/0OzxNNQuFQI/hqdefault.jpg",
  },
  {
    title: "Travel History Banani Hai? 2 Best International Tour Packages Explained",
    category: "Group Tours",
    duration: "7:08",
    youtubeUrl: "https://www.youtube.com/watch?v=k9u0OBwYDMk",
    thumbnail: "https://i.ytimg.com/vi/k9u0OBwYDMk/hqdefault.jpg",
  },
];
