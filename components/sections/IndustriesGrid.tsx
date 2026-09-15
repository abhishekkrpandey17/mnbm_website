import Link from "next/link";
import { SectionHeading } from "./SectionHeading";
import { industries, industryIcons } from "@/config/content";

export function IndustriesGrid() {
  return (
    <section className="bg-muted/40 py-16 lg:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="Who We Serve"
          title="Solutions Across Industries"
          description="Different property types bring different signal challenges. Each industry gets a tailored assessment."
          align="center"
          className="mx-auto"
        />

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {industries.map((industry) => {
            const Icon = industryIcons[industry.icon];
            return (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-6 text-center transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-700 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="font-display text-sm font-bold text-navy">{industry.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
