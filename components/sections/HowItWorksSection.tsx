import { SectionHeading } from "./SectionHeading";
import { howItWorks } from "@/config/content";

export function HowItWorksSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="Our Process"
          title="How It Works"
          align="center"
          className="mx-auto"
        />

        <div className="relative mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute top-8 hidden h-px w-full bg-border lg:block" />
          {howItWorks.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="relative flex flex-col items-center text-center">
                <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-lg shadow-primary-600/20">
                  <Icon className="h-7 w-7" />
                </span>
                <span className="mt-4 font-display text-xs font-extrabold text-signal">
                  STEP {step.step}
                </span>
                <h3 className="mt-1 font-display text-base font-bold text-navy">{step.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
