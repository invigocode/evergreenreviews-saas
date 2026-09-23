import { FlaskConical } from "lucide-react";

export function DemoBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-300 bg-gold-100 px-2.5 py-1 text-xs font-medium text-gold-600">
      <FlaskConical size={12} aria-hidden />
      Demo data
    </span>
  );
}
