"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import type { ResourceConfig } from "@/lib/admin-resources";

type Row = Record<string, unknown> & { id: string };

function formatCell(value: unknown) {
  if (value === null || value === undefined) return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (value instanceof Date) return value.toLocaleDateString();
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    return new Date(value).toLocaleDateString();
  }
  if (typeof value === "object") return JSON.stringify(value).slice(0, 60);
  return String(value).slice(0, 80);
}

export function AdminTable({ resource, rows }: { resource: ResourceConfig; rows: Row[] }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  const onDelete = async (id: string) => {
    if (!confirm(`Delete this ${resource.singularLabel.toLowerCase()}? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/${resource.key}/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Delete failed");
      }
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1d1a19]">{resource.label}</h1>
        <Link
          href={`/admin/${resource.key}/new`}
          className="flex items-center gap-1.5 rounded-md bg-[#9e1b26] px-4 py-2 text-sm font-bold text-white hover:bg-[#7a141c]"
        >
          <Plus size={15} /> Add {resource.singularLabel}
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-[#e5ddd2] bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[#e5ddd2] bg-[#f5f2ee] text-xs font-bold uppercase tracking-wide text-[#6b625b]">
            <tr>
              {resource.listColumns.map((col) => (
                <th key={col} className="px-4 py-3">
                  {col}
                </th>
              ))}
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5ddd2]">
            {rows.length === 0 && (
              <tr>
                <td colSpan={resource.listColumns.length + 1} className="px-4 py-8 text-center text-[#6b625b]">
                  No {resource.label.toLowerCase()} yet.
                </td>
              </tr>
            )}
            {rows.map((row) => (
              <tr key={row.id}>
                {resource.listColumns.map((col) => (
                  <td key={col} className="px-4 py-3 text-[#3a3532]">
                    {formatCell(row[col])}
                  </td>
                ))}
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/${resource.key}/${row.id}`}
                      className="flex items-center gap-1 rounded-md border border-[#e5ddd2] px-2.5 py-1.5 text-xs font-semibold text-[#3a3532] hover:border-[#9e1b26]"
                    >
                      <Pencil size={12} /> Edit
                    </Link>
                    <button
                      onClick={() => onDelete(row.id)}
                      disabled={deleting === row.id}
                      className="flex items-center gap-1 rounded-md border border-[#e5ddd2] px-2.5 py-1.5 text-xs font-semibold text-[#9e1b26] hover:bg-[#fbebec] disabled:opacity-50"
                    >
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
