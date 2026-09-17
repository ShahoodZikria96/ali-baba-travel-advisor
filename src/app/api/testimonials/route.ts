import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, location, rating, text } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 80) {
    return NextResponse.json({ error: "Enter a valid name" }, { status: 400 });
  }
  if (typeof location !== "string" || location.trim().length < 2 || location.trim().length > 60) {
    return NextResponse.json({ error: "Enter a valid city" }, { status: 400 });
  }
  const ratingNum = Number(rating);
  if (!Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
    return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
  }
  if (typeof text !== "string" || text.trim().length < 15 || text.trim().length > 1000) {
    return NextResponse.json({ error: "Review must be between 15 and 1000 characters" }, { status: 400 });
  }

  const testimonial = await prisma.testimonial.create({
    data: {
      name: name.trim(),
      location: location.trim(),
      rating: ratingNum,
      text: text.trim(),
      published: false,
    },
  });

  return NextResponse.json({ success: true, id: testimonial.id }, { status: 201 });
}
