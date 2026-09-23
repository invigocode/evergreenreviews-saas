"use client";

import { cn } from "@/lib/utils";

export function Switch({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 py-3">
      <span>
        <span className="block text-sm font-medium text-ink-800">{label}</span>
        {description && <span className="mt-0.5 block text-xs text-ink-500">{description}</span>}
      </span>
      <span className="relative inline-flex h-6 w-11 shrink-0 items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <span
          className={cn(
            "absolute inset-0 rounded-full transition-colors",
            checked ? "bg-evergreen-700" : "bg-sand-300"
          )}
        />
        <span
          className={cn(
            "absolute h-[18px] w-[18px] rounded-full bg-white shadow transition-transform",
            checked ? "translate-x-[22px]" : "translate-x-[3px]"
          )}
        />
      </span>
    </label>
  );
}
