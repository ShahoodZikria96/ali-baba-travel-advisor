import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "main" } });
  return NextResponse.json(settings);
}

export async function PUT(req: NextRequest) {
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
