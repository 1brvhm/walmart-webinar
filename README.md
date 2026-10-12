# E-Commerce with Jacob Jones — webinar landing page

Next.js 16 (App Router) + Tailwind CSS 4 landing page with a registration modal
that forwards leads to Zapier, plus the legal pages needed for US A2P 10DLC SMS
registration.

> **Not legal advice.** The policy text here is a drafted starting point written
> to cover the disclosures carriers and aggregators look for. Have a licensed
> attorney review both pages before you publish them or submit them with a
> brand/campaign application.

## Run it

```bash
npm install
cp .env.local.example .env.local   # then paste your real Zapier hook URL
npm run dev                        # http://localhost:3000
```

## Routes

| Route                    | What it is                                  |
| ------------------------ | ------------------------------------------- |
| `/`                      | Landing page + registration modal           |
| `/privacy`               | Privacy Policy (incl. mandatory SMS clause) |
| `/terms`                 | Terms of Service (incl. SMS Communications) |
| `/api/webinar-register`  | Accepts the form, forwards it to Zapier     |

## ⚠️ Fill these in before you apply

Already filled in from the Maryland registration:

- `legalName` — Elevate Digital Group LLC
- `address` — 4822 Vicky Rd, Baltimore, MD 21236, USA
- `governingState` — Maryland

Still marked `TODO`, and **placeholder values will fail 10DLC vetting**:

- `supportEmail` — a genuinely monitored inbox (it's your HELP contact)
- `supportPhone` — customer-care number you control
- `siteUrl` — canonical https URL, no trailing slash

**The EIN is deliberately not in this codebase.** `lib/business.ts` is imported
by a client component, so anything stored there can reach public browser
JavaScript, and it would live in git history either way. The EIN belongs in your
10DLC brand application and a password manager — the website never needs it.

**Brand name vs legal name.** The site trades as *E-Commerce with Jacob Jones*
while the registered entity is *Elevate Digital Group LLC*. Both legal pages
state that relationship explicitly ("operating as"). When you register the
10DLC brand, submit the legal name and EIN, and put the trading name in the
DBA / brand-display field — mismatches between the two are a common vetting
rejection.

`lib/business.ts` is the single source of truth: the form disclosure, both legal
pages, and the stored consent record all read from it, so these values stay
identical everywhere. Carriers compare those three copies.

## How registration works

1. Any **Book Your Free Spot** button opens a single shared modal
   ([`components/RegistrationProvider.tsx`](components/RegistrationProvider.tsx)
   holds the one instance, so every CTA shares the same form and success state).
2. The modal validates Full Name / Email / Phone client-side, then POSTs JSON to
   `/api/webinar-register`.
3. The route handler re-validates (the client can be bypassed) and forwards the
   payload to the Zapier catch hook with a 10s timeout.
4. On success the modal swaps to **"You are registered!"**.

### Payload sent to Zapier

With SMS consent given:

```json
{
  "fullName": "Jordan Reyes",
  "email": "jordan@example.com",
  "phone": "(555) 012-3456",
  "source": "hero",
  "webinar": "E-Commerce with Jacob Jones — Walmart Selling Webinar",
  "brand": "E-Commerce with Jacob Jones",
  "submittedAt": "2026-10-13T12:00:00.000Z",
  "smsConsent": true,
  "smsProgramName": "E-Commerce with Jacob Jones Webinar Alerts",
  "smsConsentText": "I agree to receive text messages from …",
  "smsConsentTimestamp": "2026-10-13T12:00:00.000Z",
  "smsConsentMethod": "web form checkbox, unchecked by default",
  "smsConsentUrl": "https://yourdomain.com/",
  "smsConsentSource": "hero",
  "smsConsentIp": "203.0.113.44",
  "smsConsentUserAgent": "Mozilla/5.0 …",
  "privacyPolicyUrl": "https://yourdomain.com/privacy",
  "termsOfServiceUrl": "https://yourdomain.com/terms"
}
```

Without it, `smsConsent` is `false` and the consent fields are empty.

`source` records which CTA converted (`nav`, `hero`, `hero-card`, `about`,
`closing`).

### ❗ Required Zapier step

**Add a Filter in your Zap: only continue to the SMS action when `smsConsent` is
`true`.** The API sends every registration through regardless, because people
who decline SMS still need their email confirmation. Texting a registration
where `smsConsent` is `false` is exactly the violation this setup exists to
prevent.

Store the whole consent record (text, timestamp, IP, user-agent) somewhere
durable — a Google Sheet or Airtable row is fine. If a carrier or complaint ever
challenges an opt-in, that record is your evidence.

### Response codes

| Status | Meaning                                            |
| ------ | -------------------------------------------------- |
| 201    | Registration forwarded to Zapier                   |
| 400    | Invalid JSON, or a field failed validation         |
| 502    | Zapier unreachable, timed out, or returned non-2xx |

## How the consent flow meets A2P 10DLC

| Requirement                       | Where it's handled                                            |
| --------------------------------- | ------------------------------------------------------------- |
| Opt-in unchecked by default       | `useState(false)` + controlled checkbox, no `defaultChecked`   |
| Brand name in the disclosure      | `SMS_CONSENT_TEXT`, built from `BRAND.name`                    |
| Message purpose stated            | `SMS_PROGRAM.description`                                      |
| "Message and data rates may apply"| In the disclosure and ToS §5.5                                 |
| "Message frequency varies"        | In the disclosure and ToS §5.5                                 |
| STOP / HELP keywords              | In the disclosure, ToS §5.3 and §5.4                           |
| Privacy + Terms links at opt-in   | Rendered next to the checkbox, outside the `<label>`           |
| Consent not a condition of service| Checkbox is optional; registration succeeds either way         |
| No sharing/selling of mobile data | Privacy §5, ToS §5.7                                           |
| Collected only via the website    | Privacy §3                                                     |
| Proof of opt-in retained          | Consent record forwarded to Zapier; Privacy §7 (4-year retention) |
| Carriers not liable               | ToS §5.6                                                        |

Two deliberate choices worth knowing:

- **The checkbox is optional, not required.** Consent can't be a condition of
  service, and the disclosure says so — so gating registration on it would
  contradict your own stated terms. Phone number stays required; SMS doesn't.
- **The stored consent text comes from the server**, not the request body. A
  crafted POST can't fabricate a record claiming someone agreed to different
  wording.

## Configuration

- **Brand, legal, and SMS program details** — [`lib/business.ts`](lib/business.ts)
- **Webinar date/time/seats** — the `WEBINAR` object in the same file
- **Zapier hook** — `ZAPIER_WEBHOOK_URL`, **required**, no default. Copy
  `.env.local.example` to `.env.local` and paste your real hook in. Treat the
  URL as a secret: anyone holding it can post registrations into your Zap, so it
  is deliberately kept out of source control. Set it in your host's environment
  settings for production (Vercel: Project Settings → Environment Variables).
  Without it the API returns 500 rather than silently dropping a registration.
- **Colours** — CSS custom properties in [`app/globals.css`](app/globals.css)

## Before going live

The marketing copy is placeholder. Replace with Jacob's real details:

- The stats in the `ValueStrip` section of `app/page.tsx` (`120k+`, `2M+`, `0`)
  are illustrative — swap in figures you can stand behind. Unsupported claims
  are an FTC problem on top of a credibility one.
- The host bio, agenda timings, and FAQ answers in `app/page.tsx`.
- The `metadata` copy in `app/layout.tsx` for SEO and link previews.
- Confirm the earnings disclaimer in ToS §7 matches how you actually market the
  webinar.
