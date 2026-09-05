import { MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="bg-charcoal py-16 lg:py-20">
      <Container className="flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-2xl text-[1.75rem] font-extrabold leading-tight text-white sm:text-[2.1rem]">
          Ready to Start Your Visa or Travel Consultation?
        </h2>
        <p className="max-w-xl text-white/70">
          Speak with an experienced visa consultant today — by phone, WhatsApp
          or at your nearest office.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button href="/consultation" size="lg">
            Book Consultation
          </Button>
          <Button
            href="https://wa.me/923000000000"
            external
            variant="whatsapp"
            size="lg"
            icon={<MessageCircle size={18} />}
          >
            Chat on WhatsApp
          </Button>
        </div>
      </Container>
    </section>
  );
}
