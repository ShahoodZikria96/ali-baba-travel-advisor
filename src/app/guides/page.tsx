import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { GuideCard } from "@/components/guides/GuideCard";
import { guides } from "@/data/guides";

export const metadata: Metadata = {
  title: "Visa & Travel Knowledge Centre",
  description: "Visa guides, travel guides and the latest updates from Ali Baba Travel Advisor.",
};

export default function GuidesPage() {
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
    </>
  );
}
