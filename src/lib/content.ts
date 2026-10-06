import { offices } from "@/data/offices";
import { locationContent } from "@/data/locationContent";
import { popularDestinations, moreDestinations } from "@/data/countries";
import { countryPages } from "@/data/countryPages";
import { refusalPages } from "@/data/refusalPages";
import { servicePages } from "@/data/servicePages";
import { tours, extraTours } from "@/data/tours";
import { guides } from "@/data/guides";
import { sampleReviews, googleReviews, sampleSuccessStories, sampleVideos } from "@/data/placeholders";
import { generalFaqs } from "@/data/faqs";
import { team } from "@/data/team";
import { siteConfig, publicSettings } from "@/data/site";
import type {
  Country, Faq, Guide, Office, RefusalPage, ServicePage, SiteSettings, SuccessStory, TeamMember, Testimonial, Tour, Video,
} from "@/lib/types";

export { whatsappHref, telHref } from "@/lib/whatsapp";

// The site is a static export built ahead of time, so pages can't query the
// database per-request. Instead, every build (including the scheduled one
// that runs automatically every ~20 minutes - see .github/workflows/build-site.yml)
// fetches the current published content from the live PHP+MySQL API
// (api/content.php) over plain HTTPS, so anything added or edited through the
// admin panel reaches the live site on the next build without anyone needing
// to touch code. If that fetch fails (offline, first-ever build before the
// backend is deployed, etc.) each resource quietly falls back to the
// bundled src/data/* content below, so the build never breaks.
const API_BASE = process.env.CONTENT_API_BASE || "https://alibabatraveladvisor.com/api/content.php";

