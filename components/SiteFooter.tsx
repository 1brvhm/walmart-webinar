import Link from "next/link";
import Logo from "./Logo";
import { BRAND, SUPPORTED_BY } from "@/lib/business";

/**
 * Shared footer. The Privacy Policy and Terms of Service links must stay
 * publicly reachable from every page without logging in — carriers check both
 * URLs during A2P 10DLC campaign vetting.
 */
export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-2.5 font-bold tracking-tight">
              <Logo />
              {BRAND.shortName}
            </span>
            <p className="max-w-xs text-sm leading-6 text-faint">
              Independent e-commerce training hosted by {BRAND.hostName}.
            </p>
            <p className="text-sm leading-6 text-faint">
              Supported by{" "}
              <a
                href={SUPPORTED_BY.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand underline"
              >
                {SUPPORTED_BY.label}
              </a>
            </p>
          </div>

          <nav className="flex flex-col gap-2.5 text-sm font-semibold">
            <Link href="/privacy" className="text-muted transition-colors hover:text-brand">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted transition-colors hover:text-brand">
              Terms of Service
            </Link>
            <a
              href={`mailto:${BRAND.supportEmail}`}
              className="text-muted transition-colors hover:text-brand"
            >
              Contact support
            </a>
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-border pt-6 text-xs leading-6 text-faint">
          <p>
            &copy; {new Date().getFullYear()} {BRAND.legalName}. All rights
            reserved.
          </p>
          <p>
            Independent training. Not affiliated with, endorsed by, or sponsored
            by Walmart Inc. Walmart and Walmart Marketplace are trademarks of
            Walmart Apollo, LLC.
          </p>
          <p>
            Results are not typical or guaranteed. Nothing on this site is a
            promise of earnings. See our{" "}
            <Link href="/terms" className="font-semibold underline">
              Terms of Service
            </Link>{" "}
            for the full earnings disclaimer.
          </p>
        </div>
      </div>
    </footer>
  );
}
