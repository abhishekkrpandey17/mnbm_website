import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactSection } from "@/components/sections/ContactSection";
import { GoogleMapEmbed } from "@/components/sections/GoogleMapEmbed";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description: `Contact ${siteConfig.businessName} for mobile signal booster installation across Mumbai. Request a free site survey.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
      <PageHero
        eyebrow="Contact"
        title="Get in Touch"
        description="Request a free site survey or ask us a question. We typically respond within one business day."
      />
      <ContactSection />
      <section className="bg-muted/40 pb-16 lg:pb-24">
        <div className="container max-w-4xl">
          <GoogleMapEmbed />
        </div>
      </section>
    </>
  );
}
