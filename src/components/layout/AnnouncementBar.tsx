"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";

const message = {
  text: "Now offering visa case reviews for previously refused applicants.",
  href: "/visa-refusal",
  cta: "Learn more",
};

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative bg-charcoal text-text-inverse">
      <div className="mx-auto flex max-w-[1280px] items-center justify-center gap-2 px-10 py-2 text-center text-[0.8rem] sm:text-sm">
        <p>
          {message.text}{" "}
          <Link href={message.href} className="font-semibold underline underline-offset-2 hover:text-primary-light">
            {message.cta}
          </Link>
        </p>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-text-inverse/70 hover:bg-white/10 hover:text-text-inverse"
      >
        <X size={14} />
      </button>
    </div>
  );
}
