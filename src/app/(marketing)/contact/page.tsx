import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { VisaAssessmentForm } from "@/components/forms/VisaAssessmentForm";
import { getOffices, getSiteSettings, getFaqs, telHref, whatsappHref } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Ali Baba Travel Advisor by phone, WhatsApp, email or in person at our Lahore, Islamabad, Wazirabad or Karachi offices.",
};

export default async function ContactPage() {
  const [offices, siteConfig, generalFaqs] = await Promise.all([getOffices(), getSiteSettings(), getFaqs()]);

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <PageHero
        eyebrow="Get in Touch"
        title="Contact Ali Baba Travel Advisor"
        description="Reach us by phone, WhatsApp, email, or visit any of our offices for a face-to-face consultation."
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={telHref(siteConfig.phone)} variant="outline" icon={<Phone size={16} />}>{siteConfig.phone}</Button>
          <Button href={whatsappHref("Hello I want details.", siteConfig.whatsappNumber)} external variant="whatsapp">WhatsApp Us</Button>
          <Button href={`mailto:${siteConfig.email}`} variant="outline" icon={<Mail size={16} />}>Email Us</Button>
        </div>
      </PageHero>

      <Container className="grid grid-cols-1 gap-12 py-14 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="font-heading text-xl font-bold text-charcoal">Our Offices</h2>
          <div className="mt-5 space-y-4">
            {offices.map((o) => (
              <div key={o.slug} className="rounded-[var(--radius-md)] border border-border bg-surface p-5">
                <p className="font-heading text-base font-bold text-charcoal">{o.city}</p>
                <div className="mt-2.5 space-y-1.5 text-sm text-text-muted">
                  <p className="flex items-start gap-2">
                    <MapPin size={15} className="mt-0.5 shrink-0" /> {o.address}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock size={15} className="shrink-0" /> {o.hours}
                  </p>
                  <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-primary">
                    <Phone size={15} className="shrink-0" /> {o.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Contact FAQs</h2>
          <div className="mt-4">
            <FAQAccordion items={generalFaqs.slice(4, 8)} />
          </div>
        </div>

        <div className="h-fit rounded-[var(--radius-lg)] border border-border bg-surface p-6">
          <h2 className="font-heading text-lg font-bold text-charcoal">Send a General Enquiry</h2>
          <p className="mt-1.5 text-sm text-text-muted">Tell us how we can help and we&rsquo;ll get back to you.</p>
          <div className="mt-5">
            <VisaAssessmentForm whatsappNumber={siteConfig.whatsappNumber} />
          </div>
        </div>
      </Container>
    </>
  );
}
