"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { primaryNav, type NavItem } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { telHref, whatsappHref } from "@/lib/whatsapp";

function isItemActive(item: NavItem, pathname: string) {
  if (item.href) return item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
  if (item.columns) {
    const links = item.columns.flatMap((c) => c.links).map((l) => l.href);
    if (item.viewAll) links.push(item.viewAll.href);
    return links.some((href) => pathname.startsWith(href));
  }
  return false;
}

export function Header({ phone, whatsappNumber }: { phone: string; whatsappNumber: string }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
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
    setHovered(label);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  return (
    <>
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border bg-surface/90 backdrop-blur-md transition-shadow",
        scrolled && "shadow-[0_4px_24px_rgba(29,26,25,0.08)]"
      )}
    >
      {scrolled && (
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        />
      )}
      <Container className="flex items-center justify-between">
        <div
          className={cn(
            "flex items-center justify-between w-full transition-[height] duration-200",
            scrolled ? "h-[64px]" : "h-[84px]"
          )}
        >
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/brand/logo.webp"
              alt="Ali Baba Travel Advisor"
              width={150}
              height={150}
              priority
              className={cn(
                "w-auto object-contain transition-[height] duration-200",
                scrolled ? "h-11" : "h-14"
              )}
            />
          </Link>

          <nav
            className="hidden items-center xl:flex"
            aria-label="Primary"
            onMouseLeave={() => setHovered(null)}
          >
            {primaryNav.map((item) => {
              const active = isItemActive(item, pathname);
              const showIndicator = hovered ? hovered === item.label : active;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => (item.columns ? handleEnter(item.label) : setHovered(item.label))}
                  onMouseLeave={() => item.columns && handleLeave()}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-1 whitespace-nowrap px-2.5 py-2 text-[0.88rem] font-semibold transition-colors",
                        active ? "text-primary" : "text-text hover:text-primary"
                      )}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className={cn(
                        "flex items-center gap-1 whitespace-nowrap px-2.5 py-2 text-[0.88rem] font-semibold transition-colors",
                        active ? "text-primary" : "text-text hover:text-primary"
                      )}
                      aria-expanded={openMenu === item.label}
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={cn("transition-transform", openMenu === item.label && "rotate-180")}
                      />
                    </button>
                  )}

                  {showIndicator && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-2.5 -bottom-[1px] h-[2px] rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}

                  <AnimatePresence>
                    {item.columns && openMenu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-1/2 top-full z-50 w-[520px] -translate-x-1/2 pt-3"
                        onMouseEnter={() => handleEnter(item.label)}
                        onMouseLeave={handleLeave}
                      >
                        <div className="absolute inset-x-0 top-3 -z-10 h-24 rounded-[var(--radius-lg)] bg-gradient-to-b from-primary/[0.06] to-transparent" />
                        <div className="grid grid-cols-2 gap-6 rounded-[var(--radius-lg)] border border-border bg-surface p-6 shadow-[0_20px_50px_rgba(29,26,25,0.14)]">
                          {item.columns.map((col) => (
                            <div key={col.heading}>
                              <p className="mb-2.5 text-xs font-bold uppercase tracking-[0.1em] text-primary/80">
                                {col.heading}
                              </p>
                              <ul className="space-y-1">
                                {col.links.map((link) => (
                                  <li key={link.href}>
                                    <Link
                                      href={link.href}
                                      className="group flex items-center gap-1.5 rounded-[var(--radius-sm)] px-2 py-1.5 text-sm font-medium text-text transition-colors hover:bg-surface-muted hover:text-primary"
                                    >
                                      <span className="h-1 w-1 shrink-0 rounded-full bg-border transition-colors group-hover:bg-primary" />
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
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={telHref(phone)}
              className="hidden items-center gap-1.5 rounded-full border border-border p-2.5 text-charcoal transition-colors hover:border-primary hover:text-primary 2xl:inline-flex"
              aria-label="Call Ali Baba Travel Advisor"
            >
              <Phone size={17} />
            </a>
            <Button
              href={whatsappHref("Hi Ali Baba Travel Advisor, I need visa information.", whatsappNumber)}
              external
              variant="whatsapp"
              size="sm"
              icon={<MessageCircle size={16} />}
              className="hidden sm:inline-flex"
            >
              WhatsApp
            </Button>
            <Button
              href="/consultation"
              size="sm"
              className="hidden shadow-[0_8px_20px_rgba(158,27,38,0.25)] sm:inline-flex"
            >
              Book Consultation
            </Button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] text-charcoal hover:bg-surface-muted xl:hidden"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </Container>
    </header>

    <MobileMenu
      open={mobileOpen}
      onClose={() => setMobileOpen(false)}
      phone={phone}
      whatsappNumber={whatsappNumber}
    />
    </>
  );
}
