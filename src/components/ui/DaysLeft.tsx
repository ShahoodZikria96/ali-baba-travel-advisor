"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

function label(until: string): string {
  // End of the given day in Pakistan (UTC+5).
  const ms = Date.parse(`${until}T18:59:59Z`) - Date.now();
  if (ms <= 0) return "";
  const days = Math.ceil(ms / 86400000);
  return days <= 1 ? "Last day to book" : `Only ${days} days left to book`;
}

/** "N days left" until a deadline. Empty on the server and after the deadline, so the static HTML never shows a stale number. */
export function DaysLeft({ until, className }: { until: string; className?: string }) {
  const text = useSyncExternalStore(
    subscribe,
    () => label(until),
    () => ""
  );
  if (!text) return null;
  return <span className={className}>{text}</span>;
}
