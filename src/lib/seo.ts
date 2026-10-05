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

export const MAX_TITLE_LENGTH = 60;
export const MAX_DESCRIPTION_LENGTH = 158;

/** First candidate that fits `max` characters (falls back to the last, shortest-intended one). */
export function fitTitle(candidates: string[], max = MAX_TITLE_LENGTH): string {
  return candidates.find((c) => c.length <= max) ?? candidates[candidates.length - 1];
}

/** Cuts a meta description at a word boundary so it is not truncated mid-sentence in search results. */
export function clampDescription(text: string, max = MAX_DESCRIPTION_LENGTH): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const stop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf(" — "), cut.lastIndexOf("; "));
  const base = stop > max * 0.6 ? cut.slice(0, stop + 1) : cut.slice(0, cut.lastIndexOf(" "));
  return base.replace(/[\s,;:—-]+$/, "") + (base.endsWith(".") ? "" : "…");
}

/** Appends the brand only when the full title still fits in a search result (≈60 characters). */
function resolveTitle(title: string): Metadata["title"] {
  return `${title} | ${siteConfig.name}`.length <= MAX_TITLE_LENGTH ? title : { absolute: title };
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
  const desc = clampDescription(description);
  return {
    title: resolveTitle(title),
    description: desc,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type,
      url,
      title: `${title} | ${siteConfig.name}`,
      description: desc,
      siteName: siteConfig.name,
      locale: "en_PK",
      images,
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: `${title} | ${siteConfig.name}`, description: desc, images: images.map((i) => i.url) },
  };
}

/** Serialises JSON-LD safely for inline <script> (prevents `</script>` breakouts). */
export function jsonLdString(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const orgId = `${SITE_URL}/#organization`;
export const websiteId = `${SITE_URL}/#website`;
