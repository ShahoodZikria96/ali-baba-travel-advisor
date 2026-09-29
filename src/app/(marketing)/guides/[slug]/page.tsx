import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Clock, CalendarDays } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GuideCard } from "@/components/guides/GuideCard";
import { pageMetadata, absoluteUrl, orgId } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { AdSlot } from "@/components/monetization/AdSlot";
import { getGuides, getGuide, getCountries } from "@/lib/content";
import Link from "next/link";
import { officialSources } from "@/data/officialSources";

export async function generateStaticParams() {
  const guides = await getGuides();
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuide(slug);
  if (!guide) return {};
  return pageMetadata({ title: guide.title, description: guide.excerpt, path: `/guides/${slug}`, image: guide.image, type: "article", publishedTime: new Date(guide.publishedDate).toISOString(), modifiedTime: new Date(guide.updatedAt).toISOString() });
}

export default async function GuideArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [guide, allGuides, allCountries] = await Promise.all([getGuide(slug), getGuides(), getCountries()]);
  if (!guide) notFound();

  const otherGuides = allGuides.filter((g) => g.slug !== slug).slice(0, 3);
  const content = guide.content as string[];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: guide.title,
    description: guide.excerpt,
    datePublished: new Date(guide.publishedDate).toISOString(),
    dateModified: new Date(guide.updatedAt).toISOString(),
    image: absoluteUrl(guide.image),
    mainEntityOfPage: absoluteUrl(`/guides/${slug}`),
    author: { "@id": orgId },
    publisher: { "@id": orgId },
  };
  const relatedCountry = allCountries.find((c) => slug.includes(c.slug) || guide.title.toLowerCase().includes(c.name.toLowerCase()));

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: guide.title },
        ]}
      />
      <Container className="py-14">
        <div className="mx-auto max-w-[760px]">
          <div className="relative mb-6 h-52 w-full overflow-hidden rounded-[var(--radius-lg)] sm:h-72">
            <Image src={guide.image} alt={guide.title} fill priority sizes="760px" className="object-cover" />
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.08em] text-primary">{guide.category}</span>
          <h1 className="mt-2 font-heading text-2xl font-extrabold leading-tight text-charcoal sm:text-3xl">
            {guide.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 border-b border-border pb-5 text-xs text-text-muted">
            <span>By Ali Baba Travel Advisor</span>
            <span className="flex items-center gap-1">
              <CalendarDays size={12} />
              {new Date(guide.publishedDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} /> {guide.readingTime}
            </span>
          </div>

          <div className="prose-content mt-6 space-y-4 text-[0.98rem] leading-relaxed text-text">
            {content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <AdSlot placement="end-of-article" />

          <p className="mt-8 text-xs leading-relaxed text-text-muted">
            This guide is general information, not legal or immigration advice. Requirements and processing times
            change — confirm the current rules with the relevant embassy or immigration authority. Last updated{" "}
            {new Date(guide.updatedAt).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}. See our{" "}
            <Link href="/visa-disclaimer" className="text-primary underline">visa disclaimer</Link>.
          </p>

          {relatedCountry && (officialSources[relatedCountry.slug] ?? []).length > 0 && (
            <p className="mt-4 text-sm text-text-muted">
              Official source:{" "}
              {(officialSources[relatedCountry.slug] ?? []).map((src) => (
                <a key={src.href} href={src.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">{src.label}</a>
              ))}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
            {relatedCountry && (
              <Link href={`/visas/${relatedCountry.slug}`} className="text-primary hover:text-primary-dark">
                {relatedCountry.name} visa requirements →
              </Link>
            )}
            <Link href="/visa-consultancy" className="text-primary hover:text-primary-dark">Visa consultancy services →</Link>
            <Link href="/contact" className="text-primary hover:text-primary-dark">Contact our consultants →</Link>
          </div>

          <div className="mt-10 rounded-[var(--radius-md)] border border-border bg-surface-muted/60 p-5">
            <p className="text-sm font-semibold text-charcoal">Need help with your own case?</p>
            <p className="mt-1 text-sm text-text-muted">
              Speak with one of our consultants for a personalized assessment.
            </p>
            <div className="mt-4">
              <Button href="/consultation" size="sm">Get Visa Assessment</Button>
            </div>
          </div>
        </div>
      </Container>

      {otherGuides.length > 0 && (
        <Container className="border-t border-border py-14">
          <h2 className="mx-auto max-w-[760px] font-heading text-xl font-bold text-charcoal">More Guides</h2>
          <div className="mx-auto mt-6 grid max-w-[760px] grid-cols-1 gap-5 sm:grid-cols-2">
            {otherGuides.map((g) => (
              <GuideCard key={g.slug} guide={g} />
            ))}
          </div>
        </Container>
      )}
    </>
  );
}
