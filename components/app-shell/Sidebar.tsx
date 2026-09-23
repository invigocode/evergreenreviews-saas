import Link from "next/link";
import { Logo } from "@/components/Logo";
import { NavLinks } from "@/components/app-shell/NavLinks";
import { SidebarFooter } from "@/components/app-shell/SidebarFooter";

export function Sidebar({ email }: { email: string }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 shrink-0 flex-col border-r border-sand-200 bg-white px-3.5 py-4 lg:flex">
      <Link href="/dashboard" className="px-2 py-2">
        <Logo iconSize={26} />
      </Link>
      <div className="mt-6 flex flex-1 flex-col overflow-y-auto scrollbar-thin">
        <NavLinks />
      </div>
      <SidebarFooter email={email} />
    </aside>
  );
}
