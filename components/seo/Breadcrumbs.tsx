import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { breadcrumbSchema, type BreadcrumbItem } from "@/lib/seo";

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const full = [{ name: "Home", path: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="border-b border-border bg-muted/40">
      <div className="container flex items-center gap-1.5 overflow-x-auto py-3 text-sm text-muted-foreground">
        {full.map((item, i) => {
          const isLast = i === full.length - 1;
          return (
            <span key={item.path} className="flex shrink-0 items-center gap-1.5">
              {i === 0 ? (
                <Link href={item.path} className="flex items-center gap-1 hover:text-primary-700">
                  <Home className="h-3.5 w-3.5" />
                  <span className="sr-only">Home</span>
                </Link>
              ) : isLast ? (
                <span className="font-medium text-foreground" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="hover:text-primary-700">
                  {item.name}
                </Link>
              )}
              {!isLast && <ChevronRight className="h-3.5 w-3.5" />}
            </span>
          );
        })}
      </div>
      <JsonLd data={breadcrumbSchema(full)} />
    </nav>
  );
}
