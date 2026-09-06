import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { CalendarDays, CheckCircle2, XCircle, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TourEnquiryForm } from "@/components/forms/TourEnquiryForm";
import { getTours, getTour, getSiteSettings, whatsappHref } from "@/lib/content";

export async function generateStaticParams() {
  const tours = await getTours();
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTour(slug);
  if (!tour) return {};
  return { title: `${tour.destination} Group Tour`, description: tour.summary };
}

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [tour, settings] = await Promise.all([getTour(slug), getSiteSettings()]);
  if (!tour) notFound();

  const highlights = tour.highlights as string[];
  const included = tour.included as string[];
  const excluded = tour.excluded as string[];
  const itinerary = tour.itinerary as { day: string; description: string }[];
  const notes = tour.notes as string[];

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Tours", href: "/tour-packages" },
          { label: tour.destination },
        ]}
      />

      <section className="relative flex h-56 items-center justify-center overflow-hidden text-white sm:h-64">
        <Image src={tour.image} alt={tour.destination} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-charcoal/55" />
        <div className="relative text-center">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/70">Group Tour</p>
          <h1 className="mt-2 font-heading text-3xl font-extrabold sm:text-4xl">{tour.destination}</h1>
        </div>
      </section>

      <Container className="grid grid-cols-1 gap-12 py-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="flex flex-wrap items-center gap-4 rounded-[var(--radius-md)] border border-border bg-surface-muted/50 p-5 text-sm">
            <span className="flex items-center gap-1.5 font-semibold text-charcoal">
              <CalendarDays size={16} /> {tour.duration}
            </span>
            <span className="text-text-muted">{tour.departure}</span>
            {tour.visaAssistance && (
              <span className="flex items-center gap-1.5 font-semibold text-success">
                <ShieldCheck size={16} /> Visa Assistance Included
              </span>
            )}
            <span className="ml-auto font-heading text-lg font-extrabold text-primary">{tour.price} / person</span>
          </div>

          <p className="mt-6 text-[1.02rem] leading-relaxed text-text-muted">{tour.summary}</p>

          <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Tour Highlights</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-text-muted">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-2">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success" /> {h}
              </li>
            ))}
          </ul>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <h2 className="font-heading text-lg font-bold text-charcoal">What&rsquo;s Included</h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-text-muted">
                {included.map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-success" /> {i}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-heading text-lg font-bold text-charcoal">What&rsquo;s Not Included</h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-text-muted">
                {excluded.map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <XCircle size={15} className="mt-0.5 shrink-0 text-text-muted" /> {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Day-by-Day Itinerary</h2>
          <ol className="mt-4 space-y-4">
            {itinerary.map((day) => (
              <li key={day.day} className="flex gap-4">
                <span className="w-16 shrink-0 font-heading text-sm font-bold text-primary">{day.day}</span>
                <span className="text-sm leading-relaxed text-text-muted">{day.description}</span>
              </li>
            ))}
          </ol>

          <h2 className="mt-10 font-heading text-xl font-bold text-charcoal">Important Notes</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-text-muted">
            {notes.map((n) => (
              <li key={n} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> {n}
              </li>
            ))}
          </ul>
        </div>

        <div className="h-fit rounded-[var(--radius-lg)] border border-border bg-surface p-6 lg:sticky lg:top-24">
          <p className="font-heading text-lg font-bold text-charcoal">{tour.price} <span className="text-sm font-normal text-text-muted">/ person</span></p>
          <div className="mt-4 flex flex-col gap-2.5">
            <Button
              href={whatsappHref(`Hi, I would like details about the ${tour.destination} group tour.`, settings.whatsappNumber)}
              external
              variant="whatsapp"
            >
              WhatsApp Enquiry
            </Button>
          </div>
          <div className="mt-6 border-t border-border pt-5">
            <h2 className="font-heading text-base font-bold text-charcoal">Package Enquiry</h2>
            <div className="mt-4">
              <TourEnquiryForm defaultDestination={tour.destination} whatsappNumber={settings.whatsappNumber} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
