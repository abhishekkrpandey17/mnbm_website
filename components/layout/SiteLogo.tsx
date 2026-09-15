import Link from "next/link";
import { Signal } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function SiteLogo({ className, dark }: { className?: string; dark?: boolean }) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-2.5 shrink-0", className)}
      aria-label={`${siteConfig.businessName} — Home`}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white shadow-sm transition-transform group-hover:scale-105">
        <Signal className="h-5 w-5" strokeWidth={2.5} />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[17px] font-extrabold tracking-tight",
            dark ? "text-white" : "text-navy"
          )}
        >
          {siteConfig.businessName}
        </span>
        <span
          className={cn(
            "text-[11px] font-medium tracking-wide",
            dark ? "text-white/60" : "text-muted-foreground"
          )}
        >
          {siteConfig.tagline}
        </span>
      </span>
    </Link>
  );
}
