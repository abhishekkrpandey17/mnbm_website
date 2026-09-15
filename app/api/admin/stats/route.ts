import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { getDashboardStats } from "@/lib/data/admin-stats";

export async function GET() {
  const guard = await requireAdmin();
  if ("error" in guard) return guard.error;

  const stats = await getDashboardStats();
  return NextResponse.json(stats);
}