async function fetchResource<T>(resource: string, slug?: string): Promise<T | null> {
  try {
    const url = new URL(API_BASE);
    url.searchParams.set("resource", resource);
    if (slug) url.searchParams.set("slug", slug);
    const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

const updatedAt = new Date(publicSettings.contentReviewed);

// ---------- Site settings ----------

type ApiSettings = {
  phone: string; phone_secondary: string | null; whatsapp_number: string; email: string;
  facebook_url: string | null; instagram_url: string | null; youtube_url: string | null;
  announcement_text: string | null; announcement_href: string | null; announcement_active: boolean;
  youtube_subscribers: string; happy_customers_stat: string;
};

const fallbackSettings: SiteSettings = {
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

export async function getSiteSettings(): Promise<SiteSettings> {
  const s = await fetchResource<ApiSettings>("settings");
  if (!s || !s.phone) return fallbackSettings;
  return {
    phone: s.phone, phoneSecondary: s.phone_secondary, whatsappNumber: s.whatsapp_number, email: s.email,
    facebookUrl: s.facebook_url ?? fallbackSettings.facebookUrl, instagramUrl: s.instagram_url ?? fallbackSettings.instagramUrl,
    youtubeUrl: s.youtube_url ?? fallbackSettings.youtubeUrl,
    announcementText: s.announcement_text ?? "", announcementHref: s.announcement_href ?? "/",
    announcementActive: !!s.announcement_active, youtubeSubscribers: s.youtube_subscribers, happyCustomersStat: s.happy_customers_stat,
  };
}

// ---------- Offices ----------

const officeFallback: Office[] = offices.map((o) => {
  const c = locationContent.find((l) => l.slug === o.slug);
  return {
    id: o.slug, slug: o.slug, city: o.city, address: o.address, phone: o.phone, hours: o.hours, mapUrl: o.mapUrl,
    openingDate: o.openingDate ? new Date(o.openingDate) : null,
    intro: c?.intro ?? "", localContext: c?.localContext ?? "", servicesOffered: c?.servicesOffered ?? [],
    updatedAt,
  };
});

type ApiOffice = {
  id: number; slug: string; city: string; address: string; phone: string; hours: string; map_url: string;
  opening_date: string | null; intro: string | null; local_context: string | null; services_offered: string[] | null;
  updated_at: string;
};
const fromApiOffice = (o: ApiOffice): Office => ({
  id: o.slug, slug: o.slug, city: o.city, address: o.address, phone: o.phone, hours: o.hours, mapUrl: o.map_url,
  openingDate: o.opening_date ? new Date(o.opening_date) : null, intro: o.intro ?? "", localContext: o.local_context ?? "",
  servicesOffered: o.services_offered ?? [], updatedAt: new Date(o.updated_at),
});

let officeListCache: Office[] | null = null;
async function officeList(): Promise<Office[]> {
  if (officeListCache) return officeListCache;
  const api = await fetchResource<ApiOffice[]>("offices");
  return (officeListCache = api && api.length ? api.map(fromApiOffice) : officeFallback);
}

export async function getOffices() { return officeList(); }
export async function getOffice(slug: string) { return (await officeList()).find((o) => o.slug === slug) ?? null; }

// ---------- Countries ----------

const countryFallback: Country[] = [...popularDestinations, ...moreDestinations].map((c) => {
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

type ApiCountry = {
  id: number; slug: string; name: string; flag_emoji: string | null; flag_image: string | null; hero_image: string | null;
  visa_type: string; description: string; featured: boolean; meta_title: string | null; meta_description: string | null;
  intro: string | null; who_can_apply: string[] | null; visa_types: { name: string; description: string }[] | null;
  documents: string[] | null; financial_note: string | null; processing_time: string | null; steps: string[] | null;
  refusal_reasons: string[] | null; faqs: { question: string; answer: string }[] | null; updated_at: string;
};
const fromApiCountry = (c: ApiCountry): Country => ({
  id: c.slug, slug: c.slug, name: c.name, flagEmoji: c.flag_emoji, flagImage: c.flag_image,
  heroImage: c.hero_image ?? `/destinations/${c.slug}.webp`, visaType: c.visa_type, description: c.description,
  featured: !!c.featured, metaTitle: c.meta_title, metaDescription: c.meta_description, intro: c.intro,
  whoCanApply: c.who_can_apply, visaTypes: c.visa_types, documents: c.documents, financialNote: c.financial_note,
  processingTime: c.processing_time, steps: c.steps, refusalReasons: c.refusal_reasons, faqs: c.faqs,
  updatedAt: new Date(c.updated_at),
});

let countryListCache: Country[] | null = null;
async function countryList(): Promise<Country[]> {
  if (countryListCache) return countryListCache;
  const api = await fetchResource<ApiCountry[]>("countries");
  return (countryListCache = api && api.length ? api.map(fromApiCountry) : countryFallback);
}

export async function getCountries() { return countryList(); }
export async function getFeaturedCountries() { return (await countryList()).filter((c) => c.featured); }
export async function getCountry(slug: string) { return (await countryList()).find((c) => c.slug === slug) ?? null; }
export async function getCountrySlugs() { return (await countryList()).map((c) => c.slug); }

// ---------- Refusal pages ----------

const refusalFallback: RefusalPage[] = refusalPages.map((r) => ({
  id: r.slug, slug: r.slug, country: r.country, metaTitle: r.metaTitle, metaDescription: r.metaDescription,
  intro: r.intro, commonReasons: r.commonReasons, whatWeReview: r.whatWeReview, specialNote: r.specialNote ?? null,
  faqs: r.faqs, updatedAt,
}));

type ApiRefusalPage = {
  id: number; slug: string; country: string; meta_title: string | null; meta_description: string | null; intro: string;
  common_reasons: string[]; what_we_review: string[]; special_note: string | null;
  faqs: { question: string; answer: string }[]; updated_at: string;
};
const fromApiRefusal = (r: ApiRefusalPage): RefusalPage => ({
  id: r.slug, slug: r.slug, country: r.country, metaTitle: r.meta_title, metaDescription: r.meta_description,
  intro: r.intro, commonReasons: r.common_reasons, whatWeReview: r.what_we_review, specialNote: r.special_note,
  faqs: r.faqs, updatedAt: new Date(r.updated_at),
});

let refusalListCache: RefusalPage[] | null = null;
async function refusalList(): Promise<RefusalPage[]> {
  if (refusalListCache) return refusalListCache;
  const api = await fetchResource<ApiRefusalPage[]>("refusal_pages");
  return (refusalListCache = api && api.length ? api.map(fromApiRefusal) : refusalFallback);
}

export async function getRefusalPages() { return refusalList(); }
export async function getRefusalPage(slug: string) { return (await refusalList()).find((r) => r.slug === slug) ?? null; }

// ---------- Service pages ----------

const serviceFallback: ServicePage[] = servicePages.map((s) => ({
  id: s.slug, slug: s.slug, title: s.title, metaDescription: s.metaDescription, intro: s.intro,
  highlights: s.highlights, process: s.process, faqs: s.faqs, updatedAt,
}));

type ApiServicePage = {
  id: number; slug: string; title: string; meta_description: string | null; intro: string; highlights: string[];
  process: string[]; faqs: { question: string; answer: string }[]; updated_at: string;
};
const fromApiService = (s: ApiServicePage): ServicePage => ({
  id: s.slug, slug: s.slug, title: s.title, metaDescription: s.meta_description, intro: s.intro,
  highlights: s.highlights, process: s.process, faqs: s.faqs, updatedAt: new Date(s.updated_at),
});

let serviceListCache: ServicePage[] | null = null;
async function serviceList(): Promise<ServicePage[]> {
  if (serviceListCache) return serviceListCache;
  const api = await fetchResource<ApiServicePage[]>("service_pages");
  return (serviceListCache = api && api.length ? api.map(fromApiService) : serviceFallback);
}

export async function getServicePages() { return serviceList(); }
export async function getServicePage(slug: string) { return (await serviceList()).find((s) => s.slug === slug) ?? null; }

// ---------- Tours ----------

const tourFallback: Tour[] = tours.map((t) => ({ ...t, id: t.slug, updatedAt }));

type ApiTour = {
  id: number; slug: string; destination: string; image: string; duration: string; departure: string; price: string;
  visa_assistance: boolean; summary: string; highlights: string[]; included: string[]; excluded: string[];
  itinerary: { day: string; description: string }[]; notes: string[]; category: string; updated_at: string;
};
const fromApiTour = (t: ApiTour): Tour => ({
  id: t.slug, slug: t.slug, destination: t.destination, image: t.image, duration: t.duration, departure: t.departure,
  price: t.price, visaAssistance: !!t.visa_assistance, summary: t.summary, highlights: t.highlights,
  included: t.included, excluded: t.excluded, itinerary: t.itinerary, notes: t.notes, updatedAt: new Date(t.updated_at),
});

let tourListCache: Tour[] | null = null;
async function tourList(): Promise<Tour[]> {
  if (tourListCache) return tourListCache;
  const api = await fetchResource<ApiTour[]>("tours");
  const list = api && api.length ? api.map(fromApiTour) : tourFallback;
  // Code-defined tours join the list unless the admin panel already has one with the same slug.
  const extras = extraTours.filter((e) => !list.some((t) => t.slug === e.slug)).map((t) => ({ ...t, id: t.slug, updatedAt }));
  return (tourListCache = [...list, ...extras]);
}

export async function getTours() { return tourList(); }
export async function getTour(slug: string) { return (await tourList()).find((t) => t.slug === slug) ?? null; }

// ---------- Guides ----------

const guideFallback: Guide[] = guides
  .map((g) => ({ ...g, id: g.slug, publishedDate: new Date(g.publishedDate), updatedAt: new Date(g.updatedDate ?? g.publishedDate) }))
  .sort((a, b) => +b.publishedDate - +a.publishedDate);

type ApiGuide = {
  id: number; slug: string; title: string; image: string; category: string; published_date: string;
  reading_time: string | null; excerpt: string; content: string[]; updated_at: string;
};
const fromApiGuide = (g: ApiGuide): Guide => ({
  id: g.slug, slug: g.slug, title: g.title, image: g.image, category: g.category,
  publishedDate: new Date(g.published_date), readingTime: g.reading_time ?? "", excerpt: g.excerpt,
  content: g.content, updatedAt: new Date(g.updated_at),
});

let guideListCache: Guide[] | null = null;
async function guideList(): Promise<Guide[]> {
  if (guideListCache) return guideListCache;
  const api = await fetchResource<ApiGuide[]>("guides");
  return (guideListCache = api && api.length
    ? api.map(fromApiGuide).sort((a, b) => +b.publishedDate - +a.publishedDate)
    : guideFallback);
}

export async function getGuides() { return guideList(); }
export async function getGuide(slug: string) { return (await guideList()).find((g) => g.slug === slug) ?? null; }

// ---------- Testimonials (fed by the reviews admin section + API, not the generic content resources) ----------

const testimonialFallback: Testimonial[] = [...sampleReviews, ...googleReviews].map((r, i) => ({
  id: `t${i}`, name: r.name, location: r.location, rating: r.rating, text: r.text, photo: r.photo ?? null,
}));

type ApiReview = { id: number; name: string; location: string; rating: number; text: string };
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const url = new URL(API_BASE.replace(/content\.php$/, "reviews.php"));
    const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) return testimonialFallback;
    const rows = (await res.json()) as ApiReview[];
    if (!rows.length) return testimonialFallback;
    return rows.map((r) => ({ id: `r${r.id}`, name: r.name, location: r.location, rating: r.rating, text: r.text, photo: null }));
  } catch {
    return testimonialFallback;
  }
}

// ---------- Success stories / videos / faqs / team ----------

const storyFallback: SuccessStory[] = sampleSuccessStories.map((s, i) => ({ id: `s${i}`, ...s }));
type ApiSuccessStory = { id: number; country: string; category: string; period: string; summary: string };
let storyListCache: SuccessStory[] | null = null;
export async function getSuccessStories(): Promise<SuccessStory[]> {
  if (storyListCache) return storyListCache;
  const api = await fetchResource<ApiSuccessStory[]>("success_stories");
  return (storyListCache = api && api.length
    ? api.map((s) => ({ id: `s${s.id}`, country: s.country, category: s.category, period: s.period, summary: s.summary }))
    : storyFallback);
}

const videoFallback: Video[] = sampleVideos.map((v, i) => ({ id: `v${i}`, ...v }));
type ApiVideo = { id: number; title: string; category: string; duration: string | null; youtube_url: string | null; thumbnail: string | null };
let videoListCache: Video[] | null = null;
export async function getVideos(): Promise<Video[]> {
  if (videoListCache) return videoListCache;
  const api = await fetchResource<ApiVideo[]>("videos");
  return (videoListCache = api && api.length
    ? api.map((v) => ({ id: `v${v.id}`, title: v.title, category: v.category, duration: v.duration ?? "", youtubeUrl: v.youtube_url, thumbnail: v.thumbnail }))
    : videoFallback);
}

const faqFallback: Faq[] = generalFaqs.map((f, i) => ({ id: `f${i}`, ...f }));
type ApiFaq = { id: number; question: string; answer: string };
let faqListCache: Faq[] | null = null;
export async function getFaqs(): Promise<Faq[]> {
  if (faqListCache) return faqListCache;
  const api = await fetchResource<ApiFaq[]>("faqs");
  return (faqListCache = api && api.length ? api.map((f) => ({ id: `f${f.id}`, question: f.question, answer: f.answer })) : faqFallback);
}

const teamFallback: TeamMember[] = team.map((m, i) => ({ id: `m${i}`, ...m }));
type ApiTeamMember = { id: number; name: string; role: string; photo: string | null; bio: string | null };
let teamListCache: TeamMember[] | null = null;
export async function getTeamMembers(): Promise<TeamMember[]> {
  if (teamListCache) return teamListCache;
  const api = await fetchResource<ApiTeamMember[]>("team_members");
  return (teamListCache = api && api.length
    ? api.map((m) => ({ id: `m${m.id}`, name: m.name, role: m.role, photo: m.photo, bio: m.bio }))
    : teamFallback);
}
