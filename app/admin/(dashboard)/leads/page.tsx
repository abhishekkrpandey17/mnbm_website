import type { Metadata } from "next";
import { Suspense } from "react";
import { LeadsTableClient } from "@/components/admin/LeadsTableClient";

export const metadata: Metadata = { title: "Leads", robots: { index: false, follow: false } };

export default function AdminLeadsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-navy">Leads</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Search, filter and manage all website enquiries.
        </p>
      </div>
      <Suspense fallback={<div className="text-sm text-muted-foreground">Loading...</div>}>
        <LeadsTableClient />
      </Suspense>
    </div>
  );
}
