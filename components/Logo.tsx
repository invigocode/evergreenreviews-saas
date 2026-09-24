import { cn } from "@/lib/utils";

export function Logo({ className, size = 17 }: { className?: string; size?: number }) {
  return (
    <span
      className={cn("font-extrabold lowercase tracking-tight", className)}
      style={{ fontSize: size }}
    >
      <span className="text-evergreen-500">evergreen</span>
      <span className="text-ink-900">reviews</span>
    </span>
  );
}
