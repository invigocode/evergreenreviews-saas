import Link from "next/link";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "business", label: "Business" },
  { id: "team", label: "Team" },
  { id: "notifications", label: "Notifications" },
  { id: "integrations", label: "Integrations" },
  { id: "subscription", label: "Subscription" },
  { id: "privacy", label: "Privacy & Security" },
];

export function SettingsNav({ active }: { active: string }) {
  return (
    <nav className="flex gap-1 overflow-x-auto border-b border-sand-200 scrollbar-thin" aria-label="Settings sections">
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={`/dashboard/settings?tab=${tab.id}`}
          className={cn(
            "shrink-0 border-b-2 px-3.5 py-2.5 text-sm font-medium transition-colors",
            active === tab.id
              ? "border-evergreen-700 text-evergreen-800"
              : "border-transparent text-ink-500 hover:text-ink-800"
          )}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
