import Image from "next/image";
import { CountdownBar, CountdownTiles, LocalTimeAndCalendar } from "@/components/Countdown";
import HeroScene, { MotionToolbar } from "@/components/HeroScene";
import Logo from "@/components/Logo";
import RegistrationProvider from "@/components/RegistrationProvider";
import SalesChart from "@/components/SalesChart";
import SeatButton from "@/components/SeatButton";
import SiteFooter from "@/components/SiteFooter";
import { WEBINAR } from "@/lib/business";

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

function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`eyebrow mb-[18px] text-[11px] sm:mb-5 sm:text-xs ${className}`}>{children}</span>;
}

export default function Home() {
  return (
    <RegistrationProvider>
      <a
        href="#main"
        className="absolute left-4 top-[-100px] z-20 bg-white p-[15px] focus:top-3"
      >
        Skip to content
      </a>

      <CountdownBar />

      <header className="border-b border-border">
        <nav className={`${WRAP} flex items-center justify-between gap-3 py-[18px] md:gap-6 md:py-6`} aria-label="Main navigation">
          <Logo href="#main" />
          <div className="hidden gap-4 md:flex lg:gap-[25px]">
            {[
              ["#learn", "The webinar"],
              ["#host", "Meet Jacob"],
              ["#explore", "Explore"],
              ["#faq", "FAQs"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="py-2.5 text-sm font-bold text-purple no-underline lg:text-[15px]">
                {label}
              </a>
            ))}
          </div>
          <SeatButton size="nav" />
        </nav>
      </header>

      <main id="main">
        {/* ---------------- Hero ---------------- */}
        <section className={`${WRAP} grid min-w-0 grid-cols-1 items-center gap-[25px] pb-[25px] pt-8 min-[900px]:grid-cols-[1fr_1.08fr] min-[900px]:gap-6 min-[900px]:pb-[38px] min-[900px]:pt-14 min-[1100px]:gap-[42px]`}>
          <div className="min-w-0 max-w-[680px]">
            <Eyebrow>Free live Walmart webinar</Eyebrow>
            <h1 className="display mb-6 text-[clamp(36px,9.5vw,46px)] min-[600px]:text-[clamp(40px,4.2vw,58px)]">
              Your next chapter
              <br />
              in e-commerce
              <br />
              <em>starts with Walmart.</em>
            </h1>
            <p className="text-lg leading-[1.75] text-muted sm:text-[19px]">
              Learn the foundations of selling on Walmart Marketplace with Jacob Jones, a
              seven-figure e-commerce seller and the founder of SourceDart.
            </p>
            <p className="mb-[18px] mt-[25px] text-base font-extrabold sm:text-[17px]">
              {WEBINAR.dateLong} · {WEBINAR.time}
            </p>
            <SeatButton className="w-full min-[600px]:max-w-[440px]" />
            <p className="mt-[13px] text-sm text-muted">Free to attend. No credit card needed.</p>
          </div>
          <div className="min-w-0">
            <HeroScene />
          </div>
        </section>

        <MotionToolbar />

        <div className="border-y border-border py-[25px]">
          <div className={`${WRAP} flex flex-col items-center justify-between gap-5 md:flex-row md:gap-6`}>
            <div className="flex items-center gap-4 text-[13px] text-muted sm:text-sm">
              <span>Sponsored by</span>
              <Image src="/sourcedart.svg" alt="SourceDart" width={152} height={22} className="w-[152px] brightness-[0.2]" />
            </div>
            <div className="flex flex-wrap justify-center gap-2.5 text-[13px] font-bold sm:gap-[15px] sm:text-sm lg:gap-[30px] lg:text-base">
              {["Beginner friendly", "Practical training", "Live Q&A"].map((fact) => (
                <span key={fact}>
                  <span className="mr-[9px] text-purple" aria-hidden="true">✓</span>
                  {fact}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ---------------- What you'll learn ---------------- */}
        <section id="learn" className={`${SECTION} bg-pale`}>
          <div className={WRAP}>
            <div className="mb-7 max-w-[700px] sm:mb-[38px]">
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
                  className="learn-card group relative min-w-0 overflow-hidden rounded-[22px] border border-border bg-white p-[27px] transition-[transform,box-shadow,border-color] duration-250 hover:-translate-y-[5px] hover:border-[#cdaedb] hover:shadow-[0_15px_35px_#60296f0b] md:p-8"
                >
                  <span className="mb-[22px] inline-block rounded-[25px] bg-pale px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.08em] text-purple transition-colors group-hover:bg-[#ead9f2] group-hover:text-[#50215e]">
                    {card.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute right-7 top-7 text-[28px] font-extrabold text-lilac transition-[color,transform] duration-300 group-hover:-translate-y-[3px] group-hover:text-[#ac79bf]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display mb-[15px] max-w-[350px] text-2xl sm:text-[25px]">{card.title}</h3>
                  <p className="max-w-[440px] text-[17px] text-muted">{card.body}</p>
                </article>
              ))}
            </div>

            <div className="relative mt-[30px] flex flex-col items-stretch gap-3.5 overflow-hidden rounded-[18px] bg-[linear-gradient(110deg,#31143e,#50215e)] px-[22px] py-[26px] text-white min-[601px]:grid min-[601px]:grid-cols-[1fr_180px] min-[601px]:gap-5 min-[601px]:p-[27px] min-[901px]:grid-cols-[1fr_.65fr_auto] min-[901px]:gap-[17px] min-[1101px]:grid-cols-[1.25fr_.8fr_auto] min-[1101px]:gap-[22px] min-[1101px]:px-8 min-[1101px]:py-7">
              <div className="relative z-[1] self-center">
                <h3 className="display text-[21px] min-[1101px]:text-[23px]">Your first step is a free seat.</h3>
                <p className="mt-[5px] text-base text-[#e1d0e7]">
                  Join Jacob live on October 30 at {WEBINAR.time}.
                </p>
              </div>
              <div className="relative mx-auto h-[90px] w-full max-w-[340px] min-w-0 min-[601px]:mx-0 min-[601px]:h-[110px] min-[601px]:max-w-none min-[901px]:h-auto min-[901px]:min-h-[100px] min-[901px]:self-stretch" aria-hidden="true">
                <svg viewBox="0 0 330 130" className="h-full w-full overflow-visible">
                  <path d="M5 120C65 100 80 110 125 85S220 55 255 30S300 17 325 7" stroke="#ffffff18" strokeWidth="4" fill="none" />
                  <path className="banner-line" pathLength={1} d="M5 120C65 100 80 110 125 85S220 55 255 30S300 17 325 7" stroke="#f6c866" strokeWidth="4" fill="none" />
                  <circle cx="325" cy="7" r="5" fill="#ffdf9b" />
                </svg>
                <span className="absolute left-[15px] top-1 text-[11px] font-extrabold text-[#f4d393] sm:top-0 sm:text-xs">
                  Learn. Plan. Build.
                </span>
              </div>
              <SeatButton
                variant="light"
                className="w-full self-center min-[601px]:col-span-full min-[901px]:col-span-1 min-[901px]:w-auto min-[901px]:px-5 min-[901px]:text-base min-[1101px]:px-[27px] min-[1101px]:text-[19px]"
              />
            </div>
          </div>
        </section>

        {/* ---------------- Interactive chart ---------------- */}
        <section id="explore" className={SECTION}>
          <div className={`${WRAP} grid grid-cols-1 items-center gap-10 min-[901px]:grid-cols-2 min-[901px]:gap-[38px] lg:gap-20`}>
            <div className="min-w-0">
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
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-pale text-[19px] font-extrabold text-purple transition-[transform,background-color] duration-250 group-hover:-translate-y-[3px] group-hover:bg-[#eadbf1]">
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
            <SalesChart />
          </div>
        </section>

        {/* ---------------- Host ---------------- */}
        <section id="host" className={`${SECTION} bg-pale`}>
          <div className={`${WRAP} grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-[45px] lg:gap-20`}>
            <div className="relative mx-auto h-[420px] w-full overflow-hidden rounded-3xl bg-[#eee5f3] sm:h-[440px] md:mx-0 md:h-[500px] md:max-w-[460px]">
              <Image
                src="/jacob-host.png"
                alt="Jacob Jones, webinar host"
                fill
                sizes="(min-width: 800px) 460px, 100vw"
                className="origin-[44%_61%] scale-[1.28] object-cover object-[44%_58%]"
              />
              <div className="absolute inset-x-3.5 bottom-3.5 z-[1] rounded-[14px] bg-white p-[18px] leading-snug sm:inset-x-[22px] sm:bottom-[22px]">
                <strong className="block text-[22px]">Jacob Jones</strong>
                <span className="text-[15px] text-muted">7-figure seller · Founder of SourceDart</span>
              </div>
            </div>
            <div className="max-w-[650px]">
              <Eyebrow>Meet your host</Eyebrow>
              <h2 className="display mb-6 text-[33px] sm:text-[clamp(32px,3.2vw,44px)]">
                Learn from someone
                <br />
                <em>who’s built the business.</em>
              </h2>
              <p className="text-muted">
                Jacob Jones is a seven-figure e-commerce seller who has scaled multiple online
                businesses beyond seven figures. He is also the founder and owner of SourceDart, a
                sourcing tool built for Walmart sellers.
              </p>
              <p className="mt-[18px] text-muted">
                In this live session, Jacob brings that hands-on experience to the foundations of
                selling on Walmart — helping you understand the process and make more informed
                decisions about your next steps.
              </p>
              <SeatButton className="mt-7" />
            </div>
          </div>
        </section>

        {/* ---------------- Surprises ---------------- */}
        <section className={`${SECTION} text-center`}>
          <div className={WRAP}>
            <div className="mx-auto mb-7 max-w-[700px] sm:mb-[35px]">
              <Eyebrow>There’s more in store</Eyebrow>
              <h2 className="display text-[33px] sm:text-[clamp(32px,3.2vw,44px)]">
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
                  className="reveal relative rounded-[14px] border border-border bg-[linear-gradient(150deg,#fcfaff,#f1e7f7)] px-[5px] py-[17px] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-[5px] hover:border-[#d2b4de] hover:shadow-[0_16px_30px_#60296f10] sm:rounded-[22px] sm:px-[15px] sm:py-7"
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
        <section className={WRAP} aria-label="Reserve your webinar seat">
          <div className="join-panel rounded-[22px] px-[19px] py-10 text-center text-white sm:rounded-[28px] sm:px-6 sm:py-[62px]">
            <span className="eyebrow mb-[18px] bg-white/[0.09] text-[11px] text-[#eedcf4] sm:mb-5 sm:text-xs">
              {WEBINAR.dateShort} · {WEBINAR.time}
            </span>
            <h2 className="display mx-auto max-w-[640px] text-[34px] sm:text-[clamp(33px,3.7vw,49px)]">
              Take the next step.
              <br />
              Join Jacob live.
            </h2>
            <p className="mx-auto my-5 max-w-[590px] text-[17px] text-[#e4d3eb] sm:text-lg">
              A free session to help you understand Walmart Marketplace and where to begin.
            </p>
            <CountdownTiles />
            <SeatButton variant="light" className="w-full sm:w-auto sm:min-w-[280px]" />
            <LocalTimeAndCalendar />
          </div>
        </section>

        {/* ---------------- FAQ ---------------- */}
        <section id="faq" className={SECTION}>
          <div className={`${WRAP} max-w-[850px]`}>
            <div className="mb-8 text-center">
              <Eyebrow>Good questions. Clear answers.</Eyebrow>
              <h2 className="display text-[33px] sm:text-[clamp(32px,3.2vw,44px)]">Before you join</h2>
            </div>
            {FAQS.map((item) => (
              <details
                key={item.q}
                className="faq-card mt-3.5 rounded-[13px] border border-border transition-[border-color,box-shadow] duration-250 hover:border-[#d0b2dd] open:border-[#d0b2dd] open:shadow-[0_6px_18px_#60296f06]"
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
