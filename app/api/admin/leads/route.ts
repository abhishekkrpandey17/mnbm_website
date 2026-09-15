import { NextRequest, NextResponse } from "next/server";
import { Prisma, LeadStatus, RequirementType } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/require-admin";

const PAGE_SIZE = 20;

export async function GET(req: NextRequest) {
  const guard = await requireAdmin();
  if ("error" in guard) return guard.error;

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const search = searchParams.get("search")?.trim();
  const status = searchParams.get("status");
  const city = searchParams.get("city");
  const requirementType = searchParams.get("requirementType");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const sort = searchParams.get("sort") || "createdAt_desc";

  const where: Prisma.LeadWhereInput = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { phone: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { enquiryCode: { contains: search, mode: "insensitive" } },
    ];
  }
  if (status && Object.values(LeadStatus).includes(status as LeadStatus)) {
    where.status = status as LeadStatus;
  }
  if (city) where.city = { equals: city, mode: "insensitive" };
  if (requirementType && Object.values(RequirementType).includes(requirementType as RequirementType)) {
    where.requirementType = requirementType as RequirementType;
  }
  if (from || to) {
    where.createdAt = {
      ...(from ? { gte: new Date(from) } : {}),
      ...(to ? { lte: new Date(`${to}T23:59:59.999Z`) } : {}),
    };
  }

  const [field, direction] = sort.split("_") as [string, "asc" | "desc"];
  const orderBy: Prisma.LeadOrderByWithRelationInput = {
    [field === "name" ? "name" : "createdAt"]: direction === "asc" ? "asc" : "desc",
  };

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy,
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: { assignedTo: { select: { id: true, name: true } } },
    }),
    prisma.lead.count({ where }),
  ]);

  return NextResponse.json({
    leads,
    pagination: { page, pageSize: PAGE_SIZE, total, totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)) },
  });
}
