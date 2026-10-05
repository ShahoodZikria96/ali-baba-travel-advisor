import type { Metadata } from "next";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { siteLinks } from "@/lib/related";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { GuideCard } from "@/components/guides/GuideCard";
import { getGuides } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Visa & Travel Knowledge Centre",
  description: "Practical visa guides, travel tips and the latest updates for Pakistani travellers: UK, Canada, Schengen, business visas and more from Ali Baba Travel Advisor.",
  path: "/guides",
});

export default async function GuidesPage() {
  const guides = await getGuides();

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides" }]} />
      <PageHero
        eyebrow="Knowledge Centre"
        title="Visa & Travel Knowledge Centre"
        description="Visa guides, travel tips and the latest updates to help you plan your journey with confidence."
      />
      <Container className="py-14">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </Container>
      <RelatedLinks title="Browse by Topic" links={siteLinks(["guideTravel", "guideUpdates", "visas", "consultancy", "process", "faqs"])} />
    </>
  );
}
