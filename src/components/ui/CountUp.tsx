"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export function CountUp({ value }: { value: string }) {
  const match = value.match(/^([^\d]*)([\d,]+)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(match ? `${match[1]}0${match[3]}` : value);

  const target = match ? Number(match[2].replace(/,/g, "")) : 0;
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20, mass: 1 });

  useEffect(() => {
    if (isInView && match) motionVal.set(target);
  }, [isInView, target, match, motionVal]);

  useEffect(() => {
    if (!match) return;
    return spring.on("change", (latest) => {
      const rounded = Math.round(latest).toLocaleString("en-US");
      setDisplay(`${match[1]}${rounded}${match[3]}`);
    });
  }, [spring, match]);

  if (!match) return <span>{value}</span>;
  return <span ref={ref}>{display}</span>;
}
