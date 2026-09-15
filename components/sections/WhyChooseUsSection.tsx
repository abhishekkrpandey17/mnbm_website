import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { whyChooseUs } from "@/config/content";

export function WhyChooseUsSection() {
  return (
    <section className="bg-muted/40 py-16 lg:py-24">
      <div className="container grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Engineering-Led, Not Sales-Led"
          description="We'd rather tell you a booster won't help than sell you one that doesn't fit your space."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {whyChooseUs.map((item) => (
            <div key={item.title} className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
              <div>
                <p className="text-sm font-semibold text-navy">{item.title}</p>
                <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
