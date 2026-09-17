import {
  Users,
  Building2,
  ClipboardCheck,
  Globe2,
  Eye,
  Headset,
  Share2,
  FolderKanban,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const reasons = [
  { icon: Users, title: "Experienced Visa Consultants", description: "A team focused specifically on visa documentation and case guidance." },
  { icon: Building2, title: "Multiple Offices in Pakistan", description: "Walk-in consultations available across our branch network." },
  { icon: ClipboardCheck, title: "Personalized Case Assessment", description: "Every application is reviewed against its own individual circumstances." },
  { icon: Globe2, title: "International Travel Expertise", description: "Tours, flights and hotel bookings alongside visa consultancy." },
  { icon: Eye, title: "Transparent Process", description: "Clear guidance on requirements, timelines and next steps." },
  { icon: Headset, title: "Dedicated Customer Support", description: "Support available by phone, WhatsApp and in person." },
  { icon: Share2, title: "Active Social Media Community", description: "Regular visa updates shared across YouTube and social channels." },
  { icon: FolderKanban, title: "Structured Documentation Support", description: "A clear checklist-driven approach to preparing your file." },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="Why Ali Baba Travel Advisor"
          title="Built on Experience, Not Promises"
          description="We focus on transparent guidance and thorough documentation rather than guaranteed outcomes."
        />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="card-hover rounded-[var(--radius-lg)] border border-border bg-surface p-5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] bg-primary-tint text-primary">
                <reason.icon size={18} />
              </span>
              <p className="mt-3 font-heading text-[0.98rem] font-bold text-charcoal">
                {reason.title}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
