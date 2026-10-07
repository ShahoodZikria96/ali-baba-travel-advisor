import type { ReactNode } from "react";

/** Minimal layout for ad landing pages: no site menu or footer, so the only things to do are enquire or message us. */
export default function LandingLayout({ children }: { children: ReactNode }) {
  return <main className="flex-1 bg-surface-muted/40 pb-24 lg:pb-0">{children}</main>;
}
