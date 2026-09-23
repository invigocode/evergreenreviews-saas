import Link from "next/link";
import { Sparkles } from "lucide-react";
import { enterDemoAccount } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";

const errorMessages: Record<string, string> = {
  missing_code: "Something went wrong starting that sign-in. Please try again.",
  auth_failed: "We couldn't complete that sign-in with Google. Please try again.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="animate-rise">
      <h1 className="text-2xl font-semibold tracking-tight text-ink-900">Welcome back</h1>
      <p className="mt-1.5 text-[15px] text-ink-500">Sign in to see how your reputation is growing.</p>

      <Card className="mt-6 p-6">
        {error && (
          <p role="alert" className="mb-4 text-sm font-medium text-error-600">
            {errorMessages[error] ?? "Something went wrong. Please try again."}
          </p>
        )}

        <GoogleSignInButton label="Sign in with Google" />

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
