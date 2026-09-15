import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";
import { leadUpdateSchema } from "@/lib/validation";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: Params) {
  const guard = await requireAdmin();
  if ("error" in guard) return guard.error;

  const { id } = await params;
  const lead = await prisma.lead.findUnique({
    where: { id },
    include: {
      assignedTo: { select: { id: true, name: true, email: true } },
      notes: { orderBy: { createdAt: "desc" }, include: { author: { select: { name: true } } } },
      events: { orderBy: { createdAt: "asc" } },
    },
  });

  if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  return NextResponse.json({ lead });
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const guard = await requireAdmin();
  if ("error" in guard) return guard.error;

  const { id } = await params;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = leadUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const existing = await prisma.lead.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

  const { status, assignedToId, ...rest } = parsed.data;

  const events: { type: string; detail?: string }[] = [];
  if (status && status !== existing.status) {
    events.push({ type: "STATUS_CHANGE", detail: `${existing.status} → ${status}` });
  }
  if (assignedToId !== undefined && assignedToId !== existing.assignedToId) {
    events.push({
      type: "ASSIGNMENT_CHANGE",
      detail: assignedToId ? `Assigned to admin ${assignedToId}` : "Unassigned",
    });
  }

  const lead = await prisma.lead.update({
    where: { id },
    data: {
      ...rest,
      ...(status ? { status } : {}),
      ...(assignedToId !== undefined ? { assignedToId } : {}),
      ...(events.length ? { events: { create: events } } : {}),
    },
    include: { assignedTo: { select: { id: true, name: true } } },
  });

  return NextResponse.json({ lead });
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const guard = await requireAdmin();
  if ("error" in guard) return guard.error;

  const { id } = await params;
  const existing = await prisma.lead.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

  await prisma.lead.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
