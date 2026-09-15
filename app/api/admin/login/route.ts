import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { loginSchema } from "@/lib/validation";
import { verifyPassword, createAdminSession } from "@/lib/auth";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);

  const ipLimit = checkRateLimit(`login-ip:${ip}`, { limit: 10, windowMs: 15 * 60 * 1000 });
  if (!ipLimit.success) {
    return NextResponse.json(
      { error: "Too many login attempts. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email and password" }, { status: 400 });
  }

  const { email, password } = parsed.data;

  const emailLimit = checkRateLimit(`login-email:${email.toLowerCase()}`, {
    limit: 6,
    windowMs: 15 * 60 * 1000,
  });
  if (!emailLimit.success) {
    return NextResponse.json(
      { error: "Too many login attempts for this account. Please try again later." },
      { status: 429 }
    );
  }

  const genericError = NextResponse.json({ error: "Invalid email or password" }, { status: 401 });

  const admin = await prisma.adminUser.findUnique({ where: { email: email.toLowerCase() } });

  const logAttempt = (success: boolean, adminId?: string) =>
    prisma.loginAttempt.create({
      data: { email: email.toLowerCase(), ipAddress: ip, success, adminId },
    });

  if (!admin || !admin.isActive) {
    await logAttempt(false);
    return genericError;
  }

  const validPassword = await verifyPassword(password, admin.passwordHash);
  if (!validPassword) {
    await logAttempt(false, admin.id);
    return genericError;
  }

  await logAttempt(true, admin.id);
  await createAdminSession(admin, {
    userAgent: req.headers.get("user-agent"),
    ipAddress: ip,
  });

  return NextResponse.json({
    success: true,
    admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role },
  });
}
