import { cn } from "@/lib/utils";

export function Logomark({ className, size = 28 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden
    >
      <rect width="32" height="32" rx="9" className="fill-evergreen-800" />
      <path
        d="M16 6.5c3.6 3 5.8 6.2 5.8 9.6a5.8 5.8 0 0 1-5 5.75V25a.8.8 0 0 1-1.6 0v-3.15a5.8 5.8 0 0 1-5-5.75c0-3.4 2.2-6.6 5.8-9.6Z"
        className="fill-evergreen-100"
      />
    </svg>
  );
}

export function Logo({ className, iconSize = 28 }: { className?: string; iconSize?: number }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <Logomark size={iconSize} />
      <span className="text-[15px] font-bold tracking-tight text-ink-900">
        Evergreen <span className="text-evergreen-700">Reviews</span>
      </span>
    </div>
  );
}
