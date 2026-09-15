import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.businessName}.`,
  path: "/privacy-policy",
  noIndex: false,
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Privacy Policy", path: "/privacy-policy" }]} />
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <section className="bg-white py-16">
        <div className="container prose-sm max-w-3xl space-y-6 text-[14.5px] leading-relaxed text-muted-foreground">
          <p>
            This Privacy Policy explains how {siteConfig.businessName} (&quot;we&quot;,
            &quot;us&quot;) collects, uses and protects information submitted through this
            website. This is a general template — have it reviewed by a qualified professional
            before relying on it for legal compliance.
          </p>

          <h2 className="font-display text-lg font-bold text-navy">Information We Collect</h2>
          <p>
            When you submit an enquiry or contact form, we collect the information you provide,
            which may include your name, phone number, email address, city, property details and
            any message you send us.
          </p>

          <h2 className="font-display text-lg font-bold text-navy">How We Use Information</h2>
          <p>
            We use the information you submit to respond to your enquiry, schedule a site survey
            or consultation, and provide related services. We do not sell your personal
            information to third parties.
          </p>

          <h2 className="font-display text-lg font-bold text-navy">Data Storage</h2>
          <p>
            Enquiry data is stored securely in our database and retained for as long as necessary
            to respond to your enquiry and maintain business records.
          </p>

          <h2 className="font-display text-lg font-bold text-navy">Cookies &amp; Analytics</h2>
          <p>
            This website may use analytics tools such as Google Analytics to understand how
            visitors use the site. These tools may set cookies in your browser.
          </p>

          <h2 className="font-display text-lg font-bold text-navy">Contact Us</h2>
          <p>
            For questions about this policy, contact us at {siteConfig.email} or{" "}
            {siteConfig.phoneDisplay}.
          </p>
        </div>
      </section>
    </>
  );
}
