import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const DEMO_SESSION_COOKIE = "er_demo_session";
const DEMO_EMAIL = "demo@oakandstoneservices.com";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isDemo = request.cookies.get(DEMO_SESSION_COOKIE)?.value === DEMO_EMAIL;

  if (isDemo) {
    return NextResponse.next();
  }

  const { response, user, supabase } = await updateSession(request);

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/onboarding")) {
    if (!user || !supabase) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const { data: membership } = await supabase
      .from("business_members")
      .select("business_id")
      .eq("user_id", user.id)
      .limit(1)
      .maybeSingle();

    if (pathname.startsWith("/dashboard") && !membership) {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }
    if (pathname.startsWith("/onboarding") && membership) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/onboarding/:path*"],
};
