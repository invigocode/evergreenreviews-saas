"use client";

import { cn } from "@/lib/utils";

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
}: {
  options: { label: string; value: T }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      className={cn("inline-flex items-center gap-0.5 rounded-lg border border-sand-200 bg-sand-100 p-0.5", className)}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          role="tab"
          type="button"
          aria-selected={value === opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-150 cursor-pointer",
            value === opt.value ? "bg-white text-ink-900 shadow-sm" : "text-ink-500 hover:text-ink-800"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
