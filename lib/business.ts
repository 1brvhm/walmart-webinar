/**
 * Single source of truth for brand, legal, and SMS-program details.
 *
 * Carriers compare the consent language stored with each opt-in against the
 * language actually shown on the form, and against the Privacy Policy and
 * Terms of Service you submit during A2P 10DLC brand/campaign vetting. Keeping
 * all of it in this one file is what keeps those three copies identical.
 *
 * The EIN is deliberately absent: this module is imported by a client
 * component, so anything here can reach public browser JavaScript.
 */

export const BRAND = {
  /** Public-facing brand name. Must match the brand name in the SMS disclosure. */
  name: "E-Commerce with Jacob Jones",

  /** Short form for tight spaces (nav, footer). */
  shortName: "E-Commerce with Jacob Jones",

  /** Host's display name. */
  hostName: "Jacob Jones",

  /**
   * Registered legal entity, exactly as filed in Maryland. Carriers match this
   * against the EIN during brand vetting, so it must stay verbatim.
   *
   * NOTE: the EIN itself is deliberately NOT stored in this file. This module is
   * imported by a client component, so anything added here can end up in public
   * browser JavaScript (and in git history). Keep the EIN in your 10DLC
   * application and a password manager only.
   */
  legalName: "Elevate Digital Group LLC",

  /**
   * Registered business postal address, published in both legal pages and
   * required in commercial email under CAN-SPAM.
   */
  address: "4822 Vicky Rd, Baltimore, MD 21236, USA",

  /** Monitored support inbox. Published in both policies; the HELP contact. */
  supportEmail: "support@sourcedart.com",

  /** Customer-care number, published in both policies. */
  supportPhone: "+1 (443) 371-8286",

  /** Canonical production URL, no trailing slash. */
  siteUrl: "https://sourcedart.io",

  /** State of formation, whose law governs the Terms of Service. */
  governingState: "Maryland",
} as const;

/** Partner credited on the landing page and in the footer. */
export const SUPPORTED_BY = {
  label: "sourcedart.io",
  url: "https://sourcedart.io",
} as const;

export const SMS_PROGRAM = {
  /**
   * The campaign/program name you register with the carriers. The same string
   * must appear in your Terms of Service and in HELP replies.
   */
  name: "E-Commerce with Jacob Jones Webinar Alerts",

  /** Plain-language description of what subscribers receive. */
  description:
    "webinar confirmations, Zoom join links, and time-sensitive reminders for the webinar you registered for",

  /** Expected cadence. Keep this honest — it is a disclosure, not marketing. */
  frequency:
    "Message frequency varies; most registrants receive 3–5 messages per webinar they register for",

  optOutKeyword: "STOP",
  helpKeyword: "HELP",
} as const;

/**
 * The exact SMS consent disclosure rendered next to the opt-in checkbox.
 *
 * This string is also stored verbatim with every opt-in record (see the
 * `smsConsentText` field forwarded by /api/webinar-register) so that you can
 * produce, for any given phone number, the precise words that person agreed to.
 * Carriers and the TCPA both ask for exactly that.
 *
 * If you edit this text, the change applies to opt-ins collected from that
 * point on; previously stored records keep the wording that was shown to them.
 */
export const SMS_CONSENT_TEXT = `I agree to receive text messages from ${BRAND.name} at the phone number provided, including ${SMS_PROGRAM.description}. Consent is not a condition of purchase or of attending the webinar. Message and data rates may apply. Message frequency varies. Reply ${SMS_PROGRAM.optOutKeyword} to cancel or ${SMS_PROGRAM.helpKeyword} for help.`;

/** Last substantive revision of the legal pages. Shown as "Last updated". */
export const LEGAL_LAST_UPDATED = "October 13, 2026";

/** Webinar schedule — surfaced on the landing page. */
export const WEBINAR = {
  title: "E-Commerce with Jacob Jones — Walmart Selling Webinar",
  date: "Thursday, October 22",
  time: "2:00 PM ET / 11:00 AM PT",
  duration: "75 minutes + live Q&A",
  seats: "300 seats",
} as const;
