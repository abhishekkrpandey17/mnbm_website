import "server-only";
import { prisma } from "@/lib/db";
import { LeadStatus } from "@prisma/client";

export async function getDashboardStats() {
  const [total, byStatus, recentLeads, newContacts] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
      select: {
        id: true,
        name: true,
        phone: true,
        city: true,
        status: true,
        requirementType: true,
        createdAt: true,
      },
    }),
    prisma.contactMessage.count({ where: { status: "NEW" } }),
  ]);

  const counts = Object.fromEntries(
    Object.values(LeadStatus).map((s) => [s, 0])
  ) as Record<LeadStatus, number>;

  for (const row of byStatus) {
    counts[row.status] = row._count._all;
  }

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const recentCount = await prisma.lead.count({ where: { createdAt: { gte: thirtyDaysAgo } } });

  return { total, counts, recentCount, recentLeads, newContacts };
}

export type DashboardStats = Awaited<ReturnType<typeof getDashboardStats>>;
