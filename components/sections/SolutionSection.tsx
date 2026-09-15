import Image from "next/image";
import { SectionHeading } from "./SectionHeading";

const steps = [
  { label: "Outdoor Antenna", description: "Captures existing mobile signal from nearby towers." },
  { label: "Signal Cable", description: "Low-loss cable carries the signal to the amplifier." },
  { label: "Booster / Amplifier", description: "Amplifies the captured signal for indoor distribution." },
  { label: "Indoor Antenna", description: "Broadcasts the boosted signal inside your space." },
  { label: "Improved Coverage", description: "More consistent indoor calls and data across the covered area." },
];

export function SolutionSection() {
  return (
    <section className="bg-muted/40 py-16 lg:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="The Solution"
          title="Professional Mobile Signal Booster Solutions"
          description="A booster system works in five straightforward stages, engineered around your building's actual signal conditions."
          align="center"
          className="mx-auto"
        />

        <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
          <Image
            src="/images/system-diagram.svg"
            alt="Diagram showing a mobile signal booster system: outdoor antenna, cable, amplifier, indoor antenna, and improved indoor coverage"
            width={900}
            height={360}
            className="w-full"
          />
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-5">
          {steps.map((step, i) => (
            <div key={step.label} className="rounded-xl border border-border bg-white p-4">
              <span className="font-display text-xs font-extrabold text-primary-600">
                0{i + 1}
              </span>
              <p className="mt-1.5 text-sm font-semibold text-navy">{step.label}</p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-[13px] text-muted-foreground">
          Actual performance depends on outdoor signal availability, building construction and
          operator network conditions. A site survey confirms feasibility for your property.
        </p>
      </div>
    </section>
  );
}
