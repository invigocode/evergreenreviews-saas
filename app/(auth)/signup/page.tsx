"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signUp, enterDemoAccount } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Sparkles } from "lucide-react";

export default function SignupPage() {
  const [state, formAction, pending] = useActionState(signUp, undefined);

  return (
    <div className="animate-rise">
      <h1 className="text-2xl font-semibold tracking-tight text-ink-900">Let&apos;s build a stronger reputation</h1>
      <p className="mt-1.5 text-[15px] text-ink-500">Create your account — it takes about two minutes.</p>

      <Card className="mt-6 p-6">
        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="businessName" className="mb-1.5 block text-sm font-medium text-ink-700">
              Business name
            </label>
            <input
              id="businessName"
              name="businessName"
              required
              placeholder="Oak & Stone Property Services"
              className="w-full rounded-lg border border-sand-300 bg-white px-3.5 py-2.5 text-[15px] text-ink-900 placeholder:text-ink-400 focus:border-evergreen-500 focus:outline-none focus:ring-2 focus:ring-evergreen-100"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@business.com"
              className="w-full rounded-lg border border-sand-300 bg-white px-3.5 py-2.5 text-[15px] text-ink-900 placeholder:text-ink-400 focus:border-evergreen-500 focus:outline-none focus:ring-2 focus:ring-evergreen-100"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="At least 6 characters"
              className="w-full rounded-lg border border-sand-300 bg-white px-3.5 py-2.5 text-[15px] text-ink-900 placeholder:text-ink-400 focus:border-evergreen-500 focus:outline-none focus:ring-2 focus:ring-evergreen-100"
            />
          </div>
          {state?.error && (
            <p role="alert" className="text-sm font-medium text-error-600">
              {state.error}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Creating account…" : "Create account"}
          </Button>
          <p className="text-center text-xs text-ink-400">
            By continuing you agree to genuine, voluntary review requests — no incentivized or fake reviews.
          </p>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-sand-200" />
          <span className="text-xs font-medium uppercase tracking-wide text-ink-400">or</span>
          <div className="h-px flex-1 bg-sand-200" />
        </div>

        <form action={enterDemoAccount}>
          <Button type="submit" variant="subtleGreen" className="w-full">
            <Sparkles size={16} />
            Skip setup — view the live demo
          </Button>
        </form>
      </Card>

      <p className="mt-5 text-center text-sm text-ink-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-evergreen-700 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
