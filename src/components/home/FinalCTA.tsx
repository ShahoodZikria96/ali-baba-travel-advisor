import { MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { getSiteSettings, whatsappHref } from "@/lib/content";

export async function FinalCTA() {
  const settings = await getSiteSettings();

  return (
    <section className="relative overflow-hidden bg-charcoal py-16 lg:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(197,51,65,0.3) 0%, transparent 45%), radial-gradient(circle at 80% 70%, rgba(197,51,65,0.22) 0%, transparent 45%)",
        }}
      />
      <div aria-hidden className="bg-dot-grid pointer-events-none absolute inset-0 opacity-[0.08]" />
      <Container className="relative flex flex-col items-center gap-6 text-center">
        <Reveal className="flex flex-col items-center gap-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-primary-light">
            Talk to a Consultant Today
          </span>
          <h2 className="max-w-2xl text-[1.75rem] font-extrabold leading-tight text-white sm:text-[2.1rem]">
            Ready to Start Your Visa or Travel Consultation?
          </h2>
          <p className="max-w-xl text-white/70">
            Speak with an experienced visa consultant today — by phone, WhatsApp
            or at your nearest office.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button href="/consultation" size="lg" className="shadow-[0_10px_30px_rgba(158,27,38,0.35)]">
              Book Consultation
            </Button>
            <Button
              href={whatsappHref("Hello I want details.", settings.whatsappNumber)}
              external
              variant="whatsapp"
              size="lg"
              icon={<MessageCircle size={18} />}
            >
              Chat on WhatsApp
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
