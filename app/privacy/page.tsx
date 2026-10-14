import type { Metadata } from "next";
import Link from "next/link";
import LegalShell from "@/components/LegalShell";
import { BRAND, SMS_PROGRAM } from "@/lib/business";

export const metadata: Metadata = {
  title: `Privacy Policy — ${BRAND.name}`,
  description:
    "How we collect, use, and protect the name, email address, and phone number you submit through our webinar registration form. We never sell or share mobile information for marketing purposes.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalShell
      title="Privacy Policy"
      intro={`This Privacy Policy explains how ${BRAND.legalName}, operating as ${BRAND.name} ("we", "us", "our"), collects, uses, stores, and protects your personal information when you register for our webinars through this website.`}
    >
      <h2 id="scope">1. Scope of this policy</h2>
      <p>
        This policy applies to information collected through{" "}
        {BRAND.siteUrl} and to the email and SMS messages we send to people who
        register through it. It does not apply to any third-party website,
        marketplace, or platform that we may link to.
      </p>

      <h2 id="what-we-collect">2. Information we collect</h2>
      <p>
        We collect only what we need to confirm your webinar registration and
        deliver the session to you:
      </p>
      <ul>
        <li>
          <strong>Full name</strong> — so we can address you and identify your
          registration.
        </li>
        <li>
          <strong>Email address</strong> — to send your confirmation, the join
          link, reminders, and the replay.
        </li>
        <li>
          <strong>Mobile phone number</strong> — to send SMS reminders and join
          links, <em>only</em> if you give separate, express written consent by
          checking the SMS opt-in box on our registration form.
        </li>
        <li>
          <strong>Proof-of-consent records</strong> — if you check the SMS
          opt-in box, we store the date and time of your opt-in, the exact
          consent language shown to you, the page you opted in from, your IP
          address, and your browser user-agent string. We keep these records
          solely to demonstrate that your consent was knowingly given, as
          telecommunications regulations require.
        </li>
      </ul>
      <p>
        We do <strong>not</strong> collect payment card details, government
        identifiers, or sensitive categories of personal information, and we do
        not ask you to create an account or password.
      </p>

      <h2 id="how-we-collect">3. How we collect it — directly from you only</h2>
      <div className="legal-callout">
        <p>
          <strong>
            We collect phone numbers and email addresses strictly and
            exclusively through the registration forms on this website, entered
            by you.
          </strong>{" "}
          We do not buy, rent, lease, licence, scrape, append, or otherwise
          obtain phone numbers or email addresses from data brokers, lead
          vendors, purchased lists, affiliate networks, or any other third-party
          source. If your phone number is in our SMS program, it is because you
          personally typed it into a form on this website and checked the
          opt-in box on that same form.
        </p>
      </div>
      <p>
        We do not use advertising or cross-site tracking cookies, and we do not
        operate third-party advertising pixels on our registration form. Any
        cookies set are strictly necessary for the site to function.
      </p>

      <h2 id="how-we-use">4. How we use your information</h2>
      <p>We use the information you provide to:</p>
      <ul>
        <li>confirm your registration and reserve your seat;</li>
        <li>
          send you the join link, calendar details, reminders, and the replay
          recording for the webinar you registered for;
        </li>
        <li>
          send SMS messages under the <strong>{SMS_PROGRAM.name}</strong>{" "}
          program, if and only if you opted in;
        </li>
        <li>respond to your support requests;</li>
        <li>
          send you occasional information about related training, which you can
          unsubscribe from at any time; and
        </li>
        <li>
          meet our legal, tax, and recordkeeping obligations, including
          retaining proof of SMS consent.
        </li>
      </ul>

      <h2 id="sms-clause">5. SMS, mobile information, and consent</h2>
      <p>
        If you opt in to our SMS program, the following applies to your mobile
        information. This section governs in the event of any conflict with the
        rest of this policy.
      </p>

      <h3>5.1 Your mobile information is never shared or sold</h3>
      <div className="legal-callout">
        <p>
          <strong>
            No mobile information will be shared with third parties or
            affiliates for marketing or promotional purposes, and mobile phone
            numbers will never be sold.
          </strong>{" "}
          All of the above categories of information exclude text messaging
          originator opt-in data and consent; this information will not be
          shared with any third parties, excluding aggregators and providers of
          the text message services themselves.
        </p>
        <p>
          We do not and will not sell, rent, lease, trade, or otherwise disclose
          your mobile phone number, your SMS opt-in data, or your consent
          records to any third party or affiliate for that party&apos;s own
          marketing, promotional, advertising, or lead-generation purposes. The
          only parties that receive your mobile number are the messaging
          aggregators and service providers we use to transmit the messages you
          asked for, and they are contractually restricted to acting on our
          instructions.
        </p>
      </div>

      <h3>5.2 Purpose of our SMS communications</h3>
      <p>
        Our text message program is called{" "}
        <strong>{SMS_PROGRAM.name}</strong>. If you opt in, we use your mobile
        number to send you {SMS_PROGRAM.description}. In practice that means:
      </p>
      <ul>
        <li>
          <strong>Confirmations</strong> — acknowledging that your seat is
          reserved;
        </li>
        <li>
          <strong>Alerts and updates</strong> — your Zoom join link, and notice
          if a session is rescheduled or cancelled;
        </li>
        <li>
          <strong>Reminders</strong> — time-sensitive prompts shortly before the
          webinar begins; and
        </li>
        <li>
          <strong>Occasional related training offers</strong> from{" "}
          {BRAND.name}.
        </li>
      </ul>
      <p>
        We do not use your mobile number for any other purpose, and we never
        send messages on behalf of other companies.
      </p>

      <h3>5.3 Message frequency</h3>
      <p>
        <strong>{SMS_PROGRAM.frequency}.</strong> Frequency depends on how many
        webinars you register for and on whether a session you signed up for
        changes.
      </p>

      <h3>5.4 Message and data rates</h3>
      <p>
        <strong>Message and data rates may apply.</strong> We do not charge you
        for these messages, but your mobile carrier may charge you for sending
        or receiving them under your plan. Contact your wireless provider for
        details of your plan.
      </p>

      <h3>5.5 How to opt out</h3>
      <p>
        <strong>
          Reply {SMS_PROGRAM.optOutKeyword} to unsubscribe.
        </strong>{" "}
        You can withdraw your SMS consent at any time by replying{" "}
        <strong>{SMS_PROGRAM.optOutKeyword}</strong> to any message we send. We
        will send a single reply confirming that you have been unsubscribed, and
        then stop. You can also opt out by emailing{" "}
        <a href={`mailto:${BRAND.supportEmail}`}>{BRAND.supportEmail}</a> or
        calling {BRAND.supportPhone}. Opting out of SMS does not cancel your
        webinar registration or stop your email confirmations.
      </p>
      <p>
        For help at any time, reply{" "}
        <strong>{SMS_PROGRAM.helpKeyword}</strong> to any message, or contact us
        at <a href={`mailto:${BRAND.supportEmail}`}>{BRAND.supportEmail}</a>.
        Full program terms are in the{" "}
        <Link href="/terms#sms">SMS Communications section of our Terms of Service</Link>.
      </p>

      <h2 id="service-providers">6. Service providers who process data for us</h2>
      <p>
        We share your information only with vendors that perform services on our
        behalf, and only to the extent needed to perform them. These currently
        include:
      </p>
      <ul>
        <li>
          <strong>Workflow automation</strong> (Zapier) — receives your
          registration so it can be routed to our email and SMS tools.
        </li>
        <li>
          <strong>Email delivery</strong> — sends your confirmation, join link,
          and reminders.
        </li>
        <li>
          <strong>SMS delivery</strong> — our messaging provider and the
          carrier aggregators required to deliver text messages, if you opted
          in.
        </li>
        <li>
          <strong>Webinar hosting</strong> — hosts the live session you join.
        </li>
        <li>
          <strong>Website hosting</strong> — serves this website.
        </li>
      </ul>
      <p>
        These providers act as processors on our instructions. They are not
        permitted to use your information for their own marketing. We may also
        disclose information where required by law, subpoena, or valid legal
        process, or to protect our legal rights.
      </p>

      <h2 id="retention">7. How long we keep it</h2>
      <p>
        We keep registration data for as long as needed to deliver the webinar
        and to maintain our business records, and then for a reasonable period
        afterwards. SMS consent and opt-out records are retained for at least{" "}
        <strong>four years</strong> after consent is given or withdrawn, because
        we are required to be able to evidence consent for that period. You can
        ask us to delete your data sooner, subject to those recordkeeping
        obligations.
      </p>

      <h2 id="security">8. How we protect it</h2>
      <p>
        The registration form is transmitted over encrypted HTTPS connections,
        and our vendors are chosen for their security practices. No method of
        transmission or storage is completely secure, so while we take
        reasonable measures to protect your information, we cannot guarantee
        absolute security.
      </p>

      <h2 id="your-rights">9. Your rights and choices</h2>
      <p>You may, at any time:</p>
      <ul>
        <li>
          <strong>Stop SMS</strong> — reply{" "}
          <strong>{SMS_PROGRAM.optOutKeyword}</strong> to any text message.
        </li>
        <li>
          <strong>Stop emails</strong> — use the unsubscribe link in any email.
        </li>
        <li>
          <strong>Access, correct, or delete</strong> your personal information
          — email{" "}
          <a href={`mailto:${BRAND.supportEmail}`}>{BRAND.supportEmail}</a> and
          we will respond within the time required by applicable law.
        </li>
        <li>
          <strong>Opt out of &quot;sale&quot; or &quot;sharing&quot;</strong> —
          we do not sell or share personal information as those terms are
          defined under the California Consumer Privacy Act or similar state
          laws, so there is nothing to opt out of. We also do not process
          personal information for cross-context behavioural advertising.
        </li>
      </ul>
      <p>
        We will not discriminate against you for exercising any of these rights.
      </p>

      <h2 id="children">10. Children&apos;s privacy</h2>
      <p>
        This website and our webinars are intended for adults aged 18 and over.
        We do not knowingly collect personal information from anyone under 18.
        If you believe a minor has submitted information to us, contact{" "}
        <a href={`mailto:${BRAND.supportEmail}`}>{BRAND.supportEmail}</a> and we
        will delete it.
      </p>

      <h2 id="changes">11. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. We will revise the
        &quot;Last updated&quot; date above, and material changes affecting the
        SMS program will be communicated to active subscribers. Continuing to
        use the site after an update means you accept the revised policy.
      </p>

      <h2 id="contact">12. How to contact us</h2>
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
