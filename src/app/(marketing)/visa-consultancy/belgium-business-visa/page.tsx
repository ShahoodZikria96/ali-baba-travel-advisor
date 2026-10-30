import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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

const PATH = "/visa-consultancy/belgium-business-visa";

export const metadata: Metadata = pageMetadata({
  title: "Belgium Business Visa from Pakistan",
  description:
    "Belgium Schengen business visa help from Pakistan: invitation letter and document check, appointment planning and Schengen refusal case review. Free assessment.",
  path: PATH,
  image: "/offers/belgium-business-visa-share.webp",
});

const GUIDES = [
  "schengen-business-visa-from-pakistan-documents",
  "business-visa-invitation-letter-what-to-include",
  "business-visa-vs-visit-visa-which-do-you-need",
  "trade-fair-visa-from-pakistan-exhibition-visit",
];

const documents = [
  "Passport valid for the whole trip, with enough blank pages. Schengen rules normally ask for validity beyond your planned departure from the Schengen area and a passport issued within the last ten years",
  "The completed Schengen application form and recent photographs that meet the photo rules",
  "An invitation letter from the Belgian company or event organiser: company name and address, the purpose of the visit, dates, who pays the costs, and the contact person",
  "Proof of your own business or job: company registration, NTN and tax returns, or an employer letter and recent salary slips",
  "Company and personal bank statements that match your business and the cost of the trip",
  "Travel medical insurance valid for the Schengen area, with at least the minimum cover required",
  "Flight reservation and hotel booking that match the meeting or event dates",
  "Proof of ties to Pakistan: business, employment, family and property",
];

const steps = [
  { title: "Free assessment", text: "Tell us your business, the Belgian host or event, your travel dates and any earlier visa history. We tell you honestly where the file is strong and where it is weak." },
  { title: "Document checklist and invitation check", text: "You get a checklist built for your case. We check the invitation letter against what Schengen consulates look for, and we flag anything that cannot be verified." },
  { title: "File review for consistency", text: "We read your company papers, bank statements, itinerary and application form together, because embassies compare them. Differences between them cause many refusals." },
  { title: "Appointment and submission", text: "We plan the appointment, guide you through the form and fee steps, and tell you what to bring. Appointment availability is set by the visa centre, not by us." },
  { title: "After you apply", text: "We help you follow the application and respond if more documents are asked for. If the result is a refusal, we review the refusal form with you." },
];

const refusalReasons = [
  "The purpose of the trip is unclear or the invitation cannot be verified",
  "Company or bank documents that do not match each other, or do not match the cost of the trip",
  "Doubts that the applicant will leave the Schengen area before the visa ends",
  "Weak ties to Pakistan, or not enough proof of business activity",
  "Missing or incorrect documents, or an itinerary that does not fit the visa dates",
  "Earlier refusals that were not addressed in the new application",
];

const faqs: PageFaq[] = [
  {
    question: "Do you guarantee a Belgium business visa?",
    answer: "No. Visa decisions are made only by the Belgian authorities or the embassy handling your application. We prepare a complete, consistent file and guide you through the process, but no consultancy can guarantee approval.",
  },
  {
    question: "Which visa do I need for business travel to Belgium?",
    answer: "Belgium is a Schengen country. A business trip of up to 90 days in any 180-day period uses a Schengen short-stay visa applied for with the Belgian authorities. It allows meetings, negotiations, trade fairs and conferences. It does not allow you to work for a Belgian employer.",
  },
  {
    question: "Should I apply through Belgium if I am also visiting other Schengen countries?",
    answer: "The usual rule is to apply to the country where you spend the most nights, or where your main business is. If your nights are split equally, the country of first entry is normally used. Tell us your full itinerary and we will check which country should receive your application.",
  },
  {
    question: "Who should write my invitation letter?",
    answer: "It must come from a genuine Belgian company, host or event organiser. We guide you on what it must include and check it, but we do not create invitations. A false or unverifiable invitation can lead to refusal.",
  },
  {
    question: "I was refused a Schengen visa. Can you still help?",
    answer: "Yes. We review the refusal form, which lists the reasons, together with your original file, and tell you honestly whether to reapply, what to fix first, or whether to take a formal legal step. Formal appeals and legal action are handled by our in-house legal team as a separate matter, and no result is guaranteed.",
  },
  {
    question: "How early should I apply?",
    answer: "Schengen applications are generally accepted up to six months before travel. Appointment availability and processing times change, so apply as early as the rules allow, especially when your trip is tied to a fixed event date.",
  },
  {
    question: "How much do your services cost?",
    answer: "Start with a free assessment of your file. We explain our service fee for your case before you decide to go ahead. Embassy and visa-centre fees are paid separately to them and are set by the authorities.",
  },
];

