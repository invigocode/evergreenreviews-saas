import { type ReactNode } from "react";
import { ArrowDown, ArrowUp, Info } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export function MetricCard({
  label,
  value,
  delta,
  deltaDisplay,
  deltaLabel,
  helpText,
  icon,
  accent = "neutral",
  children,
}: {
  label: string;
  value: string;
  delta?: number;
  deltaDisplay?: string;
  deltaLabel?: string;
  helpText?: string;
  icon?: ReactNode;
  accent?: "neutral" | "green";
  children?: ReactNode;
}) {
  const trendPositive = typeof delta === "number" && delta > 0;
  const trendNegative = typeof delta === "number" && delta < 0;

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <p className="flex items-center gap-1.5 text-sm font-medium text-ink-500">
          {label}
          {helpText && (
            <span className="group relative inline-flex">
              <Info size={13} className="text-ink-400" aria-hidden />
              <span
                role="tooltip"
                className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-52 -translate-x-1/2 rounded-lg bg-ink-900 px-3 py-2 text-xs font-normal leading-snug text-white opacity-0 shadow-popover transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
              >
                {helpText}
              </span>
            </span>
          )}
        </p>
        {icon && (
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
              accent === "green" ? "bg-evergreen-50 text-evergreen-700" : "bg-sand-100 text-ink-600"
            )}
          >
            {icon}
          </div>
        )}
      </div>

      <p className="mt-3 text-[28px] font-semibold leading-none tracking-tight text-ink-900 tabular-nums">
        {value}
      </p>

      {(deltaLabel || typeof delta === "number") && (
        <div className="mt-2.5 flex items-center gap-1.5">
          {typeof delta === "number" && delta !== 0 && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-semibold tabular-nums",
                trendPositive && "bg-evergreen-50 text-evergreen-700",
                trendNegative && "bg-error-50 text-error-600"
              )}
            >
              {trendPositive ? <ArrowUp size={11} /> : <ArrowDown size={11} />}
              {deltaDisplay ?? Math.abs(delta)}
            </span>
          )}
          {deltaLabel && <span className="text-xs text-ink-500">{deltaLabel}</span>}
        </div>
      )}

      {children}
    </Card>
  );
}
