import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { clientIp, isSameOrigin, rateLimit } from "@/lib/rate-limit";
import { createSessionToken, setSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  // Brute-force protection: 8 attempts per 15 minutes per IP.
  if (!rateLimit(`login:${clientIp(req)}`, 8, 15 * 60_000)) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  }
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.slice(0, 254) : "";
  const password = typeof body?.password === "string" ? body.password.slice(0, 200) : "";

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const admin = await prisma.adminUser.findUnique({ where: { email } });
  if (!admin) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = await createSessionToken({ sub: admin.id, email: admin.email, name: admin.name });
  await setSessionCookie(token);

  return NextResponse.json({ success: true, name: admin.name });
}
