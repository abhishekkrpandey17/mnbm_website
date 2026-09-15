import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Disclaimer",
  description: `Disclaimer for ${siteConfig.businessName}'s mobile signal booster services.`,
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Disclaimer", path: "/disclaimer" }]} />
      <PageHero eyebrow="Legal" title="Disclaimer" />
      <section className="bg-white py-16">
        <div className="container max-w-3xl space-y-6 text-[14.5px] leading-relaxed text-muted-foreground">
          <p>
            This is a general template — have it reviewed by a qualified professional before
            relying on it for legal or regulatory compliance.
          </p>

          <h2 className="font-display text-lg font-bold text-navy">Performance Disclaimer</h2>
          <p>
            Mobile signal booster performance depends on outdoor signal availability, building
            construction, distance from mobile towers, and mobile operator network conditions.
            We do not guarantee a specific signal strength, data speed or complete elimination of
            call drops. Recommendations are based on the information gathered during a site
            survey and represent our best professional assessment, not a guaranteed outcome.
          </p>

          <h2 className="font-display text-lg font-bold text-navy">Regulatory Compliance</h2>
          <p>
            Signal boosting equipment in India may be subject to type approval, WPC (Wireless
            Planning &amp; Coordination) requirements, and mobile operator guidelines. We
            recommend using compliant equipment and encourage customers to verify current
            regulatory requirements applicable to their installation. Information provided on
            this website regarding regulations is general in nature and should not be treated as
            legal advice.
          </p>

          <h2 className="font-display text-lg font-bold text-navy">Third-Party Trademarks</h2>
          <p>
            References to Jio, Airtel, Vi, BSNL or other mobile network operators are for
            descriptive purposes only. {siteConfig.businessName} is not affiliated with, endorsed
            by, or an official partner of any mobile network operator unless explicitly stated.
          </p>

          <h2 className="font-display text-lg font-bold text-navy">No Professional Advice</h2>
          <p>
            Content on this website is provided for general informational purposes and should not
            be treated as a substitute for a formal site assessment or professional consultation.
          </p>
        </div>
      </section>
    </>
  );
}
