import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden bg-navy py-14 lg:py-20", className)}>
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary-600/25 blur-[100px]" />
      <div className="container relative max-w-3xl">
        {eyebrow && (
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-300">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 text-balance text-[30px] font-extrabold leading-[1.15] text-white sm:text-[38px]">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-white/65">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
