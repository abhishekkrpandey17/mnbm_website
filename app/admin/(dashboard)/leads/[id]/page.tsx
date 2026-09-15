import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLeadDetail, getActiveAdmins } from "@/lib/data/leads";
import { LeadDetailClient } from "@/components/admin/LeadDetailClient";

export const metadata: Metadata = { title: "Lead Details", robots: { index: false, follow: false } };

export default async function AdminLeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [lead, team] = await Promise.all([getLeadDetail(id), getActiveAdmins()]);

  if (!lead) notFound();

  return <LeadDetailClient lead={lead} team={team} />;
}
