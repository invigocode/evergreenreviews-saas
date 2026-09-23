"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ButtonLink } from "@/components/ui/Button";

const links = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function MarketingHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-sand-200/80 bg-sand-50/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" aria-label="Evergreen Reviews home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Marketing">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-ink-600 hover:text-ink-900">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ButtonLink href="/login" variant="ghost" size="sm">
            Sign in
          </ButtonLink>
          <ButtonLink href="/signup" size="sm">
            Get started
          </ButtonLink>
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-700 hover:bg-sand-100 md:hidden cursor-pointer"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-sand-200 bg-white px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-3.5" aria-label="Marketing mobile">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium text-ink-700">
                {l.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <ButtonLink href="/login" variant="secondary">
                Sign in
              </ButtonLink>
              <ButtonLink href="/signup">Get started</ButtonLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
