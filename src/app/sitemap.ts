import type { MetadataRoute } from "next";
import { getCountries, getRefusalPages, getServicePages, getTours, getOffices, getGuides } from "@/lib/content";

const baseUrl = "https://alibabatraveladvisor.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/visa-consultancy",
    "/visa-refusal",
    "/visas",
    "/tour-packages",
    "/tour-packages/group-tours",
    "/tour-packages/customized",
    "/tour-packages/upcoming",
    "/flights",
    "/hotel-booking",
    "/travel-documentation",
    "/success-stories",
    "/locations",
    "/guides",
    "/guides/travel",
    "/guides/updates",
    "/faqs",
    "/about",
    "/team",
    "/contact",
    "/consultation",
    "/privacy-policy",
    "/terms",
  ];

  const [countries, refusalPages, servicePages, tours, offices, guides] = await Promise.all([
    getCountries(),
    getRefusalPages(),
    getServicePages(),
    getTours(),
    getOffices(),
    getGuides(),
  ]);

  const dynamicRoutes = [
    ...servicePages.map((s) => `/visa-consultancy/${s.slug}`),
    ...countries.map((c) => `/visas/${c.slug}`),
    ...refusalPages.map((r) => `/visa-refusal/${r.slug}`),
    ...tours.map((t) => `/tour-packages/${t.slug}`),
    ...offices.map((o) => `/locations/${o.slug}`),
    ...guides.map((g) => `/guides/${g.slug}`),
  ];

  const all = [...staticRoutes, ...dynamicRoutes];

  return all.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
