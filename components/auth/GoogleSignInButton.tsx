"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GoogleIcon } from "@/components/GoogleIcon";
import { createClient } from "@/lib/supabase/client";

export function GoogleSignInButton({ label = "Continue with Google" }: { label?: string }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async () => {
    setPending(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) {
        setError(error.message);
        setPending(false);
      }
      // On success the browser is redirected to Google, so nothing else runs here.
    } catch {
      setError("Sign-in isn't fully configured yet. Please try again shortly.");
      setPending(false);
    }
  };

  return (
    <div>
      <Button type="button" variant="secondary" className="w-full" onClick={signIn} disabled={pending}>
        {pending ? <Loader2 size={16} className="animate-spin" /> : <GoogleIcon />}
        {pending ? "Redirecting to Google…" : label}
      </Button>
      {error && (
        <p role="alert" className="mt-2 text-sm font-medium text-error-600">
          {error}
        </p>
      )}
    </div>
  );
}
