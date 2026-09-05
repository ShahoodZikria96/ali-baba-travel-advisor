"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ResourceConfig } from "@/lib/admin-resources";

type Values = Record<string, unknown>;

function toDateInputValue(value: unknown) {
  if (!value) return "";
  const d = new Date(value as string);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

function toJsonText(value: unknown) {
  if (value === undefined || value === null) return "";
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return "";
  }
}

export function AdminForm({
  resource,
  initialValues,
  apiPath,
  redirectPath,
}: {
  resource: ResourceConfig;
  initialValues?: Values;
  apiPath: string;
  redirectPath: string;
}) {
  const router = useRouter();
  const [values, setValues] = useState<Values>(() => {
    const base: Values = {};
    for (const field of resource.fields) {
      const raw = initialValues?.[field.name];
      if (field.type === "json") base[field.name] = toJsonText(raw);
      else if (field.type === "date") base[field.name] = toDateInputValue(raw);
      else if (field.type === "boolean") base[field.name] = raw ?? false;
      else base[field.name] = raw ?? "";
    }
    return base;
  });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const isEdit = Boolean(initialValues);

  const setField = (name: string, value: unknown) => setValues((v) => ({ ...v, [name]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      const payload: Values = {};
      for (const field of resource.fields) {
        const raw = values[field.name];
        if (field.type === "json") {
          if (typeof raw === "string" && raw.trim() === "") {
            payload[field.name] = null;
          } else {
            try {
              payload[field.name] = JSON.parse(raw as string);
            } catch {
              throw new Error(`"${field.label}" is not valid JSON`);
            }
          }
        } else if (field.type === "number") {
          payload[field.name] = raw === "" ? null : Number(raw);
        } else if (field.type === "date") {
          payload[field.name] = raw ? new Date(raw as string).toISOString() : null;
        } else if (field.type === "boolean") {
          payload[field.name] = Boolean(raw);
        } else {
          payload[field.name] = raw === "" ? null : raw;
        }
      }

      const res = await fetch(apiPath, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Save failed");
      }

      router.push(redirectPath);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {resource.fields.map((field) => (
        <div key={field.name} className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#1d1a19]">
            {field.label}
            {field.required && <span className="text-[#9e1b26]"> *</span>}
          </label>

          {field.type === "textarea" || field.type === "json" ? (
            <textarea
              value={values[field.name] as string}
              onChange={(e) => setField(field.name, e.target.value)}
              required={field.required}
              rows={field.type === "json" ? 6 : 4}
              placeholder={field.placeholder}
              className="rounded-md border border-[#e5ddd2] px-3 py-2 font-mono text-xs leading-relaxed focus:border-[#9e1b26] focus:outline-none"
              style={field.type !== "json" ? { fontFamily: "inherit", fontSize: "0.875rem" } : undefined}
            />
          ) : field.type === "boolean" ? (
            <label className="flex items-center gap-2 text-sm text-[#3a3532]">
              <input
                type="checkbox"
                checked={Boolean(values[field.name])}
                onChange={(e) => setField(field.name, e.target.checked)}
              />
              Enabled
            </label>
          ) : field.type === "select" ? (
            <select
              value={values[field.name] as string}
              onChange={(e) => setField(field.name, e.target.value)}
              required={field.required}
              className="rounded-md border border-[#e5ddd2] px-3 py-2 text-sm focus:border-[#9e1b26] focus:outline-none"
            >
              <option value="">Select...</option>
              {field.options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
              value={values[field.name] as string}
              onChange={(e) => setField(field.name, e.target.value)}
              required={field.required}
              placeholder={field.placeholder}
              className="rounded-md border border-[#e5ddd2] px-3 py-2 text-sm focus:border-[#9e1b26] focus:outline-none"
            />
          )}

          {field.helpText && <p className="text-xs text-[#6b625b]">{field.helpText}</p>}
        </div>
      ))}

      {error && <p className="text-sm font-medium text-[#9e1b26]">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-[#9e1b26] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#7a141c] disabled:opacity-50"
        >
          {saving ? "Saving..." : isEdit ? "Save Changes" : "Create"}
        </button>
        <button
          type="button"
          onClick={() => router.push(redirectPath)}
          className="rounded-md border border-[#e5ddd2] px-5 py-2.5 text-sm font-semibold text-[#3a3532] hover:bg-[#f1ece4]"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
