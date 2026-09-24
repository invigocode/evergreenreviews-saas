import Link from "next/link";
import {
  Send,
  BarChart3,
  Building2,
  QrCode,
  MessageSquareText,
  Clock,
  Search,
  ShieldCheck,
  Check,
  ChevronDown,
} from "lucide-react";
import { MarketingHeader } from "@/components/marketing/Header";
import { MarketingFooter } from "@/components/marketing/Footer";
import { ReviewAuditTool } from "@/components/marketing/ReviewAuditTool";
import { ButtonLink } from "@/components/ui/Button";

const businessTypes = [
  "Roofers", "Plumbers", "Electricians", "Builders", "Cleaning companies",
  "Landscapers", "Mechanics", "Salons & barbers", "Cafés", "Hotels",
];

const features = [
  {
    icon: Send,
    title: "Review-request systems",
    description: "Build campaigns that ask for feedback at the right moment — personal, respectful, and never needy.",
  },
  {
    icon: BarChart3,
    title: "Clear analytics",
    description: "See review growth, rating trends, and what's actually driving results — with honest, measured numbers.",
  },
  {
    icon: Building2,
    title: "Google review management",
    description: "Keep your profile accurate and respond to reviews with confidence, all from one place.",
  },
  {
    icon: QrCode,
    title: "QR codes & materials",
    description: "Generate branded QR codes and printable cards that make it effortless for customers to leave a review.",
  },
];

const steps = [
  { title: "Connect your business", description: "Add your details and link your Google Business Profile." },
  { title: "Send thoughtful requests", description: "Ask happy customers for a review at a sensible, well-timed moment." },
  { title: "Track what's working", description: "See requests, clicks, and reviews in one clear, honest dashboard." },
  { title: "Respond with confidence", description: "Reply to every review — positive or critical — the right way." },
];

const pricing = [
  { name: "Starter", price: "$39", features: ["Up to 100 requests/mo", "1 campaign", "QR codes & materials", "Email support"] },
  { name: "Growth", price: "$99", popular: true, features: ["Up to 500 requests/mo", "Unlimited campaigns", "SMS + Email", "Priority support"] },
  { name: "Pro", price: "$199", features: ["Unlimited requests", "Multiple locations", "Team accounts", "Dedicated support"] },
];

