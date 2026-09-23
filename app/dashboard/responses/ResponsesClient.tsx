"use client";

import { useMemo, useState } from "react";
import { Sparkles, Copy, ExternalLink, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { Avatar } from "@/components/ui/Avatar";
import { EmptyState } from "@/components/ui/EmptyState";
import { useToast } from "@/components/ui/Toast";
import { cn, formatRelativeDate } from "@/lib/utils";
import { business } from "@/lib/demo-data";
import { generateSuggestion, responseGuidance } from "@/lib/response-suggestions";
import type { Review } from "@/lib/types";

type Filter = "needs_response" | "responded" | "all";

export function ResponsesClient({ reviews: initial, initialSelectedId }: { reviews: Review[]; initialSelectedId?: string }) {
  const [reviews, setReviews] = useState(initial);
  const [filter, setFilter] = useState<Filter>(initialSelectedId ? "all" : "needs_response");
  const [selectedId, setSelectedId] = useState<string | undefined>(
    initialSelectedId ?? initial.find((r) => !r.responded)?.id
  );
  const [draft, setDraft] = useState<Record<string, string>>({});
  const { show } = useToast();

  const filtered = useMemo(() => {
    return reviews
      .filter((r) => (filter === "needs_response" ? !r.responded : filter === "responded" ? r.responded : true))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [reviews, filter]);

  const selected = reviews.find((r) => r.id === selectedId) ?? filtered[0];
  const draftText = selected ? draft[selected.id] ?? selected.responseText ?? "" : "";
  const guidance =
    selected?.sentiment === "negative" ? responseGuidance.negative : selected?.sentiment === "neutral" ? responseGuidance.neutral : responseGuidance.positive;

  const setDraftText = (text: string) => {
    if (!selected) return;
    setDraft((prev) => ({ ...prev, [selected.id]: text }));
  };

  const generate = () => {
    if (!selected) return;
    setDraftText(generateSuggestion(selected));
    show("AI-assisted draft generated — review before sending.");
  };

  const copy = () => {
    navigator.clipboard?.writeText(draftText);
    show("Response copied to clipboard.");
  };

  const markSent = () => {
    if (!selected || !draftText.trim()) return;
    setReviews((prev) =>
      prev.map((r) => (r.id === selected.id ? { ...r, responded: true, responseText: draftText, responseDate: new Date().toISOString() } : r))
    );
    show("Marked as responded.");
  };

  return (
    <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-[340px_1fr]">
      <Card className="flex flex-col overflow-hidden p-0">
        <div className="flex items-center gap-1 border-b border-sand-200 p-2">
          {(["needs_response", "responded", "all"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "flex-1 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors cursor-pointer",
                filter === f ? "bg-evergreen-700 text-white" : "text-ink-500 hover:bg-sand-100"
              )}
            >
              {f === "needs_response" ? "Needs reply" : f === "responded" ? "Responded" : "All"}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin" style={{ maxHeight: 640 }}>
          {filtered.length === 0 ? (
            <p className="p-5 text-center text-sm text-ink-400">Nothing here right now.</p>
          ) : (
            filtered.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedId(r.id)}
                className={cn(
                  "flex w-full items-start gap-2.5 border-b border-sand-100 p-3.5 text-left transition-colors cursor-pointer",
                  selected?.id === r.id ? "bg-evergreen-50" : "hover:bg-sand-50"
                )}
              >
                <Avatar name={r.reviewerName} size={30} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium text-ink-800">{r.reviewerName}</p>
                    <span className="shrink-0 text-[11px] text-ink-400">{formatRelativeDate(r.date)}</span>
                  </div>
                  <StarRating rating={r.rating} size={12} className="mt-0.5" />
                  <p className="mt-1 truncate text-xs text-ink-500">{r.text}</p>
                  {r.needsAttention && <Badge tone="warning" className="mt-1.5">Needs attention</Badge>}
                </div>
              </button>
            ))
          )}
        </div>
      </Card>

      {!selected ? (
        <EmptyState title="No reviews to show" description="Reviews needing a response will appear here." />
      ) : (
        <Card className="flex flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <Avatar name={selected.reviewerName} size={40} />
              <div>
                <p className="font-semibold text-ink-900">{selected.reviewerName}</p>
                <div className="mt-0.5 flex items-center gap-2">
                  <StarRating rating={selected.rating} size={13} />
                  <span className="text-xs text-ink-400">{formatRelativeDate(selected.date)}</span>
                </div>
              </div>
            </div>
            {selected.responded ? <Badge tone="green">Responded</Badge> : <Badge tone="neutral">Awaiting response</Badge>}
          </div>

          <p className="mt-4 rounded-xl bg-sand-50 p-4 text-[15px] leading-relaxed text-ink-700">{selected.text}</p>

          {selected.sentiment !== "positive" && (
            <div
              className={cn(
                "mt-4 rounded-xl border p-4",
                selected.sentiment === "negative" ? "border-error-600/20 bg-error-50" : "border-warning-600/20 bg-warning-50"
              )}
            >
              <p className={cn("flex items-center gap-1.5 text-sm font-semibold", selected.sentiment === "negative" ? "text-error-600" : "text-warning-600")}>
                <AlertCircle size={15} /> Response guidance
              </p>
              <ul className="mt-2 space-y-1 text-sm text-ink-600">
                {guidance.map((g) => (
                  <li key={g} className="flex gap-1.5">
                    <span>·</span>
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-4 flex-1">
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-sm font-medium text-ink-700">Your response</label>
              <Button variant="subtleGreen" size="sm" onClick={generate}>
                <Sparkles size={13} /> AI-assisted suggestion
              </Button>
            </div>
            <textarea
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              rows={7}
              placeholder="Write a calm, specific, genuine response…"
              className="w-full rounded-lg border border-sand-300 bg-white px-3.5 py-2.5 text-sm leading-relaxed focus:border-evergreen-500 focus:outline-none focus:ring-2 focus:ring-evergreen-100"
            />
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-ink-400">
              <Info size={12} /> AI-assisted drafts are a starting point — you review and approve every response before
              it&apos;s used. Evergreen Reviews doesn&apos;t publish responses on your behalf.
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-sand-200 pt-4">
            <Button onClick={markSent} disabled={!draftText.trim()}>
              <CheckCircle2 size={15} /> Mark as responded
            </Button>
            <Button variant="secondary" onClick={copy} disabled={!draftText.trim()}>
              <Copy size={14} /> Copy response
            </Button>
            <a href={business.googleReviewUrl} target="_blank" rel="noreferrer" className="ml-auto">
              <Button variant="ghost">
                <ExternalLink size={14} /> Reply on Google
              </Button>
            </a>
          </div>
        </Card>
      )}
    </div>
  );
}
