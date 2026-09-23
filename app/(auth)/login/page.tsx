"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signIn, enterDemoAccount } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Sparkles } from "lucide-react";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(signIn, undefined);

  return (
    <div className="animate-rise">
      <h1 className="text-2xl font-semibold tracking-tight text-ink-900">Welcome back</h1>
      <p className="mt-1.5 text-[15px] text-ink-500">Sign in to see how your reputation is growing.</p>

      <Card className="mt-6 p-6">
        <form action={formAction} className="space-y-4">
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
              placeholder="••••••••"
              className="w-full rounded-lg border border-sand-300 bg-white px-3.5 py-2.5 text-[15px] text-ink-900 placeholder:text-ink-400 focus:border-evergreen-500 focus:outline-none focus:ring-2 focus:ring-evergreen-100"
            />
          </div>
          {state?.error && (
            <p role="alert" className="text-sm font-medium text-error-600">
              {state.error}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-sand-200" />
          <span className="text-xs font-medium uppercase tracking-wide text-ink-400">or</span>
          <div className="h-px flex-1 bg-sand-200" />
        </div>

        <form action={enterDemoAccount}>
          <Button type="submit" variant="subtleGreen" className="w-full">
            <Sparkles size={16} />
            View the live demo account
          </Button>
        </form>
      </Card>

      <p className="mt-5 text-center text-sm text-ink-500">
        New to Evergreen Reviews?{" "}
        <Link href="/signup" className="font-medium text-evergreen-700 hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
