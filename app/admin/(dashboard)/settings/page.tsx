import type { Metadata } from "next";
import { getCurrentAdmin } from "@/lib/auth";
import { ChangePasswordForm } from "@/components/admin/ChangePasswordForm";
import { titleCase } from "@/lib/utils";

export const metadata: Metadata = { title: "Settings", robots: { index: false, follow: false } };

export default async function AdminSettingsPage() {
  const admin = await getCurrentAdmin();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-xl font-bold text-navy">Settings</h2>
        <p className="mt-1 text-sm text-muted-foreground">Manage your admin account.</p>
      </div>

      <section className="rounded-2xl border border-border bg-white p-6">
        <h3 className="font-display text-base font-bold text-navy">Profile</h3>
        <dl className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Name</dt>
            <dd className="mt-1 text-sm font-medium text-navy">{admin?.name}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Email</dt>
            <dd className="mt-1 text-sm font-medium text-navy">{admin?.email}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Role</dt>
            <dd className="mt-1 text-sm font-medium text-navy">{admin ? titleCase(admin.role) : ""}</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-2xl border border-border bg-white p-6">
        <h3 className="font-display text-base font-bold text-navy">Change Password</h3>
        <div className="mt-4">
          <ChangePasswordForm />
        </div>
      </section>
    </div>
  );
}
