import { MessageCircle, Phone, CalendarCheck } from "lucide-react";
import Link from "next/link";

export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/97 backdrop-blur pb-[env(safe-area-inset-bottom)] lg:hidden">
      <div className="grid grid-cols-3 divide-x divide-border">
        <a
          href="tel:+923000000000"
          className="flex flex-col items-center gap-0.5 py-2.5 text-[0.7rem] font-semibold text-charcoal"
        >
          <Phone size={18} className="text-charcoal" />
          Call
        </a>
        <a
          href="https://wa.me/923000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-0.5 bg-[#25D366] py-2.5 text-[0.7rem] font-semibold text-white"
        >
          <MessageCircle size={18} />
          WhatsApp
        </a>
        <Link
          href="/consultation"
          className="flex flex-col items-center gap-0.5 bg-primary py-2.5 text-[0.7rem] font-semibold text-white"
        >
          <CalendarCheck size={18} />
          Free Assessment
        </Link>
      </div>
    </div>
  );
}
