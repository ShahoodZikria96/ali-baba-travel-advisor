import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/lib/whatsapp";

export function FloatingWhatsApp({ whatsappNumber }: { whatsappNumber: string }) {
  return (
    <a
      href={whatsappHref("Hello I want details.", whatsappNumber)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.4)] transition-transform hover:scale-105 lg:flex"
    >
      <MessageCircle size={26} />
    </a>
  );
}
