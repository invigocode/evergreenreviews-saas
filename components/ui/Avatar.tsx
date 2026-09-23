import { cn, initials } from "@/lib/utils";

const palette = [
  "bg-evergreen-100 text-evergreen-700",
  "bg-gold-100 text-gold-600",
  "bg-sand-200 text-ink-700",
];

function hashIndex(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash + name.charCodeAt(i)) % palette.length;
  return hash;
}

export function Avatar({ name, size = 36, className }: { name: string; size?: number; className?: string }) {
  return (
    <div
      className={cn("flex shrink-0 items-center justify-center rounded-full font-semibold", palette[hashIndex(name)], className)}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      aria-hidden
    >
      {initials(name) || "?"}
    </div>
  );
}
