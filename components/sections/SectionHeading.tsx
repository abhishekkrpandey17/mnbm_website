import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-700">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 text-balance text-[28px] font-extrabold leading-[1.15] text-navy sm:text-[34px]">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-[15.5px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
