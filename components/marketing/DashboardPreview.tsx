import { Star, TrendingUp, Send } from "lucide-react";

const bars = [38, 44, 40, 52, 58, 63, 70, 66, 74, 80, 86, 92];

export function DashboardPreview() {
  return (
    <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-popover">
      <div className="flex items-center gap-1.5 border-b border-sand-200 bg-sand-50 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-sand-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-sand-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-sand-300" />
        <span className="ml-3 text-xs font-medium text-ink-400">app.evergreenreviews.com/dashboard</span>
      </div>

      <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-3">
        <div className="rounded-xl border border-sand-200 p-4">
          <p className="flex items-center gap-1.5 text-xs font-medium text-ink-500">
            <Star size={12} className="text-gold-500" /> Google reviews
          </p>
          <p className="mt-2 text-2xl font-semibold tabular-nums text-ink-900">247</p>
          <p className="mt-1 text-xs font-medium text-evergreen-700">+18 this month</p>
        </div>
        <div className="rounded-xl border border-sand-200 p-4">
          <p className="flex items-center gap-1.5 text-xs font-medium text-ink-500">
            <TrendingUp size={12} className="text-evergreen-600" /> Average rating
          </p>
          <p className="mt-2 text-2xl font-semibold tabular-nums text-ink-900">4.8</p>
          <p className="mt-1 text-xs text-ink-400">★★★★★</p>
        </div>
        <div className="rounded-xl border border-sand-200 p-4">
          <p className="flex items-center gap-1.5 text-xs font-medium text-ink-500">
            <Send size={12} className="text-gold-500" /> Requests sent
          </p>
          <p className="mt-2 text-2xl font-semibold tabular-nums text-ink-900">186</p>
          <p className="mt-1 text-xs text-ink-400">34% became reviews</p>
        </div>
      </div>

      <div className="border-t border-sand-200 px-5 pb-5 pt-4">
        <p className="mb-3 text-xs font-medium text-ink-500">Reputation growth — last 12 months</p>
        <div className="flex h-24 items-end gap-1.5">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 rounded-t-sm bg-evergreen-600/80" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
