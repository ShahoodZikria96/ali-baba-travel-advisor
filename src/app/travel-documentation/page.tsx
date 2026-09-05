import type { Metadata } from "next";
import { FileText, ClipboardCheck, FolderCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Travel Documentation",
  description: "Support with travel documentation, itinerary planning and application requirements from Ali Baba Travel Advisor.",
};

const points = [
  { icon: FileText, title: "Document Checklists", description: "Clear, destination-specific lists so you know exactly what to prepare." },
  { icon: ClipboardCheck, title: "Application Requirements", description: "Guidance on forms, affidavits and supporting paperwork for your trip." },
  { icon: FolderCheck, title: "Itinerary Planning", description: "Support building a travel itinerary that aligns with your documentation." },
];

export default function TravelDocumentationPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Travel Documentation" }]} />
      <PageHero
        eyebrow="Documentation Support"
        title="Travel Documentation Assistance"
        description="Support with documentation, itinerary planning and application requirements for your international trip."
      />
      <Container className="py-14">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {points.map((p) => (
            <div key={p.title} className="rounded-[var(--radius-md)] border border-border bg-surface p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] bg-primary-tint text-primary">
                <p.icon size={20} />
              </span>
              <p className="mt-4 font-heading text-base font-bold text-charcoal">{p.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{p.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Button href="/consultation">Book Consultation</Button>
        </div>
      </Container>
    </>
  );
}
