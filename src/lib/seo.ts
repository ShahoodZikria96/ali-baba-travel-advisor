import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

/** Canonical origin. Override with NEXT_PUBLIC_SITE_URL (no trailing slash). Non-www is canonical. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://alibabatraveladvisor.com").replace(/\/$/, "");

/** Absolute URL matching the static export's trailing-slash routes (files keep their extension). */
export function absoluteUrl(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  const withSlash = p === "/" || p.endsWith("/") || /\.[a-z0-9]+$/i.test(p) ? p : `${p}/`;
  return `${SITE_URL}${withSlash}`;
}

interface PageMetaInput {
  title: string;
  description: string;
  /** Path beginning with "/", used for canonical + og:url. */
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
}

/**
 * Builds complete per-page metadata. Child `openGraph` replaces the parent's
 * object wholesale in Next.js, so siteName/locale are repeated here on purpose.
 */
export function pageMetadata({ title, description, path, image, type = "website", publishedTime, modifiedTime, noindex }: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const images = [{ url: absoluteUrl(image ?? "/og-default.png"), alt: title }];
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type,
      url,
      title: `${title} | ${siteConfig.name}`,
      description,
      siteName: siteConfig.name,
      locale: "en_PK",
      images,
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: `${title} | ${siteConfig.name}`, description, images: images.map((i) => i.url) },
  };
}

/** Serialises JSON-LD safely for inline <script> (prevents `</script>` breakouts). */
export function jsonLdString(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const orgId = `${SITE_URL}/#organization`;
export const websiteId = `${SITE_URL}/#website`;
