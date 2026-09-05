import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

export interface Crumb {
  label: string;
  href?: string;
}

const baseUrl = "https://www.alibabatraveladvisor.com";

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${baseUrl}${item.href}` } : {}),
    })),
  };

  return (
    <div className="border-b border-border bg-surface-muted/50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Container>
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 py-3 text-xs text-text-muted">
          {items.map((item, i) => (
            <span key={item.label} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={12} className="shrink-0" />}
              {item.href ? (
                <Link href={item.href} className="font-medium hover:text-primary">
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-charcoal">{item.label}</span>
              )}
            </span>
          ))}
        </nav>
      </Container>
    </div>
  );
}
