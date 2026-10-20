import Image from "next/image";
import { CountdownBar, CountdownTiles, LocalTimeAndCalendar } from "@/components/Countdown";
import HeroScene, { MotionToolbar } from "@/components/HeroScene";
import Logo from "@/components/Logo";
import { CountUp, ScrollReveal } from "@/components/Motion";
import RegistrationProvider from "@/components/RegistrationProvider";
import SalesChart from "@/components/SalesChart";
import SeatButton from "@/components/SeatButton";
import SiteFooter from "@/components/SiteFooter";
import { SUPPORTED_BY, WEBINAR } from "@/lib/business";

const WRAP = "mx-auto w-[min(1180px,calc(100%-36px))] sm:w-[min(1180px,calc(100%-40px))] md:w-[min(1180px,calc(100%-64px))]";
const SECTION = "py-12 sm:py-[60px] md:py-[88px]";

const LEARN = [
  {
    label: "Getting started",
    title: "Understand the seller application",
    body: "Learn what to prepare before applying and understand the first steps toward a Walmart Marketplace business.",
  },
  {
    label: "Product research",
    title: "Know what to look for in a product",
    body: "Explore how to research products, compare suppliers, and think through costs before making a buying decision.",
  },
  {
    label: "Your store",
    title: "Plan your listings, pricing & shipping",
    body: "Get a practical introduction to the moving parts of a store and the decisions you’ll need to make.",
  },
  {
    label: "Your next steps",
    title: "Leave with a clearer direction",
    body: "Understand what to focus on next, then bring your questions to the live Q&A with Jacob.",
  },
];

const STEPS = [
  {
    title: "Explore a sales trend",
    body: "Switch between time periods to see how a sample store’s sales change over time.",
  },
  {
    title: "Look beyond revenue",
    body: "Compare sales with order volume. Revenue alone does not tell you how much a business earns.",
  },
  {
    title: "Learn what to watch",
    body: "Join Jacob to understand product costs, pricing, and the decisions behind running a store.",
  },
];

const FAQS = [
  {
    q: "Is the webinar really free?",
    a: "Yes. The live webinar is free to attend. No credit card is required.",
  },
  {
    q: "Do I need any experience?",
    a: "No. Jacob starts with the foundations. You do not need an existing Walmart seller account to attend.",
  },
  {
    q: "When is it, and how long is the session?",
    a: `${WEBINAR.dateLong} at ${WEBINAR.time} (UTC−5). Plan for ${WEBINAR.durationMinutes} minutes of training followed by live questions and answers. Your local start time is shown beneath the countdown above.`,
  },
  {
    q: "How do I join the webinar?",
    a: "Select “Save my free seat” and enter your details. Your access information and reminders will be sent by email.",
  },
  {
    q: "Can I join from my phone?",
    a: "Yes. You can register from your phone and use the webinar access link in your confirmation email to join the live session.",
  },
];

/** Six translucent rays behind the "Join Jacob live" panel, Walmart-spark style. */
const RAYS = [0, 60, 120, 180, 240, 300];

function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`eyebrow mb-[18px] text-[11px] sm:mb-5 sm:text-xs ${className}`}>{children}</span>;
}

function SourceDartLink({ className = "hover:text-spark" }: { className?: string }) {
  return (
    <a
      href={SUPPORTED_BY.url}
      target="_blank"
      rel="noopener"
      className={`underline underline-offset-[3px] transition-colors ${className}`}
    >
      SourceDart
    </a>
  );
}

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as React.CSSProperties;

