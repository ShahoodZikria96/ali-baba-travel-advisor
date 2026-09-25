import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Clock, CalendarDays } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GuideCard } from "@/components/guides/GuideCard";
import { getGuides, getGuide } from "@/lib/content";

export async function generateStaticParams() {
  const guides = await getGuides();
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuide(slug);
  if (!guide) return {};
  return { title: guide.title, description: guide.excerpt };
}

export default async function GuideArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [guide, allGuides] = await Promise.all([getGuide(slug), getGuides()]);
  if (!guide) notFound();

  const otherGuides = allGuides.filter((g) => g.slug !== slug).slice(0, 3);
  const content = guide.content as string[];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.excerpt,
    datePublished: guide.publishedDate,
    image: `https://alibabatraveladvisor.com${guide.image}`,
    author: { "@type": "Organization", name: "Ali Baba Travel Advisor" },
    publisher: { "@type": "Organization", name: "Ali Baba Travel Advisor" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
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
