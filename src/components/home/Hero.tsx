import { MessageCircle, ShieldCheck, Building2, Users, PhoneCall } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const trustPoints = [
  { icon: Building2, label: "Multiple Pakistan Offices" },
  { icon: Users, label: "Experienced Visa Consultants" },
  { icon: ShieldCheck, label: "Personalized Case Assessment" },
  { icon: PhoneCall, label: "Dedicated Client Support" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(var(--color-primary) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />
      <Container className="relative grid grid-cols-1 items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-tint px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-primary">
            Pakistan&rsquo;s Trusted Visa &amp; Travel Consultancy
          </span>
          <h1 className="mt-5 text-[2.1rem] font-extrabold leading-[1.12] text-charcoal sm:text-[2.6rem] lg:text-[3rem]">
            Visa &amp; Travel Solutions for Your Next International Journey
          </h1>
          <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-text-muted">
            Professional visa assistance, international tours, flight booking
            and travel consultancy for individuals, families and businesses
            across Pakistan.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/consultation" size="lg">
              Get Visa Assessment
            </Button>
            <Button href="/visa-consultancy" variant="outline" size="lg">
              Explore Visa Services
            </Button>
            <Button
              href="https://wa.me/923000000000?text=Hi%20Ali%20Baba%20Travel%20Advisor%2C%20I%20need%20visa%20information."
              external
              variant="whatsapp"
              size="lg"
              icon={<MessageCircle size={18} />}
            >
              Chat on WhatsApp
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-6 sm:grid-cols-4">
            {trustPoints.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-tint text-primary">
                  <Icon size={17} />
                </span>
                <span className="text-[0.82rem] font-semibold leading-tight text-charcoal">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] w-full max-w-md justify-self-center overflow-hidden rounded-[var(--radius-lg)] border border-border bg-gradient-to-br from-charcoal via-charcoal-soft to-primary-dark shadow-[0_24px_60px_rgba(29,26,25,0.18)] lg:justify-self-end">
            <div className="absolute inset-0 flex flex-col justify-end p-7">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/60">
                Trusted By Families &amp; Businesses
              </p>
              <p className="mt-2 text-xl font-bold leading-snug text-white">
                Real consultants. Real offices. Real case guidance.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
