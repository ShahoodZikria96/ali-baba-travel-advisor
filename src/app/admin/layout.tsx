import type { ReactNode } from "react";
import { getCurrentAdmin } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata = { title: "Admin — Ali Baba Travel Advisor" };

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const admin = await getCurrentAdmin();

  // The /admin/login page itself is not wrapped by this check because
  // middleware already redirects unauthenticated users away from every
  // other /admin/* route before this layout renders.
  if (!admin) {
    return <div className="min-h-screen bg-[#f5f2ee]">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-[#f5f2ee]">
      <AdminSidebar adminName={admin.name} />
      <main className="flex-1 overflow-x-auto p-8">{children}</main>
    </div>
  );
}
