import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { getDashboardStats } from "@/lib/data/admin-stats";
import { formatDateTime, titleCase, telLink } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const cards = [
    { label: "Total Leads", value: stats.total, accent: "primary" as const },
    { label: "New Leads", value: stats.counts.NEW, accent: "signal" as const },
    { label: "Contacted", value: stats.counts.CONTACTED },
    { label: "Site Visits", value: stats.counts.SITE_VISIT },
    { label: "Quotations Sent", value: stats.counts.QUOTATION_SENT },
    { label: "Won", value: stats.counts.WON, accent: "success" as const },
    { label: "Lost", value: stats.counts.LOST },
    { label: "New Messages", value: stats.newContacts },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-xl font-bold text-navy">Overview</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {stats.recentCount} new leads in the last 30 days.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {cards.map((c) => (
          <StatCard key={c.label} label={c.label} value={c.value} accent={c.accent} />
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-white">
        <div className="flex items-center justify-between border-b border-border p-5">
          <h3 className="font-display text-base font-bold text-navy">Recent Leads</h3>
          <Link
            href="/admin/leads"
            className="flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-800"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-3 font-semibold">Name</th>
                <th className="px-5 py-3 font-semibold">Phone</th>
                <th className="px-5 py-3 font-semibold">City</th>
                <th className="px-5 py-3 font-semibold">Requirement</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-border/70 last:border-0 hover:bg-muted/40">
                  <td className="px-5 py-3">
                    <Link href={`/admin/leads/${lead.id}`} className="font-medium text-navy hover:text-primary-700">
                      {lead.name}
                    </Link>
                  </td>
                  <td className="px-5 py-3">
                    <a href={telLink(lead.phone)} className="flex items-center gap-1.5 text-muted-foreground hover:text-primary-700">
                      <Phone className="h-3.5 w-3.5" /> {lead.phone}
                    </a>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{lead.city}</td>
                  <td className="px-5 py-3 text-muted-foreground">{titleCase(lead.requirementType)}</td>
                  <td className="px-5 py-3"><StatusBadge status={lead.status} /></td>
                  <td className="px-5 py-3 text-muted-foreground">{formatDateTime(lead.createdAt)}</td>
                </tr>
              ))}
              {stats.recentLeads.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-muted-foreground">
                    No leads yet. New website enquiries will appear here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
