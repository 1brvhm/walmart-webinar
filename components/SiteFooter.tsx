import Link from "next/link";
import Logo from "./Logo";
import { BRAND, SUPPORTED_BY } from "@/lib/business";

/**
 * Shared footer. The Privacy Policy and Terms links must stay publicly
 * reachable from every page without logging in — carriers check both URLs
 * during A2P 10DLC campaign vetting.
 */
export default function SiteFooter() {
  const linkClass =
    "min-h-10 text-base text-blue no-underline hover:underline sm:min-h-8 sm:text-[15px]";

  return (
    <footer className="border-t border-border pb-[25px] pt-[45px]">
      <div className="mx-auto w-[min(1180px,calc(100%-36px))] sm:w-[min(1180px,calc(100%-64px))]">
        <div className="grid grid-cols-2 gap-[30px] sm:grid-cols-[1.5fr_1fr_1fr] sm:gap-[25px] lg:grid-cols-[2fr_1fr_1fr] lg:gap-[50px]">
          <div className="col-span-2 sm:col-span-1">
            <Logo href="/#main" />
            <p className="mt-5 max-w-[420px] text-[15px] text-muted sm:text-sm">
              Practical e-commerce education with {BRAND.hostName}.
              <br />
              Live webinar sponsored by{" "}
              <a
                href={SUPPORTED_BY.url}
                target="_blank"
                rel="noopener"
                className="text-ink underline underline-offset-2 hover:text-blue"
              >
                SourceDart
              </a>
              .
            </p>
          </div>
          <div>
            <h3 className="display mb-[15px] text-[17px]">Explore</h3>
            <div className="flex flex-col items-start gap-2">
              <Link href="/#learn" className={linkClass}>The webinar</Link>
              <Link href="/#host" className={linkClass}>Meet Jacob</Link>
              <Link href="/#faq" className={linkClass}>Questions &amp; answers</Link>
              {/* Plain <a> on purpose: a real hash navigation fires `hashchange`,
                  which is what opens the registration modal. */}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/#register" className={linkClass}>Save my free seat</a>
            </div>
          </div>
          <div>
            <h3 className="display mb-[15px] text-[17px]">Support &amp; policies</h3>
            <div className="flex min-w-0 flex-col items-start gap-2">
              <Link href="/terms" className={linkClass}>Terms &amp; Conditions</Link>
              <Link href="/privacy" className={linkClass}>Privacy Policy</Link>
              <a href={`mailto:${BRAND.supportEmail}`} className={linkClass}>
                Contact support
              </a>
            </div>
          </div>
        </div>

        <div className="mt-[35px] border-t border-border pt-[22px] text-[13px] text-muted [&>p]:my-2">
          <p>
            &copy; {new Date().getFullYear()} {BRAND.legalName}. All rights reserved.
          </p>
          <p>
            Independent training. Not affiliated with, endorsed by, or sponsored by Walmart Inc.
            Walmart and Walmart Marketplace are trademarks of their respective owners.
          </p>
          <p>
            Educational content only. No income, profit, or business results are guaranteed.
            Selling online involves risk.
          </p>
        </div>
      </div>
    </footer>
  );
}
