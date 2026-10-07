import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, MapPin, MessageCircle, Phone, ShieldCheck, Star, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TourEnquiryForm } from "@/components/forms/TourEnquiryForm";
import { getSiteSettings, telHref, whatsappHref } from "@/lib/content";

// Ad landing page: kept out of search results (ads send the traffic here), so it never competes with /tour-packages/canada-group-tour.
export const metadata: Metadata = {
  title: "Canada Group Tour from Pakistan, March 2027",
  description: "Niagara Falls, Toronto, Banff and Ottawa with visa support, 4-star hotels, return flights and breakfast. Travel with our CEO. Free quote.",
  robots: { index: false, follow: false },
};

const included = ["Canada visa support", "4-star hotels", "Daily activities", "Return flight tickets", "Daily breakfast"];
const places = ["Niagara Falls", "Toronto", "Banff", "Ottawa"];

const faqs = [
  { q: "When does the tour leave?", a: "March 2027. Seats are limited, so message us for the exact date and the current price." },
  { q: "Is the visa included?", a: "Visa support is included: we prepare your file and guide you through it. The visa decision is made by the Canadian immigration authority and is never guaranteed." },
  { q: "Who travels with the group?", a: "Our CEO Syed Ali Jawad and Usman Molvi travel with the group." },
  { q: "How do I get the price?", a: "Fill in the form or message us on WhatsApp. We reply with the price, payment plan and what to prepare." },
];

export default async function CanadaLandingPage() {
  const settings = await getSiteSettings();
  const wa = whatsappHref("Hi, I would like details and the price for the Canada group tour (March 2027).", settings.whatsappNumber);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border bg-surface/95 backdrop-blur">
        <Container className="flex items-center justify-between gap-3 py-2.5">
          <span className="flex items-center gap-2.5">
            <Image src="/brand/logo.webp" alt="Ali Baba Travel Advisor" width={44} height={44} className="h-10 w-10 rounded-[var(--radius-sm)] object-contain" />
            <span className="hidden font-heading text-sm font-bold text-charcoal sm:inline">Ali Baba Travel Advisor</span>
          </span>
          <div className="flex items-center gap-2">
            <a href={telHref(settings.phone)} className="flex h-10 items-center gap-1.5 rounded-[var(--radius-md)] border border-border px-3 text-sm font-semibold text-charcoal">
              <Phone size={16} /> <span className="hidden sm:inline">{settings.phone}</span><span className="sm:hidden">Call</span>
            </a>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="flex h-10 items-center gap-1.5 rounded-[var(--radius-md)] bg-[#14803f] px-3.5 text-sm font-semibold text-white">
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
        </Container>
      </header>

      <Container className="grid grid-cols-1 gap-10 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-12">
        <div>
          <p className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-primary">
            Bookings open · March 2027
          </p>
          <h1 className="mt-4 font-heading text-[1.9rem] font-extrabold leading-tight text-charcoal sm:text-4xl">
            Canada Group Tour from Pakistan
          </h1>
          <p className="mt-3 text-[1.02rem] leading-relaxed text-text-muted">
            Niagara Falls, Toronto, Banff and Ottawa on one guided trip, travelling with our CEO <b className="text-charcoal">Syed Ali Jawad</b> and Usman Molvi.
          </p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {places.map((p) => (
              <li key={p} className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-semibold text-charcoal">
                <MapPin size={14} className="text-primary" /> {p}
              </li>
            ))}
          </ul>

          <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {included.map((i) => (
              <li key={i} className="flex items-center gap-2 text-sm font-semibold text-charcoal">
                <CheckCircle2 size={18} className="shrink-0 text-success" /> {i}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button href={wa} external variant="whatsapp" size="lg">
              <MessageCircle size={18} /> Get Price on WhatsApp
            </Button>
            <Button href={telHref(settings.phone)} variant="outline" size="lg">
              <Phone size={18} /> Call Now
            </Button>
          </div>

          <ul className="mt-7 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
            <li className="flex items-center gap-2 rounded-[var(--radius-md)] border border-border bg-surface p-3"><Star size={18} className="shrink-0 text-primary" /> 200+ Google reviews</li>
            <li className="flex items-center gap-2 rounded-[var(--radius-md)] border border-border bg-surface p-3"><Users size={18} className="shrink-0 text-primary" /> {settings.happyCustomersStat} happy customers</li>
            <li className="flex items-center gap-2 rounded-[var(--radius-md)] border border-border bg-surface p-3"><ShieldCheck size={18} className="shrink-0 text-primary" /> Offices in 4 cities</li>
          </ul>

          <Image
            src="/tours/canada-group-tour.webp"
            alt="Canada group tour poster: Niagara Falls, Toronto, Banff, Ottawa"
            width={1080}
            height={1080}
            priority
            sizes="(max-width: 1024px) 100vw, 520px"
            className="mt-8 h-auto w-full max-w-md rounded-[var(--radius-lg)] border border-border"
          />
        </div>

        <div className="h-fit rounded-[var(--radius-lg)] border border-border bg-surface p-6 shadow-sm lg:sticky lg:top-20">
          <h2 className="font-heading text-xl font-bold text-charcoal">Get the price and seat availability</h2>
          <p className="mt-1 text-sm text-text-muted">Fill in the form; we reply the same day on WhatsApp.</p>
          <div className="mt-5">
            <TourEnquiryForm defaultDestination="Canada Group Tour (March 2027)" whatsappNumber={settings.whatsappNumber} />
          </div>
        </div>
      </Container>

      <Container className="pb-12">
        <h2 className="font-heading text-xl font-bold text-charcoal">Common questions</h2>
        <dl className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-[var(--radius-md)] border border-border bg-surface p-4">
              <dt className="font-semibold text-charcoal">{f.q}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-text-muted">{f.a}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-xs leading-relaxed text-text-muted">
          Ali Baba Travel Advisor, offices in Lahore, Islamabad, Wazirabad and Karachi. Visa decisions are made only by the embassy or immigration authority and approval is never guaranteed.
        </p>
      </Container>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] lg:hidden">
        <a href={telHref(settings.phone)} className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-charcoal"><Phone size={18} /> Call</a>
        <a href={wa} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#14803f] py-3.5 text-sm font-semibold text-white"><MessageCircle size={18} /> WhatsApp</a>
      </div>
    </>
  );
}