export default function Home() {
  return (
    <RegistrationProvider>
      <ScrollReveal />

      <a
        href="#main"
        className="absolute left-4 top-[-100px] z-20 bg-white p-[15px] focus:top-3"
      >
        Skip to content
      </a>

      <CountdownBar />

      <header className="sticky top-0 z-30 border-b border-border bg-white/95 backdrop-blur">
        <nav className={`${WRAP} flex items-center justify-between gap-3 py-3.5 md:gap-6 md:py-5`} aria-label="Main navigation">
          <Logo href="#main" />
          <div className="hidden gap-4 md:flex lg:gap-[25px]">
            {[
              ["#learn", "The webinar"],
              ["#host", "Meet Jacob"],
              ["#explore", "Explore"],
              ["#faq", "FAQs"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="relative py-2.5 text-sm font-bold text-blue no-underline after:absolute after:inset-x-0 after:bottom-1.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded after:bg-spark after:transition-transform after:duration-300 hover:after:scale-x-100 lg:text-[15px]"
              >
                {label}
              </a>
            ))}
          </div>
          <SeatButton size="nav" />
        </nav>
      </header>

      <main id="main">
        {/* ---------------- Hero ---------------- */}
        <section className="hero-bg on-dark relative overflow-hidden text-white">
          <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className={`${WRAP} relative grid min-w-0 grid-cols-1 items-center gap-10 pb-12 pt-10 min-[900px]:grid-cols-[1.05fr_1fr] min-[900px]:gap-8 min-[900px]:pb-16 min-[900px]:pt-[72px] min-[1100px]:gap-[48px]`}>
            <div className="min-w-0 max-w-[620px]">
              <div className="rise">
                <Eyebrow className="eyebrow-dark">Free live Walmart webinar</Eyebrow>
              </div>
              <h1
                className="display rise mb-6 text-[clamp(36px,10vw,48px)] min-[600px]:text-[clamp(42px,4.3vw,60px)]"
                style={{ animationDelay: "100ms" }}
              >
                Your next chapter
                <br />
                in e-commerce
                <br />
                <em>starts with Walmart.</em>
              </h1>
              <p className="rise text-lg leading-[1.7] text-[#e6eefb] sm:text-[20px]" style={{ animationDelay: "200ms" }}>
                Learn the freedom of working yourself easily making 5 to 10k a month allowing you to
                be a business owner and work remotely and allow yourself to quit your nine to five or
                help you make your extra additional income.
              </p>
              <p className="rise mt-4 text-[13px] leading-normal text-[#c4d4ef] sm:text-sm" style={{ animationDelay: "250ms" }}>
                Income is not guaranteed. Results depend on your experience, effort, costs and market
                conditions.
              </p>
              <p className="rise mt-7 text-base font-extrabold sm:text-lg" style={{ animationDelay: "300ms" }}>
                {WEBINAR.dateLong} · {WEBINAR.time}
              </p>
              <p className="rise mt-4 text-sm text-[#dce8fb] sm:text-[15px]" style={{ animationDelay: "350ms" }}>
                Free live training · Beginner friendly · Live Q&amp;A
              </p>
            </div>
            <div className="min-w-0">
              <HeroScene />
            </div>
          </div>
        </section>

        <MotionToolbar />

        <div className="border-y border-border py-[22px]">
          <div className={`${WRAP} flex flex-col items-center justify-between gap-5 md:flex-row md:gap-6`}>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-muted sm:text-sm">
              <span>Sponsored by</span>
              <a href={SUPPORTED_BY.url} target="_blank" rel="noopener" aria-label="SourceDart website">
                <Image src="/sourcedart.svg" alt="SourceDart" width={152} height={22} className="w-[152px] brightness-[0.2] transition-opacity hover:opacity-75" />
              </a>
              <a
                href={SUPPORTED_BY.url}
                target="_blank"
                rel="noopener"
                className="text-[15px] font-bold text-blue underline underline-offset-[3px] sm:text-base"
              >
                www.{SUPPORTED_BY.label}
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-2.5 text-[13px] font-bold sm:gap-[15px] sm:text-sm lg:gap-[30px] lg:text-base">
              {["Beginner friendly", "Practical training", "Live Q&A"].map((fact) => (
                <span key={fact}>
                  <span className="mr-[9px] text-blue" aria-hidden="true">✓</span>
                  {fact}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ---------------- Real dashboards ---------------- */}
        <section id="dashboards" className={SECTION}>
          <div className={WRAP}>
            <div className="mb-9 max-w-[720px] sm:mb-12" data-reveal>
              <Eyebrow>A look inside Jacob’s business</Eyebrow>
              <h2 className="display text-[33px] sm:text-[clamp(34px,3.6vw,50px)]">
                Real dashboards.
                <br />
                <em>A closer look at the numbers.</em>
              </h2>
              <p className="mt-[18px] text-muted sm:text-[19px]">
                Explore Jacob’s Walmart Seller Center: actual sales, orders and account activity,
                shown directly from his dashboard screenshots.
              </p>
            </div>

            <div className="mx-auto grid max-w-[1060px] gap-6 sm:gap-8">
              <DashboardCard
                kicker="Last 90 days"
                figure={<CountUp value={687716.68} decimals={2} prefix="$" duration={2200} />}
                unit="GMV"
                caption="Gross merchandise value · 7% decrease shown"
                src="/dashboard-gmv.webp"
                alt="Jacob's Walmart Seller Center showing $687,716.68 GMV over the last 90 days, down 7%, with a daily GMV chart from July to October"
              />
              <DashboardCard
                kicker="Account snapshot"
                figure={<CountUp value={880} duration={1600} />}
                unit="Today’s orders"
                caption="418 unshipped orders · 4.62 account rating"
                src="/dashboard-orders.webp"
                alt="Jacob's Walmart Seller Center showing 880 orders today, 418 unshipped orders, a 4.62 account rating and a $59,907.79 current balance"
              />
            </div>
            <p className="mx-auto mt-6 max-w-[1060px] text-sm text-muted sm:text-[15px]" data-reveal>
              Historical snapshots, not a live feed. GMV and account balance are not profit.
              Individual results vary.
            </p>
          </div>
        </section>

        {/* ---------------- What you'll learn ---------------- */}
        <section id="learn" className={`${SECTION} bg-pale`}>
          <div className={WRAP}>
            <div className="mb-7 max-w-[700px] sm:mb-[38px]" data-reveal>
              <Eyebrow>Inside the free webinar</Eyebrow>
              <h2 className="display text-[33px] sm:text-[clamp(32px,3.2vw,44px)]">
                A clearer path to
                <br />
                <em>selling on Walmart.</em>
              </h2>
              <p className="mt-[18px] text-muted">
                No need to piece it together on your own. Jacob will walk you through the
                foundations, one step at a time.
              </p>
            </div>

            <div className="grid min-w-0 grid-cols-1 gap-[17px] min-[561px]:grid-cols-2 md:gap-6">
              {LEARN.map((card, i) => (
                <article
                  key={card.title}
                  data-reveal
                  style={delay((i % 2) * 120)}
                  className="learn-card group relative min-w-0 overflow-hidden rounded-[22px] border border-border bg-white p-[27px] transition-[transform,box-shadow,border-color] duration-250 hover:-translate-y-[5px] hover:border-sky hover:shadow-[0_18px_40px_#0453c414] md:p-8"
                >
                  <span className="mb-[22px] inline-block rounded-[25px] bg-pale px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.08em] text-blue transition-colors group-hover:bg-blue group-hover:text-white">
                    {card.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute right-7 top-7 text-[28px] font-extrabold text-sky transition-[color,transform] duration-300 group-hover:-translate-y-[3px] group-hover:text-spark-dark"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display mb-[15px] max-w-[350px] text-2xl sm:text-[25px]">{card.title}</h3>
                  <p className="max-w-[440px] text-[17px] text-muted">{card.body}</p>
                </article>
              ))}
            </div>

            <div
              data-reveal="zoom"
              className="relative mt-[30px] flex flex-col items-stretch gap-3.5 overflow-hidden rounded-[18px] bg-[linear-gradient(110deg,#071f4d,#0a2f74)] px-[22px] py-[26px] text-white shadow-[0_20px_50px_#0a2a632e] min-[601px]:grid min-[601px]:grid-cols-[1fr_180px] min-[601px]:gap-5 min-[601px]:p-[27px] min-[901px]:grid-cols-[1fr_.65fr_auto] min-[901px]:gap-[17px] min-[1101px]:grid-cols-[1.25fr_.8fr_auto] min-[1101px]:gap-[22px] min-[1101px]:px-8 min-[1101px]:py-7"
            >
              <div className="relative z-[1] self-center">
                <h3 className="display text-[21px] min-[1101px]:text-[23px]">Your first step is a free seat.</h3>
                <p className="mt-[5px] text-base text-[#d3e1f7]">
                  Join Jacob live on October 30 at {WEBINAR.time}.
                </p>
              </div>
              <div className="relative mx-auto h-[90px] w-full max-w-[340px] min-w-0 min-[601px]:mx-0 min-[601px]:h-[110px] min-[601px]:max-w-none min-[901px]:h-auto min-[901px]:min-h-[100px] min-[901px]:self-stretch" aria-hidden="true">
                <svg viewBox="0 0 330 130" className="h-full w-full overflow-visible">
                  <path d="M5 120C65 100 80 110 125 85S220 55 255 30S300 17 325 7" stroke="#ffffff18" strokeWidth="4" fill="none" />
                  <path className="banner-line" pathLength={1} d="M5 120C65 100 80 110 125 85S220 55 255 30S300 17 325 7" stroke="#ffc220" strokeWidth="4" fill="none" />
                  <circle cx="325" cy="7" r="5" fill="#ffe48a" />
                </svg>
                <span className="absolute left-[15px] top-1 text-[11px] font-extrabold text-[#ffe08a] sm:top-0 sm:text-xs">
                  Learn. Plan. Build.
                </span>
              </div>
              <SeatButton
                variant="sun"
                className="w-full self-center min-[601px]:col-span-full min-[901px]:col-span-1 min-[901px]:w-auto min-[901px]:px-5 min-[901px]:text-base min-[1101px]:px-[27px] min-[1101px]:text-[19px]"
              />
            </div>
          </div>
        </section>

        {/* ---------------- Interactive chart ---------------- */}
        <section id="explore" className={SECTION}>
          <div className={`${WRAP} grid grid-cols-1 items-center gap-10 min-[901px]:grid-cols-2 min-[901px]:gap-[38px] lg:gap-20`}>
            <div className="min-w-0" data-reveal="left">
              <Eyebrow>Understand the numbers</Eyebrow>
              <h2 className="display text-[33px] sm:text-[clamp(32px,3.2vw,44px)]">
                See the story
                <br />
                <em>behind the sales.</em>
              </h2>
              <p className="mt-6 text-lg leading-[1.75] text-muted sm:text-[19px]">
                Product research is only the beginning. Learn how to read the numbers and understand
                what’s happening in a store.
              </p>
              <div className="mt-[30px] grid gap-[22px] sm:gap-6">
                {STEPS.map((step, i) => (
                  <div key={step.title} className="group flex gap-[18px]">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-pale text-[19px] font-extrabold text-blue transition-[transform,background-color,color] duration-250 group-hover:-translate-y-[3px] group-hover:bg-blue group-hover:text-white">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="display mb-2 mt-[3px] text-[21px]">{step.title}</h3>
                      <p className="text-[17px] text-muted">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="min-w-0" data-reveal="right">
              <SalesChart />
            </div>
          </div>
        </section>

        {/* ---------------- Host ---------------- */}
        <section id="host" className={`${SECTION} on-dark relative overflow-hidden bg-navy text-white`}>
          <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className={`${WRAP} relative grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-[45px] lg:gap-20`}>
            <div
              data-reveal="left"
              className="group relative mx-auto h-[420px] w-full overflow-hidden rounded-3xl bg-[#0b3a85] shadow-[0_30px_70px_#00000045] sm:h-[440px] md:mx-0 md:h-[500px] md:max-w-[460px]"
            >
              <Image
                src="/jacob-host.png"
                alt="Jacob Jones, webinar host"
                fill
                sizes="(min-width: 800px) 460px, 100vw"
                className="origin-[44%_61%] scale-[1.28] object-cover object-[44%_58%] transition-transform duration-700 group-hover:scale-[1.33]"
              />
              <div className="absolute inset-x-3.5 bottom-3.5 z-[1] rounded-[14px] bg-white p-[18px] leading-snug text-ink shadow-[0_10px_30px_#00000030] sm:inset-x-[22px] sm:bottom-[22px]">
                <strong className="block text-[22px]">Jacob Jones</strong>
                <span className="text-[15px] text-muted">
                  7-figure seller · Founder of <SourceDartLink className="hover:text-blue" />
                </span>
              </div>
            </div>
            <div className="max-w-[650px]" data-reveal="right">
              <Eyebrow className="eyebrow-dark">Meet your host</Eyebrow>
              <h2 className="display mb-6 text-[33px] sm:text-[clamp(32px,3.4vw,48px)]">
                Learn from someone
                <br />
                <em>who’s built the business.</em>
              </h2>
              <p className="text-[#e3ecfa]">
                Jacob Jones is a seven-figure e-commerce seller who has scaled multiple online
                businesses beyond seven figures. He is also the founder and owner of{" "}
                <SourceDartLink />, a sourcing tool built for Walmart sellers.
              </p>
              <p className="mt-[18px] text-[#e3ecfa]">
                In this live session, Jacob brings that hands-on experience to the foundations of
                selling on Walmart — helping you understand the process and make more informed
                decisions about your next steps.
              </p>
              <SeatButton variant="sun" className="mt-8" />
            </div>
          </div>
        </section>

        {/* ---------------- Surprises ---------------- */}
        <section className={`${SECTION} bg-cream text-center`}>
          <div className={WRAP}>
            <div className="mx-auto mb-7 max-w-[720px] sm:mb-[38px]" data-reveal>
              <Eyebrow className="eyebrow-sun">There’s more in store</Eyebrow>
              <h2 className="display text-[33px] sm:text-[clamp(32px,3.2vw,46px)]">
                Unveiling <em>3 Surprises For You</em>
              </h2>
              <p className="mt-[18px] text-muted">
                Three reveals, saved for the live webinar session. Join Jacob to find out what’s inside.
              </p>
            </div>
            <div className="mx-auto grid max-w-[920px] grid-cols-3 gap-[9px] sm:gap-[22px]">
              {["01", "02", "03"].map((n, i) => (
                <div
                  key={n}
                  data-reveal="zoom"
                  style={delay(i * 140)}
                  className="surprise relative rounded-[14px] border border-[#f0dea6] bg-[#fdf9ee] px-[5px] py-[17px] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-[6px] hover:border-spark hover:shadow-[0_18px_34px_#c9970f22] sm:rounded-[22px] sm:px-[15px] sm:py-7"
                >
                  <div
                    className="gift"
                    aria-hidden="true"
                    style={{ rotate: i === 1 ? "5deg" : "-7deg", animationDelay: `${i * -1.6}s` }}
                  />
                  <h3 className="display text-[15px] tracking-[-0.02em] sm:text-xl sm:tracking-[-0.04em]">
                    Surprise {n}
                  </h3>
                  <p className="mt-[7px] text-xs text-muted sm:text-[15px]">Revealed live</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Join panel ---------------- */}
        <section className={`${WRAP} pt-12 sm:pt-[60px] md:pt-[88px]`} aria-label="Reserve your webinar seat">
          <div
            data-reveal="zoom"
            className="join-panel on-dark relative isolate overflow-hidden rounded-[22px] px-[19px] py-10 text-center text-white shadow-[0_30px_70px_#0453c435] sm:rounded-[28px] sm:px-6 sm:py-[62px]"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 400 400"
              className="panel-rays pointer-events-none absolute -right-[160px] top-1/2 -z-[1] w-[560px] -translate-y-1/2 opacity-90 max-sm:-right-[260px] max-sm:opacity-60"
            >
              {RAYS.map((deg) => (
                <rect key={deg} x="176" y="20" width="48" height="140" rx="24" fill="#ffffff14" transform={`rotate(${deg} 200 200)`} />
              ))}
            </svg>
            <span className="eyebrow mb-[18px] bg-white/[0.12] text-[11px] text-white sm:mb-5 sm:text-xs">
              {WEBINAR.dateShort} · {WEBINAR.time}
            </span>
            <h2 className="display mx-auto max-w-[640px] text-[34px] sm:text-[clamp(34px,3.9vw,52px)]">
              Take the next step.
              <br />
              Join Jacob live.
            </h2>
            <p className="mx-auto my-5 max-w-[590px] text-[17px] text-[#dce8fb] sm:text-lg">
              A free session to help you understand Walmart Marketplace and where to begin.
            </p>
            <CountdownTiles />
            <SeatButton variant="sun" className="w-full sm:w-auto sm:min-w-[280px]" />
            <LocalTimeAndCalendar />
          </div>
        </section>

        {/* ---------------- FAQ ---------------- */}
        <section id="faq" className={SECTION}>
          <div className={`${WRAP} max-w-[850px]`}>
            <div className="mb-8 text-center" data-reveal>
              <Eyebrow>Good questions. Clear answers.</Eyebrow>
              <h2 className="display text-[33px] sm:text-[clamp(32px,3.2vw,44px)]">Before you join</h2>
            </div>
            {FAQS.map((item, i) => (
              <details
                key={item.q}
                data-reveal
                style={delay(i * 70)}
                className="faq-card mt-3.5 rounded-[13px] border border-border bg-white transition-[border-color,box-shadow] duration-250 hover:border-sky open:border-sky open:shadow-[0_8px_22px_#0453c40d]"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-5 p-[19px] text-lg font-bold sm:p-[23px] sm:text-[19px]">
                  {item.q}
                </summary>
                <p className="px-[19px] pb-5 text-[17px] text-muted sm:px-[23px] sm:pb-[23px]">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </RegistrationProvider>
  );
}

function DashboardCard({
  kicker,
  figure,
  unit,
  caption,
  src,
  alt,
}: {
  kicker: string;
  figure: React.ReactNode;
  unit: string;
  caption: string;
  src: string;
  alt: string;
}) {
  return (
    <figure
      data-reveal
      className="shot-card overflow-hidden rounded-[20px] border border-border bg-white shadow-[0_24px_60px_#0a2a6312] transition-shadow duration-300 hover:shadow-[0_30px_70px_#0a2a631f] sm:rounded-[26px]"
    >
      <figcaption className="px-5 pb-5 pt-6 sm:px-[30px] sm:pb-7 sm:pt-8">
        <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-blue sm:text-[13px]">
          {kicker}
        </span>
        <p className="mt-2 flex flex-wrap items-baseline gap-x-2 leading-tight">
          <strong className="text-[34px] font-extrabold tracking-[-0.04em] sm:text-[42px]">{figure}</strong>
          <span className="text-base font-semibold sm:text-lg">{unit}</span>
        </p>
        <span className="mt-2 block text-[15px] text-muted sm:text-base">{caption}</span>
      </figcaption>
      <div className="shot border-t border-border">
        <Image src={src} alt={alt} width={1583} height={728} sizes="(min-width: 1100px) 1060px, 100vw" className="block h-auto w-full" />
      </div>
    </figure>
  );
}
