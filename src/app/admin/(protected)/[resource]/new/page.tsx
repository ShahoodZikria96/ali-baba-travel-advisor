import { notFound } from "next/navigation";
import { getResource } from "@/lib/admin-resources";
import { AdminForm } from "@/components/admin/AdminForm";

export default async function NewResourcePage({ params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params;
  const config = getResource(resource);
  if (!config) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1d1a19]">Add {config.singularLabel}</h1>
      <div className="mt-6 max-w-2xl rounded-lg border border-[#e5ddd2] bg-white p-6">
        <AdminForm resource={config} apiPath={`/api/admin/${config.key}`} redirectPath={`/admin/${config.key}`} />
      </div>
    </div>
  );
}
