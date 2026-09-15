"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Phone,
  Mail,
  MessageCircle,
  Trash2,
  Pencil,
  Save,
  X,
  Clock,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "./StatusBadge";
import { leadStatusValues } from "@/lib/validation";
import { formatDateTime, telLink, whatsappLink, titleCase } from "@/lib/utils";
import type { LeadDetail } from "@/lib/data/leads";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function LeadDetailClient({
  lead: initialLead,
  team,
}: {
  lead: LeadDetail;
  team: TeamMember[];
}) {
  const router = useRouter();
  const [lead, setLead] = useState(initialLead);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: lead.name,
    email: lead.email ?? "",
    phone: lead.phone,
    company: lead.company ?? "",
    city: lead.city,
    area: lead.area ?? "",
    propertySize: lead.propertySize ?? "",
    message: lead.message ?? "",
  });
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [addingNote, setAddingNote] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const patch = async (data: Record<string, unknown>) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const json = await res.json();
        setLead((prev) => ({ ...prev, ...json.lead }));
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  };

  const saveEdits = async () => {
    await patch({
      name: form.name,
      email: form.email || null,
      phone: form.phone,
      company: form.company || null,
      city: form.city,
      area: form.area || null,
      propertySize: form.propertySize || null,
      message: form.message || null,
    });
    setEditing(false);
  };

  const addNote = async () => {
    if (!note.trim()) return;
    setAddingNote(true);
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: note }),
      });
      if (res.ok) {
        const json = await res.json();
        setLead((prev) => ({ ...prev, notes: [json.note, ...prev.notes] }));
        setNote("");
        router.refresh();
      }
    } finally {
      setAddingNote(false);
    }
  };

  const deleteLead = async () => {
    if (!window.confirm(`Delete lead ${lead.enquiryCode}? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`, { method: "DELETE" });
      if (res.ok) router.push("/admin/leads");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="font-display text-xl font-bold text-navy">{lead.name}</h2>
            <StatusBadge status={lead.status} />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {lead.enquiryCode} · Submitted {formatDateTime(lead.createdAt)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a href={telLink(lead.phone)}>
            <Button variant="secondary" size="sm"><Phone className="h-3.5 w-3.5" /> Call</Button>
          </a>
          <a href={whatsappLink(lead.phone, `Hi ${lead.name}, this is regarding your enquiry ${lead.enquiryCode}.`)} target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="sm"><MessageCircle className="h-3.5 w-3.5" /> WhatsApp</Button>
          </a>
          {lead.email && (
            <a href={`mailto:${lead.email}`}>
              <Button variant="secondary" size="sm"><Mail className="h-3.5 w-3.5" /> Email</Button>
            </a>
          )}
          <Button variant="outline" size="sm" onClick={deleteLead} disabled={deleting} className="text-destructive hover:bg-destructive/5">
            {deleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-2xl border border-border bg-white p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-bold text-navy">Customer Information</h3>
              {!editing ? (
                <button onClick={() => setEditing(true)} className="flex items-center gap-1 text-xs font-semibold text-primary-700 hover:text-primary-800">
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <button onClick={saveEdits} disabled={saving} className="flex items-center gap-1 text-xs font-semibold text-success">
                    {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />} Save
                  </button>
                  <button onClick={() => setEditing(false)} className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                    <X className="h-3.5 w-3.5" /> Cancel
                  </button>
                </div>
              )}
            </div>

            {!editing ? (
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Name" value={lead.name} />
                <Field label="Phone" value={lead.phone} />
                <Field label="Email" value={lead.email || "—"} />
                <Field label="Company" value={lead.company || "—"} />
                <Field label="City" value={lead.city} />
                <Field label="Area" value={lead.area || "—"} />
                <Field label="Property Size" value={lead.propertySize || "—"} />
              </dl>
            ) : (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <EditField label="Name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} />
                <EditField label="Phone" value={form.phone} onChange={(v) => setForm((f) => ({ ...f, phone: v }))} />
                <EditField label="Email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} />
                <EditField label="Company" value={form.company} onChange={(v) => setForm((f) => ({ ...f, company: v }))} />
                <EditField label="City" value={form.city} onChange={(v) => setForm((f) => ({ ...f, city: v }))} />
                <EditField label="Area" value={form.area} onChange={(v) => setForm((f) => ({ ...f, area: v }))} />
                <EditField label="Property Size" value={form.propertySize} onChange={(v) => setForm((f) => ({ ...f, propertySize: v }))} />
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-border bg-white p-6">
            <h3 className="font-display text-base font-bold text-navy">Requirement</h3>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Requirement Type" value={titleCase(lead.requirementType)} />
              <Field label="Network Provider" value={lead.networkProvider ? titleCase(lead.networkProvider) : "—"} />
              <Field label="Property Type" value={lead.propertyType ? titleCase(lead.propertyType) : "—"} />
              <Field label="Source" value={titleCase(lead.source)} />
            </dl>
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Message</p>
              {!editing ? (
                <p className="mt-1.5 text-sm text-foreground/85">{lead.message || "No message provided."}</p>
              ) : (
                <Textarea
                  className="mt-1.5"
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                />
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-white p-6">
            <h3 className="font-display text-base font-bold text-navy">Notes</h3>
            <div className="mt-4 flex gap-2">
              <Textarea
                rows={2}
                placeholder="Add an internal note..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="flex-1"
              />
              <Button onClick={addNote} disabled={addingNote || !note.trim()}>
                {addingNote ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add"}
              </Button>
            </div>
            <div className="mt-5 space-y-4">
              {lead.notes.length === 0 && (
                <p className="text-sm text-muted-foreground">No notes yet.</p>
              )}
              {lead.notes.map((n) => (
                <div key={n.id} className="border-l-2 border-primary-200 pl-3">
                  <p className="text-sm text-foreground/85">{n.body}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {n.author?.name || "Admin"} · {formatDateTime(n.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-border bg-white p-6">
            <h3 className="font-display text-sm font-bold text-navy">Status</h3>
            <Select value={lead.status} onValueChange={(v) => patch({ status: v })}>
              <SelectTrigger className="mt-3"><SelectValue /></SelectTrigger>
              <SelectContent>
                {leadStatusValues.map((s) => (
                  <SelectItem key={s} value={s}>{titleCase(s)}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <h3 className="mt-5 font-display text-sm font-bold text-navy">Assigned To</h3>
            <Select
              value={lead.assignedToId ?? "UNASSIGNED"}
              onValueChange={(v) => patch({ assignedToId: v === "UNASSIGNED" ? null : v })}
            >
              <SelectTrigger className="mt-3"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="UNASSIGNED">Unassigned</SelectItem>
                {team.map((t) => (
                  <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {saving && <p className="mt-2 text-xs text-muted-foreground">Saving...</p>}
          </section>

          <section className="rounded-2xl border border-border bg-white p-6">
            <h3 className="flex items-center gap-1.5 font-display text-sm font-bold text-navy">
              <Clock className="h-4 w-4" /> Timeline
            </h3>
            <ol className="mt-4 space-y-4">
              {lead.events.map((event) => (
                <li key={event.id} className="relative pl-4">
                  <span className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-primary-500" />
                  <p className="text-sm font-medium text-navy">{titleCase(event.type)}</p>
                  {event.detail && <p className="text-xs text-muted-foreground">{event.detail}</p>}
                  <p className="text-xs text-muted-foreground">{formatDateTime(event.createdAt)}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-navy">{value}</dd>
    </div>
  );
}

function EditField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
