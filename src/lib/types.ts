// Shapes of the site content. Content lives in src/data/* and is compiled
// into static HTML at build time (no database on the website).
export interface Faq { id: string; question: string; answer: string }
export interface Office {
  id: string; slug: string; city: string; address: string; phone: string; hours: string; mapUrl: string;
  openingDate: Date | null; intro: string; localContext: string; servicesOffered: string[];
  updatedAt: Date;
}
export interface Country {
  id: string; slug: string; name: string; flagEmoji: string | null; flagImage: string | null; heroImage: string | null;
  visaType: string; description: string; featured: boolean; metaTitle: string | null; metaDescription: string | null;
  intro: string | null; whoCanApply: string[] | null; visaTypes: { name: string; description: string }[] | null;
  documents: string[] | null; financialNote: string | null; processingTime: string | null; steps: string[] | null;
  refusalReasons: string[] | null; faqs: { question: string; answer: string }[] | null; updatedAt: Date;
}
export interface RefusalPage {
  id: string; slug: string; country: string; metaTitle: string | null; metaDescription: string | null; intro: string;
  commonReasons: string[]; whatWeReview: string[]; specialNote: string | null;
  faqs: { question: string; answer: string }[]; updatedAt: Date;
}
export interface ServicePage {
  id: string; slug: string; title: string; metaDescription: string | null; intro: string; highlights: string[];
  process: string[]; faqs: { question: string; answer: string }[]; updatedAt: Date;
}
export interface Tour {
  id: string; slug: string; destination: string; image: string; duration: string; departure: string; price: string;
  visaAssistance: boolean; summary: string; highlights: string[]; included: string[]; excluded: string[];
  itinerary: { day: string; description: string }[]; notes: string[]; updatedAt: Date;
}
export interface Guide {
  id: string; slug: string; title: string; image: string; category: string; publishedDate: Date; readingTime: string;
  excerpt: string; content: string[]; updatedAt: Date;
}
export interface Testimonial { id: string; name: string; location: string; rating: number; text: string; photo: string | null }
export interface SuccessStory { id: string; country: string; category: string; period: string; summary: string }
export interface Video { id: string; title: string; category: string; duration: string; youtubeUrl: string | null; thumbnail: string | null }
export interface TeamMember { id: string; name: string; role: string; photo: string | null; bio: string | null }
export interface SiteSettings {
  phone: string; phoneSecondary: string | null; whatsappNumber: string; email: string;
  facebookUrl: string; instagramUrl: string; youtubeUrl: string;
  announcementText: string; announcementHref: string; announcementActive: boolean;
  youtubeSubscribers: string; happyCustomersStat: string;
}
