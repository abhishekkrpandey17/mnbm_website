import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { SiteLogo } from "./SiteLogo";
import { siteConfig } from "@/config/site";
import { services } from "@/config/content";
import { locations } from "@/config/locations";
import { telLink } from "@/lib/utils";

const footerLocations = locations.slice(0, 8);

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy text-white/80">
      <div className="container grid grid-cols-2 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
        <div className="col-span-2 lg:col-span-2">
          <SiteLogo dark />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            {siteConfig.shortDescription} Serving homes, offices, commercial buildings
            and industrial spaces across Mumbai, Navi Mumbai and Thane.
          </p>
          <div className="mt-5 space-y-2.5 text-sm">
            <a href={telLink(siteConfig.phone)} className="flex items-center gap-2.5 hover:text-white">
              <Phone className="h-4 w-4 text-primary-300" /> {siteConfig.phoneDisplay}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2.5 hover:text-white">
              <Mail className="h-4 w-4 text-primary-300" /> {siteConfig.email}
            </a>
            <div className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-300" />
              <span>Serving {siteConfig.address.addressLocality}, {siteConfig.address.addressRegion}</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary-300" />
              <span>{siteConfig.businessHours[0]!.days}: {siteConfig.businessHours[0]!.hours}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold text-white">Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.slice(0, 7).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-white">
                  {s.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/services" className="font-medium text-primary-300 hover:text-white">
                View all services →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold text-white">Areas We Serve</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {footerLocations.map((l) => (
              <li key={l.slug}>
                <Link href={`/locations/${l.slug}`} className="hover:text-white">
                  {l.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/locations/mumbai" className="font-medium text-primary-300 hover:text-white">
                View all areas →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold text-white">Company</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/industries" className="hover:text-white">Industries</Link></li>
            <li><Link href="/products" className="hover:text-white">Products</Link></li>
            <li><Link href="/resources" className="hover:text-white">Resources</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms &amp; Conditions</Link>
            <Link href="/disclaimer" className="hover:text-white">Disclaimer</Link>
            <Link href="/sitemap.xml" className="hover:text-white">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
