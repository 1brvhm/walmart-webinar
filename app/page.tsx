import RegistrationProvider from "@/components/RegistrationProvider";
import RegisterButton from "@/components/RegisterButton";
import SiteFooter from "@/components/SiteFooter";
import Logo from "@/components/Logo";
import { BRAND, SUPPORTED_BY, WEBINAR } from "@/lib/business";

export default function Home() {
  return (
    <RegistrationProvider>
      <div className="flex flex-1 flex-col">
        <SiteHeader />
        <Hero />
        <ValueStrip />
        <Curriculum />
        <Agenda />
        <AboutJacob />
        <Faq />
        <ClosingCta />
        <SiteFooter />
      </div>
    </RegistrationProvider>
  );
}

/* ------------------------------- header ------------------------------- */

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <span className="flex items-center gap-2.5 font-bold tracking-tight">
          <Logo />
          {BRAND.shortName}
        </span>
        <div className="flex items-center gap-3">
          <a
            href="#curriculum"
            className="hidden text-sm font-semibold text-muted transition-colors hover:text-foreground sm:inline"
          >
            What you&apos;ll learn
          </a>
          <a
            href="#faq"
            className="hidden text-sm font-semibold text-muted transition-colors hover:text-foreground sm:inline"
          >
            FAQ
          </a>
          <RegisterButton
            source="nav"
            className="btn-spark px-5 py-2.5 text-sm"
          >
            Book Your Free Spot
          </RegisterButton>
        </div>
      </nav>
    </header>
  );
}

/* -------------------------------- hero -------------------------------- */

function Hero() {
  return (
    <section className="hero-bg relative overflow-hidden border-b border-border">
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-6 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-28 lg:pt-24">
        <div className="flex flex-col items-start gap-6">
          <span className="chip">
            <span className="size-1.5 rounded-full bg-danger" />
            Free live webinar &middot; {WEBINAR.date}
          </span>

          <h1 className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Build a profitable{" "}
            <span className="text-brand">Walmart Marketplace</span> business
            from scratch.
          </h1>

          <p className="max-w-xl text-lg leading-8 text-muted">
            Walmart&apos;s marketplace has a fraction of Amazon&apos;s sellers
            and a fraction of the competition. In this free live training,
            {BRAND.hostName} walks through the exact system he uses to get approved, source
            products that actually sell, and scale without burning cash on
            inventory.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <RegisterButton source="hero">
              Book Your Free Spot
              <ArrowRight />
            </RegisterButton>
            <a href="#curriculum" className="btn-ghost">
              See what&apos;s covered
            </a>
          </div>

          <dl className="mt-2 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {[
              { label: "When", value: `${WEBINAR.date}, ${WEBINAR.time}` },
              { label: "Length", value: WEBINAR.duration },
              { label: "Cost", value: "Free to attend" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col">
                <dt className="font-semibold text-faint">{item.label}</dt>
                <dd className="font-semibold">{item.value}</dd>
              </div>
            ))}
          </dl>

          <p className="text-sm text-faint">
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

        <HeroCard />
      </div>
    </section>
  );
}

function HeroCard() {
  return (
    <div className="card mx-auto w-full max-w-md overflow-hidden p-0 shadow-xl">
      <div className="flex items-center justify-between bg-brand px-6 py-4 text-brand-foreground">
        <span className="text-sm font-bold uppercase tracking-wide">
          Live training
        </span>
        <span className="rounded-full bg-spark px-3 py-1 text-xs font-bold text-spark-foreground">
          {WEBINAR.seats}
        </span>
      </div>

      <div className="flex flex-col gap-5 px-6 py-7">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-faint">
            Save your seat for
          </span>
          <span className="text-2xl font-extrabold tracking-tight">
            {WEBINAR.date}
          </span>
          <span className="font-semibold text-brand">{WEBINAR.time}</span>
        </div>

        <ul className="flex flex-col gap-3 border-t border-border pt-5">
          {[
            "Live walkthrough of a real seller account",
            "Product research template to keep",
            "Live Q&A — bring your questions",
            "Replay sent to everyone who registers",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm">
              <CheckBadge />
              <span className="leading-6">{item}</span>
            </li>
          ))}
        </ul>

        <RegisterButton source="hero-card" className="btn-spark w-full">
          Book Your Free Spot
        </RegisterButton>

        <p className="text-center text-xs text-faint">
          No card required &middot; Takes 20 seconds
        </p>
      </div>
    </div>
  );
}

