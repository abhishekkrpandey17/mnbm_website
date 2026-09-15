import Link from "next/link";
import { Phone, MessageCircle, ClipboardList } from "lucide-react";
import { siteConfig } from "@/config/site";
import { telLink, whatsappLink } from "@/lib/utils";

export function MobileStickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-border bg-white shadow-[0_-4px_16px_rgba(15,28,82,0.08)] lg:hidden">
      <a
        href={telLink(siteConfig.phone)}
        className="flex flex-col items-center gap-0.5 py-2.5 text-navy active:bg-muted"
      >
        <Phone className="h-5 w-5" />
        <span className="text-[11px] font-semibold">Call Now</span>
      </a>
      <a
        href={whatsappLink(
          siteConfig.whatsapp,
          "Hi, I'd like to enquire about mobile signal booster installation."
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-0.5 border-x border-border bg-success/5 py-2.5 text-success active:bg-success/10"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="text-[11px] font-semibold">WhatsApp</span>
      </a>
      <Link
        href="/contact"
        className="flex flex-col items-center gap-0.5 bg-primary-600 py-2.5 text-white active:bg-primary-700"
      >
        <ClipboardList className="h-5 w-5" />
        <span className="text-[11px] font-semibold">Get Quote</span>
      </Link>
    </div>
  );
}
