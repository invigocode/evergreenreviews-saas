import { Logo } from "@/components/Logo";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-sand-50">
      <header className="border-b border-sand-200 bg-white px-6 py-4 sm:px-10">
        <Logo />
      </header>
      <main className="mx-auto max-w-2xl px-6 py-10 sm:py-14">{children}</main>
    </div>
  );
}
