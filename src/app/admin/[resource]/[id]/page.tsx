import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getResource } from "@/lib/admin-resources";
import { AdminForm } from "@/components/admin/AdminForm";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function delegate(model: string): any {
  return (prisma as unknown as Record<string, unknown>)[model];
}

export default async function EditResourcePage({
  params,
}: {
  params: Promise<{ resource: string; id: string }>;
}) {
  const { resource, id } = await params;
  const config = getResource(resource);
  if (!config) notFound();

  const item = await delegate(config.model).findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1d1a19]">Edit {config.singularLabel}</h1>
      <div className="mt-6 max-w-2xl rounded-lg border border-[#e5ddd2] bg-white p-6">
        <AdminForm
          resource={config}
          initialValues={item}
          apiPath={`/api/admin/${config.key}/${id}`}
          redirectPath={`/admin/${config.key}`}
        />
      </div>
    </div>
  );
}
