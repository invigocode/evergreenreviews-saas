"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav, secondaryNav } from "@/lib/nav";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(href + "/");
}

export function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  const renderItems = (items: readonly { label: string; href: string; icon: typeof primaryNav[number]["icon"] }[]) =>
    items.map(({ label, href, icon: Icon }) => {
      const active = isActive(pathname, href);
      return (
        <Link
          key={href}
          href={href}
          onClick={onNavigate}
          aria-current={active ? "page" : undefined}
          className={cn(
            "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            active
              ? "bg-evergreen-800 text-white"
              : "text-ink-600 hover:bg-sand-100 hover:text-ink-900"
          )}
        >
          <Icon size={18} strokeWidth={2} className={active ? "text-evergreen-200" : "text-ink-400 group-hover:text-ink-600"} />
          {label}
        </Link>
      );
    });

  return (
    <nav className="flex flex-1 flex-col gap-6" aria-label="Primary">
      <div className="flex flex-col gap-0.5">{renderItems(primaryNav)}</div>
      <div className="mt-auto flex flex-col gap-0.5 border-t border-sand-200 pt-4">
        {renderItems(secondaryNav)}
      </div>
    </nav>
  );
}
