import Image from "next/image";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import { whatsappHref } from "@/lib/whatsapp";

const included = ["Return flight tickets", "3-star hotels", "All meals", "Bullet train (Osaka to Tokyo)", "Sightseeing and city tours"];

/** Launch banner for the Japan group tour, shown right under the home page hero. */
export function FeaturedTourBanner() {
  const wa = whatsappHref("Hi, I would like details and the price for the Japan group tour (January to February 2027).", siteConfig.whatsappNumber);
  return (
    <section aria-labelledby="japan-banner-title" className="bg-surface py-10 lg:py-12">
      <Container>
        <div className="grid grid-cols-1 items-center gap-6 overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface-muted/60 p-4 shadow-sm sm:p-6 md:grid-cols-[320px_1fr] lg:grid-cols-[380px_1fr] lg:gap-10">
          <Image
            src="/tours/japan-group-tour-2027.webp"
            alt="Japan group tour 2027, January to February: Osaka and Tokyo, 7 days / 6 nights"
            width={1080}
            height={1080}
            sizes="(max-width: 768px) 100vw, 380px"
            className="mx-auto h-auto w-full max-w-sm rounded-[var(--radius-md)]"
          />
          <div>
            <p className="inline-flex rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-white">New · Bookings open · Limited seats</p>
            <h2 id="japan-banner-title" className="mt-3 font-heading text-2xl font-extrabold leading-tight text-charcoal sm:text-3xl">
              Japan Group Tour 2027: Osaka &amp; Tokyo
            </h2>
            <p className="mt-2 text-text-muted">January to February 2027 · 7 days / 6 nights · Kyoto, Nara, Mount Fuji and a bullet train ride.</p>
            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {included.map((i) => (
                <li key={i} className="flex items-center gap-2 text-sm font-semibold text-charcoal">
                  <CheckCircle2 size={18} className="shrink-0 text-success" /> {i}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href="/tour-packages/japan-group-tour" size="lg">View Itinerary &amp; Details</Button>
              <Button href={wa} external variant="whatsapp" size="lg">
                <MessageCircle size={18} /> WhatsApp for Price
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
