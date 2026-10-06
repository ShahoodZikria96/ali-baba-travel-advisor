import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { cities, provinces } from "@/data/cityPages";

const OFFICES = [
  { label: "Lahore", href: "/locations/lahore" },
  { label: "Islamabad", href: "/locations/islamabad" },
  { label: "Wazirabad", href: "/locations/wazirabad" },
  { label: "Karachi", href: "/locations/karachi" },
];

const chip =
  "inline-block rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm font-semibold text-charcoal transition-colors hover:border-primary hover:text-primary";

export function ServiceAreas() {
  return (
    <section className="border-t border-border bg-surface-muted/50 py-16 lg:py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Across Pakistan"
            title="Find Us in Your City"
            description="Offices in four cities, and visa and travel help by phone, WhatsApp and online in every city and province."
          />
          <Button href="/travel-agency" variant="outline" size="sm">
            All Cities
          </Button>
        </div>

        <div className="mt-8">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-text-muted">Our offices</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {OFFICES.map((o) => (
              <li key={o.href}>
                <Link href={o.href} className={chip}>Travel agency in {o.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          {provinces
            .filter((p) => cities.some((c) => c.province === p.slug))
            .map((p) => (
              <div key={p.slug}>
                <p className="font-heading text-base font-bold text-charcoal">
                  <Link href={`/travel-agency/${p.slug}`} className="hover:text-primary">{p.name}</Link>
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {cities
                    .filter((c) => c.province === p.slug)
                    .map((c) => (
                      <li key={c.slug}>
                        <Link href={`/travel-agency/${c.slug}`} className={chip}>{c.name}</Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
        </div>
      </Container>
    </section>
  );
}
