import Link from "next/link";
import { Logo } from "@/components/Logo";

export function MarketingFooter() {
  return (
    <footer className="border-t border-sand-200 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-3 text-sm leading-relaxed text-ink-500">
              A simple, consistent system for turning genuine customer experiences into Google reviews.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Product</p>
              <ul className="mt-3 space-y-2 text-sm text-ink-600">
                <li><a href="#how-it-works" className="hover:text-ink-900">How it works</a></li>
                <li><a href="#features" className="hover:text-ink-900">Features</a></li>
                <li><a href="#pricing" className="hover:text-ink-900">Pricing</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Company</p>
              <ul className="mt-3 space-y-2 text-sm text-ink-600">
                <li><Link href="/login" className="hover:text-ink-900">Sign in</Link></li>
                <li><Link href="/signup" className="hover:text-ink-900">Get started</Link></li>
                <li><a href="mailto:hello@evergreenreviews.com" className="hover:text-ink-900">Contact</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Policies</p>
              <ul className="mt-3 space-y-2 text-sm text-ink-600">
                <li>Genuine reviews only</li>
                <li>No incentivised reviews</li>
                <li>Google API compliant</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-sand-200 pt-6 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Evergreen Reviews. All rights reserved.</p>
          <p>Evergreen Reviews never buys, fakes, or incentivises Google reviews.</p>
        </div>
      </div>
    </footer>
  );
}
