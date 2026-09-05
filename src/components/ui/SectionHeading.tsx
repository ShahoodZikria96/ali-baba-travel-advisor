import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-[720px]",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary">
          {eyebrow}
        </span>
      )}
      <h2 className="text-[1.75rem] leading-tight font-bold text-charcoal sm:text-[2.1rem] lg:text-[2.4rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-[1.02rem] leading-relaxed text-text-muted">
          {description}
        </p>
      )}
    </div>
  );
}
