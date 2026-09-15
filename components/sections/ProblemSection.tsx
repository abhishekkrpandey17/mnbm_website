import { XCircle } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { commonProblems } from "@/config/content";

export function ProblemSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            eyebrow="The Problem"
            title="Facing Weak Mobile Network in Mumbai?"
            description="Mumbai's mix of concrete high-rises, glass towers and dense construction often blocks mobile signal before it reaches indoor spaces. These are the issues we hear about most."
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {commonProblems.map((problem) => (
            <div
              key={problem.title}
              className="flex gap-3 rounded-2xl border border-border bg-muted/40 p-4"
            >
              <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-signal" />
              <div>
                <p className="text-sm font-semibold text-navy">{problem.title}</p>
                <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">
                  {problem.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
