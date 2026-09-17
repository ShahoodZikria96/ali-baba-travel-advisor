import { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface-muted/50 py-12 lg:py-16">
      <div aria-hidden className="bg-mesh pointer-events-none absolute inset-0" />
      <div aria-hidden className="bg-dot-grid pointer-events-none absolute inset-0 opacity-[0.05]" />
      <Container className="relative">
        {eyebrow && (
          <span className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary">
            {eyebrow}
          </span>
        )}
        <h1 className="max-w-3xl text-[1.9rem] font-extrabold leading-tight text-charcoal sm:text-[2.3rem] lg:text-[2.6rem]">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-text-muted">
            {description}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}
