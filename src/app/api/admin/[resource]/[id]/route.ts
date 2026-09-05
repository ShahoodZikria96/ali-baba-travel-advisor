import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getResource } from "@/lib/admin-resources";
import { getCurrentAdmin } from "@/lib/auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function delegate(model: string): any {
  return (prisma as unknown as Record<string, unknown>)[model];
}

type Params = { params: Promise<{ resource: string; id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { resource, id } = await params;
  const config = getResource(resource);
  if (!config) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });

  const item = await delegate(config.model).findUnique({ where: { id } });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req: NextRequest, { params }: Params) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { resource, id } = await params;
  const config = getResource(resource);
  if (!config) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });

  const body = await req.json();
  try {
    const updated = await delegate(config.model).update({ where: { id }, data: body });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Update failed" }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { resource, id } = await params;
  const config = getResource(resource);
  if (!config) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });

  try {
    await delegate(config.model).delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Delete failed" }, { status: 400 });
  }
}
