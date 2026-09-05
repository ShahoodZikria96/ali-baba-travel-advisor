"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { resources } from "@/lib/admin-resources";
import { LogOut, LayoutDashboard, Settings } from "lucide-react";

export function AdminSidebar({ adminName }: { adminName: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const linkClass = (href: string) =>
    `block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      pathname === href || pathname.startsWith(href + "/")
        ? "bg-[#9e1b26] text-white"
        : "text-[#3a3532] hover:bg-[#f1ece4]"
    }`;

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-[#e5ddd2] bg-white">
      <div className="border-b border-[#e5ddd2] px-5 py-5">
        <p className="font-bold text-[#1d1a19]">Ali Baba Admin</p>
        <p className="mt-0.5 text-xs text-[#6b625b]">Signed in as {adminName}</p>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <Link href="/admin" className={linkClass("/admin")}>
          <span className="flex items-center gap-2">
            <LayoutDashboard size={15} /> Dashboard
          </span>
        </Link>
        <Link href="/admin/settings" className={linkClass("/admin/settings")}>
          <span className="flex items-center gap-2">
            <Settings size={15} /> Site Settings
          </span>
        </Link>

        <p className="mt-4 px-3 text-[0.68rem] font-bold uppercase tracking-wide text-[#6b625b]">Content</p>
        {Object.values(resources).map((r) => (
          <Link key={r.key} href={`/admin/${r.key}`} className={linkClass(`/admin/${r.key}`)}>
            {r.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-[#e5ddd2] p-3">
        <button
          onClick={logout}
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-[#3a3532] hover:bg-[#f1ece4]"
        >
          <LogOut size={15} /> Sign Out
        </button>
      </div>
    </aside>
  );
}
