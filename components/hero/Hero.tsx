import Link from "next/link";
import Image from "next/image";
import { Phone, MessageCircle, ArrowRight, Signal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { telLink, whatsappLink } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="pointer-events-none absolute -right-32 top-0 h-[520px] w-[520px] rounded-full bg-primary-600/30 blur-[120px]" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-[360px] w-[360px] rounded-full bg-signal/10 blur-[100px]" />

      <div className="container relative grid gap-12 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
        <div className="reveal">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/80">
            <Signal className="h-3.5 w-3.5 text-primary-300" />
            Serving Mumbai, Navi Mumbai &amp; Thane
          </div>

          <h1 className="mt-5 text-balance text-[34px] font-extrabold leading-[1.1] text-white sm:text-[44px] lg:text-[48px]">
            Mobile Network Booster &amp; Signal Booster Installation in Mumbai
          </h1>

          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/70">
            Reliable 4G and 5G mobile signal solutions for homes, offices, commercial
            buildings, warehouses, hotels and industrial spaces across Mumbai.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">
                Get Free Site Survey <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/5 text-white hover:bg-white/10"
            >
              <a href={telLink(siteConfig.phone)}>
                <Phone className="h-4 w-4" /> Call Now
              </a>
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/70">
            <a href={telLink(siteConfig.phone)} className="flex items-center gap-2 hover:text-white">
              <Phone className="h-4 w-4 text-primary-300" /> {siteConfig.phoneDisplay}
            </a>
            <a
              href={whatsappLink(siteConfig.whatsapp, "Hi, I'd like a free site survey for a mobile signal booster.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white"
            >
              <MessageCircle className="h-4 w-4 text-success" /> Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="relative reveal [animation-delay:150ms]">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
            <Image
              src="/images/hero-installation.svg"
              alt="Professional mobile signal booster installation with outdoor antenna, amplifier and indoor antenna in a Mumbai building"
              width={640}
              height={560}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-border bg-white p-4 shadow-xl sm:block">
            <p className="text-xs font-semibold text-muted-foreground">System components</p>
            <p className="font-display text-sm font-bold text-navy">
              Outdoor Antenna → Amplifier → Indoor Antenna
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