const faqs = [
  {
    q: "Will this get me fake or incentivised reviews?",
    a: "No. Evergreen Reviews only helps you ask real customers for genuine feedback, at a sensible time, through channels they're comfortable with. We never generate, buy, or incentivise reviews — doing so violates Google's policies and isn't something we'll build.",
  },
  {
    q: "Can you guarantee more 5-star reviews?",
    a: "No honest tool can guarantee that, and we won't claim otherwise. What we can do is make it dramatically easier for satisfied customers to leave the review they were already happy to give.",
  },
  {
    q: "Do you control Google's search ranking?",
    a: "No. We help keep your Google Business Profile accurate and complete, which helps customers find reliable information — but ranking decisions are entirely up to Google.",
  },
  {
    q: "What happens with negative reviews?",
    a: "You'll see them clearly, with calm, professional response guidance. We never suggest hiding, disputing without cause, or incentivising a change to a genuine review.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-sand-50">
      <MarketingHeader />

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-5 pb-16 pt-16 text-center sm:pt-24">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-sand-300 bg-white px-3 py-1 text-xs font-medium text-ink-600">
            <ShieldCheck size={13} className="text-evergreen-600" /> Built for genuine, Google-policy-compliant reviews
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl">
            Turn more happy customers into genuine Google reviews.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-500">
            Evergreen Reviews helps you build a simple, consistent review system that makes it easier for satisfied
            customers to share their experience.
          </p>
          <div className="mt-10">
            <ReviewAuditTool />
          </div>
          <p className="mt-5 text-sm text-ink-400">
            No credit card required · Prefer to skip ahead?{" "}
            <Link href="/signup" className="font-medium text-evergreen-700 hover:underline">
              Create your account
            </Link>
          </p>
        </section>

        {/* Problem */}
        <section className="border-y border-sand-200 bg-white py-16">
          <div className="mx-auto max-w-6xl px-5">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
                Most businesses aren&apos;t missing happy customers — they&apos;re missing a system.
              </h2>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <ProblemCard
                icon={<Clock size={20} />}
                title="Asking gets forgotten"
                description="Busy teams mean to ask for a review, but the moment passes and it never happens."
              />
              <ProblemCard
                icon={<Search size={20} />}
                title="No visibility"
                description="Without tracking, you can't tell whether requests are working or just disappearing."
              />
              <ProblemCard
                icon={<MessageSquareText size={20} />}
                title="Reviews go unanswered"
                description="Especially the critical ones — which is exactly when a thoughtful response matters most."
              />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="py-16">
          <div className="mx-auto max-w-6xl px-5">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">How it works</h2>
              <p className="mt-3 text-ink-500">A repeatable system, not another thing to remember.</p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, i) => (
                <div key={step.title}>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-evergreen-800 text-sm font-semibold text-white">
                    {i + 1}
                  </div>
                  <p className="mt-3 font-semibold text-ink-900">{step.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-500">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-y border-sand-200 bg-white py-16">
          <div className="mx-auto max-w-6xl px-5">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
                Everything you need, nothing you don&apos;t
              </h2>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {features.map((f) => (
                <div key={f.title} className="rounded-2xl border border-sand-200 p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-evergreen-50 text-evergreen-700">
                    <f.icon size={20} />
                  </div>
                  <p className="mt-4 font-semibold text-ink-900">{f.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits / who it's for */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-5 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
              Built for local, trust-driven businesses
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-ink-500">
              Any business where reputation and word of mouth matter — this is designed around how you actually work.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
              {businessTypes.map((b) => (
                <span key={b} className="rounded-full border border-sand-300 bg-white px-4 py-2 text-sm font-medium text-ink-700">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-y border-sand-200 bg-white py-16">
          <div className="mx-auto max-w-6xl px-5">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">Simple, transparent pricing</h2>
              <p className="mt-3 text-ink-500">Start free with the live demo. Upgrade when you&apos;re ready.</p>
            </div>
            <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
              {pricing.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-2xl border p-6 ${plan.popular ? "border-evergreen-600 shadow-card-hover" : "border-sand-200"}`}
                >
                  {plan.popular && (
                    <span className="mb-3 inline-block rounded-full bg-evergreen-800 px-2.5 py-1 text-xs font-medium text-white">
                      Most popular
                    </span>
                  )}
                  <p className="font-semibold text-ink-900">{plan.name}</p>
                  <p className="mt-1 text-3xl font-semibold tabular-nums text-ink-900">
                    {plan.price}
                    <span className="text-sm font-normal text-ink-400">/mo</span>
                  </p>
                  <ul className="mt-5 space-y-2.5 text-sm text-ink-600">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <Check size={14} className="text-evergreen-600" /> {f}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink href="/signup" variant={plan.popular ? "primary" : "secondary"} className="mt-6 w-full">
                    Get started
                  </ButtonLink>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-16">
          <div className="mx-auto max-w-3xl px-5">
            <h2 className="text-center text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
              Frequently asked questions
            </h2>
            <div className="mt-8 flex flex-col gap-2.5">
              {faqs.map((f) => (
                <details key={f.q} className="group rounded-xl border border-sand-200 bg-white p-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-medium text-ink-800 [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <ChevronDown size={18} className="shrink-0 text-ink-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-5xl px-5 pb-20">
          <div className="rounded-3xl bg-evergreen-900 px-8 py-14 text-center sm:px-16">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Your growth story starts with the next conversation.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-evergreen-100">
              Set up your first review-request campaign in minutes — or explore the live demo account first.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href="/signup" size="lg" variant="onDark">
                Get started
              </ButtonLink>
              <ButtonLink href="/login" size="lg" variant="ghostOnDark">
                View the live demo
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}

function ProblemCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="rounded-2xl bg-sand-50 p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-ink-600 shadow-sm">{icon}</div>
      <p className="mt-4 font-semibold text-ink-900">{title}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{description}</p>
    </div>
  );
}
