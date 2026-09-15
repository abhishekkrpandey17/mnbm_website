import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactSection } from "@/components/sections/ContactSection";
import { locations } from "@/config/locations";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Areas We Serve | Mobile Signal Booster Across Mumbai",
  description:
    "Mobile network booster installation across Mumbai, Navi Mumbai and Thane — Andheri, Bandra, Powai, Thane, Vashi and more.",
  path: "/locations",
});

const regions = ["Mumbai", "Navi Mumbai", "Thane"] as const;

export default function LocationsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Locations", path: "/locations" }]} />
      <PageHero
        eyebrow="Areas We Serve"
        title="Mobile Signal Booster Installation Across Mumbai"
        description="We serve homes, offices and industrial spaces across Mumbai's suburbs, Navi Mumbai and Thane. Select an area to see location-specific information."
      />

      <section className="bg-white py-16 lg:py-20">
        <div className="container space-y-12">
          {regions.map((region) => {
            const list = locations.filter((l) => l.region === region);
            if (!list.length) return null;
            return (
              <div key={region}>
                <h2 className="font-display text-xl font-bold text-navy">{region}</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((loc) => (
                    <Link
                      key={loc.slug}
                      href={`/locations/${loc.slug}`}
                      className="group rounded-2xl border border-border p-5 transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md"
                    >
                      <div className="flex items-center gap-2 text-primary-700">
                        <MapPin className="h-4 w-4" />
                        <span className="font-display text-base font-bold text-navy">{loc.name}</span>
                      </div>
                      <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground line-clamp-2">
                        {loc.intro}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <ContactSection source="WEBSITE_LOCATION_PAGE" />
    </>
  );
}
