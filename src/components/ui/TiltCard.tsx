"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Subtle 3D tilt + glare on mouse hover. Plain pointer events and CSS
 * transitions (no animation library); touch and pen input are ignored.
 */
export function TiltCard({
  children,
  className,
  glare = true,
  strength = 10,
}: {
  children: ReactNode;
  className?: string;
  glare?: boolean;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(800px) rotateX(${(0.5 - py) * 2 * strength}deg) rotateY(${(px - 0.5) * 2 * strength}deg)`;
      el.style.setProperty("--gx", `${px * 100}%`);
      el.style.setProperty("--gy", `${py * 100}%`);
    });
  }

  function handleLeave() {
    cancelAnimationFrame(frame.current);
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ transformStyle: "preserve-3d" }}
      className={cn("relative transition-transform duration-200 ease-out", className)}
    >
      {children}
      {glare && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: "radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.35), transparent 55%)",
          }}
        />
      )}
    </div>
  );
}
