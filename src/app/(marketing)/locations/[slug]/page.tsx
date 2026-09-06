import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, MapPin, Phone, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getOffices, getOffice, getSiteSettings, whatsappHref } from "@/lib/content";

export async function generateStaticParams() {
  const offices = await getOffices();
  return offices.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const office = await getOffice(slug);
  if (!office) return {};
  return {
    title: `Visa Consultant & Travel Agency in ${office.city}`,
    description: `Ali Baba Travel Advisor's ${office.city} office — visa consultancy, tour packages and flight booking. ${office.address}.`,
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [office, settings] = await Promise.all([getOffice(slug), getSiteSettings()]);
  if (!office) notFound();
  const isUpcoming = office.openingDate && new Date(office.openingDate) > new Date();
  const servicesOffered = office.servicesOffered as string[];

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Locations" }, { label: office.city }]} />
      <PageHero
        eyebrow={isUpcoming ? "Opening Soon" : "Visit Us"}
        title={`Visa Consultant & Travel Agency in ${office.city}`}
        description={office.intro}
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            href={whatsappHref(`Hi, I would like to visit the ${office.city} office.`, settings.whatsappNumber)}
            external
            variant="whatsapp"
          >
            WhatsApp This Office
          </Button>
          <Button href="/consultation" variant="outline">Book Consultation</Button>
        </div>
      </PageHero>

      <Container className="grid grid-cols-1 gap-12 py-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          {isUpcoming && office.openingDate && (
            <div className="mb-8 flex items-center gap-2 rounded-[var(--radius-md)] border border-primary/30 bg-primary-tint px-4 py-3 text-sm font-semibold text-primary">
              <Sparkles size={16} /> Opening {new Date(office.openingDate).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </div>
          )}

          <h2 className="font-heading text-xl font-bold text-charcoal">About This Office</h2>
          <p className="mt-4 text-sm leading-relaxed text-text-muted">{office.localContext}</p>

          <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Services Offered Here</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-text-muted">
            {servicesOffered.map((s) => (
              <li key={s} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="h-fit rounded-[var(--radius-lg)] border border-border bg-surface p-6">
          <p className="font-heading text-lg font-bold text-charcoal">{office.city} Office</p>
          <div className="mt-4 space-y-3 text-sm text-text-muted">
            <p className="flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 shrink-0" /> {office.address}
            </p>
            <p className="flex items-center gap-2">
              <Clock size={15} className="shrink-0" /> {office.hours}
            </p>
            <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-primary">
              <Phone size={15} className="shrink-0" /> {office.phone}
            </a>
          </div>
          <a
            href={office.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block text-sm font-bold text-primary hover:text-primary-dark"
          >
            Get Directions →
          </a>
        </div>
      </Container>
    </>
  );
}
