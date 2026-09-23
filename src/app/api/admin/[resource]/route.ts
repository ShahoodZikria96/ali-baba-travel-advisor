import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getResource } from "@/lib/admin-resources";
import { getCurrentAdmin } from "@/lib/auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function delegate(model: string): any {
  return (prisma as unknown as Record<string, unknown>)[model];
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ resource: string }> }) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { resource } = await params;
  const config = getResource(resource);
  if (!config) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });

  const items = await delegate(config.model).findMany({
    orderBy: config.fields.some((f) => f.name === "sortOrder") ? { sortOrder: "asc" } : { createdAt: "desc" },
  });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ resource: string }> }) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { resource } = await params;
  const config = getResource(resource);
  if (!config) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });

  const body = await req.json();
  try {
    const created = await delegate(config.model).create({ data: body });
    revalidatePath("/", "layout");
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Create failed" }, { status: 400 });
  }
}
