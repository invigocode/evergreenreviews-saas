"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChecklistItem } from "@/lib/types";

export function GbpChecklist({ items: initial }: { items: ChecklistItem[] }) {
  const [items, setItems] = useState(initial);
  const toggle = (id: string) => setItems((prev) => prev.map((i) => (i.id === id ? { ...i, done: !i.done } : i)));

  return (
    <ul className="flex flex-col gap-1">
      {items.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            onClick={() => toggle(item.id)}
            className="flex w-full items-start gap-3 rounded-lg px-2 py-2.5 text-left hover:bg-sand-50 cursor-pointer"
          >
            <span
              className={cn(
                "mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md border-2 transition-colors",
                item.done ? "border-evergreen-600 bg-evergreen-600" : "border-sand-300"
              )}
            >
              {item.done && <Check size={12} className="text-white" strokeWidth={3} />}
            </span>
            <span>
              <span className={cn("block text-sm font-medium", item.done ? "text-ink-700" : "text-ink-800")}>{item.label}</span>
              {item.helpText && <span className="mt-0.5 block text-xs text-ink-400">{item.helpText}</span>}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
