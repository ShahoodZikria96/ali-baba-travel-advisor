import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

import { popularDestinations, moreDestinations } from "../src/data/countries";
import { countryPages } from "../src/data/countryPages";
import { offices } from "../src/data/offices";
import { locationContent } from "../src/data/locationContent";
import { refusalPages } from "../src/data/refusalPages";
import { servicePages } from "../src/data/servicePages";
import { tours } from "../src/data/tours";
import { guides } from "../src/data/guides";
import { sampleReviews, sampleSuccessStories, sampleVideos } from "../src/data/placeholders";
import { generalFaqs } from "../src/data/faqs";
import { siteConfig } from "../src/data/site";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding admin user...");
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@example.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: { email: adminEmail, passwordHash, name: "Admin" },
  });

  console.log("Seeding site settings...");
  await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      phone: siteConfig.phone,
      phoneSecondary: siteConfig.phoneSecondary,
      whatsappNumber: siteConfig.whatsappNumber,
      email: siteConfig.email,
      facebookUrl: siteConfig.socials.facebook,
      instagramUrl: siteConfig.socials.instagram,
      youtubeUrl: siteConfig.socials.youtube,
      announcementText: "Our new Karachi office opens Monday, 7 September 2026.",
      announcementHref: "/locations/karachi",
      announcementActive: true,
    },
  });

  console.log("Seeding offices...");
  for (const [i, office] of offices.entries()) {
    const content = locationContent.find((l) => l.slug === office.slug);
    await prisma.office.upsert({
      where: { slug: office.slug },
      update: {},
      create: {
        slug: office.slug,
        city: office.city,
        address: office.address,
        phone: office.phone,
        hours: office.hours,
        mapUrl: office.mapUrl,
        openingDate: office.openingDate ? new Date(office.openingDate) : null,
        intro: content?.intro ?? "",
        localContext: content?.localContext ?? "",
        servicesOffered: content?.servicesOffered ?? [],
        sortOrder: i,
      },
    });
  }

  console.log("Seeding countries...");
  const allCountries = [...popularDestinations, ...moreDestinations];
  for (const [i, country] of allCountries.entries()) {
    const rich = countryPages.find((c) => c.slug === country.slug);
    await prisma.country.upsert({
      where: { slug: country.slug },
      update: {},
      create: {
        slug: country.slug,
        name: country.name,
        flagEmoji: country.flag ?? null,
        flagImage: country.flagImage ?? null,
        heroImage: `/destinations/${country.slug}.jpg`,
        visaType: country.visaType,
        description: country.description,
        featured: popularDestinations.some((p) => p.slug === country.slug),
        metaTitle: rich?.metaTitle,
        metaDescription: rich?.metaDescription,
        intro: rich?.intro,
        whoCanApply: rich?.whoCanApply ?? undefined,
        visaTypes: rich?.visaTypes ?? undefined,
        documents: rich?.documents ?? undefined,
        financialNote: rich?.financialNote,
        processingTime: rich?.processingTime,
        steps: rich?.steps ?? undefined,
        refusalReasons: rich?.refusalReasons ?? undefined,
        faqs: rich?.faqs ?? undefined,
        sortOrder: i,
      },
    });
  }

  console.log("Seeding refusal pages...");
  for (const [i, r] of refusalPages.entries()) {
    await prisma.refusalPage.upsert({
      where: { slug: r.slug },
      update: {},
      create: {
        slug: r.slug,
        country: r.country,
        metaTitle: r.metaTitle,
        metaDescription: r.metaDescription,
        intro: r.intro,
        commonReasons: r.commonReasons,
        whatWeReview: r.whatWeReview,
        specialNote: r.specialNote,
        faqs: r.faqs,
        sortOrder: i,
      },
    });
  }

  console.log("Seeding service pages...");
  for (const [i, s] of servicePages.entries()) {
    await prisma.servicePage.upsert({
      where: { slug: s.slug },
      update: {},
      create: {
        slug: s.slug,
        title: s.title,
        metaDescription: s.metaDescription,
        intro: s.intro,
        highlights: s.highlights,
        process: s.process,
        faqs: s.faqs,
        sortOrder: i,
      },
    });
  }

  console.log("Seeding tours...");
  for (const [i, t] of tours.entries()) {
    await prisma.tour.upsert({
      where: { slug: t.slug },
      update: {},
      create: {
        slug: t.slug,
        destination: t.destination,
        image: t.image,
        duration: t.duration,
        departure: t.departure,
        price: t.price,
        visaAssistance: t.visaAssistance,
        summary: t.summary,
        highlights: t.highlights,
        included: t.included,
        excluded: t.excluded,
        itinerary: t.itinerary,
        notes: t.notes,
        sortOrder: i,
      },
    });
  }

  console.log("Seeding guides...");
  for (const g of guides) {
    await prisma.guide.upsert({
      where: { slug: g.slug },
      update: {},
      create: {
        slug: g.slug,
        title: g.title,
        image: g.image,
        category: g.category,
        publishedDate: new Date(g.publishedDate),
        readingTime: g.readingTime,
        excerpt: g.excerpt,
        content: g.content,
      },
    });
  }

  console.log("Seeding testimonials...");
  for (const [i, t] of sampleReviews.entries()) {
    await prisma.testimonial.create({
      data: { name: t.name, location: t.location, rating: t.rating, text: t.text, photo: t.photo, sortOrder: i },
    });
  }

  console.log("Seeding success stories...");
  for (const [i, s] of sampleSuccessStories.entries()) {
    await prisma.successStory.create({
      data: { country: s.country, category: s.category, period: s.period, summary: s.summary, sortOrder: i },
    });
  }

  console.log("Seeding videos...");
  for (const [i, v] of sampleVideos.entries()) {
    await prisma.video.create({
      data: { title: v.title, category: v.category, duration: v.duration, sortOrder: i },
    });
  }

  console.log("Seeding FAQs...");
  for (const [i, f] of generalFaqs.entries()) {
    await prisma.faq.create({ data: { question: f.question, answer: f.answer, sortOrder: i } });
  }

  console.log("Seeding team...");
  await prisma.teamMember.create({
    data: { name: "Syed Ali Jawad", role: "Chief Executive Officer", sortOrder: 0 },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
