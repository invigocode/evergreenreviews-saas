"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Copy, ExternalLink, AlertCircle, CheckCircle2, MessageSquarePlus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { Avatar } from "@/components/ui/Avatar";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { formatRelativeDate, cn } from "@/lib/utils";
import { business } from "@/lib/demo-data";
import type { Review } from "@/lib/types";

type RatingFilter = "all" | 5 | 4 | 3 | 2 | 1;
type StatusFilter = "all" | "responded" | "awaiting";
type SortKey = "recent" | "oldest";

export function ReviewsClient({
  reviews,
  ratingDistribution,
  totalReviews,
  averageRating,
}: {
  reviews: Review[];
  ratingDistribution: Record<number, number>;
  totalReviews: number;
  averageRating: number;
}) {
  const [query, setQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sort, setSort] = useState<SortKey>("recent");
  const { show } = useToast();

  const filtered = useMemo(() => {
    let list = reviews.filter((r) => {
      if (ratingFilter !== "all" && r.rating !== ratingFilter) return false;
      if (statusFilter === "responded" && !r.responded) return false;
      if (statusFilter === "awaiting" && r.responded) return false;
      if (query && !`${r.reviewerName} ${r.text}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
    list = [...list].sort((a, b) =>
      sort === "recent"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    return list;
  }, [reviews, ratingFilter, statusFilter, query, sort]);

  const copyText = (text: string) => {
    navigator.clipboard?.writeText(text);
    show("Copied to clipboard.");
  };

  return (
    <div className="flex flex-col gap-5">
      <Card className="grid grid-cols-1 gap-6 p-5 sm:grid-cols-[auto_1fr]">
        <div className="flex items-center gap-4 sm:border-r sm:border-sand-200 sm:pr-6">
          <div>
            <p className="text-3xl font-semibold tabular-nums text-ink-900">{averageRating.toFixed(1)}</p>
            <StarRating rating={averageRating} className="mt-1" />
            <p className="mt-1 text-xs text-ink-500">{totalReviews} total reviews</p>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-1.5">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = ratingDistribution[star] ?? 0;
            const pct = totalReviews ? Math.round((count / totalReviews) * 100) : 0;
            return (
              <div key={star} className="flex items-center gap-2.5 text-xs">
                <span className="w-3 shrink-0 text-ink-500">{star}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-sand-200">
                  <div className="h-full rounded-full bg-gold-500" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-8 shrink-0 text-right text-ink-500 tabular-nums">{count}</span>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reviews or names…"
            className="w-full rounded-lg border border-sand-300 bg-white py-2 pl-9 pr-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-evergreen-500 focus:outline-none focus:ring-2 focus:ring-evergreen-100"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <FilterChip active={ratingFilter === "all"} onClick={() => setRatingFilter("all")}>
            All ratings
          </FilterChip>
          {[5, 4, 3, 2, 1].map((r) => (
            <FilterChip key={r} active={ratingFilter === r} onClick={() => setRatingFilter(r as RatingFilter)}>
              {r}★
            </FilterChip>
          ))}
          <span className="mx-1 h-4 w-px bg-sand-300" />
          <FilterChip active={statusFilter === "responded"} onClick={() => setStatusFilter(statusFilter === "responded" ? "all" : "responded")}>
            Responded
          </FilterChip>
          <FilterChip active={statusFilter === "awaiting"} onClick={() => setStatusFilter(statusFilter === "awaiting" ? "all" : "awaiting")}>
            Awaiting response
          </FilterChip>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-lg border border-sand-300 bg-white px-2.5 py-1.5 text-sm text-ink-700 focus:border-evergreen-500 focus:outline-none"
          >
            <option value="recent">Most recent</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Search size={20} />}
          title="No reviews match these filters"
          description="Try adjusting your search or clearing filters to see more reviews."
        />
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((review) => (
            <Card key={review.id} className="p-5">
              <div className="flex items-start gap-3.5">
                <Avatar name={review.reviewerName} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <p className="font-semibold text-ink-900">{review.reviewerName}</p>
                    <StarRating rating={review.rating} size={14} />
                    <span className="text-xs text-ink-400">{formatRelativeDate(review.date)}</span>
                    {review.service && <Badge tone="outline">{review.service}</Badge>}
                  </div>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-700">{review.text}</p>

                  {review.needsAttention && (
                    <div className="mt-3 flex items-start gap-2 rounded-lg bg-warning-50 px-3 py-2 text-sm text-warning-600">
                      <AlertCircle size={15} className="mt-0.5 shrink-0" />
                      This review may need attention — respond calmly, acknowledge the experience, and invite
                      private follow-up rather than debating details publicly.
                    </div>
                  )}

                  {review.responded && review.responseText && (
                    <div className="mt-3 rounded-lg border border-sand-200 bg-sand-50 p-3">
                      <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-ink-500">
                        <CheckCircle2 size={13} className="text-evergreen-600" /> Your response
                      </p>
                      <p className="text-sm text-ink-700">{review.responseText}</p>
                    </div>
                  )}

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {review.responded ? (
                      <Badge tone="green">Responded</Badge>
                    ) : (
                      <Badge tone={review.needsAttention ? "warning" : "neutral"}>Awaiting response</Badge>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => copyText(review.text)}>
                      <Copy size={13} /> Copy review
                    </Button>
                    <Link href={`/dashboard/responses?review=${review.id}`}>
                      <Button variant="secondary" size="sm">
                        <MessageSquarePlus size={13} />
                        {review.responded ? "Edit response" : "Draft response"}
                      </Button>
                    </Link>
                    <a href={business.googleReviewUrl} target="_blank" rel="noreferrer">
                      <Button variant="ghost" size="sm">
                        <ExternalLink size={13} /> View on Google
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer",
        active
          ? "border-evergreen-600 bg-evergreen-700 text-white"
          : "border-sand-300 bg-white text-ink-600 hover:border-sand-400"
      )}
    >
      {children}
    </button>
  );
}
