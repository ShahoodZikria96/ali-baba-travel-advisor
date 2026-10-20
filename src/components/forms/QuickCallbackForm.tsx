"use client";

import { useState } from "react";
import { submitLead } from "@/lib/leads";
import { whatsappHref } from "@/lib/whatsapp";
import { Honeypot } from "@/components/forms/FormFields";

/**
 * Two-field "call me back" form for the top of the home page. It deliberately avoids react-hook-form and zod
 * so the home page does not have to download the form libraries; a name and a phone number are all it needs.
 */
export function QuickCallbackForm({ whatsappNumber }: { whatsappNumber: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (name.trim().length < 2) return setError("Please enter your name.");
    if (digits.length < 9) return setError("Please enter a valid phone or WhatsApp number.");
    setError("");
    submitLead("contact", { fullName: name.trim(), phone: phone.trim(), interest: "Free callback request (home page)" });
    setDone(true);
  };

  if (done) {
    return (
      <div className="mt-6 rounded-[var(--radius-md)] border border-success/30 bg-success/5 p-4 text-sm leading-relaxed text-charcoal">
        <p className="font-semibold">Thank you, {name.trim().split(" ")[0]}. We have your number.</p>
        <p className="mt-1 text-text-muted">
          Our team will call you during office hours (Monday to Saturday, 10 AM to 6 PM). For a faster reply, message us on{" "}
          <a
            href={whatsappHref(`Hi, I requested a callback. My name is ${name.trim()}.`, whatsappNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary underline"
          >
            WhatsApp
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-6 rounded-[var(--radius-md)] border border-border bg-surface p-4 shadow-sm">
      <p className="text-sm font-bold text-charcoal">Not sure where to start? Get a free callback.</p>
      <Honeypot />
      <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-[1fr_1fr_auto]">
        <input
          type="text"
          name="fullName"
          autoComplete="name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Your name"
          className="w-full rounded-[var(--radius-sm)] border border-border bg-surface px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted/70 focus:border-primary focus:outline-none"
        />
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          inputMode="tel"
          placeholder="03xx xxxxxxx"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          aria-label="Phone or WhatsApp number"
          className="w-full rounded-[var(--radius-sm)] border border-border bg-surface px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted/70 focus:border-primary focus:outline-none"
        />
        <button
          type="submit"
          className="h-11 rounded-[var(--radius-md)] bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          Call me back
        </button>
      </div>
      {error && <p className="mt-2 text-xs font-medium text-primary">{error}</p>}
      <p className="mt-2 text-xs text-text-muted">Free, no obligation. We call Monday to Saturday, 10 AM to 6 PM.</p>
    </form>
  );
}
