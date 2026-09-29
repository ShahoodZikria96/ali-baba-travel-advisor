/**
 * Renders a partner/affiliate recommendation box on guide pages, with the
 * mandatory disclosure. Empty until real partner links are supplied via
 * src/data/partners.ts, so nothing misleading ever renders by default.
 */
import { partners } from "@/data/partners";

export function AffiliateNotice({ topic }: { topic: "hotels" | "flights" | "insurance" }) {
  const items = partners.filter((p) => p.topic === topic && p.href);
  if (items.length === 0) return null;
  return (
    <aside className="my-8 rounded-[var(--radius-md)] border border-border bg-surface p-5">
      <p className="text-sm font-bold text-charcoal">Helpful partner resources</p>
      <ul className="mt-2 space-y-1.5 text-sm">
        {items.map((p) => (
          <li key={p.href}>
            <a href={p.href} target="_blank" rel="sponsored noopener noreferrer" className="font-semibold text-primary hover:text-primary-dark">
              {p.label} ↗
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-text-muted">
        Disclosure: we may earn a commission if you buy through these links, at no extra cost to you. It does not
        influence our visa advice.
      </p>
    </aside>
  );
}
