import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { refusalServices } from "@/data/services";

export function RefusalAssistance() {
  return (
    <section className="py-16 lg:py-20">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <SectionHeading
            eyebrow="Complex &amp; Refused Cases"
            title="Previously Refused? Get Your Case Reviewed."
            description="Our consultants regularly assist applicants who have received a previous visa refusal, helping assess the refusal grounds and plan a stronger reapplication."
          />
          <div className="mt-6">
            <Button href="/visa-refusal">Discuss My Case</Button>
          </div>
          <p className="mt-5 max-w-md text-xs leading-relaxed text-text-muted">
            Ali Baba Travel Advisor provides visa consultancy and documentation
            assistance. Where formal legal representation is required, such as
            judicial review proceedings, we coordinate with qualified legal
            counsel — this is distinct from regulated legal representation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {refusalServices.map((item) => (
            <div
              key={item.slug}
              className="rounded-[var(--radius-md)] border border-border bg-surface p-5"
            >
              <p className="font-heading text-[0.98rem] font-bold text-charcoal">
                {item.title}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
