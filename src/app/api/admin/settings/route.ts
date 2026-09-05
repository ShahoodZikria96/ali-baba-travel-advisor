import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET() {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const settings = await prisma.siteSettings.findUnique({ where: { id: "main" } });
  return NextResponse.json(settings);
}

export async function PUT(req: NextRequest) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  delete body.id;
  delete body.updatedAt;

  const updated = await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: body,
    create: { id: "main", ...body },
  });
  return NextResponse.json(updated);
}
