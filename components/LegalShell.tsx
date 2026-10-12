import Link from "next/link";
import type { ReactNode } from "react";
import Logo from "./Logo";
import SiteFooter from "./SiteFooter";
import { BRAND, LEGAL_LAST_UPDATED } from "@/lib/business";

/**
 * Wrapper for the legal pages. Deliberately plain and free of CTAs: these pages
 * exist to be read and to be reviewed by carriers, not to convert.
 */
export default function LegalShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-border">
        <nav className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight">
            <Logo />
            {BRAND.shortName}
          </Link>
          <Link
            href="/"
            className="text-sm font-semibold text-muted transition-colors hover:text-brand"
          >
            &larr; Back to webinar
          </Link>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-3xl px-6 py-14">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-sm font-semibold text-faint">
          Last updated: {LEGAL_LAST_UPDATED}
        </p>
        <p className="mt-6 text-lg leading-8 text-muted">{intro}</p>

        <div className="legal mt-10">{children}</div>

        <div className="card mt-14 bg-surface p-6 text-sm leading-6 text-muted">
          <p className="font-bold text-foreground">Questions about this policy?</p>
          <p className="mt-2">
            Contact {BRAND.legalName} at{" "}
            <a href={`mailto:${BRAND.supportEmail}`} className="font-semibold text-brand underline">
              {BRAND.supportEmail}
            </a>{" "}
            or {BRAND.supportPhone}. Mailing address: {BRAND.address}.
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
