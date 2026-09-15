import type { Metadata } from "next";
import { ContactsTableClient } from "@/components/admin/ContactsTableClient";

export const metadata: Metadata = { title: "Contact Messages", robots: { index: false, follow: false } };

export default function AdminContactsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-navy">Contact Messages</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          General enquiries submitted through the contact form.
        </p>
      </div>
      <ContactsTableClient />
    </div>
  );
}
