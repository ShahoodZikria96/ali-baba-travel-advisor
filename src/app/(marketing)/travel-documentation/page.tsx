import type { Metadata } from "next";
import Link from "next/link";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { siteLinks } from "@/lib/related";
import { pageMetadata } from "@/lib/seo";
import { FileText, ClipboardCheck, FolderCheck, CheckCircle2, AlertTriangle } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = pageMetadata({
  title: "Travel Documentation Help for Visa Applications",
  description: "Document checklists, itinerary planning and application support for Pakistani travellers. Know what embassies ask for and avoid common mistakes. Free assessment.",
  path: "/travel-documentation",
});

const points = [
  { icon: FileText, title: "Document Checklists", description: "Clear, destination-specific lists so you know exactly what to prepare." },
  { icon: ClipboardCheck, title: "Application Requirements", description: "Guidance on forms, affidavits and supporting paperwork for your trip." },
  { icon: FolderCheck, title: "Itinerary Planning", description: "Support building a travel itinerary that aligns with your documentation." },
];

const usuallyAsked = [
  "A valid passport with enough remaining validity and blank pages, plus copies of old passports and visas",
  "The completed application form and photographs that match the embassy's specification",
  "Recent bank statements and income proof that match your declared income and travel budget",
  "Proof of employment (letter and salary slips) or of your business (registration, NTN, tax records)",
  "A clear itinerary with accommodation and transport, matching your leave dates",
  "Travel medical insurance where the destination requires it",
  "Proof of ties to Pakistan: job, business, family, property",
];

const mistakes = [
  "Dates, names or addresses that differ between documents",
  "Large deposits shortly before applying with no explanation",
  "A vague purpose of travel or an itinerary that does not fit your funds",
  "A passport close to expiry, or missing pages from earlier passports",
  "Invitation letters you cannot verify, or any document that is not genuine",
];

const guides = [
  { href: "/guides/bank-statement-for-visa-application-guide", label: "Bank statement for a visa: what embassies check", description: "How recent, how consistent and what raises doubts." },
  { href: "/guides/flight-and-hotel-bookings-for-visa-applications", label: "Flight and hotel bookings for a visa application", description: "What is safe to submit before the decision." },
  { href: "/guides/schengen-visa-requirements-from-pakistan", label: "Schengen visa requirements from Pakistan", description: "Which country to apply through and the core documents." },
  { href: "/guides/schengen-visa-from-pakistan-time-fees-documents", label: "Schengen visa from Pakistan: time, fees and documents", description: "Processing time, fee and document list." },
  { href: "/guides/business-visa-invitation-letter-what-to-include", label: "Business visa invitation letter: what it must include", description: "For trade fairs, conferences and delegations." },
  { href: "/guides/how-to-build-travel-history-for-visa-applications", label: "Travel history and visa applications", description: "What travel history does and does not do." },
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

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-xl font-bold text-charcoal">Documents Most Embassies Ask For</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              Every embassy publishes its own checklist and that list always has the final word. These are the items that appear on
              most checklists for visit and business applications from Pakistan.
            </p>
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-text-muted">
              {usuallyAsked.map((i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success" /> {i}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold text-charcoal">Mistakes That Cause Problems</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              Most refusals are not about one missing paper. They come from documents that do not tell the same story.
            </p>
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-text-muted">
              {mistakes.map((i) => (
                <li key={i} className="flex items-start gap-2">
                  <AlertTriangle size={16} className="mt-0.5 shrink-0 text-primary" /> {i}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h2 className="mt-14 font-heading text-xl font-bold text-charcoal">How We Help</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-muted">
          We give you the checklist for your destination, review every document for consistency before you submit, help you build an
          itinerary that matches your dates and budget, and guide you on invitation letters for business and family visits. Browse the{" "}
          <Link href="/visas" className="font-semibold text-primary hover:text-primary-dark">country requirement pages</Link> for the
          document list of your destination, or read how our{" "}
          <Link href="/visa-process" className="font-semibold text-primary hover:text-primary-dark">visa process</Link> works. Visa
          decisions are made only by the embassy or immigration authority and approval is never guaranteed.
        </p>
        <div className="mt-8">
          <Button href="/consultation">Book Consultation</Button>
        </div>
      </Container>
      <RelatedLinks title="Document Preparation Guides" links={guides} />
      <RelatedLinks title="Keep Exploring" links={siteLinks(["visas", "process", "consultancy", "flights", "hotels", "faqs"])} />
    </>
  );
}
