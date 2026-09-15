"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, LogOut, ChevronDown, User } from "lucide-react";
import type { AdminUser } from "@prisma/client";
import { titleCase } from "@/lib/utils";

export function Topbar({
  admin,
  onMenuClick,
}: {
  admin: Pick<AdminUser, "name" | "email" | "role">;
  onMenuClick: () => void;
}) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const logout = async () => {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="flex h-16 items-center justify-between gap-4 border-b border-border bg-white px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-navy hover:bg-muted lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="font-display text-base font-bold text-navy">Admin Dashboard</h1>
      </div>

      <div className="relative">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex items-center gap-2.5 rounded-full border border-border py-1.5 pl-1.5 pr-3 hover:bg-muted"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-100 text-primary-700">
            <User className="h-3.5 w-3.5" />
          </span>
          <span className="hidden text-left sm:block">
            <span className="block text-xs font-semibold leading-tight text-navy">
              {admin.name}
            </span>
            <span className="block text-[10.5px] leading-tight text-muted-foreground">
              {titleCase(admin.role)}
            </span>
          </span>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </button>

        {menuOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-0 z-20 mt-2 w-52 rounded-xl border border-border bg-white p-1.5 shadow-lg">
              <div className="px-2.5 py-2 text-xs text-muted-foreground">{admin.email}</div>
              <button
                onClick={logout}
                disabled={loggingOut}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-medium text-destructive hover:bg-destructive/5"
              >
                <LogOut className="h-4 w-4" />
                {loggingOut ? "Signing out..." : "Sign Out"}
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
