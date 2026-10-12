import { NextResponse } from "next/server";
import { BRAND, SMS_CONSENT_TEXT, SMS_PROGRAM, WEBINAR } from "@/lib/business";

// Outbound webhook call — never cache a registration.
export const dynamic = "force-dynamic";

/**
 * Zapier catch hook that receives registrations.
 *
 * Read from the environment with no hardcoded fallback: the hook URL is a write
 * credential — anyone holding it can post arbitrary registrations into the Zap —
 * so it must never live in source control. Set ZAPIER_WEBHOOK_URL in .env.local
 * for development and in your host's environment settings for production.
 */
function webhookUrl(): string | undefined {
  return process.env.ZAPIER_WEBHOOK_URL?.trim() || undefined;
}

/** Zapier is usually fast; don't let a hung hook hold the request open. */
const WEBHOOK_TIMEOUT_MS = 10_000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type RegisterBody = {
  fullName?: unknown;
  email?: unknown;
  phone?: unknown;
  smsConsent?: unknown;
  smsConsentText?: unknown;
  source?: unknown;
};

/** Trim and cap a free-text field so an oversized payload can't be forwarded. */
function asString(value: unknown, maxLength = 200): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

/**
 * Best-effort originating IP, recorded as part of the proof of opt-in.
 * `x-forwarded-for` is a comma-separated chain; the client is the first entry.
 */
function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export async function POST(request: Request) {
  let body: RegisterBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const fullName = asString(body.fullName, 120);
  const email = asString(body.email, 200);
  const phone = asString(body.phone, 40);
  const source = asString(body.source, 60) || "unknown";
  // Only an explicit boolean true counts as consent — never a truthy string.
  const smsConsent = body.smsConsent === true;

  // --- Validation (mirrors the client, since the client can be bypassed) ---
  if (fullName.length < 2) {
    return NextResponse.json(
      { error: "Please enter your full name." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  if (phone.replace(/\D/g, "").length < 7) {
    return NextResponse.json(
      { error: "Please enter a valid phone number." },
      { status: 400 },
    );
  }

  /**
   * Proof of express written consent, recorded only when the box was ticked.
   *
   * The consent text is taken from the server's own copy of SMS_CONSENT_TEXT
   * rather than from the request body, so a crafted request cannot fabricate
   * a record claiming the user agreed to different wording.
   */
  const consentRecord = smsConsent
    ? {
        smsConsent: true,
        smsProgramName: SMS_PROGRAM.name,
        smsConsentText: SMS_CONSENT_TEXT,
        smsConsentTimestamp: new Date().toISOString(),
        smsConsentMethod: "web form checkbox, unchecked by default",
        smsConsentUrl: `${BRAND.siteUrl}/`,
        smsConsentSource: source,
        smsConsentIp: clientIp(request),
        smsConsentUserAgent: asString(
          request.headers.get("user-agent") ?? "",
          400,
        ),
        privacyPolicyUrl: `${BRAND.siteUrl}/privacy`,
        termsOfServiceUrl: `${BRAND.siteUrl}/terms`,
      }
    : {
        smsConsent: false,
        smsConsentText: "",
        smsConsentTimestamp: "",
      };

  const destination = webhookUrl();
  if (!destination) {
    console.error(
      "ZAPIER_WEBHOOK_URL is not set — refusing to drop a registration silently.",
    );
    return NextResponse.json(
      { error: "Registration is temporarily unavailable. Please try again shortly." },
      { status: 500 },
    );
  }

  const payload = {
    fullName,
    email,
    phone,
    source,
    webinar: WEBINAR.title,
    brand: BRAND.name,
    submittedAt: new Date().toISOString(),
    ...consentRecord,
  };

  try {
    const response = await fetch(destination, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error(
        `Zapier webhook responded ${response.status}: ${detail.slice(0, 500)}`,
      );
      return NextResponse.json(
        { error: "We couldn't save your registration. Please try again." },
        { status: 502 },
      );
    }
  } catch (err) {
    const timedOut = err instanceof Error && err.name === "TimeoutError";
    console.error("Zapier webhook request failed:", err);
    return NextResponse.json(
      {
        error: timedOut
          ? "The registration service timed out. Please try again."
          : "We couldn't reach the registration service. Please try again.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true, smsConsent }, { status: 201 });
}
