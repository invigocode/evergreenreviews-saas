import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatPercent(value: number, opts?: { signed?: boolean }) {
  const rounded = Math.round(value * 10) / 10;
  const sign = opts?.signed && rounded > 0 ? "+" : "";
  return `${sign}${rounded}%`;
}

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" }) {
  return new Date(iso).toLocaleDateString("en-US", opts);
}

export function formatRelativeDate(iso: string) {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === -1) return "Yesterday";
  if (diffDays > -7 && diffDays < 0) return `${Math.abs(diffDays)} days ago`;
  if (diffDays < 0 && diffDays > -30) return `${Math.round(Math.abs(diffDays) / 7)}w ago`;
  return formatDate(iso, { month: "short", day: "numeric", year: "numeric" });
}

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
