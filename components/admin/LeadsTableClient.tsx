"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, ChevronLeft, ChevronRight, Phone, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "./StatusBadge";
import { formatDate, titleCase, telLink, whatsappLink } from "@/lib/utils";
import { requirementTypeOptions } from "@/components/forms/form-options";
import { leadStatusValues } from "@/lib/validation";
import type { Lead, AdminUser } from "@prisma/client";

interface LeadRow extends Lead {
  assignedTo: Pick<AdminUser, "id" | "name"> | null;
}

interface LeadsResponse {
  leads: LeadRow[];
  pagination: { page: number; pageSize: number; total: number; totalPages: number };
}

export function LeadsTableClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState<LeadsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
  const [, startTransition] = useTransition();

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      if (key !== "page") params.delete("page");
      startTransition(() => {
        router.push(`/admin/leads?${params.toString()}`);
      });
    },
    [router, searchParams]
  );

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/leads?${searchParams.toString()}`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .finally(() => setLoading(false));
  }, [searchParams]);

  useEffect(() => {
    const handle = setTimeout(() => {
      if (searchInput !== (searchParams.get("search") || "")) {
        updateParam("search", searchInput);
      }
    }, 400);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const page = data?.pagination.page ?? 1;
  const totalPages = data?.pagination.totalPages ?? 1;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, phone, email or enquiry ID"
            className="pl-9"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        <Select value={searchParams.get("status") || "ALL"} onValueChange={(v) => updateParam("status", v === "ALL" ? "" : v)}>
          <SelectTrigger className="sm:w-44"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Statuses</SelectItem>
            {leadStatusValues.map((s) => (
              <SelectItem key={s} value={s}>{titleCase(s)}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={searchParams.get("requirementType") || "ALL"}
          onValueChange={(v) => updateParam("requirementType", v === "ALL" ? "" : v)}
        >
          <SelectTrigger className="sm:w-48"><SelectValue placeholder="Requirement" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Requirements</SelectItem>
            {requirementTypeOptions.map((o) => (
              <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="text"
          placeholder="City"
          className="sm:w-36"
          defaultValue={searchParams.get("city") || ""}
          onBlur={(e) => updateParam("city", e.target.value)}
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-3 font-semibold">Name</th>
                <th className="px-5 py-3 font-semibold">Contact</th>
                <th className="px-5 py-3 font-semibold">Location</th>
                <th className="px-5 py-3 font-semibold">Requirement</th>
                <th className="px-5 py-3 font-semibold">Network</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Assigned</th>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={9} className="px-5 py-10 text-center text-muted-foreground">
                    Loading leads...
                  </td>
                </tr>
              )}
              {!loading && data?.leads.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-5 py-10 text-center text-muted-foreground">
                    No leads match your filters.
                  </td>
                </tr>
              )}
              {!loading &&
                data?.leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-border/70 last:border-0 hover:bg-muted/40">
                    <td className="px-5 py-3">
                      <Link href={`/admin/leads/${lead.id}`} className="font-medium text-navy hover:text-primary-700">
                        {lead.name}
                      </Link>
                      <div className="text-xs text-muted-foreground">{lead.enquiryCode}</div>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">
                      <div>{lead.phone}</div>
                      {lead.email && <div className="text-xs">{lead.email}</div>}
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">
                      {lead.area ? `${lead.area}, ` : ""}
                      {lead.city}
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{titleCase(lead.requirementType)}</td>
                    <td className="px-5 py-3 text-muted-foreground">
                      {lead.networkProvider ? titleCase(lead.networkProvider) : "—"}
                    </td>
                    <td className="px-5 py-3"><StatusBadge status={lead.status} /></td>
                    <td className="px-5 py-3 text-muted-foreground">
                      {lead.assignedTo?.name || <span className="text-xs">Unassigned</span>}
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{formatDate(lead.createdAt)}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <a href={telLink(lead.phone)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-navy" title="Call">
                          <Phone className="h-4 w-4" />
                        </a>
                        <a
                          href={whatsappLink(lead.phone, `Hi ${lead.name}, this is regarding your enquiry ${lead.enquiryCode}.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-success"
                          title="WhatsApp"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {data && data.pagination.total > 0 && (
          <div className="flex items-center justify-between border-t border-border px-5 py-3 text-sm text-muted-foreground">
            <span>
              Page {page} of {totalPages} · {data.pagination.total} leads
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => updateParam("page", String(page - 1))}
                className="rounded-lg border border-border p-1.5 disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => updateParam("page", String(page + 1))}
                className="rounded-lg border border-border p-1.5 disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
