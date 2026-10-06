import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { cities, provinces } from "@/data/cityPages";

export function ServiceAreas() {
  return (
    <section id="cities" className="border-t border-border bg-surface-muted/50 py-16 lg:py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Across Pakistan"
            title="Find Us in Your City"
            description="Offices in Lahore, Islamabad, Wazirabad and Karachi, and visa and travel help by phone, WhatsApp and online in every city and province."
          />
          <Button href="/travel-agency" variant="outline" size="sm">
            All Cities
          </Button>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {provinces.map((p) => {
            const list = cities.filter((c) => c.province === p.slug);
            return (
              <li
                key={p.slug}
                className={cn(
                  "group/card flex flex-col rounded-[var(--radius-lg)] border border-border bg-surface p-5 transition-colors hover:border-primary/50",
                  list.length > 8 && "lg:col-span-2"
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <Link href={`/travel-agency/${p.slug}`} className="flex items-center gap-2 font-heading text-base font-bold text-charcoal hover:text-primary">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <MapPin size={16} />
                    </span>
                    {p.name}
                  </Link>
                  {list.length > 0 && (
                    <span className="rounded-full bg-surface-muted px-2.5 py-0.5 text-xs font-bold text-text-muted">{list.length} cities</span>
                  )}
                </div>

                {list.length > 0 ? (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {list.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/travel-agency/${c.slug}`}
                          className="inline-block rounded-full bg-surface-muted px-3 py-1 text-[13px] font-semibold text-charcoal transition-colors hover:bg-primary hover:text-white"
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-sm leading-relaxed text-text-muted">
                    Served directly from our Islamabad office, with Rawalpindi just next door.
                  </p>
                )}

                <Link
                  href={`/travel-agency/${p.slug}`}
                  className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-primary hover:text-primary-dark"
                >
                  Travel agency in {p.name} <ArrowRight size={13} className="transition-transform group-hover/card:translate-x-0.5" />
                </Link>
              </li>
            );
          })}
          <li className="flex flex-col justify-center rounded-[var(--radius-lg)] bg-charcoal p-6 text-white">
            <p className="font-heading text-lg font-bold">Don&rsquo;t see your city?</p>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              We serve clients in every city of Pakistan. Message us and we will guide you on the nearest step.
            </p>
            <Link href="/contact" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white hover:underline">
              Contact us <ArrowRight size={14} />
            </Link>
          </li>
        </ul>

        <p className="mt-8 text-sm text-text-muted">
          Prefer to visit in person?{" "}
          <Link href="/locations" className="font-semibold text-primary hover:text-primary-dark">See our office addresses →</Link>
        </p>
      </Container>
    </section>
  );
}
