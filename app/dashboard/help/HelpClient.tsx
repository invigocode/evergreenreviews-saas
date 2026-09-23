"use client";

import { useMemo, useState } from "react";
import { Search, Mail, MessageCircle, ChevronDown } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

const faqs = [
  {
    category: "Getting started",
    question: "How does Evergreen Reviews get me more Google reviews?",
    answer:
      "We help you build a simple, consistent system: request reviews from customers at the right moment, track what happens, and make it easy for happy customers to leave feedback. We never generate, buy, or fake reviews — every review comes from a real customer.",
  },
  {
    category: "Getting started",
    question: "Do I need to connect Google to use Evergreen Reviews?",
    answer:
      "You can explore the product without connecting Google, but connecting your Google Business Profile lets us show your real review count, rating, and growth over time using Google's official API.",
  },
  {
    category: "Review requests",
    question: "Will Evergreen Reviews spam my customers?",
    answer:
      "No. We follow a one-request philosophy — each customer is asked once per completed job, and you stay in control of timing and channel.",
  },
  {
    category: "Review requests",
    question: "Can I tell exactly which request led to which review?",
    answer:
      "Not with certainty. We can measure link clicks directly, and estimate which campaign likely led to a review based on timing — but Google doesn't confirm which link a reviewer used, so we're always transparent about what's measured versus estimated.",
  },
  {
    category: "Responses",
    question: "Does Evergreen Reviews publish responses automatically?",
    answer:
      "No. AI-assisted response suggestions are always a starting point. You review, edit, and approve every response yourself before it goes live on Google.",
  },
  {
    category: "Billing",
    question: "Can I change or cancel my plan anytime?",
    answer: "Yes — go to Settings → Subscription. Changes apply at the start of your next billing period.",
  },
];

export function HelpClient() {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const { show } = useToast();

  const filtered = useMemo(
    () => faqs.filter((f) => `${f.question} ${f.answer}`.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const categories = [...new Set(filtered.map((f) => f.category))];

  return (
    <div className="flex flex-col gap-6">
      <div className="relative max-w-md">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search help articles…"
          className="w-full rounded-lg border border-sand-300 bg-white py-2.5 pl-9 pr-3 text-sm focus:border-evergreen-500 focus:outline-none focus:ring-2 focus:ring-evergreen-100"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card className="flex items-start gap-3 p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-evergreen-50 text-evergreen-700">
            <Mail size={18} />
          </div>
          <div>
            <p className="font-semibold text-ink-900">Email support</p>
            <p className="mt-0.5 text-sm text-ink-500">We typically reply within one business day.</p>
            <a href="mailto:support@evergreenreviews.com" className="mt-2 inline-block text-sm font-medium text-evergreen-700 hover:underline">
              support@evergreenreviews.com
            </a>
          </div>
        </Card>
        <Card className="flex items-start gap-3 p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-evergreen-50 text-evergreen-700">
            <MessageCircle size={18} />
          </div>
          <div>
            <p className="font-semibold text-ink-900">Send us a message</p>
            <p className="mt-0.5 text-sm text-ink-500">Tell us what&apos;s on your mind — we read every message.</p>
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <CardTitle>Send us a message</CardTitle>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="How can we help?"
          className="mt-3 w-full rounded-lg border border-sand-300 bg-white px-3.5 py-2.5 text-sm focus:border-evergreen-500 focus:outline-none focus:ring-2 focus:ring-evergreen-100"
        />
        <Button
          className="mt-3"
          disabled={!message.trim()}
          onClick={() => {
            setMessage("");
            show("Message sent — we'll get back to you soon.");
          }}
        >
          Send message
        </Button>
      </Card>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-ink-900">Frequently asked questions</h2>
        {categories.length === 0 ? (
          <p className="text-sm text-ink-500">No articles match “{query}”.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {categories.map((cat) => (
              <div key={cat}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-400">{cat}</p>
                <div className="flex flex-col gap-2">
                  {filtered
                    .filter((f) => f.category === cat)
                    .map((f) => (
                      <details key={f.question} className="group rounded-xl border border-sand-200 bg-white p-4">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-ink-800 [&::-webkit-details-marker]:hidden">
                          {f.question}
                          <ChevronDown size={16} className="shrink-0 text-ink-400 transition-transform group-open:rotate-180" />
                        </summary>
                        <p className="mt-2.5 text-sm leading-relaxed text-ink-600">{f.answer}</p>
                      </details>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
