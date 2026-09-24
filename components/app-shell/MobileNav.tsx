"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { NavLinks } from "@/components/app-shell/NavLinks";
import { SidebarFooter } from "@/components/app-shell/SidebarFooter";

export function MobileNav({ email }: { email: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="sticky top-0 z-40 flex items-center justify-between border-b border-sand-200 bg-white px-4 py-3 lg:hidden">
      <Link href="/dashboard">
        <Logo size={16} />
      </Link>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-700 hover:bg-sand-100 cursor-pointer"
      >
        <Menu size={22} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-ink-900/40 animate-fade-in" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] animate-rise flex-col bg-white p-3.5 shadow-popover">
            <div className="flex items-center justify-between px-2 py-2">
              <Logo size={16} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close navigation menu"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-700 hover:bg-sand-100 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            <div className="mt-4 flex flex-1 flex-col overflow-y-auto scrollbar-thin">
              <NavLinks onNavigate={() => setOpen(false)} />
            </div>
            <SidebarFooter email={email} />
          </div>
        </div>
      )}
    </div>
  );
}
