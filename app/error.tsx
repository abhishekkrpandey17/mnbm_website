"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app-error]", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
        <AlertTriangle className="h-8 w-8" />
      </span>
      <h1 className="mt-6 font-display text-3xl font-extrabold text-navy">
        Something Went Wrong
      </h1>
      <p className="mt-3 max-w-md text-[15px] text-muted-foreground">
        An unexpected error occurred. Please try again, or contact us if the problem persists.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button onClick={() => reset()}>Try Again</Button>
        <Button asChild variant="secondary">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  );
}
