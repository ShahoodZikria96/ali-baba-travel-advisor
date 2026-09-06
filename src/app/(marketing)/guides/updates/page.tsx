import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { GuideCard } from "@/components/guides/GuideCard";
import { getGuides } from "@/lib/content";

export const metadata: Metadata = {
  title: "Latest Updates",
  description: "The latest visa, airline and travel policy updates from Ali Baba Travel Advisor.",
};

export default async function UpdatesPage() {
  const guides = await getGuides();
  const filtered = guides.filter((g) => g.category === "Latest Updates");
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides", href: "/guides" }, { label: "Latest Updates" }]} />
      <PageHero eyebrow="Latest Updates" title="Latest Updates" description="Recent visa, airline and policy updates relevant to Pakistani travelers." />
      <Container className="py-14">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </Container>
    </>
  );
}
