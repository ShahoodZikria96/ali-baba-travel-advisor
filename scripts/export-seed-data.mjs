// One-time export: reads the current static content (via src/lib/content.ts's
// already-merged data) and writes .seed-cache/seed-data.json, in the snake_case shape
// the new PHP-backed MySQL tables use. A one-time PHP script then reads this
// file and inserts it into each table (skipped if the table already has rows,
// so it's safe to leave in place / re-run harmlessly).
import fs from "node:fs";
import path from "node:path";
import * as content from "../src/lib/content.ts";

const root = process.cwd();
// Not dist/: scripts/package.mjs deletes and recreates dist/ from scratch on
// every run, which would wipe this file before it got copied in.
const outDir = path.join(root, ".seed-cache");
fs.mkdirSync(outDir, { recursive: true });

const iso = (d) => (d instanceof Date ? d.toISOString().slice(0, 10) : d ?? null);

const offices = (await content.getOffices()).map((o) => ({
  slug: o.slug, city: o.city, address: o.address, phone: o.phone, hours: o.hours, map_url: o.mapUrl,
  opening_date: iso(o.openingDate), intro: o.intro || null, local_context: o.localContext || null,
  services_offered: o.servicesOffered ?? [],
}));

const countries = (await content.getCountries()).map((c) => ({
  slug: c.slug, name: c.name, flag_emoji: c.flagEmoji, flag_image: c.flagImage, hero_image: c.heroImage,
  visa_type: c.visaType, description: c.description, featured: !!c.featured,
  meta_title: c.metaTitle, meta_description: c.metaDescription, intro: c.intro,
  who_can_apply: c.whoCanApply, visa_types: c.visaTypes, documents: c.documents,
  financial_note: c.financialNote, processing_time: c.processingTime, steps: c.steps,
  refusal_reasons: c.refusalReasons, faqs: c.faqs,
}));

const refusalPages = (await content.getRefusalPages()).map((r) => ({
  slug: r.slug, country: r.country, meta_title: r.metaTitle, meta_description: r.metaDescription,
  intro: r.intro, common_reasons: r.commonReasons, what_we_review: r.whatWeReview,
  special_note: r.specialNote, faqs: r.faqs,
}));

const servicePages = (await content.getServicePages()).map((s) => ({
  slug: s.slug, title: s.title, meta_description: s.metaDescription, intro: s.intro,
  highlights: s.highlights, process: s.process, faqs: s.faqs,
}));

const tours = (await content.getTours()).map((t) => ({
  slug: t.slug, destination: t.destination, image: t.image, duration: t.duration, departure: t.departure,
  price: t.price, visa_assistance: !!t.visaAssistance, summary: t.summary, highlights: t.highlights,
  included: t.included, excluded: t.excluded, itinerary: t.itinerary, notes: t.notes, category: t.category,
}));

const guides = (await content.getGuides()).map((g) => ({
  slug: g.slug, title: g.title, image: g.image, category: g.category, published_date: iso(g.publishedDate),
  reading_time: g.readingTime, excerpt: g.excerpt, content: g.content,
}));

const successStories = (await content.getSuccessStories()).map((s) => ({
  country: s.country, category: s.category, period: s.period, summary: s.summary,
}));

const videos = (await content.getVideos()).map((v) => ({
  title: v.title, category: v.category, duration: v.duration, youtube_url: v.youtubeUrl, thumbnail: v.thumbnail,
}));

const faqs = (await content.getFaqs()).map((f) => ({ question: f.question, answer: f.answer }));

const teamMembers = (await content.getTeamMembers()).map((m) => ({
  name: m.name, role: m.role, photo: m.photo, bio: m.bio,
}));

const settings = await content.getSiteSettings();
const siteSettings = {
  phone: settings.phone, phone_secondary: settings.phoneSecondary, whatsapp_number: settings.whatsappNumber,
  email: settings.email, facebook_url: settings.facebookUrl, instagram_url: settings.instagramUrl,
  youtube_url: settings.youtubeUrl, announcement_text: settings.announcementText,
  announcement_href: settings.announcementHref, announcement_active: !!settings.announcementActive,
  youtube_subscribers: settings.youtubeSubscribers, happy_customers_stat: settings.happyCustomersStat,
};

const seed = {
  offices, countries, refusal_pages: refusalPages, service_pages: servicePages, tours, guides,
  success_stories: successStories, videos, faqs, team_members: teamMembers, site_settings: siteSettings,
};

fs.writeFileSync(path.join(outDir, "seed-data.json"), JSON.stringify(seed, null, 2));
console.log(
  `Seed data written to .seed-cache/seed-data.json: ${offices.length} offices, ${countries.length} countries, ` +
  `${refusalPages.length} refusal pages, ${servicePages.length} service pages, ${tours.length} tours, ` +
  `${guides.length} guides, ${successStories.length} success stories, ${videos.length} videos, ` +
  `${faqs.length} faqs, ${teamMembers.length} team members.`
);
