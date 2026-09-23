import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  max = 100,
  className,
  trackClassName,
  fillClassName,
}: {
  value: number;
  max?: number;
  className?: string;
  trackClassName?: string;
  fillClassName?: string;
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cn("h-2 w-full overflow-hidden rounded-full bg-sand-200", trackClassName, className)}
    >
      <div
        className={cn("h-full rounded-full bg-evergreen-600 transition-[width] duration-500 ease-out", fillClassName)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
