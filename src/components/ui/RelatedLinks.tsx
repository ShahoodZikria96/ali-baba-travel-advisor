import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { RelatedLink } from "@/lib/related";

export function RelatedLinks({
  title = "Explore More",
  links,
}: {
  title?: string;
  links: RelatedLink[];
}) {
  if (links.length === 0) return null;
  return (
    <section className="border-t border-border bg-surface-muted/40 py-12">
      <Container>
        <h2 className="font-heading text-xl font-bold text-charcoal">{title}</h2>
        <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group block h-full rounded-[var(--radius-md)] border border-border bg-surface p-4 transition-colors hover:border-primary"
              >
                <span className="flex items-center justify-between gap-2 font-semibold text-charcoal group-hover:text-primary">
                  {l.label}
                  <ArrowRight size={14} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
                </span>
                {l.description && <span className="mt-1 block text-sm text-text-muted">{l.description}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
