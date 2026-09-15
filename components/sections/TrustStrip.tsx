import { Wrench, MapPinned, Building2, ClipboardCheck, Radio, LifeBuoy } from "lucide-react";

const items = [
  { icon: Wrench, label: "Professional Installation" },
  { icon: MapPinned, label: "Mumbai-Wide Service" },
  { icon: Building2, label: "Home & Commercial Solutions" },
  { icon: ClipboardCheck, label: "Site Assessment" },
  { icon: Radio, label: "Multi-Network Solutions" },
  { icon: LifeBuoy, label: "After-Sales Support" },
];

export function TrustStrip() {
  return (
    <section className="border-b border-border bg-white">
      <div className="container grid grid-cols-2 gap-px overflow-hidden rounded-none sm:grid-cols-3 lg:grid-cols-6">
        {items.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-2 border-b border-r border-border/70 px-4 py-6 text-center last:border-r-0 sm:border-b-0"
          >
            <Icon className="h-5 w-5 text-primary-600" />
            <span className="text-[12.5px] font-semibold leading-tight text-navy">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
