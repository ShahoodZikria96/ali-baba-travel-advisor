import type { Metadata } from "next";
import "./globals.css";
import { fontHeading, fontBody } from "@/lib/fonts";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";

export const metadata: Metadata = {
  title: {
    default: "Ali Baba Travel Advisor | Pakistan's Trusted Visa & Travel Consultancy",
    template: "%s | Ali Baba Travel Advisor",
  },
  description:
    "Professional visa assistance, international tours, flight booking and travel consultancy for individuals, families and businesses across Pakistan.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fontHeading.variable} ${fontBody.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <AnnouncementBar />
        <Header />
        <main className="flex-1 pb-16 lg:pb-0">{children}</main>
        <Footer />
        <StickyMobileCTA />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
