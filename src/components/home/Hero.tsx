import Image from "next/image";
import { MessageCircle, ShieldCheck, Building2, Users, PhoneCall, PlaneTakeoff } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TiltCard } from "@/components/ui/TiltCard";
import { getSiteSettings, whatsappHref } from "@/lib/content";

const trustPoints = [
  { icon: Building2, label: "Multiple Pakistan Offices" },
  { icon: Users, label: "Experienced Visa Consultants" },
  { icon: ShieldCheck, label: "Personalized Case Assessment" },
  { icon: PhoneCall, label: "Dedicated Client Support" },
];

export async function Hero() {
  const settings = await getSiteSettings();

  return (
    <section className="relative overflow-hidden border-b border-border bg-surface">
      <div aria-hidden className="bg-mesh pointer-events-none absolute inset-0" />
      <div aria-hidden className="bg-dot-grid pointer-events-none absolute inset-0 opacity-[0.06]" />

      <Container className="relative grid grid-cols-1 items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-tint px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-primary">
            <PlaneTakeoff size={13} />
            Pakistan&rsquo;s Trusted Visa &amp; Travel Consultancy
          </span>
          <h1 className="mt-5 text-[2.1rem] font-extrabold leading-[1.12] text-charcoal sm:text-[2.6rem] lg:text-[3.15rem]">
            Visa Consultant &amp; Travel Agency in Lahore,{" "}
            <span className="text-gradient">Serving All of Pakistan</span>
          </h1>
          <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-text-muted">
            Visa consultancy, international tours, airline tickets and hotel
            booking for individuals, families and businesses — with offices in
            Lahore, Islamabad, Wazirabad and Karachi.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/consultation" size="lg" className="shadow-[0_10px_30px_rgba(158,27,38,0.28)]">
              Get Visa Assessment
            </Button>
            <Button href="/visa-consultancy" variant="outline" size="lg">
              Explore Visa Services
            </Button>
            <Button
              href={whatsappHref("Hi Ali Baba Travel Advisor, I need visa information.", settings.whatsappNumber)}
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

        <div className="relative animate-fade-up-delay-1" style={{ perspective: 1000 }}>
          <div aria-hidden className="absolute -inset-6 -z-10 rounded-[var(--radius-lg)] bg-gradient-to-br from-primary/15 via-transparent to-transparent blur-2xl" />
          <TiltCard
            strength={8}
            className="group mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[var(--radius-lg)] border border-border shadow-[0_24px_60px_rgba(29,26,25,0.18)] lg:mr-0"
          >
            <Image
              src="/destinations/uk.jpg"
              alt="Big Ben, London"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 480px"
              className="rounded-[var(--radius-lg)] object-cover"
              style={{ transform: "translateZ(0)" }}
            />
            <div className="absolute inset-0 rounded-[var(--radius-lg)] bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-7" style={{ transform: "translateZ(40px)" }}>
              <p className="font-heading text-4xl font-extrabold text-white">{settings.happyCustomersStat}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-white/70">
                Happy Customers Served
              </p>
              <p className="mt-3 text-lg font-bold leading-snug text-white">
                Real consultants. Real offices. Real case guidance.
              </p>
            </div>
          </TiltCard>

        </div>
      </Container>
    </section>
  );
}
