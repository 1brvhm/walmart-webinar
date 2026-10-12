import type { Metadata } from "next";
import Link from "next/link";
import LegalShell from "@/components/LegalShell";
import { BRAND, SMS_PROGRAM, WEBINAR } from "@/lib/business";

export const metadata: Metadata = {
  title: `Terms of Service — ${BRAND.name}`,
  description:
    "The terms governing your use of this website, your webinar registration, and our SMS and email communications, including opt-out and customer-care instructions.",
};

export default function TermsOfServicePage() {
  return (
    <LegalShell
      title="Terms of Service"
      intro={`These Terms of Service govern your use of ${BRAND.siteUrl} and your registration for webinars offered by ${BRAND.legalName}, operating as ${BRAND.name} ("we", "us", "our"). Please read them before registering.`}
    >
      <h2 id="acceptance">1. Acceptance of these terms</h2>
      <p>
        By using this website or submitting a registration form, you agree to
        these Terms of Service and to our{" "}
        <Link href="/privacy">Privacy Policy</Link>. If you do not agree, do not
        use the site or register.
      </p>

      <h2 id="eligibility">2. Eligibility</h2>
      <p>
        You must be at least 18 years old and able to form a binding contract to
        register. By registering you confirm that you meet those requirements and
        that the information you submit is accurate and belongs to you. In
        particular, you confirm that the phone number you provide is your own
        mobile number and that you are authorised to consent to receive messages
        at it.
      </p>

      <h2 id="what-we-provide">3. What we provide</h2>
      <p>
        We provide free, live, educational webinars about selling on e-commerce
        marketplaces, currently including{" "}
        <strong>{WEBINAR.title}</strong>, together with any replay we choose to
        make available. Sessions are educational only. We may change, reschedule,
        or cancel a session, or change its content, at any time.
      </p>

      <h2 id="registration">4. Registration</h2>
      <p>
        Registration is free and requires your name, email address, and phone
        number. We use these to deliver the session as described in our{" "}
        <Link href="/privacy">Privacy Policy</Link>. Seats may be limited, and
        registration does not guarantee access if capacity is reached.
      </p>

      {/* ---------------------- SMS section ---------------------- */}
      <h2 id="sms">5. SMS Communications</h2>

      <h3>5.1 Program name and description</h3>
      <p>
        Our text messaging program is called{" "}
        <strong>{SMS_PROGRAM.name}</strong>. If you expressly opt in by checking
        the SMS consent box on our registration form, {BRAND.name} will send you{" "}
        {SMS_PROGRAM.description}. These are service and informational messages
        tied to the webinar you registered for, and may occasionally include
        information about related training we offer.
      </p>

      <h3>5.2 Consent is voluntary</h3>
      <p>
        The SMS opt-in box is unchecked by default and you must check it
        yourself. <strong>Consent is not a condition of purchase</strong> or of
        attending any webinar. If you do not opt in, you will still receive your
        join link and reminders by email. We will never add your number to the
        program on your behalf, and we obtain numbers only as described in our{" "}
        <Link href="/privacy#how-we-collect">Privacy Policy</Link> — directly
        from you, through this website.
      </p>

      <h3>5.3 How to opt out</h3>
      <div className="legal-callout">
        <p>
          <strong>
            You can cancel the SMS service at any time by replying{" "}
            {SMS_PROGRAM.optOutKeyword} to any message you receive from us.
          </strong>{" "}
          After you send the message {SMS_PROGRAM.optOutKeyword} to us, we will
          send you a single reply message confirming that you have been
          unsubscribed. After that confirmation, you will no longer receive
          messages from us. If you want to rejoin, sign up again as you did the
          first time and we will resume sending messages to you.
        </p>
      </div>
      <p>
        You may also opt out by emailing{" "}
        <a href={`mailto:${BRAND.supportEmail}`}>{BRAND.supportEmail}</a> from
        the address you registered with, or by calling {BRAND.supportPhone}.
        Opting out of SMS does not cancel your webinar registration or your
        email confirmations.
      </p>

      <h3>5.4 How to get help</h3>
      <p>
        If you are experiencing problems with the messaging program, reply with
        the keyword <strong>{SMS_PROGRAM.helpKeyword}</strong> for assistance,
        and we will reply with instructions on how to use our service as well as
        how to unsubscribe. You can also reach our customer care team at{" "}
        <a href={`mailto:${BRAND.supportEmail}`}>{BRAND.supportEmail}</a> or{" "}
        {BRAND.supportPhone}.
      </p>

      <h3>5.5 Costs and message frequency</h3>
      <ul>
        <li>
          <strong>Message and data rates may apply.</strong> We do not charge
          for the messages, but your mobile carrier may charge you for sending
          or receiving SMS according to your plan. Contact your wireless
          provider for details of your plan.
        </li>
        <li>
          <strong>{SMS_PROGRAM.frequency}.</strong>
        </li>
        <li>
          The program is available in the United States, and message delivery
          depends on your carrier supporting it.
        </li>
      </ul>

      <h3>5.6 Carrier liability</h3>
      <div className="legal-callout">
        <p>
          <strong>
            Carriers are not liable for delayed or undelivered messages.
          </strong>{" "}
          Neither we nor the participating mobile carriers are responsible for
          messages that are delayed, misdirected, blocked, filtered, or not
          delivered, for any reason. Delivery is subject to effective
          transmission by your network operator and is outside our control.
          Mobile carriers are not liable for any such failure, and are not
          parties to these terms.
        </p>
      </div>
      <p>
        You agree to notify us if your mobile number changes or is reassigned, so
        that we do not message someone who has not consented.
      </p>

      <h3>5.7 Privacy of your mobile information</h3>
      <p>
        No mobile information will be shared with third parties or affiliates for
        marketing or promotional purposes. Text messaging originator opt-in data
        and consent are never shared with any third parties, excluding
        aggregators and providers of the text message services. See our{" "}
        <Link href="/privacy#sms-clause">Privacy Policy</Link> for full details.
      </p>

      <h2 id="email">6. Email communications</h2>
      <p>
        When you register, you agree to receive the transactional emails needed
        to deliver the webinar, such as your confirmation, join link, reminders,
        and replay. You may also receive occasional related training emails, and
        every such email includes an unsubscribe link.
      </p>

      <h2 id="no-guarantee">7. Educational purpose and earnings disclaimer</h2>
      <div className="legal-callout">
        <p>
          <strong>
            We make no guarantee of income, profit, or business results.
          </strong>{" "}
          Our webinars are educational and informational only. Any figures,
          examples, case studies, or results discussed are illustrative, reflect
          particular circumstances, and are not a promise or guarantee that you
          will achieve the same or any result. Selling on an online marketplace
          involves risk, including the risk of losing money.
        </p>
        <p>
          Your results depend on factors we do not control, including your
          effort, skill, capital, market conditions, and marketplace policies.
          Nothing we provide is financial, legal, tax, investment, or accounting
          advice — consult a qualified professional before making business
          decisions.
        </p>
      </div>

      <h2 id="no-affiliation">8. No affiliation with Walmart</h2>
      <p>
        We are an independent training provider. We are not affiliated with,
        endorsed by, sponsored by, or otherwise connected to Walmart Inc. or any
        of its subsidiaries. &quot;Walmart&quot; and &quot;Walmart
        Marketplace&quot; are trademarks of Walmart Apollo, LLC, referenced here
        only to describe the subject of our training. All other trademarks
        belong to their respective owners.
      </p>

      <h2 id="ip">9. Intellectual property</h2>
      <p>
        All content on this site and in our webinars, including recordings,
        slides, templates, and written materials, is owned by us or our licensors
        and protected by copyright. You may use it for your own personal and
        internal business purposes. You may not record, reproduce, resell,
        redistribute, publish, or create derivative works from it without our
        prior written permission.
      </p>

      <h2 id="acceptable-use">10. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>
          submit false information, or anyone else&apos;s contact details or
          phone number;
        </li>
        <li>
          interfere with, probe, overload, or attempt to gain unauthorised
          access to the site or its systems;
        </li>
        <li>
          use automated means to submit registrations or scrape the site; or
        </li>
        <li>
          disrupt a live session, or harass other attendees or our staff.
        </li>
      </ul>
      <p>
        We may refuse or cancel a registration, or remove an attendee, for breach
        of these terms.
      </p>

      <h2 id="disclaimer">11. Disclaimer of warranties</h2>
      <p>
        The site and the webinars are provided &quot;as is&quot; and &quot;as
        available&quot;, without warranties of any kind, whether express or
        implied, including implied warranties of merchantability, fitness for a
        particular purpose, and non-infringement. We do not warrant that the site
        will be uninterrupted, timely, secure, or error-free, or that any
        session will take place as scheduled.
      </p>

      <h2 id="liability">12. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {BRAND.legalName} and its
        owners, officers, employees, and contractors will not be liable for any
        indirect, incidental, special, consequential, exemplary, or punitive
        damages, or for any lost profits, lost revenue, lost data, or business
        interruption, arising out of or relating to your use of the site, your
        attendance at a webinar, your reliance on any information provided, or
        any failure to deliver a message. Because our webinars are provided free
        of charge, our total aggregate liability to you for any claim will not
        exceed one hundred US dollars (US$100). Some jurisdictions do not allow
        certain limitations, so parts of this section may not apply to you.
      </p>

      <h2 id="indemnity">13. Indemnification</h2>
      <p>
        You agree to indemnify and hold us harmless from any claim, loss,
        liability, or expense, including reasonable legal fees, arising from your
        breach of these terms, your misuse of the site, or your submission of a
        phone number or email address you were not authorised to provide.
      </p>

      <h2 id="governing-law">14. Governing law and disputes</h2>
      <p>
        These terms are governed by the laws of the State of{" "}
        {BRAND.governingState}, United States, without regard to its conflict of
        laws rules. You and we agree to the exclusive jurisdiction of the state
        and federal courts located in {BRAND.governingState} for any dispute not
        subject to small-claims court.
      </p>

      <h2 id="changes">15. Changes to these terms</h2>
      <p>
        We may update these terms from time to time. We will revise the
        &quot;Last updated&quot; date above, and material changes to the SMS
        program will be communicated to active subscribers. Continuing to use
        the site after an update means you accept the revised terms.
      </p>

      <h2 id="contact">16. Contact us</h2>
      <address>
        {BRAND.legalName}
        <br />
        {BRAND.address}
        <br />
        Email: <a href={`mailto:${BRAND.supportEmail}`}>{BRAND.supportEmail}</a>
        <br />
        Phone: {BRAND.supportPhone}
      </address>
    </LegalShell>
  );
}
