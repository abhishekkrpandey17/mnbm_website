import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactSection } from "@/components/sections/ContactSection";
import { industries, industryIcons, services } from "@/config/content";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};

  return buildMetadata({
    title: `Mobile Signal Booster for ${industry.name} in Mumbai`,
    description: `${industry.intro} Request a site survey for your ${industry.name.toLowerCase()} property in Mumbai.`.slice(0, 155),
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const Icon = industryIcons[industry.icon];
  const relevantServices = services.filter((s) => industry.relevantServiceSlugs.includes(s.slug));

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Industries", path: "/industries" },
          { name: industry.name, path: `/industries/${industry.slug}` },
        ]}
      />
      <PageHero
        eyebrow="Industry"
        title={`Mobile Signal Booster for ${industry.name} in Mumbai`}
        description={industry.intro}
      />

      <section className="bg-white py-16 lg:py-20">
        <div className="container grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
              <Icon className="h-6 w-6" />
            </span>
            <h2 className="mt-5 font-display text-2xl font-bold text-navy">
              Common Signal Challenges
            </h2>
            <ul className="mt-4 space-y-3">
              {industry.challenges.map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-[14.5px] text-foreground/85">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                  {c}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 font-display text-2xl font-bold text-navy">
              Recommended Services
            </h2>
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

          <aside className="rounded-2xl border border-border p-6">
            <h3 className="font-display text-sm font-bold text-navy">All Industries</h3>
            <ul className="mt-4 space-y-2.5">
              {industries
                .filter((i) => i.slug !== industry.slug)
                .map((i) => (
                  <li key={i.slug}>
                    <Link
                      href={`/industries/${i.slug}`}
                      className="text-[13.5px] font-medium text-muted-foreground hover:text-primary-700"
                    >
                      {i.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </aside>
        </div>
      </section>

      <ContactSection defaultRequirementType="OTHER" />
    </>
  );
}
