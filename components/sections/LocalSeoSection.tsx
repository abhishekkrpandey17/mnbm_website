import Link from "next/link";
import { MapPin } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { locations } from "@/config/locations";

export function LocalSeoSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="Local Coverage"
          title="Mobile Network Booster Installation Across Mumbai"
          description="We work across Mumbai's suburbs, Navi Mumbai and Thane — from South Mumbai's older high-rises to the newer townships further out. Each area brings its own building types and signal conditions, which is why we assess every property individually rather than applying a single citywide approach."
        />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {locations.map((loc) => (
            <Link
              key={loc.slug}
              href={`/locations/${loc.slug}`}
              className="group flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-3.5 py-3 text-[13.5px] font-semibold text-navy transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
            >
              <MapPin className="h-3.5 w-3.5 shrink-0 text-primary-500" />
              {loc.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
