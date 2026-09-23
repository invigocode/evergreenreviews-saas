"use client";

import { useState } from "react";
import { Check, ListChecks } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/Card";
import { weeklyChecklist } from "@/lib/demo-data";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

export function WeeklyChecklist() {
  const [items, setItems] = useState(weeklyChecklist);
  const { show } = useToast();
  const doneCount = items.filter((i) => i.done).length;

  const toggle = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const done = !item.done;
        if (done) show("Nice work — checklist updated.");
        return { ...item, done };
      })
    );
  };

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ListChecks size={16} className="text-evergreen-600" />
          <CardTitle>Your reputation checklist</CardTitle>
        </div>
        <span className="text-xs font-medium text-ink-400">
          {doneCount}/{items.length}
        </span>
      </div>

      <ul className="mt-3.5 flex flex-col gap-1">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="flex w-full items-start gap-3 rounded-lg px-2 py-2 text-left hover:bg-sand-50 cursor-pointer"
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
                <span className={cn("block text-sm font-medium", item.done ? "text-ink-400 line-through" : "text-ink-800")}>
                  {item.label}
                </span>
                {item.helpText && !item.done && <span className="mt-0.5 block text-xs text-ink-400">{item.helpText}</span>}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
