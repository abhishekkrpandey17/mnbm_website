import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactSection } from "@/components/sections/ContactSection";
import { resourceArticles, getResourceBySlug } from "@/config/resources";
import { services } from "@/config/content";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return resourceArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getResourceBySlug(slug);
  if (!article) return {};

  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/resources/${article.slug}`,
  });
}

export default async function ResourceArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getResourceBySlug(slug);
  if (!article) notFound();

  const relatedServices = services.filter((s) =>
    article.relatedServiceSlugs.includes(s.slug)
  );

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Resources", path: "/resources" },
          { name: article.title, path: `/resources/${article.slug}` },
        ]}
      />
      <PageHero eyebrow={article.readTime} title={article.title} description={article.excerpt} />

      <section className="bg-white py-16 lg:py-20">
        <div className="container grid gap-12 lg:grid-cols-3">
          <article className="max-w-2xl space-y-8 lg:col-span-2">
            {article.sections.map((section, i) => (
              <div key={i}>
                {section.heading && (
                  <h2 className="mb-3 font-display text-xl font-bold text-navy">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="mb-3 text-[15px] leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
                {section.list && (
                  <ul className="ml-5 list-disc space-y-1.5 text-[15px] text-muted-foreground">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </article>

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
            <div className="rounded-2xl border border-border p-6">
              <h3 className="font-display text-sm font-bold text-navy">More Resources</h3>
              <ul className="mt-4 space-y-3">
                {resourceArticles
                  .filter((a) => a.slug !== article.slug)
                  .slice(0, 4)
                  .map((a) => (
                    <li key={a.slug}>
                      <Link
                        href={`/resources/${a.slug}`}
                        className="text-[13.5px] font-medium text-muted-foreground hover:text-primary-700"
                      >
                        {a.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
