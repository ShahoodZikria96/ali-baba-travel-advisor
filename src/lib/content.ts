import { offices } from "@/data/offices";
import { locationContent } from "@/data/locationContent";
import { popularDestinations, moreDestinations } from "@/data/countries";
import { countryPages } from "@/data/countryPages";
import { refusalPages } from "@/data/refusalPages";
import { servicePages } from "@/data/servicePages";
import { tours } from "@/data/tours";
import { guides } from "@/data/guides";
import { sampleReviews, googleReviews, sampleSuccessStories, sampleVideos } from "@/data/placeholders";
import { generalFaqs } from "@/data/faqs";
import { team } from "@/data/team";
import { siteConfig, publicSettings } from "@/data/site";
import type {
  Country, Faq, Guide, Office, RefusalPage, ServicePage, SiteSettings, SuccessStory, TeamMember, Testimonial, Tour, Video,
} from "@/lib/types";

export { whatsappHref, telHref } from "@/lib/whatsapp";

// The site is a static export: all content is compiled from src/data/* at build
// time. Functions stay async so pages read the same as they did with a database.

const updatedAt = new Date(publicSettings.contentReviewed);

// ---------- Site settings ----------

export async function getSiteSettings(): Promise<SiteSettings> {
  return {
    phone: siteConfig.phone,
    phoneSecondary: siteConfig.phoneSecondary,
    whatsappNumber: siteConfig.whatsappNumber,
    email: siteConfig.email,
    facebookUrl: siteConfig.socials.facebook,
    instagramUrl: siteConfig.socials.instagram,
    youtubeUrl: siteConfig.socials.youtube,
    announcementText: publicSettings.announcement.text,
    announcementHref: publicSettings.announcement.href,
    announcementActive: publicSettings.announcement.active,
    youtubeSubscribers: publicSettings.youtubeSubscribers,
    happyCustomersStat: publicSettings.happyCustomersStat,
  };
}

// ---------- Offices ----------

const officeList: Office[] = offices.map((o) => {
  const c = locationContent.find((l) => l.slug === o.slug);
  return {
    id: o.slug, slug: o.slug, city: o.city, address: o.address, phone: o.phone, hours: o.hours, mapUrl: o.mapUrl,
    openingDate: o.openingDate ? new Date(o.openingDate) : null,
    intro: c?.intro ?? "", localContext: c?.localContext ?? "", servicesOffered: c?.servicesOffered ?? [],
    updatedAt,
  };
});

export async function getOffices() { return officeList; }
export async function getOffice(slug: string) { return officeList.find((o) => o.slug === slug) ?? null; }

// ---------- Countries ----------

const countryList: Country[] = [...popularDestinations, ...moreDestinations].map((c) => {
  const rich = countryPages.find((p) => p.slug === c.slug);
  return {
    id: c.slug, slug: c.slug, name: c.name, flagEmoji: c.flag ?? null, flagImage: c.flagImage ?? null,
    heroImage: `/destinations/${c.slug}.webp`, visaType: c.visaType, description: c.description,
    featured: popularDestinations.some((p) => p.slug === c.slug),
    metaTitle: rich?.metaTitle ?? null, metaDescription: rich?.metaDescription ?? null, intro: rich?.intro ?? null,
    whoCanApply: rich?.whoCanApply ?? null, visaTypes: rich?.visaTypes ?? null, documents: rich?.documents ?? null,
    financialNote: rich?.financialNote ?? null, processingTime: rich?.processingTime ?? null, steps: rich?.steps ?? null,
    refusalReasons: rich?.refusalReasons ?? null, faqs: rich?.faqs ?? null, updatedAt,
  };
});

export async function getCountries() { return countryList; }
export async function getFeaturedCountries() { return countryList.filter((c) => c.featured); }
export async function getCountry(slug: string) { return countryList.find((c) => c.slug === slug) ?? null; }
export async function getCountrySlugs() { return countryList.map((c) => c.slug); }

// ---------- Refusal pages ----------

const refusalList: RefusalPage[] = refusalPages.map((r) => ({
  id: r.slug, slug: r.slug, country: r.country, metaTitle: r.metaTitle, metaDescription: r.metaDescription,
  intro: r.intro, commonReasons: r.commonReasons, whatWeReview: r.whatWeReview, specialNote: r.specialNote ?? null,
  faqs: r.faqs, updatedAt,
}));
export async function getRefusalPages() { return refusalList; }
export async function getRefusalPage(slug: string) { return refusalList.find((r) => r.slug === slug) ?? null; }

// ---------- Service pages ----------

const serviceList: ServicePage[] = servicePages.map((s) => ({
  id: s.slug, slug: s.slug, title: s.title, metaDescription: s.metaDescription, intro: s.intro,
  highlights: s.highlights, process: s.process, faqs: s.faqs, updatedAt,
}));
export async function getServicePages() { return serviceList; }
export async function getServicePage(slug: string) { return serviceList.find((s) => s.slug === slug) ?? null; }

// ---------- Tours ----------

const tourList: Tour[] = tours.map((t) => ({ ...t, id: t.slug, updatedAt }));
export async function getTours() { return tourList; }
export async function getTour(slug: string) { return tourList.find((t) => t.slug === slug) ?? null; }

// ---------- Guides ----------

const guideList: Guide[] = guides
  .map((g) => ({ ...g, id: g.slug, publishedDate: new Date(g.publishedDate), updatedAt: new Date(g.updatedDate ?? g.publishedDate) }))
  .sort((a, b) => +b.publishedDate - +a.publishedDate);
export async function getGuides() { return guideList; }
export async function getGuide(slug: string) { return guideList.find((g) => g.slug === slug) ?? null; }

// ---------- Testimonials / success stories / videos / faqs / team ----------

const testimonialList: Testimonial[] = [...sampleReviews, ...googleReviews].map((r, i) => ({
  id: `t${i}`, name: r.name, location: r.location, rating: r.rating, text: r.text, photo: r.photo ?? null,
}));
export async function getTestimonials() { return testimonialList; }

const storyList: SuccessStory[] = sampleSuccessStories.map((s, i) => ({ id: `s${i}`, ...s }));
export async function getSuccessStories() { return storyList; }

const videoList: Video[] = sampleVideos.map((v, i) => ({ id: `v${i}`, ...v }));
export async function getVideos() { return videoList; }

const faqList: Faq[] = generalFaqs.map((f, i) => ({ id: `f${i}`, ...f }));
export async function getFaqs() { return faqList; }

const teamList: TeamMember[] = team.map((m, i) => ({ id: `m${i}`, ...m }));
export async function getTeamMembers() { return teamList; }
