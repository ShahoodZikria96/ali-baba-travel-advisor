import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getResource } from "@/lib/admin-resources";
import { AdminTable } from "@/components/admin/AdminTable";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function delegate(model: string): any {
  return (prisma as unknown as Record<string, unknown>)[model];
}

export default async function ResourceListPage({ params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params;
  const config = getResource(resource);
  if (!config) notFound();

  const orderBy = config.fields.some((f) => f.name === "sortOrder")
    ? { sortOrder: "asc" as const }
    : { createdAt: "desc" as const };

  const rows = await delegate(config.model).findMany({ orderBy });

  return <AdminTable resource={config} rows={rows} />;
}
