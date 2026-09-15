import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { IndustriesGrid } from "@/components/sections/IndustriesGrid";
import { ContactSection } from "@/components/sections/ContactSection";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Industries We Serve | Mobile Signal Booster Solutions",
  description:
    "Mobile signal booster solutions tailored for homes, offices, factories, warehouses, hotels, hospitals, retail stores and institutions across Mumbai.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Industries", path: "/industries" }]} />
      <PageHero
        eyebrow="Industries"
        title="Solutions Tailored to Your Property Type"
        description="Different industries bring different building layouts, materials and usage patterns. We adapt our recommendation to each."
      />
      <IndustriesGrid />
      <ContactSection />
    </>
  );
}
