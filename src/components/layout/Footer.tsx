import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { offices } from "@/data/offices";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
} from "@/components/ui/SocialIcons";

const footerColumns = [
  {
    heading: "Visa Services",
    links: [
      { label: "Visit Visa", href: "/visa-consultancy/visit-visa" },
      { label: "Business Visa", href: "/visa-consultancy/business-visa" },
      { label: "Family Visit Visa", href: "/visa-consultancy/family-visit-visa" },
      { label: "Study Visa Assistance", href: "/visa-consultancy/study-visa" },
      { label: "Visa Refusal Assistance", href: "/visa-refusal" },
    ],
  },
  {
    heading: "Popular Countries",
    links: [
      { label: "UK Visa", href: "/visas/uk" },
      { label: "Canada Visa", href: "/visas/canada" },
      { label: "USA Visa", href: "/visas/usa" },
      { label: "Schengen Visa", href: "/visas/schengen" },
      { label: "View All Countries", href: "/visas" },
    ],
  },
  {
    heading: "Travel Services",
    links: [
      { label: "Group Tours", href: "/tour-packages/group-tours" },
      { label: "Customized Tours", href: "/tour-packages/customized" },
      { label: "Air Ticketing", href: "/flights" },
      { label: "Hotel Booking", href: "/hotel-booking" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/team" },
      { label: "Success Stories", href: "/success-stories" },
      { label: "Visa & Travel Guides", href: "/guides" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-charcoal text-text-inverse">
      <Container className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-6">
        <div className="sm:col-span-2 lg:col-span-2">
          <Link href="/" className="mb-4 flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] bg-primary text-base font-extrabold text-white">
              A
            </span>
            <span className="font-heading text-base font-bold text-white">
              Ali Baba Travel Advisor
            </span>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-white/65">
            Pakistan&rsquo;s visa consultancy and travel advisory serving individuals,
            families and businesses with professional visa assistance and international
            travel planning.
          </p>
          <div className="mt-5 flex items-center gap-3">
            {[
              { icon: FacebookIcon, label: "Facebook", href: "https://facebook.com" },
              { icon: InstagramIcon, label: "Instagram", href: "https://instagram.com" },
              { icon: YouTubeIcon, label: "YouTube", href: "https://youtube.com" },
              { icon: LinkedInIcon, label: "LinkedIn", href: "https://linkedin.com" },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 hover:border-primary-light hover:text-primary-light"
              >
                <Icon width={16} height={16} />
              </a>
            ))}
          </div>
        </div>

        {footerColumns.map((col) => (
          <div key={col.heading}>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.08em] text-white/50">
              {col.heading}
            </p>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 hover:text-primary-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.08em] text-white/50">
            Offices
          </p>
          <ul className="space-y-2.5">
            {offices.map((office) => (
              <li key={office.slug}>
                <Link
                  href={`/locations/${office.slug}`}
                  className="flex items-start gap-2 text-sm text-white/75 hover:text-primary-light"
                >
                  <MapPin size={14} className="mt-0.5 shrink-0" />
                  {office.city}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-sm text-white/60 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Ali Baba Travel Advisor. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href="tel:+923000000000" className="flex items-center gap-1.5 hover:text-primary-light">
              <Phone size={14} /> +92 300 0000000
            </a>
            <a href="mailto:info@alibabatraveladvisor.com" className="flex items-center gap-1.5 hover:text-primary-light">
              <Mail size={14} /> info@alibabatraveladvisor.com
            </a>
            <Link href="/privacy-policy" className="hover:text-primary-light">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary-light">Terms</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
