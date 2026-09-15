import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";
import { leadNoteSchema } from "@/lib/validation";

interface Params {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, { params }: Params) {
  const guard = await requireAdmin();
  if ("error" in guard) return guard.error;

  const { id } = await params;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = leadNoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Note cannot be empty" }, { status: 400 });
  }

  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

  const note = await prisma.leadNote.create({
    data: { leadId: id, authorId: guard.admin.id, body: parsed.data.body },
    include: { author: { select: { name: true } } },
  });

  await prisma.leadEvent.create({
    data: { leadId: id, type: "NOTE_ADDED", detail: parsed.data.body.slice(0, 120) },
  });

  return NextResponse.json({ note });
}
