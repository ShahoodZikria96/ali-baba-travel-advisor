import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "whatsapp";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark active:bg-primary-dark shadow-sm",
  secondary:
    "bg-charcoal text-white hover:bg-charcoal-soft active:bg-charcoal-soft",
  outline:
    "border border-border bg-surface text-text hover:border-primary hover:text-primary",
  ghost: "text-text hover:bg-surface-muted",
  whatsapp: "bg-[#25D366] text-white hover:bg-[#1ebc59]",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-11 px-5 text-[0.95rem] gap-2",
  lg: "h-12 px-7 text-base gap-2",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = BaseProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof BaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof BaseProps> & {
    href: string;
    external?: boolean;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    icon,
    iconPosition = "left",
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    "inline-flex items-center justify-center rounded-[var(--radius-md)] font-semibold transition-colors duration-150 whitespace-nowrap",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    "disabled:opacity-50 disabled:pointer-events-none",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className="shrink-0" aria-hidden>
          {icon}
        </span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="shrink-0" aria-hidden>
          {icon}
        </span>
      )}
    </>
  );

  if ("href" in props && props.href) {
    const { href, external, ...linkRest } = rest as Omit<
      ButtonAsLink,
      keyof BaseProps
    >;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...linkRest}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ComponentPropsWithoutRef<"button">)}>
      {content}
    </button>
  );
}
