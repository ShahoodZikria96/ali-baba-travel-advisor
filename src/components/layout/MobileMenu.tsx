"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MessageCircle, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { primaryNav } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { telHref, whatsappHref } from "@/lib/whatsapp";

export function MobileMenu({
  open,
  onClose,
  phone,
  whatsappNumber,
}: {
  open: boolean;
  onClose: () => void;
  phone: string;
  whatsappNumber: string;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] xl:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-charcoal/50 backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col bg-surface shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <span className="font-heading text-base font-bold text-charcoal">Menu</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="rounded-full p-2 hover:bg-surface-muted"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-3">
              {primaryNav.map((item) => {
                const active = item.href
                  ? item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href)
                  : false;
                return (
                  <div key={item.label} className="border-b border-border/70 last:border-none">
                    {item.columns ? (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setExpanded(expanded === item.label ? null : item.label)
                          }
                          className="flex w-full items-center justify-between px-2.5 py-3.5 text-[0.95rem] font-semibold text-charcoal"
                          aria-expanded={expanded === item.label}
                        >
                          {item.label}
                          <ChevronDown
                            size={18}
                            className={cn(
                              "transition-transform",
                              expanded === item.label && "rotate-180"
                            )}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {expanded === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="pb-3 pl-3.5">
                                {item.columns.map((col) => (
                                  <div key={col.heading} className="mb-3 last:mb-0">
                                    <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.08em] text-text-muted">
                                      {col.heading}
                                    </p>
                                    <ul className="space-y-0.5">
                                      {col.links.map((link) => (
                                        <li key={link.href}>
                                          <Link
                                            href={link.href}
                                            onClick={onClose}
                                            className="block rounded-[var(--radius-sm)] px-2 py-2 text-sm font-medium text-text hover:bg-surface-muted"
                                          >
                                            {link.label}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                                {item.viewAll && (
                                  <Link
                                    href={item.viewAll.href}
                                    onClick={onClose}
                                    className="mt-1 block px-2 py-2 text-sm font-bold text-primary"
                                  >
                                    {item.viewAll.label} →
                                  </Link>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href ?? "#"}
                        onClick={onClose}
                        className={cn(
                          "flex items-center gap-2 px-2.5 py-3.5 text-[0.95rem] font-semibold",
                          active ? "text-primary" : "text-charcoal"
                        )}
                      >
                        {active && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                        {item.label}
                      </Link>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="space-y-2.5 border-t border-border p-4">
              <Button href="/consultation" className="w-full" onClick={onClose}>
                Book Consultation
              </Button>
              <div className="grid grid-cols-2 gap-2.5">
                <Button
                  href={telHref(phone)}
                  variant="outline"
                  icon={<Phone size={16} />}
                >
                  Call Us
                </Button>
                <Button
                  href={whatsappHref("Hello I want details.", whatsappNumber)}
                  external
                  variant="whatsapp"
                  icon={<MessageCircle size={16} />}
                >
                  WhatsApp
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
