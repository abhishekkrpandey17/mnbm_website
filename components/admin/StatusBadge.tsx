import { Badge } from "@/components/ui/badge";
import { titleCase } from "@/lib/utils";
import type { LeadStatus } from "@prisma/client";

const statusVariant: Record<LeadStatus, "default" | "outline" | "signal" | "success" | "muted"> = {
  NEW: "signal",
  CONTACTED: "default",
  QUALIFIED: "default",
  SITE_VISIT: "outline",
  QUOTATION_SENT: "outline",
  WON: "success",
  LOST: "muted",
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  return <Badge variant={statusVariant[status]}>{titleCase(status)}</Badge>;
}
