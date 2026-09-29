import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/legal/LegalPage";
import { getOffices, getSiteSettings } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Refund & Cancellation Policy",
  description:
    "Cancellation and refund terms for Ali Baba Travel Advisor tour packages, flights, hotels and visa services, including the refund timeline by days before departure.",
  path: "/refund-policy",
});

export default async function RefundPolicyPage() {
  const [settings, offices] = await Promise.all([getSiteSettings(), getOffices()]);

  return (
    <LegalPage title="Refund & Cancellation Policy" crumb="Refund Policy" updated="29 September 2026">
      <p>
        <strong>Company:</strong> Ali Baba Travel Advisor &nbsp;·&nbsp; <strong>Location:</strong> Lahore, Pakistan
      </p>
      <p>
        We strive to provide the best travel experiences and services. Please read our cancellation and refund
        policy carefully before booking any tour, flight, hotel, or travel package with us.
      </p>

      <h2>1. General Booking &amp; Cancellation Terms</h2>
      <ul>
        <li>All cancellation requests must be submitted in writing (via email or official WhatsApp) by the primary person who made the booking.</li>
        <li>Cancellation charges are calculated based on the total booking amount and the date on which the cancellation request is received by our team.</li>
        <li>Service charges, processing fees, and visa fees are strictly non-refundable under any circumstances.</li>
      </ul>

      <h2>2. Tour Packages &amp; Holiday Trips</h2>
      <p>Cancellations made for domestic or international group/customized holiday packages are subject to the following timeline:</p>
      <ul>
        <li><strong>30 days or more before departure:</strong> full refund minus a standard administrative/processing fee (10% of the total package cost).</li>
        <li><strong>15 to 29 days before departure:</strong> 50% refund of the total package cost.</li>
        <li><strong>7 to 14 days before departure:</strong> 25% refund of the total package cost.</li>
        <li><strong>Less than 7 days before departure / no-show:</strong> no refund will be issued. 100% cancellation charges apply.</li>
      </ul>

      <h2>3. Flight Tickets &amp; Hotels</h2>
      <ul>
        <li><strong>Flights:</strong> refund policies for airline tickets depend strictly on the respective airline&rsquo;s fare rules (refundable vs. non-refundable tickets). If an airline permits a refund, Ali Baba Travel Advisor will process it after deducting our standard service charges.</li>
        <li><strong>Hotels:</strong> hotel booking cancellations are subject to the specific hotel&rsquo;s cancellation policy. Non-refundable room bookings cannot be cancelled or refunded.</li>
      </ul>

      <h2>4. Visa Services</h2>
      <ul>
        <li>Visa processing fees paid to embassies, consulates, or third-party processing centres are 100% non-refundable, regardless of whether the visa is approved, delayed, or rejected.</li>
        <li>Service charges paid to Ali Baba Travel Advisor for visa consultancy are also non-refundable once the application file has been processed or submitted.</li>
      </ul>

      <h2>5. Refund Processing Time</h2>
      <ul>
        <li>Once a refund is approved, it will be processed within 7 to 14 working days.</li>
        <li>Refunds will be issued via the original payment method (bank transfer, cash, or credit/debit card) or through direct office collection, depending on the initial mode of payment.</li>
      </ul>

      <h2>6. Force Majeure</h2>
      <p>
        Ali Baba Travel Advisor is not liable for any changes, cancellations, or delays caused by events beyond our
        control (force majeure), including natural disasters, political unrest, government restrictions, pandemics,
        strikes, or airline schedule changes. In such cases, we will try our best to assist you with rescheduling or
        securing credits from third-party vendors as per their policies.
      </p>

      <h2>Need Help?</h2>
      <p>If you have any questions regarding our refund policy or need assistance with your booking, reach out to our support team:</p>
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
