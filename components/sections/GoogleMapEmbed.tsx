import { siteConfig } from "@/config/site";

export function GoogleMapEmbed() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <iframe
        title={`${siteConfig.businessName} service area map`}
        src={siteConfig.googleMapsEmbedSrc}
        width="100%"
        height="320"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
