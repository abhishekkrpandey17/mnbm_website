import Link from "next/link";
import { SignalHigh, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
          <SignalHigh className="h-8 w-8" />
        </span>
        <h1 className="mt-6 font-display text-3xl font-extrabold text-navy">Page Not Found</h1>
        <p className="mt-3 max-w-md text-[15px] text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved. Let&apos;s
          get you back on track.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/">
              Back to Home <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
