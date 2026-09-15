import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/utils";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink(
        siteConfig.whatsapp,
        "Hi, I'd like to enquire about mobile signal booster installation."
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-20 right-4 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-success text-white shadow-lg transition-transform hover:scale-105 lg:bottom-6 lg:flex"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
