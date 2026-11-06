import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, MapPin, MessageCircle, Phone, ShieldCheck, Star, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TourEnquiryForm } from "@/components/forms/TourEnquiryForm";
import { siteConfig as business } from "@/data/site";
import { getSiteSettings, telHref, whatsappHref } from "@/lib/content";

// Ad landing page: kept out of search results (ads send the traffic here), so it never competes with /tour-packages/japan-group-tour.
export const metadata: Metadata = {
  title: "Japan Group Tour from Pakistan, 2027",
  description: "7 days Osaka and Tokyo with Kyoto, Nara, Mount Fuji and the bullet train. Return flights, 3-star hotels and meals included. Limited seats.",
  robots: { index: false, follow: false },
};

const included = ["Return flight tickets", "3-star hotels", "All meals (6 breakfasts, 5 lunches, 6 dinners)", "Bullet train: Osaka to Tokyo", "Sightseeing and city tours"];
const places = ["Osaka", "Kyoto and Nara", "Tokyo", "Mount Fuji and Hakone"];
const itinerary = ["Arrival in Osaka", "Osaka full-day city tour", "Full-day Kyoto and Nara tour", "Osaka to Tokyo by bullet train", "Tokyo full-day city tour", "Mount Fuji and Hakone tour", "Departure from Tokyo"];

const faqs = [
  { q: "When does the tour leave?", a: "January to February 2027. We confirm the exact departure date when you enquire." },
  { q: "What is the price?", a: "Call or WhatsApp for the current price and booking amount. We confirm everything in writing before you pay." },
  { q: "Is the visa included?", a: "We guide your Japan visa file, but the visa is decided only by the Japanese authorities, so approval is never guaranteed." },
  { q: "Are seats limited?", a: "Yes. Seats are given in order of booking, so message us to check availability." },
];

export default async function JapanLandingPage() {
  const settings = await getSiteSettings();
  const wa = whatsappHref("Hi, I would like details and the price for the Japan group tour (January to February 2027).", settings.whatsappNumber);

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
            Bookings open · Jan to Feb 2027 · Limited seats
          </p>
          <h1 className="mt-4 font-heading text-[1.9rem] font-extrabold leading-tight text-charcoal sm:text-4xl">
            Japan Group Tour from Pakistan
          </h1>
          <p className="mt-3 text-[1.02rem] leading-relaxed text-text-muted">
            Osaka and Tokyo on one guided 7 day trip, with Kyoto, Nara, Mount Fuji and a bullet train ride.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-[var(--radius-md)] border border-border bg-surface p-3.5">
              <p className="text-xs font-bold uppercase tracking-wide text-text-muted">Travel</p>
              <p className="font-heading text-xl font-extrabold text-primary">Jan to Feb 2027</p>
            </div>
            <div className="rounded-[var(--radius-md)] border border-border bg-surface p-3.5">
              <p className="text-xs font-bold uppercase tracking-wide text-text-muted">Duration</p>
              <p className="font-heading text-xl font-extrabold text-charcoal">7 days / 6 nights</p>
            </div>
            <div className="rounded-[var(--radius-md)] border border-border bg-surface p-3.5">
              <p className="text-xs font-bold uppercase tracking-wide text-text-muted">Cities</p>
              <p className="font-heading text-xl font-extrabold text-charcoal">Osaka &amp; Tokyo</p>
            </div>
          </div>

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

          <ol className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {itinerary.map((d, i) => (
              <li key={d} className="flex items-center gap-2.5 rounded-[var(--radius-md)] border border-border bg-surface px-3 py-2 text-sm text-charcoal">
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">Day {i + 1}</span> {d}
              </li>
            ))}
          </ol>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button href={wa} external variant="whatsapp" size="lg">
              <MessageCircle size={18} /> Get Price on WhatsApp
            </Button>
            <Button href={telHref(settings.phone)} variant="outline" size="lg">
              <Phone size={18} /> Call Now
            </Button>
          </div>

          <ul className="mt-7 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
            <li className="rounded-[var(--radius-md)] border border-border bg-surface"><a href={business.googleReviews.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3"><Star size={18} className="shrink-0 text-primary" /> {business.googleReviews.count} Google reviews</a></li>
            <li className="flex items-center gap-2 rounded-[var(--radius-md)] border border-border bg-surface p-3"><Users size={18} className="shrink-0 text-primary" /> {settings.happyCustomersStat} happy customers</li>
            <li className="flex items-center gap-2 rounded-[var(--radius-md)] border border-border bg-surface p-3"><ShieldCheck size={18} className="shrink-0 text-primary" /> Offices in 4 cities</li>
          </ul>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Image
              src="/tours/japan-group-tour-2027.webp"
              alt="Japan group tour 2027 poster: Osaka and Tokyo, January to February"
              width={1080}
              height={1080}
              priority
              sizes="(max-width: 640px) 100vw, 260px"
              className="h-auto w-full rounded-[var(--radius-lg)] border border-border"
            />
            <Image
              src="/tours/japan-group-tour-2027-itinerary.webp"
              alt="Japan group tour 2027 itinerary, package inclusions and meal details"
              width={1080}
              height={1080}
              sizes="(max-width: 640px) 100vw, 260px"
              className="h-auto w-full rounded-[var(--radius-lg)] border border-border"
            />
          </div>
        </div>

        <div className="h-fit rounded-[var(--radius-lg)] border border-border bg-surface p-6 shadow-sm lg:sticky lg:top-20">
          <h2 className="font-heading text-xl font-bold text-charcoal">Reserve your seat</h2>
          <p className="mt-1 text-sm text-text-muted">Fill in the form; we reply the same day on WhatsApp. Seats are limited.</p>
          <div className="mt-5">
            <TourEnquiryForm defaultDestination="Japan Group Tour (January to February 2027)" whatsappNumber={settings.whatsappNumber} />
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
