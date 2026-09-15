import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Card } from "@/components/ui/card";
import { resourceArticles } from "@/config/resources";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Resources | Mobile Signal Booster Guides",
  description:
    "Practical guides on mobile signal boosters — how they work, 4G vs 5G, and solutions for homes, offices and industrial spaces in Mumbai.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Resources", path: "/resources" }]} />
      <PageHero
        eyebrow="Resources"
        title="Guides to Mobile Signal Boosters"
        description="Practical, jargon-light explanations to help you understand what a signal booster can do for your property."
      />

      <section className="bg-white py-16 lg:py-20">
        <div className="container grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resourceArticles.map((article) => (
            <Card key={article.slug} className="flex flex-col p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                <BookOpen className="h-5 w-5" />
              </span>
              <h2 className="mt-4 font-display text-base font-bold leading-snug text-navy">
                {article.title}
              </h2>
              <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-muted-foreground">
                {article.excerpt}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{article.readTime}</span>
                <Link
                  href={`/resources/${article.slug}`}
                  className="flex items-center gap-1.5 text-[13.5px] font-semibold text-primary-700 hover:text-primary-800"
                >
                  Read <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
