import type { MetadataRoute } from "next";
import { popularDestinations, moreDestinations } from "@/data/countries";
import { refusalPages } from "@/data/refusalPages";
import { servicePages } from "@/data/servicePages";
import { tours } from "@/data/tours";
import { offices } from "@/data/offices";
import { guides } from "@/data/guides";

const baseUrl = "https://www.alibabatraveladvisor.com";

export default function sitemap(): MetadataRoute.Sitemap {
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

  const dynamicRoutes = [
    ...servicePages.map((s) => `/visa-consultancy/${s.slug}`),
    ...[...popularDestinations, ...moreDestinations].map((c) => `/visas/${c.slug}`),
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
