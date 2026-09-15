import { Signal } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function AdminAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600 text-white">
            <Signal className="h-6 w-6" strokeWidth={2.5} />
          </span>
          <p className="mt-4 font-display text-lg font-bold text-white">
            {siteConfig.businessName}
          </p>
          <p className="text-xs font-medium uppercase tracking-wider text-white/40">
            Admin Portal
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
