/**
 * Central business configuration. Change values here to rebrand or update
 * business details across the entire site (header, footer, schema.org data,
 * contact section, metadata defaults, etc).
 */

export const siteConfig = {
  businessName: process.env.NEXT_PUBLIC_BUSINESS_NAME || "SignalPro Mumbai",
  legalName: process.env.NEXT_PUBLIC_BUSINESS_NAME || "SignalPro Mumbai",
  tagline: "Mobile Network Booster Specialists",
  shortDescription:
    "Professional mobile signal booster installation for homes, offices, and industrial spaces across Mumbai.",

  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.signalpromumbai.example",

  phone: process.env.NEXT_PUBLIC_PHONE || "+91-98765-43210",
  phoneDisplay: (process.env.NEXT_PUBLIC_PHONE || "+91-98765-43210").replace(
    "+91-",
    "+91 "
  ),
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "919876543210",
  email: process.env.CONTACT_EMAIL || "hello@signalpromumbai.example",

  address: {
    streetAddress: "Configure actual office address",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400001",
    addressCountry: "IN",
  },

  serviceArea: [
    "Mumbai",
    "Navi Mumbai",
    "Thane",
    "Andheri",
    "Bandra",
    "Borivali",
    "Powai",
    "Goregaon",
    "Malad",
    "Kandivali",
    "Vile Parle",
    "Santacruz",
    "Kurla",
    "Chembur",
    "Ghatkopar",
    "Mulund",
    "Vashi",
    "Nerul",
    "Panvel",
    "Colaba",
    "Worli",
    "Lower Parel",
    "Dadar",
    "Sion",
    "BKC",
    "South Mumbai",
  ],

  businessHours: [
    { days: "Monday – Saturday", hours: "9:30 AM – 7:30 PM" },
    { days: "Sunday", hours: "By appointment" },
  ],

  social: {
    instagram: "",
    facebook: "",
    linkedin: "",
    youtube: "",
  },

  googleMapsUrl: "https://maps.google.com/?q=Mumbai,Maharashtra",
  googleMapsEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241316.6!2d72.8!3d19.076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMumbai%2C+Maharashtra!5e0!3m2!1sen!2sin",

  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || "",
  gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION || "",

  seoDefaults: {
    titleTemplate: "%s | " + (process.env.NEXT_PUBLIC_BUSINESS_NAME || "SignalPro Mumbai"),
    defaultTitle:
      "Mobile Network Booster in Mumbai | Signal Booster Installation",
    defaultDescription:
      "Get professional mobile network and signal booster solutions in Mumbai for homes, offices, commercial buildings and industrial spaces. Request a site survey.",
    ogImage: "/images/og-default.svg",
  },
} as const;

export type SiteConfig = typeof siteConfig;
