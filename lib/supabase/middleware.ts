import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

// Refreshes the Supabase auth token on every request and returns both the
// (possibly redirected) response and the current user, if any. If Supabase
// hasn't been configured yet (no env vars set), this behaves as "signed
// out" instead of throwing, so the app degrades gracefully.
export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({ request });

  if (!isSupabaseConfigured()) {
    return { response, user: null, supabase: null };
  }

  let nextResponse = response;

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        nextResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => nextResponse.cookies.set(name, value, options));
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { response: nextResponse, user, supabase };
}
