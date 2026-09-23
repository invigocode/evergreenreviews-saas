"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE = "er_session";
const ONBOARDING_COOKIE = "er_onboarded";

export async function signIn(_prevState: { error?: string } | undefined, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !email.includes("@")) {
    return { error: "Enter a valid email address." };
  }
  if (password.length < 4) {
    return { error: "Enter your password." };
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, email, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });
  store.set(ONBOARDING_COOKIE, "1", { sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });
  redirect("/dashboard");
}

export async function signUp(_prevState: { error?: string } | undefined, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const businessName = String(formData.get("businessName") ?? "").trim();

  if (!businessName) return { error: "Tell us your business name to get started." };
  if (!email || !email.includes("@")) return { error: "Enter a valid email address." };
  if (password.length < 6) return { error: "Password must be at least 6 characters." };

  const store = await cookies();
  store.set(SESSION_COOKIE, email, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });
  redirect("/onboarding");
}

export async function enterDemoAccount() {
  const store = await cookies();
  store.set(SESSION_COOKIE, "demo@oakandstoneservices.com", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  store.set(ONBOARDING_COOKIE, "1", { sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });
  redirect("/dashboard");
}

export async function completeOnboarding() {
  const store = await cookies();
  store.set(ONBOARDING_COOKIE, "1", { sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });
  redirect("/dashboard");
}

export async function signOut() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  store.delete(ONBOARDING_COOKIE);
  redirect("/");
}

export async function getSession() {
  const store = await cookies();
  const email = store.get(SESSION_COOKIE)?.value ?? null;
  const onboarded = store.get(ONBOARDING_COOKIE)?.value === "1";
  return { email, onboarded, isDemo: email === "demo@oakandstoneservices.com" };
}
