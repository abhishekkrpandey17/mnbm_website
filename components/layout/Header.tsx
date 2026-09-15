"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { SiteLogo } from "./SiteLogo";
import { navLinks } from "./nav-links";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { telLink } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-200",
        scrolled
          ? "border-border bg-white/90 backdrop-blur-md"
          : "border-transparent bg-white"
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4 xl:h-20">
        <SiteLogo />

        <nav className="hidden items-center gap-5 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "whitespace-nowrap text-[14px] font-medium text-foreground/80 transition-colors hover:text-primary-700",
                pathname === link.href && "text-primary-700"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <a
            href={telLink(siteConfig.phone)}
            className="flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-navy hover:text-primary-700"
          >
            <Phone className="h-4 w-4" />
            {siteConfig.phoneDisplay}
          </a>
          <Button asChild>
            <Link href="/contact">Get Free Site Survey</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <a
            href={telLink(siteConfig.phone)}
            className="flex h-10 items-center gap-1.5 rounded-full bg-primary-600 px-4 text-sm font-semibold text-white"
          >
            <Phone className="h-4 w-4" />
            Call Now
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-navy hover:bg-muted"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "grid overflow-hidden border-t border-border bg-white transition-[grid-template-rows] duration-300 ease-out xl:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr] border-t-0"
        )}
      >
        <div className="overflow-hidden">
          <nav className="container flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-3 text-[15px] font-medium text-foreground/85 hover:bg-muted",
                  pathname === link.href && "bg-primary-50 text-primary-700"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="mt-2">
              <Link href="/contact">Get Free Site Survey</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