export default async function BelgiumBusinessVisaPage() {
  const [settings, allGuides] = await Promise.all([getSiteSettings(), getGuides()]);
  const guideLinks = GUIDES.map((s) => allGuides.find((g) => g.slug === s)).filter((g): g is NonNullable<typeof g> => Boolean(g));

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Belgium business visa consultancy and Schengen refusal case review",
    serviceType: "Visa consultancy",
    description:
      "Document and application support for the Belgium Schengen business visa for Pakistani applicants, and review of Schengen visa refusal cases. Consultancy only; the visa decision rests with the authorities.",
    url: absoluteUrl(PATH),
    image: absoluteUrl("/offers/belgium-business-visa-share.webp"),
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
          { label: "Belgium Business Visa" },
        ]}
      />
      <PageHero
        eyebrow="Schengen Business Visa"
        title="Belgium Business Visa from Pakistan"
        description="Travelling to Belgium for meetings, a trade fair or a conference? We prepare your Schengen business visa file for Belgium, and we also review Schengen refusal cases."
      />

      <Container className="grid grid-cols-1 gap-12 py-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Image
            src="/offers/belgium-business-visa-hero.webp"
            alt="Grand Place in Brussels, Belgium, with the text Belgium Business Visa from Pakistan"
            width={1600}
            height={700}
            priority
            sizes="(max-width: 1024px) 100vw, 640px"
            className="h-auto w-full rounded-[var(--radius-lg)] border border-border"
          />

          <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">What the Belgium Business Visa Is</h2>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">
            Belgium is a Schengen country. For a business trip of up to 90 days in any 180-day period, Pakistani passport
            holders apply for a Schengen short-stay visa with the Belgian authorities. It covers business meetings,
            negotiations, trade fairs, conferences and similar activities. It is not a work permit: you cannot take
            a job or be paid by a Belgian employer on this visa.
          </p>

          <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Who Applies</h2>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">
            Business owners and partners meeting suppliers or buyers, executives and employees sent by their company,
            exhibitors and visitors at trade fairs, and delegates at conferences. If Belgium is the main destination of
            your trip, where your meetings are or where you spend the most nights, your application goes to Belgium. If
            your trip covers several Schengen countries, that main-destination rule decides, so tell us your full itinerary.
          </p>

          <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Documents Usually Needed</h2>
          <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-text-muted">
            {documents.map((d) => (
              <li key={d} className="flex items-start gap-2">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success" /> {d}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">
            Each visa centre publishes its own current checklist, and we follow the official list for your application. Read
            our guides on the{" "}
            <Link href="/guides/schengen-business-visa-from-pakistan-documents" className="font-semibold text-primary hover:text-primary-dark">
              Schengen business visa documents
            </Link>{" "}
            and the{" "}
            <Link href="/guides/business-visa-invitation-letter-what-to-include" className="font-semibold text-primary hover:text-primary-dark">
              invitation letter
            </Link>{" "}
            before you start.
          </p>

          <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">How We Help, Step by Step</h2>
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

          <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Why Business Visa Files Get Refused</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-text-muted">
            {refusalReasons.map((r) => (
              <li key={r} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> {r}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Schengen Refusal Cases</h2>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">
            If your Belgium or other Schengen application was refused, the refusal form lists the grounds as numbered
            reasons. We read that form with your original file and your invitation, and we tell you honestly whether to
            reapply, what to correct first, or whether a formal step is worth considering. The refusal decision explains where and by when
            you can appeal, and those deadlines are strict, so contact us as soon as you receive it. Formal appeals and
            legal action are handled by our in-house legal team as a separate matter from standard consultancy. See our{" "}
            <Link href="/visa-refusal/schengen" className="font-semibold text-primary hover:text-primary-dark">
              Schengen visa refusal assistance
            </Link>{" "}
            page for more.
          </p>

          <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">What We Can and Cannot Do</h2>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">
            We can assess your file, prepare the checklist, review documents and the invitation, plan the appointment and
            guide you through the application. We cannot guarantee approval or an appointment date, create or alter any
            document, or provide an invitation letter. Our work is consultancy and documentation support only.
          </p>

          <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Official Sources</h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            <li>
              <a href="https://diplomatie.belgium.be/en" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:text-primary-dark">
                Belgian Foreign Affairs: visa information ↗
              </a>
            </li>
            <li>
              <a href="https://dofi.ibz.be/en" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:text-primary-dark">
                Belgian Immigration Office ↗
              </a>
            </li>
            <li>
              <a href="https://home-affairs.ec.europa.eu/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:text-primary-dark">
                European Commission: Schengen visa policy ↗
              </a>
            </li>
          </ul>
          <p className="mt-3 text-xs leading-relaxed text-text-muted">Requirements, fees and processing times change. Always confirm them on the official website before you apply.</p>

          <p className="mt-8 rounded-[var(--radius-md)] border border-border bg-surface-muted/60 p-4 text-xs leading-relaxed text-text-muted">
            Visa decisions are made only by the Belgian authorities or the relevant embassy. Ali Baba Travel Advisor provides
            consultancy and documentation assistance and does not guarantee approval. Read our{" "}
            <Link href="/visa-disclaimer" className="text-primary underline">visa disclaimer</Link>.
          </p>
        </div>

        <div className="h-fit space-y-6 lg:sticky lg:top-24">
          <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-6">
            <p className="font-heading text-lg font-bold text-charcoal">Get your Belgium business visa file assessed</p>
            <p className="mt-1 text-sm text-text-muted">Tell us your business, the Belgian host and your dates. We reply the same day.</p>
            <div className="mt-4">
              <Button
                href={whatsappHref("Hi, I need help with a Belgium business visa.", settings.whatsappNumber)}
                external
                variant="whatsapp"
              >
                WhatsApp Enquiry
              </Button>
            </div>
            <div className="mt-6 border-t border-border pt-5">
              <VisaAssessmentForm defaultCountry="Belgium" whatsappNumber={settings.whatsappNumber} />
            </div>
          </div>
          <Image
            src="/offers/belgium-business-visa-poster.webp"
            alt="Poster: Belgium business visa and Schengen refusal case review, call 03111666076"
            width={1080}
            height={1080}
            sizes="(max-width: 1024px) 100vw, 420px"
            className="h-auto w-full rounded-[var(--radius-lg)] border border-border"
          />
        </div>
      </Container>

      <FaqSection title="Belgium Business Visa: FAQs" faqs={faqs} />
      <RelatedLinks
        title="Business Visa Guides"
        links={guideLinks.map((g) => ({ href: `/guides/${g.slug}`, label: g.title, description: g.excerpt }))}
      />
      <RelatedLinks
        title="More Visa Help"
        links={[
          { href: "/visas/belgium", label: "Belgium visa requirements", description: "Document checklist and process for Belgium" },
          { href: "/visas/schengen", label: "Schengen visa from Pakistan", description: "How one visa covers the Schengen area" },
          { href: "/visa-consultancy/business-visa", label: "Business visa consultancy", description: "Business visas for every destination" },
          { href: "/visa-consultancy/trade-fairs-and-delegations", label: "Trade fairs and delegations", description: "Group and event travel" },
          ...siteLinks(["refusal", "process", "contact", "consultation"]),
        ]}
      />
    </>
  );
}
