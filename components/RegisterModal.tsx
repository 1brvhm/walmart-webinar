"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { BRAND, SMS_CONSENT_TEXT, SMS_PROGRAM } from "@/lib/business";

type Status = "idle" | "submitting" | "success" | "error";

type FieldErrors = Partial<Record<"fullName" | "email" | "phone", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FOCUSABLE =
  'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';

function validate(values: {
  fullName: string;
  email: string;
  phone: string;
}): FieldErrors {
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

  return errors;
}

export default function RegisterModal({
  onClose,
  source,
}: {
  onClose: () => void;
  source: string;
}) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // Starts false: A2P 10DLC requires the opt-in to be unchecked by default and
  // ticked by the user. It is never a condition of registering.
  const [smsConsent, setSmsConsent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");

  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  // The element focused before opening, so focus can be handed back on close.
  const restoreFocusRef = useRef<Element | null>(null);

  const isSubmitting = status === "submitting";

  const handleClose = useCallback(() => {
    if (isSubmitting) return; // don't abandon an in-flight registration
    onClose();
  }, [isSubmitting, onClose]);

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
    if (isSubmitting) return;

    const nextErrors = validate({ fullName, email, phone });
    setErrors(nextErrors);
    setFormError("");

    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/webinar-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          smsConsent,
          // Sent so the stored opt-in record holds the exact words shown here.
          smsConsentText: smsConsent ? SMS_CONSENT_TEXT : "",
          source,
        }),
      });

      const data: { error?: string } = await response
        .json()
        .catch(() => ({}) as { error?: string });

      if (!response.ok) {
        setStatus("error");
        setFormError(
          data.error ?? "Something went wrong. Please try again in a moment.",
        );
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setFormError(
        "We couldn't reach the server. Check your connection and try again.",
      );
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-[#0a2440]/55 p-4 backdrop-blur-sm sm:items-center"
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
        aria-describedby="register-description"
        className="modal-panel card relative my-auto w-full max-w-md p-6 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={handleClose}
          disabled={isSubmitting}
          aria-label="Close registration form"
          className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full text-faint transition-colors hover:bg-surface hover:text-foreground disabled:opacity-40"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 6l12 12M18 6 6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {status === "success" ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-success/10 text-success">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M20 6 9 17l-5-5"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 id="register-title" className="text-2xl font-bold tracking-tight">
              You are registered!
            </h2>
            <p id="register-description" className="text-sm leading-6 text-muted">
              Your spot is saved. Check your inbox for the join link and calendar
              invite &mdash; if it&apos;s not there in a few minutes, look in your
              promotions or spam folder.
            </p>
            {smsConsent && (
              <p className="text-sm leading-6 text-muted">
                You also opted in to text reminders. Reply{" "}
                <strong>{SMS_PROGRAM.optOutKeyword}</strong> to any message to
                stop them, or <strong>{SMS_PROGRAM.helpKeyword}</strong> for
                help.
              </p>
            )}
            <button type="button" onClick={handleClose} className="btn-ghost mt-2 w-full">
              Done
            </button>
          </div>
        ) : (
          <>
            <span className="chip">
              <span className="size-1.5 rounded-full bg-spark" />
              Free &middot; Limited seats
            </span>
            <h2 id="register-title" className="mt-4 text-2xl font-bold tracking-tight">
              Book your free spot
            </h2>
            <p id="register-description" className="mt-2 text-sm leading-6 text-muted">
              Tell us where to send your join link. No payment, no commitment
              &mdash; just show up.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="fullName" className="text-sm font-semibold">
                  Full name
                </label>
                <input
                  ref={firstFieldRef}
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  className="field"
                  placeholder="Jordan Reyes"
                  value={fullName}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
                  onChange={(e) => setFullName(e.target.value)}
                />
                {errors.fullName && (
                  <p id="fullName-error" className="text-xs text-danger">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-semibold">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  className="field"
                  placeholder="you@example.com"
                  value={email}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <p id="email-error" className="text-xs text-danger">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="text-sm font-semibold">
                  Mobile phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  className="field"
                  placeholder="(555) 012-3456"
                  value={phone}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={
                    errors.phone ? "phone-error" : "phone-description"
                  }
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone ? (
                  <p id="phone-error" className="text-xs text-danger">
                    {errors.phone}
                  </p>
                ) : (
                  <p id="phone-description" className="text-xs leading-5 text-faint">
                    We only text you if you tick the box below.
                  </p>
                )}
              </div>

              {/* ---- A2P 10DLC express written consent ---- */}
              <div className="rounded-xl border border-border-strong bg-surface p-4">
                <label
                  htmlFor="smsConsent"
                  className="flex cursor-pointer items-start gap-3"
                >
                  <input
                    id="smsConsent"
                    name="smsConsent"
                    type="checkbox"
                    className="mt-0.5 size-5 shrink-0 cursor-pointer accent-brand"
                    checked={smsConsent}
                    disabled={isSubmitting}
                    aria-describedby="smsConsent-links"
                    onChange={(e) => setSmsConsent(e.target.checked)}
                  />
                  <span className="text-xs leading-5 text-muted">
                    {SMS_CONSENT_TEXT}
                  </span>
                </label>
                {/* Kept outside the <label> so tapping a link doesn't toggle the box. */}
                <p
                  id="smsConsent-links"
                  className="mt-2.5 pl-8 text-xs leading-5 text-faint"
                >
                  See our{" "}
                  <Link
                    href="/privacy"
                    target="_blank"
                    className="font-semibold text-brand underline"
                  >
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/terms"
                    target="_blank"
                    className="font-semibold text-brand underline"
                  >
                    Terms of Service
                  </Link>
                  . Optional &mdash; leave it unticked and you still get your
                  seat and email reminders.
                </p>
              </div>

              {formError && (
                <p
                  role="alert"
                  className="rounded-lg border border-danger/30 bg-danger/5 px-3 py-2 text-sm text-danger"
                >
                  {formError}
                </p>
              )}

              <button type="submit" disabled={isSubmitting} className="btn-spark mt-1 w-full">
                {isSubmitting ? (
                  <>
                    <Spinner />
                    Reserving your spot&hellip;
                  </>
                ) : (
                  "Book my free spot"
                )}
              </button>

              <p className="text-center text-xs leading-5 text-faint">
                {BRAND.name} uses your details only to deliver this webinar.
                We never sell your information.
              </p>
            </form>
          </>
        )}

        {/* Announce state changes to screen readers. */}
        <span aria-live="polite" className="sr-only">
          {isSubmitting
            ? "Submitting your registration"
            : status === "success"
              ? "You are registered"
              : ""}
        </span>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="spinner"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="3"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
