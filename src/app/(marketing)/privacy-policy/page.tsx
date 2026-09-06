import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Ali Baba Travel Advisor collects, uses and protects your personal information.",
};

export default async function PrivacyPolicyPage() {
  const siteConfig = await getSiteSettings();

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <Container className="py-14">
        <div className="mx-auto max-w-[760px] space-y-6 text-sm leading-relaxed text-text-muted">
          <p>
            Ali Baba Travel Advisor (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects personal information you provide
            through our website forms, WhatsApp, phone or in-person visits — including your name, contact details,
            travel plans and, where relevant to a visa application, supporting documentation.
          </p>
          <h2 className="font-heading text-lg font-bold text-charcoal">How We Use Your Information</h2>
          <p>
            We use your information to respond to enquiries, prepare visa and travel documentation, process
            bookings, and communicate with you about your case or trip. We do not sell your personal information
            to third parties.
          </p>
          <h2 className="font-heading text-lg font-bold text-charcoal">Sharing With Third Parties</h2>
          <p>
            Where necessary for your application — such as with an embassy, consulate, airline or hotel — we share
            only the information required to process your request.
          </p>
          <h2 className="font-heading text-lg font-bold text-charcoal">Data Retention & Security</h2>
          <p>
            We retain personal and case information for as long as reasonably necessary to provide our services
            and meet any applicable record-keeping requirements, and take reasonable steps to protect it from
            unauthorized access.
          </p>
          <h2 className="font-heading text-lg font-bold text-charcoal">Contact</h2>
          <p>
            For questions about this policy or your personal information, contact us at{" "}
            <a href={`mailto:${siteConfig.email}`} className="font-semibold text-primary">{siteConfig.email}</a>.
          </p>
          <p className="text-xs italic">
            This policy is a general template and should be reviewed by legal counsel before publication to ensure
            it reflects your actual data practices and complies with applicable law.
          </p>
        </div>
      </Container>
    </>
  );
}
