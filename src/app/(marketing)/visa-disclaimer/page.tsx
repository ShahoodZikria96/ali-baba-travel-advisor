import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Visa Disclaimer",
  description: "What Ali Baba Travel Advisor can and cannot do for your visa application: consultancy and documentation support, never guaranteed approval.",
  path: "/visa-disclaimer",
});

export default function VisaDisclaimerPage() {
  return (
    <LegalPage title="Visa Disclaimer" crumb="Visa Disclaimer" updated="September 2026">
      <p>
        Ali Baba Travel Advisor is a private travel and visa consultancy. We are not an embassy, consulate,
        visa application centre or government body, and we are not affiliated with any government.
      </p>
      <h2>Who decides your visa</h2>
      <p>
        Every visa decision is made solely by the relevant embassy, consulate or immigration authority. We cannot
        influence, speed up or predict that decision, and we do not guarantee approval, an appointment slot or
        any particular processing time.
      </p>
      <h2>What we can help with</h2>
      <ul>
        <li>Assessing your profile and explaining the general requirements for your destination.</li>
        <li>Preparing a document checklist and reviewing your documents for completeness and consistency.</li>
        <li>Guiding you through the online application and appointment steps where they apply.</li>
        <li>Reviewing a previous refusal letter and advising on whether and how to reapply.</li>
      </ul>
      <h2>What we cannot do</h2>
      <ul>
        <li>Guarantee approval or an appointment date.</li>
        <li>Give legal advice as part of standard consultancy. Consultancy and document review are separate from legal work. Judicial review and Pre-Action Protocol matters are handled by our in-house legal team, and no legal outcome is guaranteed.</li>
        <li>Create, alter or backdate documents, or submit information that is not true. Applications must be honest and accurate.</li>
      </ul>
      <h2>Requirements change</h2>
      <p>
        Fees, forms, documents and processing times change without notice. Content on this website is general
        information, reviewed periodically, and is not a substitute for the official requirements. Always confirm
        with the official source linked on each country page. See also our <Link href="/disclaimer">general disclaimer</Link>{" "}
        and <Link href="/terms">terms</Link>.
      </p>
    </LegalPage>
  );
}
