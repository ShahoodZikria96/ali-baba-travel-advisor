import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const inputClasses =
  "w-full rounded-[var(--radius-sm)] border border-border bg-surface px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted/70 focus:border-primary focus:outline-none";

export function FieldWrapper({
  label,
  htmlFor,
  error,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-charcoal">
        {label}
      </label>
      {children}
      {error && <span className="text-xs font-medium text-primary">{error}</span>}
    </div>
  );
}

export function TextInput({
  id,
  error,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { id: string; error?: boolean }) {
  return (
    <input
      id={id}
      className={cn(inputClasses, error && "border-primary")}
      {...rest}
    />
  );
}

export function SelectInput({
  id,
  error,
  children,
  ...rest
}: React.SelectHTMLAttributes<HTMLSelectElement> & { id: string; error?: boolean }) {
  return (
    <select id={id} className={cn(inputClasses, "bg-surface", error && "border-primary")} {...rest}>
      {children}
    </select>
  );
}

export function TextArea({
  id,
  error,
  ...rest
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { id: string; error?: boolean }) {
  return (
    <textarea
      id={id}
      rows={4}
      className={cn(inputClasses, "resize-none", error && "border-primary")}
      {...rest}
    />
  );
}

export function FormSuccess({ message }: { message: string }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-success/30 bg-success-tint px-5 py-4 text-sm font-medium text-success">
      {message}
    </div>
  );
}
