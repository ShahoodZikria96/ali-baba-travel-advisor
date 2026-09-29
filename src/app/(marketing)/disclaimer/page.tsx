import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Website Disclaimer",
  description: "General disclaimer for information published on the Ali Baba Travel Advisor website, including third-party links, pricing and travel information.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <LegalPage title="Website Disclaimer" crumb="Disclaimer" updated="September 2026">
      <p>
        The information on this website is provided in good faith for general guidance. We work to keep it
        accurate but make no warranty that it is complete or current at the moment you read it.
      </p>
      <h2>Not legal or immigration advice</h2>
      <p>Guides and country pages are informational. For legal advice, consult a licensed lawyer. See our <Link href="/visa-disclaimer">visa disclaimer</Link>.</p>
      <h2>Prices, itineraries and availability</h2>
      <p>Tour prices, flight fares and hotel rates change and are confirmed only at booking. Advertised departure dates are subject to minimum group numbers and third-party availability.</p>
      <h2>Third-party links and services</h2>
      <p>We link to official government websites and other third parties for your convenience. We do not control their content. Airlines, hotels and visa authorities set their own terms.</p>
      <h2>Advertising and partner links</h2>
      <p>Informational pages may in future carry advertising or partner links, which will be clearly labelled. They never influence our visa advice.</p>
      <h2>Testimonials</h2>
      <p>Reviews reflect individual experiences and are not a promise of any specific outcome.</p>
    </LegalPage>
  );
}
