import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { clientIp, isSameOrigin, rateLimit } from "@/lib/rate-limit";

const MAX_BODY_BYTES = 10_000;

const payloadSchema = z.object({
  type: z.enum(["visa_assessment", "tour_enquiry", "flight_enquiry", "refusal_case", "contact"]),
  // Flat map of short strings only — no nested objects, no oversized values.
  data: z
    .record(z.string().max(60), z.union([z.string().max(2000), z.number(), z.boolean(), z.null()]))
    .refine((d) => Object.keys(d).length <= 25, "Too many fields"),
  source: z.string().max(255).optional(),
  hp: z.string().max(200).optional(), // honeypot — must be empty for real users
});

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (!rateLimit(`lead:${clientIp(req)}`, 8, 10 * 60_000)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return NextResponse.json({ error: "Payload too large" }, { status: 413 });

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = payloadSchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Invalid lead payload" }, { status: 400 });

  const { type, data, source, hp } = parsed.data;
  // Bots fill the hidden field: pretend success, store nothing.
  if (hp) return NextResponse.json({ success: true }, { status: 201 });

  const lead = await prisma.lead.create({ data: { type, data, source: source ?? null } });
  return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
}
