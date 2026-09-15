import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, MapPin, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactSection } from "@/components/sections/ContactSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { Badge } from "@/components/ui/badge";
import { getLocationBySlug, locations } from "@/config/locations";
import { services } from "@/config/content";
import { buildMetadata } from "@/lib/seo";
import { faqs } from "@/config/content";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return {};

  return buildMetadata({
    title: location.metaTitle,
    description: location.metaDescription,
    path: `/locations/${location.slug}`,
  });
}

const locationFaqs = faqs.slice(0, 6);

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) notFound();

  const relevantServices = services.filter((s) =>
    location.relevantServiceSlugs.includes(s.slug)
  );
  const nearby = locations.filter((l) => location.nearbyAreas.includes(l.name));

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Locations", path: "/locations" },
          { name: location.name, path: `/locations/${location.slug}` },
        ]}
      />
      <PageHero
        eyebrow={`${location.region} · Service Area`}
        title={`Mobile Signal Booster in ${location.name}`}
        description={location.intro}
      />

      <section className="bg-white py-16 lg:py-20">
        <div className="container grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold text-navy">
              Signal Conditions in {location.name}
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-muted-foreground">
              {location.characterParagraph}
            </p>

            <h3 className="mt-8 font-display text-lg font-bold text-navy">
              Common Challenges We See in {location.name}
            </h3>
            <ul className="mt-4 space-y-3">
              {location.localChallenges.map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-[14.5px] text-foreground/85">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                  {c}
                </li>
              ))}
            </ul>

            <h3 className="mt-8 font-display text-lg font-bold text-navy">Common Property Types</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {location.commonPropertyTypes.map((p) => (
                <Badge key={p} variant="outline">{p}</Badge>
              ))}
            </div>

            <h3 className="mt-8 font-display text-lg font-bold text-navy">
              Recommended Services in {location.name}
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {relevantServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-border p-4 hover:border-primary-300"
                >
                  <span className="text-sm font-semibold text-navy">{s.name}</span>
                  <ArrowRight className="h-4 w-4 text-primary-600 transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border p-6">
              <h3 className="font-display text-sm font-bold text-navy">Nearby Areas</h3>
              <ul className="mt-4 space-y-2.5">
                {nearby.map((l) => (
                  <li key={l.slug}>
                    <Link
                      href={`/locations/${l.slug}`}
                      className="flex items-center gap-1.5 text-[13.5px] font-medium text-primary-700 hover:text-primary-800"
                    >
                      <MapPin className="h-3.5 w-3.5" /> {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <FaqSection items={locationFaqs} title={`FAQs — ${location.name}`} />
      <ContactSection source="WEBSITE_LOCATION_PAGE" defaultCity={location.name} />
    </>
  );
}
