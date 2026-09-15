import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions",
  description: `Terms and conditions for using the ${siteConfig.businessName} website.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Terms & Conditions", path: "/terms" }]} />
      <PageHero eyebrow="Legal" title="Terms & Conditions" />
      <section className="bg-white py-16">
        <div className="container max-w-3xl space-y-6 text-[14.5px] leading-relaxed text-muted-foreground">
          <p>
            These Terms &amp; Conditions govern your use of this website. This is a general
            template — have it reviewed by a qualified professional before relying on it for
            legal compliance.
          </p>

          <h2 className="font-display text-lg font-bold text-navy">Use of This Website</h2>
          <p>
            This website provides information about mobile network and signal booster
            installation services offered by {siteConfig.businessName}. Content is provided for
            general informational purposes and does not constitute a guarantee of specific
            technical performance.
          </p>

          <h2 className="font-display text-lg font-bold text-navy">Enquiries &amp; Quotations</h2>
          <p>
            Submitting an enquiry through this website does not create a binding contract.
            Pricing and system recommendations are confirmed separately following a site survey.
          </p>

          <h2 className="font-display text-lg font-bold text-navy">Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics and diagrams, is the property
            of {siteConfig.businessName} unless otherwise stated and may not be reproduced without
            permission.
          </p>

          <h2 className="font-display text-lg font-bold text-navy">Limitation of Liability</h2>
          <p>
            While we aim to keep information on this website accurate and current, we make no
            warranties about completeness or accuracy and are not liable for decisions made
            solely on the basis of website content.
          </p>

          <h2 className="font-display text-lg font-bold text-navy">Contact Us</h2>
          <p>
            For questions about these terms, contact us at {siteConfig.email} or{" "}
            {siteConfig.phoneDisplay}.
          </p>
        </div>
      </section>
    </>
  );
}
