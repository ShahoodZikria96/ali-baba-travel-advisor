import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VALID_TYPES = ["visa_assessment", "tour_enquiry", "flight_enquiry", "refusal_case", "contact"];

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { type, data, source } = body;

  if (!type || !VALID_TYPES.includes(type) || !data || typeof data !== "object") {
    return NextResponse.json({ error: "Invalid lead payload" }, { status: 400 });
  }

  const lead = await prisma.lead.create({
    data: { type, data, source: typeof source === "string" ? source.slice(0, 255) : null },
  });

  return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
}
