import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/legal/LegalPage";
import { getOffices, getSiteSettings } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Ali Baba Travel Advisor collects, uses, shares and protects your personal information, and your rights over your data.",
  path: "/privacy-policy",
});

export default async function PrivacyPolicyPage() {
  const [settings, offices] = await Promise.all([getSiteSettings(), getOffices()]);

  return (
    <LegalPage title="Privacy Policy" crumb="Privacy Policy" updated="29 September 2026">
      <p>
        <strong>Company:</strong> Ali Baba Travel Advisor &nbsp;·&nbsp; <strong>Location:</strong> Lahore, Pakistan
      </p>
      <p>
        At Ali Baba Travel Advisor, we value your trust and are committed to protecting your personal information.
        This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you visit our
        website, book our travel packages, or interact with our services.
      </p>
      <p>By using our website and services, you agree to the collection and use of information in accordance with this policy.</p>

      <h2>1. Information We Collect</h2>
      <p>We may collect personal and non-personal information when you interact with us:</p>
      <ul>
        <li><strong>Personal identification information:</strong> name, email address, phone number, home/office address, and date of birth.</li>
        <li><strong>Travel details:</strong> passport copies, CNIC details, visa documents, travel dates, flight/hotel preferences, and emergency contact details required for bookings.</li>
        <li><strong>Payment information:</strong> bank details, credit/debit card information, or transaction receipts (processed securely through authorised payment gateways or direct bank channels).</li>
        <li><strong>Technical data:</strong> IP address, browser type, device information, and website usage data collected via cookies and analytics.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use the collected information for various professional purposes, including:</p>
      <ul>
        <li>Processing and confirming your travel bookings, flight tickets, hotel reservations, and visa applications.</li>
        <li>Communicating with you regarding your trip itineraries, updates, and customer support.</li>
        <li>Sending promotional offers, discount packages, and travel newsletters (you can opt out anytime).</li>
        <li>Improving our website functionality, customer service, and overall user experience.</li>
        <li>Complying with legal obligations, local travel regulations, and security requirements.</li>
      </ul>

      <h2>3. Sharing Your Information</h2>
      <p>
        We respect your privacy and do not sell, trade, or rent your personal data to third parties. However, we may
        share your information with trusted partners strictly necessary for your travel arrangements:
      </p>
      <ul>
        <li>Airlines, hotels, transport providers, and tour operators involved in fulfilling your booking.</li>
        <li>Embassies, consulates, and visa processing centres for visa applications.</li>
        <li>Legal or government authorities if required by law or to protect our legal rights.</li>
      </ul>

      <h2>4. Data Security</h2>
      <p>
        We implement administrative, technical, and physical security measures to protect your personal information
        from unauthorised access, alteration, disclosure, or destruction. While we strive to use commercially
        acceptable means to protect your data, no method of transmission over the internet is 100% secure.
      </p>

      <h2>5. Cookies Policy</h2>
      <p>
        Our website may use &ldquo;cookies&rdquo; to enhance your browsing experience. You can choose to accept or
        decline cookies through your web browser settings. Disabling cookies may, however, prevent you from taking
        full advantage of the website. See our <a href="/cookie-policy">Cookie Policy</a> for details.
      </p>

      <h2>6. Your Data Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access, update, or correct the personal information we hold about you.</li>
        <li>Request the deletion of your personal data, subject to any legal retention requirements (such as completed booking records).</li>
        <li>Opt out of marketing communications at any time by clicking the &ldquo;Unsubscribe&rdquo; link in our emails or contacting us directly.</li>
      </ul>

      <h2>7. Changes to This Privacy Policy</h2>
      <p>
        Ali Baba Travel Advisor reserves the right to update or modify this Privacy Policy at any time. Any changes
        will be posted on this page with an updated effective date. We encourage you to review this policy periodically.
      </p>

      <h2>Contact Us</h2>
      <p>If you have any questions, concerns, or requests regarding this Privacy Policy, please reach out to us:</p>
      <ul>
        <li>Email: <a href={`mailto:${settings.email}`}>{settings.email}</a></li>
        <li>Phone / WhatsApp: <a href={`tel:${settings.phone.replace(/\s/g, "")}`}>{settings.phone}</a></li>
        {offices.map((o) => (
          <li key={o.slug}>{o.city}: {o.address}</li>
        ))}
      </ul>
    </LegalPage>
  );
}
