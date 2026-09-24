"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient, createServiceRoleClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const DEMO_SESSION_COOKIE = "er_demo_session";
const DEMO_EMAIL = "demo@oakandstoneservices.com";

export async function enterDemoAccount() {
  const store = await cookies();
  store.set(DEMO_SESSION_COOKIE, DEMO_EMAIL, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect("/dashboard");
}

export async function completeOnboarding(_prevState: { error?: string } | undefined, formData: FormData) {
  if (!isSupabaseConfigured()) {
    return { error: "Sign-up isn't fully configured yet. Please try again shortly." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signup");
  }

  const name = String(formData.get("businessName") ?? "").trim();
  if (!name) {
    return { error: "Business name is required." };
  }

  // Business + first-membership creation is privileged (RLS has no client
  // insert policy for these tables on purpose) — service role only, and
  // only ever inserts a membership for the currently authenticated user.
  const admin = createServiceRoleClient();

  const { data: business, error: businessError } = await admin
    .from("businesses")
    .insert({
      name,
      category: String(formData.get("category") ?? "") || null,
      website: String(formData.get("website") ?? "") || null,
      address: String(formData.get("address") ?? "") || null,
      phone: String(formData.get("phone") ?? "") || null,
      employee_count: String(formData.get("employeeCount") ?? "") || null,
    })
    .select("id")
    .single();

  if (businessError || !business) {
    return { error: "Something went wrong creating your business. Please try again." };
  }

  const { error: memberError } = await admin
    .from("business_members")
    .insert({ business_id: business.id, user_id: user.id, role: "owner" });

  if (memberError) {
    return { error: "Something went wrong linking your account. Please try again." };
  }

  redirect("/dashboard");
}

export async function signOut() {
  const store = await cookies();
  const wasDemo = store.get(DEMO_SESSION_COOKIE)?.value === DEMO_EMAIL;
  store.delete(DEMO_SESSION_COOKIE);

  if (!wasDemo && isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }

  redirect("/");
}

export async function getSession() {
  const store = await cookies();
  const demoEmail = store.get(DEMO_SESSION_COOKIE)?.value ?? null;

  if (demoEmail === DEMO_EMAIL) {
    return { email: demoEmail, isDemo: true, onboarded: true, userId: null as string | null };
  }

  if (!isSupabaseConfigured()) {
    return { email: null, isDemo: false, onboarded: false, userId: null as string | null };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { email: null, isDemo: false, onboarded: false, userId: null as string | null };
  }

  const { data: membership } = await supabase
    .from("business_members")
    .select("business_id")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  return {
    email: user.email ?? null,
    isDemo: false,
    onboarded: Boolean(membership),
    userId: user.id,
  };
}
