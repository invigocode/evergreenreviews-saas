import { type ComponentProps } from "react";
import { cn } from "@/lib/utils";

const tones = {
  neutral: "bg-sand-100 text-ink-700",
  green: "bg-evergreen-50 text-evergreen-700",
  gold: "bg-gold-100 text-gold-600",
  warning: "bg-warning-50 text-warning-600",
  error: "bg-error-50 text-error-600",
  outline: "border border-sand-300 text-ink-600",
};

export function Badge({
  tone = "neutral",
  className,
  ...props
}: { tone?: keyof typeof tones } & ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium leading-none",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}
