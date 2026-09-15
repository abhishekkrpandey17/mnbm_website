import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { buildMetadata } from "@/lib/seo";
import { faqs } from "@/config/content";

export const metadata: Metadata = buildMetadata({
  title: "Mobile Signal Booster Services in Mumbai",
  description:
    "Explore our full range of mobile network booster services in Mumbai — installation, home and office solutions, industrial coverage, repair and site surveys.",
  path: "/services",
});

export default function ServicesPage() {
  const relevantFaqs = faqs.filter((f) =>
    ["What is a mobile signal booster?", "Do I need a site survey?", "How long does installation take?", "How much does installation cost?"].includes(f.question)
  );

  return (
    <>
      <Breadcrumbs items={[{ name: "Services", path: "/services" }]} />
      <PageHero
        eyebrow="Services"
        title="Mobile Signal Booster Services in Mumbai"
        description="Every engagement starts with understanding your building, not selling a fixed package. Explore the services we offer across Mumbai."
      />
      <ServicesGrid />
      <FaqSection items={relevantFaqs} title="Service FAQs" />
      <ContactSection source="WEBSITE_SERVICE_PAGE" />
    </>
  );
}
