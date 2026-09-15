import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description: `Learn about ${siteConfig.businessName}, a Mumbai-based mobile network booster installation service for homes, offices and industrial spaces.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "About", path: "/about" }]} />
      <PageHero
        eyebrow="About Us"
        title={`About ${siteConfig.businessName}`}
        description="We help Mumbai homes and businesses get reliable indoor mobile coverage through assessment-led, professionally installed signal booster systems."
      />

      <section className="bg-white py-16 lg:py-20">
        <div className="container max-w-3xl space-y-6 text-[15.5px] leading-relaxed text-muted-foreground">
          <p>
            {siteConfig.businessName} provides mobile network and signal booster installation
            services across Mumbai, Navi Mumbai and Thane. We work with homes, offices,
            commercial buildings, factories, warehouses, hotels and hospitals — anywhere indoor
            mobile coverage falls short of what&apos;s available outdoors.
          </p>
          <p>
            Our approach starts with understanding a property before recommending anything.
            Building material, floor level, distance from the nearest tower and existing outdoor
            signal all affect what a booster system can realistically achieve indoors — which is
            why a site survey comes before any quotation.
          </p>
          <p>
            We install and configure systems for single network or multi-network coverage where
            feasible, and provide ongoing troubleshooting and maintenance support after
            installation. If a booster system isn&apos;t the right fit for a particular space, we
            say so rather than recommending an oversized or unsuitable setup.
          </p>
        </div>
      </section>

      <WhyChooseUsSection />
      <HowItWorksSection />
      <ContactSection />
    </>
  );
}
