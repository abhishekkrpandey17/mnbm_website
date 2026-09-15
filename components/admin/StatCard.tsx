import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number | string;
  accent?: "primary" | "success" | "signal" | "muted";
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p
        className={cn(
          "mt-2 font-display text-2xl font-extrabold",
          accent === "primary" && "text-primary-700",
          accent === "success" && "text-success",
          accent === "signal" && "text-signal",
          (!accent || accent === "muted") && "text-navy"
        )}
      >
        {value}
      </p>
    </div>
  );
}
