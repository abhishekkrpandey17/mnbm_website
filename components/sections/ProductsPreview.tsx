import Link from "next/link";
import { ArrowRight, PackageCheck } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Button } from "@/components/ui/button";
import { productHighlights } from "@/config/content";

export function ProductsPreview() {
  return (
    <section className="bg-navy py-16 text-white lg:py-24">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Product Range"
            title="Booster Systems Sized to Your Property"
            description="We match a system category to your site survey results rather than recommending a one-size-fits-all product."
            className="[&_h2]:text-white [&_p]:text-white/60"
          />
          <Link
            href="/products"
            className="flex items-center gap-1.5 text-sm font-semibold text-primary-300 hover:text-white"
          >
            View full product range <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {productHighlights.map((product) => (
            <div
              key={product.name}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/[0.08]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-600/20 text-primary-300">
                <PackageCheck className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-[15.5px] font-bold">{product.name}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-white/60">{product.summary}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-primary-300">
                {product.propertyType}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button asChild size="lg">
            <Link href="/contact">Request Product Consultation</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
