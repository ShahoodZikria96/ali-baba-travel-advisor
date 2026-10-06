import type { MetadataRoute } from "next";
import { getCountries, getRefusalPages, getServicePages, getTours, getOffices, getGuides } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";
import { packageDestinations } from "@/data/packageDestinations";
import { cities, provinces } from "@/data/cityPages";

export const dynamic = "force-static";

type Entry = MetadataRoute.Sitemap[number];

// Static pages with a real "last changed" date (bump when the page content changes materially).
const staticRoutes: { path: string; priority: number; changeFrequency: Entry["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/visa-consultancy", priority: 0.9, changeFrequency: "monthly" },
  { path: "/visas", priority: 0.9, changeFrequency: "monthly" },
  { path: "/visa-refusal", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tour-packages", priority: 0.8, changeFrequency: "weekly" },
  { path: "/tour-packages/group-tours", priority: 0.6, changeFrequency: "weekly" },
  { path: "/tour-packages/customized", priority: 0.6, changeFrequency: "monthly" },
  { path: "/tour-packages/upcoming", priority: 0.6, changeFrequency: "weekly" },
  { path: "/tour-packages/from-pakistan", priority: 0.8, changeFrequency: "monthly" },
  { path: "/travel-agency", priority: 0.8, changeFrequency: "monthly" },
  { path: "/flights", priority: 0.7, changeFrequency: "monthly" },
  { path: "/hotel-booking", priority: 0.7, changeFrequency: "monthly" },
  { path: "/travel-documentation", priority: 0.6, changeFrequency: "monthly" },
  { path: "/urdu", priority: 0.6, changeFrequency: "monthly" },
  { path: "/visa-process", priority: 0.7, changeFrequency: "monthly" },
  { path: "/locations", priority: 0.8, changeFrequency: "monthly" },
  { path: "/guides", priority: 0.7, changeFrequency: "weekly" },
  { path: "/guides/travel", priority: 0.5, changeFrequency: "weekly" },
  { path: "/guides/updates", priority: 0.5, changeFrequency: "weekly" },
  { path: "/faqs", priority: 0.6, changeFrequency: "monthly" },
  { path: "/success-stories", priority: 0.5, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "yearly" },
  { path: "/team", priority: 0.4, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  { path: "/consultation", priority: 0.7, changeFrequency: "yearly" },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  { path: "/refund-policy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/disclaimer", priority: 0.2, changeFrequency: "yearly" },
  { path: "/visa-disclaimer", priority: 0.3, changeFrequency: "yearly" },
  { path: "/cookie-policy", priority: 0.2, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [countries, refusalPages, servicePages, tours, offices, guides] = await Promise.all([
    getCountries(),
    getRefusalPages(),
    getServicePages(),
    getTours(),
    getOffices(),
    getGuides(),
  ]);

  // lastModified comes from each record's updatedAt so it only changes when content does.
  const dynamic: Entry[] = [
    ...servicePages.map((s) => ({ url: absoluteUrl(`/visa-consultancy/${s.slug}`), lastModified: s.updatedAt, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...countries.map((c) => ({ url: absoluteUrl(`/visas/${c.slug}`), lastModified: c.updatedAt, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...refusalPages.map((r) => ({ url: absoluteUrl(`/visa-refusal/${r.slug}`), lastModified: r.updatedAt, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...tours.map((t) => ({ url: absoluteUrl(`/tour-packages/${t.slug}`), lastModified: t.updatedAt, changeFrequency: "weekly" as const, priority: 0.6 })),
    ...offices.map((o) => ({ url: absoluteUrl(`/locations/${o.slug}`), lastModified: o.updatedAt, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...guides.map((g) => ({ url: absoluteUrl(`/guides/${g.slug}`), lastModified: g.updatedAt, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];

  // Code-defined landing pages change only when the site is redeployed with new copy.
  const landingUpdated = new Date("2026-10-06");
  dynamic.push(
    ...packageDestinations.map((d) => ({ url: absoluteUrl(`/tour-packages/from-pakistan/${d.slug}`), lastModified: landingUpdated, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...provinces.map((p) => ({ url: absoluteUrl(`/travel-agency/${p.slug}`), lastModified: landingUpdated, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...cities.map((c) => ({ url: absoluteUrl(`/travel-agency/${c.slug}`), lastModified: landingUpdated, changeFrequency: "monthly" as const, priority: 0.6 })),
  );

  const latest = [...dynamic].sort((a, b) => +new Date(b.lastModified ?? 0) - +new Date(a.lastModified ?? 0))[0]?.lastModified;
  const newest = (items: { updatedAt: Date }[]) =>
    items.length ? new Date(Math.max(...items.map((i) => +new Date(i.updatedAt)))) : undefined;
  // Hub pages list a collection, so they change exactly when that collection does (never a made-up date).
  const hubDates: Record<string, Date | undefined> = {
    "/visas": newest(countries),
    "/visa-consultancy": newest(servicePages),
    "/visa-refusal": newest(refusalPages),
    "/tour-packages": newest(tours),
    "/tour-packages/group-tours": newest(tours),
    "/tour-packages/upcoming": newest(tours),
    "/guides": newest(guides),
    "/locations": newest(offices),
    "/tour-packages/from-pakistan": landingUpdated,
    "/travel-agency": landingUpdated,
  };
  const stat: Entry[] = staticRoutes.map((r) => ({
    url: absoluteUrl(r.path || "/"),
    ...(r.path === "" && latest ? { lastModified: latest } : hubDates[r.path] ? { lastModified: hubDates[r.path] } : {}),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  return [...stat, ...dynamic];
}
