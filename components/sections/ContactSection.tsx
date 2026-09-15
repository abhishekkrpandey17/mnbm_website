import type { ComponentType } from "react";
import { Phone, MessageCircle, Mail, Clock, MapPin } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { LeadForm } from "@/components/forms/LeadForm";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { telLink, whatsappLink } from "@/lib/utils";
import type { LeadFormInput } from "@/lib/validation";

export function ContactSection({
  source = "WEBSITE_CONTACT_FORM",
  defaultCity,
  defaultRequirementType,
}: {
  source?: LeadFormInput["source"];
  defaultCity?: string;
  defaultRequirementType?: LeadFormInput["requirementType"];
}) {
  return (
    <section className="bg-white py-16 lg:py-24" id="contact">
      <div className="container">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's Improve Your Mobile Connectivity"
          description="Share a few details and our team will reach out to schedule a site assessment."
          align="center"
          className="mx-auto"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          <Card className="p-6 lg:col-span-2">
            <div className="space-y-5">
              <ContactItem icon={Phone} label="Call Us" value={siteConfig.phoneDisplay} href={telLink(siteConfig.phone)} />
              <ContactItem
                icon={MessageCircle}
                label="WhatsApp"
                value="Chat with our team"
                href={whatsappLink(siteConfig.whatsapp, "Hi, I'd like to enquire about mobile signal booster installation.")}
                external
              />
              <ContactItem icon={Mail} label="Email" value={siteConfig.email} href={`mailto:${siteConfig.email}`} />
              <ContactItem
                icon={MapPin}
                label="Service Area"
                value={`${siteConfig.address.addressLocality}, ${siteConfig.address.addressRegion}`}
              />
              <ContactItem
                icon={Clock}
                label="Business Hours"
                value={`${siteConfig.businessHours[0]!.days}: ${siteConfig.businessHours[0]!.hours}`}
              />
            </div>
          </Card>

          <Card className="p-6 lg:col-span-3 sm:p-8">
            <LeadForm source={source} defaultCity={defaultCity} defaultRequirementType={defaultRequirementType} />
          </Card>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon: Icon,
  label,
  value,
  href,
  external,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <div className="flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="text-[14.5px] font-semibold text-navy">{value}</p>
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
      {content}
    </a>
  );
}
