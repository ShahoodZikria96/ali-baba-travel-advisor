"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { primaryNav } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  return (
    <>
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur transition-shadow",
        scrolled && "shadow-[0_2px_16px_rgba(29,26,25,0.06)]"
      )}
    >
      <Container className="flex items-center justify-between">
        <div
          className={cn(
            "flex items-center justify-between w-full transition-[height] duration-200",
            scrolled ? "h-[68px]" : "h-[88px]"
          )}
        >
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] bg-primary text-lg font-extrabold text-white">
              A
            </span>
            <span className="leading-tight">
              <span className="block font-heading text-[1.05rem] font-bold text-charcoal">
                Ali Baba
              </span>
              <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-muted">
                Travel Advisor
              </span>
            </span>
          </Link>

          <nav className="hidden items-center lg:flex" aria-label="Primary">
            {primaryNav.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.columns && handleEnter(item.label)}
                onMouseLeave={() => item.columns && handleLeave()}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-3.5 py-2 text-[0.92rem] font-semibold text-text hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="flex items-center gap-1 px-3.5 py-2 text-[0.92rem] font-semibold text-text hover:text-primary"
                    aria-expanded={openMenu === item.label}
                  >
                    {item.label}
                    <ChevronDown
                      size={15}
                      className={cn(
                        "transition-transform",
                        openMenu === item.label && "rotate-180"
                      )}
                    />
                  </button>
                )}

                {item.columns && openMenu === item.label && (
                  <div
                    className="absolute left-1/2 top-full z-50 w-[520px] -translate-x-1/2 pt-3"
                    onMouseEnter={() => handleEnter(item.label)}
                    onMouseLeave={handleLeave}
                  >
                    <div className="grid grid-cols-2 gap-6 rounded-[var(--radius-lg)] border border-border bg-surface p-6 shadow-[0_16px_40px_rgba(29,26,25,0.12)]">
                      {item.columns.map((col) => (
                        <div key={col.heading}>
                          <p className="mb-2.5 text-xs font-bold uppercase tracking-[0.1em] text-text-muted">
                            {col.heading}
                          </p>
                          <ul className="space-y-1.5">
                            {col.links.map((link) => (
                              <li key={link.href}>
                                <Link
                                  href={link.href}
                                  className="block rounded-[var(--radius-sm)] px-2 py-1.5 text-sm font-medium text-text hover:bg-surface-muted hover:text-primary"
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    {item.viewAll && (
                      <div className="mt-1 rounded-b-[var(--radius-lg)] border-x border-b border-border bg-surface-muted px-6 py-3">
                        <Link
                          href={item.viewAll.href}
                          className="text-sm font-bold text-primary hover:text-primary-dark"
                        >
                          {item.viewAll.label} →
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="tel:+923000000000"
              className="hidden items-center gap-1.5 rounded-full border border-border p-2.5 text-charcoal hover:border-primary hover:text-primary xl:inline-flex"
              aria-label="Call Ali Baba Travel Advisor"
            >
              <Phone size={17} />
            </a>
            <Button
              href="https://wa.me/923000000000"
              external
              variant="whatsapp"
              size="sm"
              icon={<MessageCircle size={16} />}
              className="hidden sm:inline-flex"
            >
              WhatsApp
            </Button>
            <Button href="/consultation" size="sm" className="hidden sm:inline-flex">
              Book Consultation
            </Button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] text-charcoal hover:bg-surface-muted lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </Container>
    </header>

    <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
