import Script from "next/script";
import { siteConfig } from "@/config/site";

export function AnalyticsScripts() {
  return (
    <>
      {siteConfig.gtmId && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${siteConfig.gtmId}');
          `}
        </Script>
      )}
      {siteConfig.gaId && !siteConfig.gtmId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${siteConfig.gaId}');
            `}
          </Script>
        </>
      )}
    </>
  );
}

/**
 * Fire a GA4/GTM event for conversion-relevant interactions
 * (phone click, WhatsApp click, form submit, CTA click).
 */
export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
  if (w.dataLayer) {
    w.dataLayer.push({ event: eventName, ...params });
  } else if (w.gtag) {
    w.gtag("event", eventName, params);
  }
}
