"use client";

import { useEffect, useState } from "react";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDateTime, titleCase } from "@/lib/utils";
import type { ContactMessage } from "@prisma/client";

export function ContactsTableClient() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/contacts")
      .then((res) => res.json())
      .then((json) => setMessages(json.messages || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/contacts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status: status as ContactMessage["status"] } : m)));
  };

  const remove = async (id: string) => {
    if (!window.confirm("Delete this message?")) return;
    await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  if (loading) return <p className="text-sm text-muted-foreground">Loading messages...</p>;

  if (messages.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
        No contact messages yet.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white">
      <div className="divide-y divide-border">
        {messages.map((m) => (
          <div key={m.id} className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setExpanded(expanded === m.id ? null : m.id)}
                className="flex items-center gap-2 text-left"
              >
                {expanded === m.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                <div>
                  <p className="text-sm font-semibold text-navy">{m.name} · {m.subject || "No subject"}</p>
                  <p className="text-xs text-muted-foreground">{m.email} {m.phone ? `· ${m.phone}` : ""}</p>
                </div>
              </button>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">{formatDateTime(m.createdAt)}</span>
                <Select value={m.status} onValueChange={(v) => updateStatus(m.id, v)}>
                  <SelectTrigger className="h-9 w-32 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["NEW", "READ", "REPLIED", "ARCHIVED"].map((s) => (
                      <SelectItem key={s} value={s}>{titleCase(s)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <button onClick={() => remove(m.id)} className="rounded-lg p-1.5 text-destructive hover:bg-destructive/5">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            {expanded === m.id && (
              <p className="mt-3 rounded-xl bg-muted/50 p-4 text-sm text-foreground/85">{m.message}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
