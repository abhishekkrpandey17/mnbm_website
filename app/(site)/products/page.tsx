import type { Metadata } from "next";
import Link from "next/link";
import { PackageCheck, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactSection } from "@/components/sections/ContactSection";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPublishedProducts } from "@/lib/data/products";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Mobile Signal Booster Products | Mumbai",
  description:
    "Browse mobile signal booster system categories for homes, offices and industrial spaces. Final recommendation is confirmed after a site survey.",
  path: "/products",
});

export default async function ProductsPage() {
  const products = await getPublishedProducts();

  return (
    <>
      <Breadcrumbs items={[{ name: "Products", path: "/products" }]} />
      <PageHero
        eyebrow="Products"
        title="Booster Systems Matched to Your Property"
        description="We categorise systems by the kind of space they suit. Your exact configuration is confirmed after a site survey — we don't sell one-size-fits-all boxes."
      />

      <section className="bg-white py-16 lg:py-20">
        <div className="container">
          {products.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
              Product listings are being updated. Please contact us for current availability.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <Card key={product.id} className="flex flex-col p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                    <PackageCheck className="h-5 w-5" />
                  </span>
                  <h2 className="mt-4 font-display text-lg font-bold text-navy">{product.name}</h2>
                  <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-muted-foreground">
                    {product.summary}
                  </p>
                  {product.propertyType && (
                    <Badge variant="outline" className="mt-4 w-fit">
                      {product.propertyType}
                    </Badge>
                  )}
                  <Link
                    href={`/products/${product.slug}`}
                    className="mt-4 flex items-center gap-1.5 text-[13.5px] font-semibold text-primary-700 hover:text-primary-800"
                  >
                    View Details <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <ContactSection />
    </>
  );
}
