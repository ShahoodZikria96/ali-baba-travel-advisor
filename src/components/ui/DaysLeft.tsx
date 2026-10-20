"use client";

import { useEffect, useState } from "react";

/** "N days left" until a deadline (end of the given day in Pakistan, UTC+5). Renders nothing until mounted, and nothing after the deadline. */
export function DaysLeft({ until, className }: { until: string; className?: string }) {
  const [text, setText] = useState("");
  useEffect(() => {
    const end = Date.parse(`${until}T18:59:59Z`);
    const ms = end - Date.now();
    if (ms <= 0) return setText("");
    const days = Math.ceil(ms / 86400000);
    setText(days <= 1 ? "Last day to book" : `Only ${days} days left to book`);
  }, [until]);
  if (!text) return null;
  return <span className={className}>{text}</span>;
}
