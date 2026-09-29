import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Cookie Policy",
  description: "How Ali Baba Travel Advisor uses cookies and analytics on this website.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie Policy" crumb="Cookie Policy" updated="September 2026">
      <p>Cookies are small files stored by your browser. We use as few as possible.</p>
      <h2>Essential cookies</h2>
      <p>A secure session cookie is used only for our staff sign-in. Visitors do not receive it.</p>
      <h2>Analytics cookies</h2>
      <p>
        If enabled, we use Google Analytics / Google Tag Manager to understand which pages and buttons (for
        example WhatsApp or call links) are used, so we can improve the website. This data is aggregated and we do
        not use it to identify you personally.
      </p>
      <h2>Advertising cookies</h2>
      <p>If we later display advertising on informational pages, the ad network may set cookies. We will update this page first.</p>
      <h2>Your choices</h2>
      <p>You can block or delete cookies in your browser settings. The site remains usable without them. See also our <Link href="/privacy-policy">privacy policy</Link>.</p>
    </LegalPage>
  );
}
