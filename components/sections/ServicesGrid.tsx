import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { services, serviceIcons } from "@/config/content";
import { Card } from "@/components/ui/card";

export function ServicesGrid({ limit }: { limit?: number }) {
  const list = limit ? services.slice(0, limit) : services;

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="What We Do"
            title="Mobile Signal Booster Services"
            description="From a single apartment to a multi-floor industrial facility — every project starts with understanding your space."
          />
          {limit && (
            <Link
              href="/services"
              className="flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800"
            >
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((service) => {
            const Icon = serviceIcons[service.icon];
            return (
              <Card
                key={service.slug}
                className="group flex flex-col p-6 transition-shadow hover:shadow-md"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-[15.5px] font-bold text-navy">
                  {service.name}
                </h3>
                <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-muted-foreground">
                  {service.shortDescription}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-4 flex items-center gap-1.5 text-[13.5px] font-semibold text-primary-700 group-hover:gap-2.5 group-hover:text-primary-800"
                >
                  Learn More <ArrowRight className="h-3.5 w-3.5 transition-all" />
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