/* ----------------------------- value strip ----------------------------- */

function ValueStrip() {
  const stats = [
    { value: "120k+", label: "sellers on Walmart Marketplace" },
    { value: "2M+", label: "weekly in-store shoppers per state" },
    { value: "0", label: "monthly seller fees to start" },
  ];

  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-12 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1 text-center">
            <span className="text-3xl font-extrabold tracking-tight text-brand">
              {stat.value}
            </span>
            <span className="text-sm leading-6 text-muted">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------- curriculum ----------------------------- */

const MODULES = [
  {
    title: "Getting approved fast",
    body: "What Walmart's seller application actually screens for, the documents to have ready, and the common rejection triggers to avoid before you apply.",
    icon: <ClipboardIcon />,
  },
  {
    title: "Finding products that sell",
    body: "A repeatable research process for spotting low-competition listings with real demand — and the categories Jacob Jones avoids entirely.",
    icon: <SearchIcon />,
  },
  {
    title: "Sourcing without big capital",
    body: "How to negotiate with suppliers, test demand on small orders, and keep cash free instead of locked in dead inventory.",
    icon: <BoxIcon />,
  },
  {
    title: "Listings that win the buy box",
    body: "Titles, images, attributes, and pricing signals that move you up Walmart's search results and keep you holding the buy box.",
    icon: <TrophyIcon />,
  },
  {
    title: "Fulfilment that scales",
    body: "When to use Walmart Fulfilment Services versus shipping yourself, and how to keep your seller scorecard healthy as volume grows.",
    icon: <TruckIcon />,
  },
  {
    title: "Scaling past your first wins",
    body: "Reinvestment, catalogue expansion, and the operating rhythm that turns a handful of sales into a predictable monthly run rate.",
    icon: <ChartIcon />,
  },
];

function Curriculum() {
  return (
    <section id="curriculum" className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="flex flex-col gap-3">
          <span className="text-sm font-bold uppercase tracking-wide text-brand">
            What you&apos;ll learn
          </span>
          <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            Six things most new Walmart sellers get wrong.
          </h2>
          <p className="max-w-2xl text-lg leading-8 text-muted">
            No fluff and no theory — every section is something you can act on
            the same week.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((module) => (
            <div key={module.title} className="card flex flex-col gap-4 p-6">
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                {module.icon}
              </span>
              <h3 className="text-lg font-bold tracking-tight">
                {module.title}
              </h3>
              <p className="text-sm leading-6 text-muted">{module.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- agenda -------------------------------- */

const AGENDA = [
  {
    time: "0:00",
    title: "The Walmart opportunity right now",
    body: "Why the competition gap exists, and who it suits.",
  },
  {
    time: "0:15",
    title: "Account setup, live",
    body: "A real application walked through end to end.",
  },
  {
    time: "0:35",
    title: "Product research workshop",
    body: "Finding three viable products together, on the call.",
  },
  {
    time: "0:55",
    title: "Pricing and the buy box",
    body: "How to stay profitable without racing to the bottom.",
  },
  {
    time: "1:15",
    title: "Open Q&A",
    body: "Ask anything — we stay until the questions run out.",
  },
];

function Agenda() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="flex flex-col gap-3">
          <span className="text-sm font-bold uppercase tracking-wide text-brand">
            Agenda
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            How the {WEBINAR.duration.split(" ")[0]} minutes break down.
          </h2>
          <p className="leading-7 text-muted">
            Come with a notepad. Everything is demonstrated live, and the replay
            goes out to every registrant afterwards.
          </p>
        </div>

        <ol className="flex flex-col">
          {AGENDA.map((item, index) => (
            <li
              key={item.title}
              className="flex gap-5 border-t border-border py-5 first:border-t-0 first:pt-0"
            >
              <span className="w-12 shrink-0 pt-0.5 font-mono text-sm font-bold text-brand">
                {item.time}
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="font-bold tracking-tight">
                  {index + 1}. {item.title}
                </h3>
                <p className="text-sm leading-6 text-muted">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------ about Jacob ------------------------------ */

function AboutJacob() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="card flex flex-col items-start gap-5 bg-surface p-8">
          <div className="flex size-20 items-center justify-center rounded-full bg-brand text-3xl font-extrabold text-brand-foreground">
            J
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xl font-extrabold tracking-tight">
              {BRAND.hostName}
            </span>
            <span className="text-sm font-semibold text-brand">
              E-commerce seller &amp; coach
            </span>
          </div>
          <p className="text-sm leading-6 text-muted">
            {BRAND.hostName} has been selling on Walmart Marketplace since its seller
            programme opened up, and now helps new sellers get their first
            listings live without the expensive mistakes.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <span className="text-sm font-bold uppercase tracking-wide text-brand">
            Your host
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            A working seller, not a course salesman.
          </h2>
          <p className="text-lg leading-8 text-muted">
            This webinar is the training {BRAND.hostName} wished existed when he started:
            the real sequence of steps, the numbers behind each decision, and
            the parts nobody warns you about — account health, returns, and
            keeping margin intact as you grow.
          </p>
          <p className="leading-7 text-muted">
            You&apos;ll leave knowing exactly what to do in week one, week two,
            and week three — and whether Walmart is the right fit for you at all.
          </p>
          <div>
            <RegisterButton source="about">
              Book Your Free Spot
              <ArrowRight />
            </RegisterButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- FAQ --------------------------------- */

const FAQS = [
  {
    q: "Is it really free?",
    a: "Yes — the live training and the replay are both free. There's no card required to register and nothing to buy on the call.",
  },
  {
    q: "What if I can't make the live session?",
    a: "Register anyway. Everyone who signs up gets the replay by email, so you can watch whenever suits you.",
  },
  {
    q: "Do I need an existing business or inventory?",
    a: "No. The session starts from zero — no seller account, no suppliers, no products. Existing sellers will get the most from the pricing and scaling sections.",
  },
  {
    q: "Does this work outside the United States?",
    a: "Walmart Marketplace has specific requirements for international sellers. {BRAND.hostName} covers what they are and the realistic routes in, so you'll know where you stand.",
  },
  {
    q: "How much time does selling on Walmart take?",
    a: "Most people start with a few focused hours a week. {BRAND.hostName} breaks down where that time is best spent early on versus what can wait.",
  },
];

function Faq() {
  return (
    <section id="faq" className="border-b border-border bg-surface">
      <div className="mx-auto w-full max-w-3xl px-6 py-20">
        <div className="flex flex-col gap-3 text-center">
          <span className="text-sm font-bold uppercase tracking-wide text-brand">
            FAQ
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Questions, answered.
          </h2>
        </div>

        <div className="mt-10 flex flex-col gap-3">
          {FAQS.map((faq) => (
            <details key={faq.q} className="card group p-0">
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-bold tracking-tight marker:content-none">
                {faq.q}
                <span className="shrink-0 text-brand transition-transform group-open:rotate-45">
                  <PlusIcon />
                </span>
              </summary>
              <p className="px-6 pb-5 text-sm leading-6 text-muted">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- closing CTA ----------------------------- */

function ClosingCta() {
  return (
    <section>
      <div className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="card hero-bg relative overflow-hidden px-8 py-16 text-center">
          <span className="chip mx-auto">
            <span className="size-1.5 rounded-full bg-danger" />
            {WEBINAR.seats} &middot; {WEBINAR.date}
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Your seat is free. Your competition is still on Amazon.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg leading-8 text-muted">
            Join {BRAND.hostName} live on {WEBINAR.date} at {WEBINAR.time} and leave with a
            plan you can start the same day.
          </p>
          <div className="mt-8 flex justify-center">
            <RegisterButton source="closing">
              Book Your Free Spot
              <ArrowRight />
            </RegisterButton>
          </div>
          <p className="mt-6 text-sm text-faint">
            This webinar is supported by{" "}
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
      </div>
    </section>
  );
}


/* -------------------------------- icons -------------------------------- */


function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12h14m0 0-5-5m5 5-5 5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckBadge() {
  return (
    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M20 6 9 17l-5-5"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 4h6v3H9zM7 5H5v15h14V5h-2M9 12h6M9 16h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="m16 16 4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 8l8-4 8 4v8l-8 4-8-4V8Zm0 0 8 4m0 0 8-4m-8 4v8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 4h8v5a4 4 0 0 1-8 0V4Zm0 2H5v2a3 3 0 0 0 3 3m8-5h3v2a3 3 0 0 1-3 3m-4 4v3m-3 2h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 7h10v9H3zM13 10h4l3 3v3h-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="18" r="1.8" stroke="currentColor" strokeWidth="2" />
      <circle cx="17" cy="18" r="1.8" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 20V10m5 10V4m5 16v-7m5 7V8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
