import { MessageSquareText, ClipboardCheck, FolderCheck, SendHorizontal } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    icon: MessageSquareText,
    title: "Tell Us Your Travel Goal",
    description: "Share your destination, purpose and travel timeline with our consultants.",
  },
  {
    icon: ClipboardCheck,
    title: "Get Your Case Assessed",
    description: "We review your profile and advise on the most suitable visa category.",
  },
  {
    icon: FolderCheck,
    title: "Prepare Your Documents",
    description: "Our team guides you through the required documentation checklist.",
  },
  {
    icon: SendHorizontal,
    title: "Submit & Track Your Application",
    description: "We assist with submission and keep you updated on your case status.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-y border-border bg-surface-muted/60 py-16 lg:py-20">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Our Process"
          title="How It Works"
          className="mx-auto"
        />

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                  <step.icon size={20} />
                </span>
                <span className="font-heading text-2xl font-extrabold text-border">
                  0{index + 1}
                </span>
              </div>
              <p className="mt-4 font-heading text-base font-bold text-charcoal">
                {step.title}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-xs leading-relaxed text-text-muted">
          Visa decisions are made solely by the relevant embassy, consulate or
          immigration authority. Ali Baba Travel Advisor provides consultancy
          and documentation assistance and does not guarantee visa approval.
        </p>
      </Container>
    </section>
  );
}
