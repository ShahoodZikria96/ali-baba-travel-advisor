import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { resources } from "@/lib/admin-resources";

export default async function AdminDashboard() {
  const [officeCount, countryCount, tourCount, guideCount, leadCount, newLeadCount] = await Promise.all([
    prisma.office.count(),
    prisma.country.count(),
    prisma.tour.count(),
    prisma.guide.count(),
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "new" } }),
  ]);

  const stats = [
    { label: "Offices", value: officeCount, href: "/admin/offices" },
    { label: "Visa Countries", value: countryCount, href: "/admin/countries" },
    { label: "Tour Packages", value: tourCount, href: "/admin/tours" },
    { label: "Blog Guides", value: guideCount, href: "/admin/guides" },
    { label: "Total Leads", value: leadCount, href: "/admin/leads" },
    { label: "New Leads", value: newLeadCount, href: "/admin/leads" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1d1a19]">Dashboard</h1>
      <p className="mt-1 text-sm text-[#6b625b]">Overview of your site content.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-lg border border-[#e5ddd2] bg-white p-4 hover:border-[#9e1b26]"
          >
            <p className="text-2xl font-bold text-[#1d1a19]">{s.value}</p>
            <p className="mt-1 text-xs font-semibold text-[#6b625b]">{s.label}</p>
          </Link>
        ))}
      </div>

      <h2 className="mt-10 text-lg font-bold text-[#1d1a19]">Manage Content</h2>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {Object.values(resources).map((r) => (
          <Link
            key={r.key}
            href={`/admin/${r.key}`}
            className="rounded-lg border border-[#e5ddd2] bg-white px-4 py-3 text-sm font-semibold text-[#1d1a19] hover:border-[#9e1b26]"
          >
            {r.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
