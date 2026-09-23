import { ChevronsUpDown, LogOut, MapPin } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { business } from "@/lib/demo-data";
import { signOut } from "@/lib/auth";

export function SidebarFooter({ email }: { email: string }) {
  return (
    <div className="flex flex-col gap-2 border-t border-sand-200 pt-3">
      <details className="group relative">
        <summary className="flex list-none items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm hover:bg-sand-100 cursor-pointer [&::-webkit-details-marker]:hidden">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-evergreen-100 text-evergreen-700">
            <MapPin size={14} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate font-medium text-ink-800">{business.name}</span>
            <span className="block text-xs text-ink-400">1 location</span>
          </span>
          <ChevronsUpDown size={14} className="shrink-0 text-ink-400" />
        </summary>
        <div className="absolute bottom-full left-0 z-20 mb-1.5 w-64 rounded-xl border border-sand-200 bg-white p-1.5 shadow-popover">
          <div className="flex items-center gap-2.5 rounded-lg bg-evergreen-50 px-2.5 py-2 text-sm font-medium text-evergreen-800">
            <MapPin size={14} /> {business.name}
          </div>
          <button
            type="button"
            disabled
            className="mt-1 flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm text-ink-400"
          >
            Add another location
            <span className="rounded-full bg-sand-100 px-2 py-0.5 text-[11px] font-medium">Coming soon</span>
          </button>
        </div>
      </details>

      <details className="group relative">
        <summary className="flex list-none items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm hover:bg-sand-100 cursor-pointer [&::-webkit-details-marker]:hidden">
          <Avatar name={email} size={28} />
          <span className="min-w-0 flex-1 text-left">
            <span className="block truncate font-medium text-ink-800">{email}</span>
            <span className="block text-xs text-ink-400">Owner</span>
          </span>
          <ChevronsUpDown size={14} className="shrink-0 text-ink-400" />
        </summary>
        <div className="absolute bottom-full left-0 z-20 mb-1.5 w-56 rounded-xl border border-sand-200 bg-white p-1.5 shadow-popover">
          <form action={signOut}>
            <button
              type="submit"
              className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-ink-700 hover:bg-sand-100 cursor-pointer"
            >
              <LogOut size={15} /> Sign out
            </button>
          </form>
        </div>
      </details>
    </div>
  );
}
