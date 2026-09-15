import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { leadFormSchema } from "@/lib/validation";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { generateEnquiryCode } from "@/lib/utils";
import { sendLeadNotificationEmail, sendLeadConfirmationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);

  const rateLimit = checkRateLimit(`lead:${ip}`, { limit: 6, windowMs: 10 * 60 * 1000 });
  if (!rateLimit.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = leadFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  // Honeypot tripped — silently accept without creating a lead so bots don't learn.
  if (parsed.data.website) {
    return NextResponse.json({ success: true, enquiryCode: "MB-0000-000000" });
  }

  const { website: _honeypot, ...data } = parsed.data;

  let lead;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const enquiryCode = await generateEnquiryCode();
      lead = await prisma.lead.create({
        data: {
          ...data,
          enquiryCode,
          events: { create: { type: "CREATED", detail: "Enquiry submitted via website" } },
        },
      });
      break;
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2002" &&
        attempt < 2
      ) {
        continue; // enquiry code collision — retry with a fresh sequence number
      }
      console.error("[api/leads] Failed to create lead", err);
      return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
    }
  }

  if (!lead) {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }

  void sendLeadNotificationEmail(lead);
  void sendLeadConfirmationEmail(lead);

  return NextResponse.json({ success: true, enquiryCode: lead.enquiryCode });
}
