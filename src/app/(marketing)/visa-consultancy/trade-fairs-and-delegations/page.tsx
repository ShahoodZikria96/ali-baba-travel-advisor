import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FaqSection } from "@/components/ui/FaqSection";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { VisaAssessmentForm } from "@/components/forms/VisaAssessmentForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, absoluteUrl, orgId } from "@/lib/seo";
import { siteLinks } from "@/lib/related";
import type { PageFaq } from "@/data/pageFaqs";
import { getGuides, getSiteSettings, whatsappHref } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Trade Fair, Conference & Business Delegation Visas",
  description: "Visa and travel support for trade fairs, conferences and business delegations from Pakistan: group letters, individual files, flights and hotels. Free assessment.",
  path: "/visa-consultancy/trade-fairs-and-delegations",
});

const GUIDES = [
  "trade-fair-visa-from-pakistan-exhibition-visit",
  "business-delegation-visa-group-application-from-pakistan",
  "conference-visa-from-pakistan-attendee-or-speaker",
  "business-visa-invitation-letter-what-to-include",
  "business-visa-vs-visit-visa-which-do-you-need",
  "schengen-business-visa-from-pakistan-documents",
];

const services = [
  "Trade fair trips: visitor and exhibitor travel planning and visa files",
  "Conference trips for delegates and speakers",
  "Business delegations: group letters, individual files for every member and one coordinated timeline",
  "Invitation letter guidance and a document checklist for every traveller",
  "Company and personal financial document review for consistency",
  "Flights and hotels for the whole group, matched to the event dates",
  "Appointment planning and application tracking",
];

const steps = [
  { title: "Tell us the event and the group", text: "Share the fair, conference or delegation purpose, the dates, the country, and how many people are travelling." },
  { title: "We check every traveller's profile", text: "Each member is assessed individually, because embassies decide each file on its own. We tell you honestly where a file is strong or weak." },
  { title: "We prepare the group and the individual files", text: "Group letters, invitation guidance, itineraries, hotel plans, and each person's company and personal documents, kept consistent." },
  { title: "We coordinate the timeline", text: "Appointments, submission and tracking are planned backwards from the event date. Flights and hotels are confirmed when the visa decisions allow." },
];

const faqs: PageFaq[] = [
  {
    question: "Do you arrange trips to trade fairs and exhibitions?",
    answer: "Yes. We plan trade fair trips for visitors and exhibitors, prepare the visa documents for each traveller, and arrange flights and hotels around the fair dates.",
  },
  {
    question: "Can you handle a business delegation or a group from a chamber or association?",
    answer: "Yes. We deal with business delegations: we prepare the group documents, check every member's individual file, coordinate appointments and book travel for the group.",
  },
  {
    question: "Does a group application mean all visas are approved together?",
    answer: "No. Every member is assessed individually and the embassy decides each application on its own. A well-prepared group file helps, but approval is never guaranteed.",
  },
  {
    question: "How early should we start for a fixed event date?",
    answer: "Start as early as the destination allows, ideally two to three months before the event or earlier for Schengen countries, where applications are generally accepted up to six months before travel. Appointment slots for groups can be limited.",
  },
  {
    question: "Can you help with the invitation letter?",
    answer: "We guide you on what the invitation letter must include and check it against the embassy's requirements. The letter must come from a genuine host, event organiser or partner company; we do not supply invitations.",
  },
];

export default async function TradeFairsDelegationsPage() {
  const [settings, allGuides] = await Promise.all([getSiteSettings(), getGuides()]);
  const guideLinks = GUIDES.map((s) => allGuides.find((g) => g.slug === s)).filter((g): g is NonNullable<typeof g> => Boolean(g));

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Trade fair, conference and business delegation visa support",
    serviceType: "Business visa consultancy and group travel",
    url: absoluteUrl("/visa-consultancy/trade-fairs-and-delegations"),
    areaServed: { "@type": "Country", name: "Pakistan" },
    provider: { "@id": orgId },
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Visa Consultancy", href: "/visa-consultancy" },
          { label: "Trade Fairs & Delegations" },
        ]}
      />
      <PageHero
        eyebrow="Business Travel"
        title="Trade Fair, Conference and Business Delegation Visas"
        description="Planning a trip to a trade fair, a conference or a delegation visit? We prepare the visa files for every traveller and arrange flights and hotels around your event dates."
      />

      <Container className="grid grid-cols-1 gap-12 py-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="font-heading text-xl font-bold text-charcoal">What We Handle</h2>
          <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-text-muted">
            {services.map((s) => (
              <li key={s} className="flex items-start gap-2">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success" /> {s}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Who This Is For</h2>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">
            Business owners and exporters visiting a trade fair, exhibitors travelling with a team, professionals attending
            or speaking at a conference, and chambers, associations and companies sending a delegation abroad. If your trip is
            fixed to an event date, the visa timeline decides whether you can go, so starting early matters most.
          </p>

          <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">How It Works</h2>
          <ol className="mt-4 space-y-4">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">{i + 1}</span>
                <span>
                  <span className="block font-semibold text-charcoal">{s.title}</span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-text-muted">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>

          <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Documents Usually Needed</h2>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">
            A valid passport, the fair or conference registration, an invitation from the host or organiser, company registration
            and tax documents (NTN), company and personal bank statements, an itinerary with flights and hotels, travel insurance
            where required, and proof of ties to Pakistan. Each embassy publishes its own list, which we follow exactly. Read our{" "}
            <Link href="/guides/business-visa-invitation-letter-what-to-include" className="font-semibold text-primary hover:text-primary-dark">
              invitation letter guide
            </Link>{" "}
            and{" "}
            <Link href="/guides/business-visa-vs-visit-visa-which-do-you-need" className="font-semibold text-primary hover:text-primary-dark">
              business visa vs visit visa
            </Link>{" "}
            guide before you apply.
          </p>

          <p className="mt-8 rounded-[var(--radius-md)] border border-border bg-surface-muted/60 p-4 text-xs leading-relaxed text-text-muted">
            Visa decisions are made only by the embassy or immigration authority. Ali Baba Travel Advisor provides consultancy and
            documentation assistance and does not guarantee approval for any traveller or group.
          </p>
        </div>

        <div className="h-fit rounded-[var(--radius-lg)] border border-border bg-surface p-6 lg:sticky lg:top-24">
          <p className="font-heading text-lg font-bold text-charcoal">Plan your trade fair or delegation</p>
          <p className="mt-1 text-sm text-text-muted">Tell us the event, dates and group size. We reply the same day.</p>
          <div className="mt-4">
            <Button
              href={whatsappHref("Hi, I would like help with a trade fair, conference or business delegation trip.", settings.whatsappNumber)}
              external
              variant="whatsapp"
            >
              WhatsApp Enquiry
            </Button>
          </div>
          <div className="mt-6 border-t border-border pt-5">
            <VisaAssessmentForm whatsappNumber={settings.whatsappNumber} />
          </div>
        </div>
      </Container>

      <FaqSection title="Trade Fairs and Delegations: FAQs" faqs={faqs} />
      <RelatedLinks
        title="Business Travel Guides"
        links={guideLinks.map((g) => ({ href: `/guides/${g.slug}`, label: g.title, description: g.excerpt }))}
      />
      <RelatedLinks title="More Visa Services" links={siteLinks(["consultancy", "visas", "process", "refusal", "contact", "consultation"])} />
    </>
  );
}
