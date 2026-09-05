import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { offices } from "@/data/offices";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us",
  description: "Ali Baba Travel Advisor is Pakistan's visa consultancy and travel advisory, serving clients from Lahore, Islamabad, Wazirabad and Karachi.",
};

const differentiators = [
  "Experienced visa consultants focused specifically on documentation and case guidance",
  "Multiple offices across Pakistan for face-to-face consultation",
  "Personalized case assessment for every applicant",
  "International travel expertise alongside visa consultancy",
  "Transparent process with no guaranteed-outcome claims",
  "An active YouTube channel with 58,000+ subscribers sharing visa guidance",
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <PageHero
        eyebrow="Our Story"
        title="Creating Memorable Journeys, Every Step of the Way"
        description="Ali Baba Travel Advisor is a Pakistan-based visa consultancy and travel advisory helping individuals, families and businesses plan international travel with confidence."
      />

      <Container className="py-14">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-xl font-bold text-charcoal">Our Story</h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted">
              Ali Baba Travel Advisor started as a Lahore-based travel agency and has grown into a visa
              consultancy and travel advisory serving clients across Punjab and, from September 2026, Karachi.
              We work with families planning a first international trip, business owners traveling for work,
              students heading abroad to study, and applicants who have faced a previous visa refusal and need a
              clearer path forward.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-text-muted">
              Alongside visa consultancy, we plan group and customized tours, book flights and hotels, and share
              visa guidance publicly through our YouTube channel, which has grown to over 58,000 subscribers.
            </p>

            <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Mission</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              To make international travel and visa applications less confusing for Pakistani travelers, through
              honest guidance, thorough documentation and transparent communication.
            </p>

            <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Vision</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              To be a trusted, nationally recognized visa and travel consultancy known for treating every
              applicant&rsquo;s case individually rather than as a number.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-charcoal">Why Clients Choose Us</h2>
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-text-muted">
              {differentiators.map((d) => (
                <li key={d} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> {d}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Our Offices</h2>
            <ul className="mt-4 space-y-3 text-sm text-text-muted">
              {offices.map((o) => (
                <li key={o.slug}>
                  <span className="font-semibold text-charcoal">{o.city}:</span> {o.address}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/team" variant="outline">Meet Our Team</Button>
              <Button href={`https://wa.me/${siteConfig.whatsappNumber}`} external variant="whatsapp">
                Chat on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
