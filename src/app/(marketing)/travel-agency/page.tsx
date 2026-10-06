import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { FaqSection } from "@/components/ui/FaqSection";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { pageMetadata } from "@/lib/seo";
import { siteLinks } from "@/lib/related";
import { cities, provinces } from "@/data/cityPages";
import type { PageFaq } from "@/data/pageFaqs";
import { getOffices } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Travel Agency & Visa Consultant in Pakistan",
  description: "Ali Baba Travel Advisor serves clients in every province of Pakistan: visa consultancy, tour packages and flights, with offices in Lahore, Islamabad, Wazirabad and Karachi.",
  path: "/travel-agency",
});

const faqs: PageFaq[] = [
  {
    question: "Do you only serve clients who live near your offices?",
    answer: "No. We serve clients across Pakistan by phone, WhatsApp and online document sharing. You only need to visit an office, or a visa application centre, when a step has to be done in person.",
  },
  {
    question: "Where are your offices?",
    answer: "We have offices in Lahore, Islamabad, Wazirabad and Karachi. Visit the locations page for addresses, phone numbers and opening hours.",
  },
  {
    question: "Which services are available outside the office cities?",
    answer: "All of them: visa consultancy, tour packages, flight and hotel booking and visa refusal case review. Documents are shared digitally and we tell you exactly what needs to be done in person.",
  },
];

export default async function TravelAgencyHubPage() {
  const offices = await getOffices();
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Travel Agency in Pakistan" }]} />
      <PageHero
        eyebrow="Serving all of Pakistan"
        title="Travel Agency and Visa Consultant in Pakistan"
        description="Wherever you live in Pakistan, you can start a visa application, book a tour package or arrange flights with Ali Baba Travel Advisor. Pick your city or province below."
      />

      <Container className="py-10">
        <h2 className="font-heading text-xl font-bold text-charcoal">Our Offices</h2>
        <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {offices.map((o) => (
            <li key={o.slug}>
              <Link href={`/locations/${o.slug}`} className="block rounded-[var(--radius-md)] border border-border bg-surface p-4 hover:border-primary">
                <span className="flex items-center gap-1.5 font-semibold text-charcoal"><MapPin size={14} className="text-primary" /> Travel agency in {o.city}</span>
                <span className="mt-1 block text-sm text-text-muted">{o.address}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      {provinces.map((p) => {
        const list = cities.filter((c) => c.province === p.slug);
        return (
          <Container key={p.slug} className="border-t border-border py-10">
            <h2 className="font-heading text-xl font-bold text-charcoal">
              <Link href={`/travel-agency/${p.slug}`} className="hover:text-primary">{p.name}</Link>
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-text-muted">{p.about}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {list.map((c) => (
                <li key={c.slug}>
                  <Link href={`/travel-agency/${c.slug}`} className="inline-block rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-semibold text-charcoal hover:border-primary hover:text-primary">
                    Travel agency in {c.name}
                  </Link>
                </li>
              ))}
              {list.length === 0 && (
                <li className="text-sm text-text-muted">Served from our {p.offices.map((o) => o.charAt(0).toUpperCase() + o.slice(1)).join(" or ")} office by phone, WhatsApp and online.</li>
              )}
            </ul>
          </Container>
        );
      })}

      <FaqSection title="Serving Clients Across Pakistan" faqs={faqs} />
      <RelatedLinks title="Explore Our Services" links={siteLinks(["consultancy", "tours", "flights", "hotels", "visas", "contact"])} />
    </>
  );
}
