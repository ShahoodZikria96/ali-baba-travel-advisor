import Link from "next/link";
import {
  FileCheck2,
  ShieldAlert,
  Globe2,
  Plane,
  BedDouble,
  ClipboardList,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { coreServices } from "@/data/services";

const icons = {
  "visa-consultancy": FileCheck2,
  "visa-refusal": ShieldAlert,
  "tour-packages": Globe2,
  flights: Plane,
  "hotel-booking": BedDouble,
  "travel-documentation": ClipboardList,
} as const;

export function CoreServices() {
  return (
    <section className="border-y border-border bg-surface-muted/60 py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="Our Services"
          title="Everything You Need for International Travel"
          description="From visa documentation to flights and hotels, our consultants support every step of your journey."
        />

        <RevealGroup className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {coreServices.map((service) => {
            const Icon = icons[service.slug as keyof typeof icons];
            return (
              <RevealItem key={service.slug}>
                <TiltCard strength={6} className="h-full rounded-[var(--radius-lg)]">
                  <Link
                    href={`/${service.slug}`}
                    className="tilt-card-inner group flex h-full flex-col rounded-[var(--radius-lg)] border border-border bg-surface p-6"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] bg-primary-tint text-primary">
                      <Icon size={20} />
                    </span>
                    <p className="mt-4 font-heading text-lg font-bold text-charcoal">
                      {service.title}
                    </p>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">
                      {service.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-charcoal group-hover:text-primary">
                      Learn More
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </TiltCard>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
