import { SectionHeading } from "./SectionHeading";
import { networkProviders } from "@/config/content";

export function NetworkProviders() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="container">
        <SectionHeading
          eyebrow="Network Compatibility"
          title="Solutions for Major Mobile Networks"
          description="Solutions may be available for compatible network bands and local signal conditions across these operators. Compatibility is confirmed during your site survey."
          align="center"
          className="mx-auto"
        />

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {networkProviders.map((provider) => (
            <div
              key={provider.slug}
              className="flex h-24 items-center justify-center rounded-2xl border border-border bg-muted/40 font-display text-lg font-extrabold text-navy"
            >
              {provider.name}
            </div>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-xl text-center text-xs text-muted-foreground">
          Logos and trademarks belong to their respective owners. This does not imply
          endorsement or official partnership.
        </p>
      </div>
    </section>
  );
}
