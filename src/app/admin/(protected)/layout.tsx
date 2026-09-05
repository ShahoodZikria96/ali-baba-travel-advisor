import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata = { title: "Admin — Ali Baba Travel Advisor" };

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const admin = await getCurrentAdmin();

  // Proxy already performs an optimistic (JWT-only) redirect for unauthenticated
  // requests, but per Next.js guidance that check must not be the sole
  // authorization layer — this re-verifies the session before rendering.
  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-[#f5f2ee]">
      <AdminSidebar adminName={admin.name} />
      <main className="flex-1 overflow-x-auto p-8">{children}</main>
    </div>
  );
}
