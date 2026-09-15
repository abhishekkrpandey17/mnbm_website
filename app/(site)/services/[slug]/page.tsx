import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContactSection } from "@/components/sections/ContactSection";
import { Badge } from "@/components/ui/badge";
import { services, serviceIcons } from "@/config/content";
import { locations } from "@/config/locations";
import { buildMetadata, serviceSchema } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return buildMetadata({
    title: `${service.name} in Mumbai`,
    description: service.description.slice(0, 155),
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = serviceIcons[service.icon];
  const relatedServices = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const relatedLocations = locations.slice(0, 6);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
        ]}
      />
      <PageHero eyebrow="Service" title={`${service.name} in Mumbai`} description={service.shortDescription} />

      <section className="bg-white py-16 lg:py-20">
        <div className="container grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
              <Icon className="h-6 w-6" />
            </span>
            <h2 className="mt-5 font-display text-2xl font-bold text-navy">Overview</h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-muted-foreground">
              {service.description}
            </p>

            <h3 className="mt-8 font-display text-lg font-bold text-navy">What&apos;s Included</h3>
            <ul className="mt-4 space-y-3">
              {service.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-[14.5px] text-foreground/85">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  {h}
                </li>
              ))}
            </ul>

            <h3 className="mt-8 font-display text-lg font-bold text-navy">Suitable For</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {service.suitableFor.map((s) => (
                <Badge key={s} variant="outline">{s}</Badge>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-border bg-muted/40 p-6">
              <h3 className="font-display text-base font-bold text-navy">Available Across Mumbai</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We provide {service.name.toLowerCase()} across these areas:
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {relatedLocations.map((loc) => (
                  <Link
                    key={loc.slug}
                    href={`/locations/${loc.slug}`}
                    className="rounded-full border border-border bg-white px-3 py-1.5 text-[13px] font-medium text-navy hover:border-primary-300 hover:text-primary-700"
                  >
                    {loc.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border p-6">
              <h3 className="font-display text-sm font-bold text-navy">Related Services</h3>
              <ul className="mt-4 space-y-3">
                {relatedServices.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="flex items-center gap-1.5 text-[13.5px] font-medium text-primary-700 hover:text-primary-800"
                    >
                      {s.name} <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <ContactSection source="WEBSITE_SERVICE_PAGE" />

      <JsonLd
        data={serviceSchema({
          name: service.name,
          description: service.description,
          path: `/services/${service.slug}`,
        })}
      />
    </>
  );
}
