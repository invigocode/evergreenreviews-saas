import Link from "next/link";
import { type ComponentProps, forwardRef } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-evergreen-700 text-white hover:bg-evergreen-800 active:bg-evergreen-900 shadow-sm shadow-evergreen-900/10",
  secondary:
    "bg-white text-ink-800 border border-sand-300 hover:bg-sand-100 hover:border-sand-400",
  ghost: "text-ink-700 hover:bg-sand-200/70",
  subtleGreen: "bg-evergreen-50 text-evergreen-800 hover:bg-evergreen-100",
  danger: "bg-white text-error-600 border border-error-600/25 hover:bg-error-50",
  onDark: "bg-white text-evergreen-800 hover:bg-evergreen-50",
  ghostOnDark: "text-white hover:bg-white/10",
};

const sizes = {
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-[15px] gap-2",
};

type ButtonOwnProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
};

export const Button = forwardRef<HTMLButtonElement, ButtonOwnProps & ComponentProps<"button">>(
  ({ variant = "primary", size = "md", className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  href,
  ...props
}: ButtonOwnProps & ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-150",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
