"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { SMS_CONSENT_TEXT, SMS_PROGRAM, WEBINAR } from "@/lib/business";
import { WalmartSpark } from "./SeatButton";

/**
 * Same-origin proxy for the Zapier catch hook. The real hook URL stays in a
 * server env var (ZAPIER_WEBHOOK_URL) — shipping it to the browser would let
 * anyone post fake registrations into the Zap.
 */
const WEBHOOK_URL = "/api/webinar-register";

type FieldErrors = Partial<Record<"fullName" | "email" | "phone" | "terms", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FOCUSABLE =
  'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';

function validate(
  values: { fullName: string; email: string; phone: string },
  acceptedTerms: boolean,
): FieldErrors {
  const errors: FieldErrors = {};

  if (values.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name.";
  }
  if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  // Loose on formatting, strict on substance: enough digits to be callable.
  if (values.phone.replace(/\D/g, "").length < 7) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (!acceptedTerms) {
    errors.terms = "Please confirm you are 18+ and agree to the terms.";
  }

  return errors;
}

export default function RegisterModal({ onClose }: { onClose: () => void }) {
  // ---- The four values sent to the webhook ----
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // Strict boolean, unchecked by default: A2P 10DLC requires the user to tick
  // it themselves, and it is never a condition of registering.
  const [smsConsent, setSmsConsent] = useState<boolean>(false);

  // ---- UI state ----
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");

  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  // Required agreement box. Read at submit time only; it is not part of the payload.
  const termsRef = useRef<HTMLInputElement>(null);
  // The element focused before opening, so focus can be handed back on close.
  const restoreFocusRef = useRef<Element | null>(null);

  const handleClose = useCallback(() => {
    if (isLoading) return; // don't abandon an in-flight registration
    onClose();
  }, [isLoading, onClose]);

  // Remember the trigger, lock background scroll, and focus the first field.
  useEffect(() => {
    restoreFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus after paint so the animated panel is mounted.
    const raf = requestAnimationFrame(() => firstFieldRef.current?.focus());

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = previousOverflow;
      if (restoreFocusRef.current instanceof HTMLElement) {
        restoreFocusRef.current.focus();
      }
    };
  }, []);

  // Escape to close + keep Tab inside the dialog.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const nodes = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((node) => node.offsetParent !== null);
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [handleClose]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isLoading) return;

    const nextErrors = validate(
      { fullName, email, phone },
      Boolean(termsRef.current?.checked),
    );
    setErrors(nextErrors);
    setFormError("");
    if (Object.keys(nextErrors).length > 0) return;

    setIsLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          smsConsent,
        }),
      });

      if (response.status === 200) {
        setIsRegistered(true);
        return;
      }

      const data: { error?: string } = await response
        .json()
        .catch(() => ({}) as { error?: string });
      setFormError(
        data.error ?? "We couldn’t confirm your registration. Please try again in a moment.",
      );
    } catch {
      setFormError(
        "We couldn’t reach the server. Check your connection and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  const fieldClass =
    "min-h-14 w-full rounded-[7px] border border-border-strong bg-white px-3.5 py-3 text-lg text-ink placeholder:text-[#9a90a0] focus:border-purple focus:outline-none focus-visible:outline-none focus:ring-[3px] focus:ring-purple/15 disabled:opacity-60 aria-[invalid=true]:border-danger";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#21142bbd] p-3"
      onMouseDown={(event) => {
        // Only a press on the backdrop itself should close.
        if (event.target === event.currentTarget) handleClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="register-title"
        className="modal-panel relative my-auto max-h-[calc(100dvh-24px)] w-full max-w-[580px] overflow-auto overscroll-contain rounded-[18px] border border-border bg-white text-ink"
      >
        {/* Sticky top bar */}
        <div className="sticky top-0 z-[3] flex items-center justify-between gap-4 border-b border-border bg-pale px-4 py-3 text-base font-bold sm:px-6 sm:py-3.5">
          <p className="text-sm sm:text-base">Free live webinar</p>
          <button
            type="button"
            onClick={handleClose}
            disabled={isLoading}
            aria-label="Close registration"
            className="min-h-11 rounded-[7px] border border-border bg-white px-3.5 py-2 text-base font-normal text-ink disabled:opacity-50"
          >
            Close{" "}
            <span aria-hidden="true" className="ml-2 text-xl">
              ×
            </span>
          </button>
        </div>

        {isRegistered ? (
          <div className="flex flex-col items-center px-5 py-10 text-center sm:px-7">
            <div className="flex size-16 items-center justify-center rounded-full bg-pale-2 text-purple">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M20 6 9 17l-5-5"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 id="register-title" className="display mt-5 text-[29px] sm:text-[32px]">
              You are registered!
            </h2>
            <p className="mt-2 text-[17px] font-extrabold">
              {WEBINAR.dateShort} · {WEBINAR.time}
            </p>
            <p className="mt-4 max-w-[420px] text-[17px] text-muted">
              Your seat is reserved. Watch your inbox for the webinar access link
              &mdash; if it&apos;s not there in a few minutes, check your promotions
              or spam folder.
            </p>
            {smsConsent && (
              <p className="mt-3 max-w-[420px] text-[15px] text-muted">
                You also opted in to text reminders. Reply{" "}
                <strong className="text-ink">{SMS_PROGRAM.optOutKeyword}</strong> to any message
                to stop them, or <strong className="text-ink">{SMS_PROGRAM.helpKeyword}</strong>{" "}
                for help.
              </p>
            )}
            <button
              type="button"
              onClick={handleClose}
              className="mt-7 min-h-[56px] w-full rounded-[9px] border border-purple bg-white px-6 text-lg font-extrabold text-purple transition-colors hover:bg-pale"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="px-5 py-6 sm:p-7">
            <h2 id="register-title" className="display mb-[15px] text-[29px] sm:text-[32px]">
              Save your free seat
            </h2>
            <p className="text-[17px] font-extrabold">
              {WEBINAR.dateShort} · {WEBINAR.time}
            </p>
            <p className="mb-6 text-[17px]">
              Enter your details below to receive your webinar link by email.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-[21px]">
                <label htmlFor="fullName" className="mb-2 block text-[17px] font-bold">
                  Full name
                </label>
                <input
                  ref={firstFieldRef}
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  maxLength={80}
                  placeholder="Your full name"
                  className={fieldClass}
                  value={fullName}
                  disabled={isLoading}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
                  onChange={(e) => setFullName(e.target.value)}
                />
                {errors.fullName && <FieldError id="fullName-error" message={errors.fullName} />}
              </div>

              <div className="mb-[21px]">
                <label htmlFor="email" className="mb-2 block text-[17px] font-bold">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  maxLength={254}
                  placeholder="you@example.com"
                  className={fieldClass}
                  value={email}
                  disabled={isLoading}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <FieldError id="email-error" message={errors.email} />}
              </div>

              <div className="mb-[21px]">
                <label htmlFor="phone" className="mb-2 block text-[17px] font-bold">
                  Mobile phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  maxLength={30}
                  placeholder="+1 (555) 000-0000"
                  className={fieldClass}
                  value={phone}
                  disabled={isLoading}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "phone-error" : "phone-help"}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone ? (
                  <FieldError id="phone-error" message={errors.phone} />
                ) : (
                  <p id="phone-help" className="mt-2.5 text-sm text-muted">
                    Text reminders are optional. Your access details arrive by email.
                  </p>
                )}
              </div>

              {/* Required agreement — validated, but not sent in the payload. */}
              <label className="my-[22px] flex items-start gap-3 text-[15px] leading-relaxed">
                <input
                  ref={termsRef}
                  type="checkbox"
                  name="terms"
                  disabled={isLoading}
                  aria-invalid={Boolean(errors.terms)}
                  aria-describedby={errors.terms ? "terms-error" : undefined}
                  onChange={() => errors.terms && setErrors((e) => ({ ...e, terms: undefined }))}
                  className="mt-[3px] size-[22px] shrink-0 cursor-pointer accent-purple"
                />
                <span className="min-w-0">
                  I am 18 or older, agree to the{" "}
                  <Link href="/terms" target="_blank" className="text-purple underline">
                    Terms &amp; Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" target="_blank" className="text-purple underline">
                    Privacy Policy
                  </Link>
                  , and agree to receive the webinar access details and reminders by email.
                </span>
              </label>
              {errors.terms && (
                <div className="-mt-3 mb-4 pl-[34px]">
                  <FieldError id="terms-error" message={errors.terms} />
                </div>
              )}

              {/* A2P 10DLC express written consent — optional, unchecked by default. */}
              <div className="my-[22px] border-t border-border pt-5">
                <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-relaxed">
                  <input
                    id="smsConsent"
                    name="smsConsent"
                    type="checkbox"
                    checked={smsConsent}
                    disabled={isLoading}
                    aria-describedby="smsConsent-links"
                    onChange={(e) => setSmsConsent(e.target.checked)}
                    className="mt-[3px] size-[22px] shrink-0 cursor-pointer accent-purple"
                  />
                  <span className="min-w-0">{SMS_CONSENT_TEXT}</span>
                </label>
                {/* Kept outside the <label> so tapping a link doesn't toggle the box. */}
                <p id="smsConsent-links" className="mt-1.5 pl-[34px] text-[15px]">
                  <Link href="/terms#sms" target="_blank" className="text-purple underline">
                    SMS terms
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" target="_blank" className="text-purple underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>

              {formError && (
                <p
                  role="alert"
                  className="mb-5 border-l-4 border-danger bg-[#fbeef0] p-[15px] text-base text-danger"
                >
                  {formError}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="seat-cta inline-flex min-h-[60px] w-full items-center justify-center gap-3 rounded-[9px] border border-plum bg-plum px-[27px] py-[17px] text-[19px] font-extrabold leading-snug text-white transition-colors hover:bg-purple disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Spinner />
                    Reserving your seat&hellip;
                  </>
                ) : (
                  <>
                    <WalmartSpark className="size-[21px]" />
                    Register for free
                  </>
                )}
              </button>

              <p className="mt-2.5 text-center text-sm text-muted">
                No credit card required · Free live training
              </p>
            </form>
          </div>
        )}

        {/* Announce state changes to screen readers. */}
        <span aria-live="polite" className="sr-only">
          {isLoading
            ? "Submitting your registration"
            : isRegistered
              ? "You are registered"
              : ""}
        </span>
      </div>
    </div>
  );
}

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} className="mt-2 text-sm font-semibold text-danger">
      {message}
    </p>
  );
}

function Spinner() {
  return (
    <svg className="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
