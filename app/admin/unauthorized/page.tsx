import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Unauthorized", robots: { index: false, follow: false } };

export default function AdminUnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
        <ShieldAlert className="h-7 w-7" />
      </span>
      <h1 className="mt-5 font-display text-2xl font-extrabold text-navy">Access Restricted</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Your admin account doesn&apos;t have permission to view this page. Contact a super admin
        if you believe this is a mistake.
      </p>
      <Button asChild className="mt-6">
        <Link href="/admin">Back to Dashboard</Link>
      </Button>
    </div>
  );
}
