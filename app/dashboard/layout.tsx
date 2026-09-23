import { getSession } from "@/lib/auth";
import { Sidebar } from "@/components/app-shell/Sidebar";
import { MobileNav } from "@/components/app-shell/MobileNav";
import { ToastProvider } from "@/components/ui/Toast";
import { FlaskConical } from "lucide-react";
import Link from "next/link";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  const email = session.email ?? "you@business.com";

  return (
    <ToastProvider>
      <div className="min-h-screen bg-sand-50 lg:pl-64">
        <Sidebar email={email} />
        <MobileNav email={email} />

        {session.isDemo && (
          <div className="flex items-center justify-center gap-2 bg-gold-100 px-4 py-2 text-center text-xs font-medium text-gold-600">
            <FlaskConical size={13} className="shrink-0" />
            You&apos;re viewing the Oak & Stone Property Services demo account with sample data.
            <Link href="/signup" className="underline underline-offset-2 hover:text-gold-500">
              Create your own account
            </Link>
          </div>
        )}

        <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </ToastProvider>
  );
}
