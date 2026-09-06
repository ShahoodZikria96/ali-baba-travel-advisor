import { prisma } from "@/lib/prisma";

export { whatsappHref, telHref } from "@/lib/whatsapp";

// ---------- Site settings ----------

export async function getSiteSettings() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "main" } });
  if (!settings) throw new Error("Site settings not seeded — run `npm run db:seed`");
  return settings;
}

// ---------- Offices ----------

export async function getOffices() {
  return prisma.office.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } });
}

export async function getOffice(slug: string) {
  return prisma.office.findFirst({ where: { slug, published: true } });
}

// ---------- Countries ----------

export async function getCountries() {
  return prisma.country.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } });
}

export async function getFeaturedCountries() {
  return prisma.country.findMany({
    where: { published: true, featured: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getCountry(slug: string) {
  return prisma.country.findFirst({ where: { slug, published: true } });
}

export async function getCountrySlugs() {
  const rows = await prisma.country.findMany({ where: { published: true }, select: { slug: true } });
  return rows.map((r) => r.slug);
}

// ---------- Refusal pages ----------

export async function getRefusalPages() {
  return prisma.refusalPage.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } });
}

export async function getRefusalPage(slug: string) {
  return prisma.refusalPage.findFirst({ where: { slug, published: true } });
}

// ---------- Service pages ----------

export async function getServicePages() {
  return prisma.servicePage.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } });
}

export async function getServicePage(slug: string) {
  return prisma.servicePage.findFirst({ where: { slug, published: true } });
}

// ---------- Tours ----------

export async function getTours() {
  return prisma.tour.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } });
}

export async function getTour(slug: string) {
  return prisma.tour.findFirst({ where: { slug, published: true } });
}

// ---------- Guides ----------

export async function getGuides() {
  return prisma.guide.findMany({ where: { published: true }, orderBy: { publishedDate: "desc" } });
}

export async function getGuide(slug: string) {
  return prisma.guide.findFirst({ where: { slug, published: true } });
}

// ---------- Testimonials / success stories / videos / faqs / team ----------

export async function getTestimonials() {
  return prisma.testimonial.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } });
}

export async function getSuccessStories() {
  return prisma.successStory.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } });
}

export async function getVideos() {
  return prisma.video.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } });
}

export async function getFaqs() {
  return prisma.faq.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } });
}

export async function getTeamMembers() {
  return prisma.teamMember.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } });
}
