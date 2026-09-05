import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/923000000000?text=Hi%20Ali%20Baba%20Travel%20Advisor%2C%20I%20would%20like%20some%20information."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.4)] transition-transform hover:scale-105 lg:flex"
    >
      <MessageCircle size={26} />
    </a>
  );
}
