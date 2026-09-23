import { Star, Send, Sparkles, MessageCircle, TrendingUp } from "lucide-react";
import { MetricCard } from "@/components/ui/MetricCard";
import { StarRating } from "@/components/ui/StarRating";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { RangeSelector } from "@/components/dashboard/RangeSelector";
import { GrowthChart } from "@/components/dashboard/GrowthChart";
import { MomentumCard } from "@/components/dashboard/MomentumCard";
import { MilestoneCard } from "@/components/dashboard/MilestoneCard";
import { WeeklyChecklist } from "@/components/dashboard/WeeklyChecklist";
import { getDashboardMetrics, chartSeriesForRange, dateRangeOptions, currentPeriodSeries } from "@/lib/metrics";
import { business } from "@/lib/demo-data";
import type { DateRangeKey } from "@/lib/types";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default async function OverviewPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const { range: rangeParam } = await searchParams;
  const range = (dateRangeOptions.some((o) => o.value === rangeParam) ? rangeParam : "30d") as DateRangeKey;
  const rangeLabel = dateRangeOptions.find((o) => o.value === range)!.label.toLowerCase();

  const metrics = getDashboardMetrics(range);
  const chartData = chartSeriesForRange(range);
  const period = currentPeriodSeries(range);
  const hasEnoughHistory = period.some((d) => d.newReviews > 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink-900">
            {greeting()}, {business.name}.
          </h1>
          <p className="mt-1 text-[15px] text-ink-500">Here&apos;s how your reputation is growing.</p>
        </div>
        <RangeSelector current={range} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <MetricCard
          label="Google reviews"
          value={metrics.totalReviews.toString()}
          delta={metrics.reviewsDeltaThisPeriod}
          deltaLabel={`new in ${rangeLabel}`}
          icon={<Star size={16} />}
          accent="green"
          helpText="Total published Google reviews for your business profile."
        />
        <MetricCard label="Average rating" value={metrics.avgRating.toFixed(1)} helpText="Your current average Google rating across all published reviews.">
          <StarRating rating={metrics.avgRating} className="mt-2.5" />
          {metrics.avgRatingDelta !== 0 && (
            <p className="mt-1.5 text-xs text-ink-500">
              {metrics.avgRatingDelta > 0 ? "Up" : "Down"} {Math.abs(metrics.avgRatingDelta)} vs previous period
            </p>
          )}
        </MetricCard>
        <MetricCard
          label="Review requests"
          value={metrics.requestsSent.toString()}
          deltaLabel={`${metrics.requestsCompleted} became reviews (${metrics.conversionRate}%)`}
          icon={<Send size={16} />}
          helpText={`Requests sent in the ${rangeLabel}. Conversion counts requests we can directly attribute to a completed review.`}
        />
        <MetricCard
          label="New reviews"
          value={`+${metrics.newReviews}`}
          delta={metrics.newReviews - metrics.newReviewsPrevCount}
          deltaDisplay={`${metrics.newReviews - metrics.newReviewsPrevCount >= 0 ? "+" : ""}${metrics.newReviews - metrics.newReviewsPrevCount} vs prior`}
          deltaLabel={`prior period: ${metrics.newReviewsPrevCount}`}
          icon={<Sparkles size={16} />}
          accent="green"
          helpText={`Reviews received in the ${rangeLabel}, compared with the equivalent prior period.`}
        />
        <MetricCard
          label="Response performance"
          value={`${metrics.responseRate}%`}
          deltaLabel={`${metrics.reviewsNeedingResponse} awaiting a response`}
          icon={<MessageCircle size={16} />}
          helpText="Share of reviews your team has responded to, out of all reviews on file."
        />
      </div>

      <MomentumCard />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle>Reputation growth</CardTitle>
              <CardDescription className="mt-0.5">Total reviews, new reviews, and requests sent over time.</CardDescription>
            </div>
          </div>

          <div className="mt-2">
            <GrowthChart data={chartData} />
          </div>

          <div className="mt-3 flex flex-col gap-3 rounded-xl bg-sand-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            {hasEnoughHistory ? (
              <p className="text-sm text-ink-600">
                Your business received <strong className="text-ink-900">{metrics.newReviews} new reviews</strong> in the{" "}
                {rangeLabel}, compared with <strong className="text-ink-900">{metrics.newReviewsPrevCount}</strong> in the
                previous period.
              </p>
            ) : (
              <p className="text-sm text-ink-600">Your growth story starts here.</p>
            )}
            <ButtonLink href="/dashboard/campaigns/new" size="sm" variant="secondary" className="shrink-0">
              <TrendingUp size={14} /> Create a review campaign
            </ButtonLink>
          </div>
        </Card>

        <div className="flex flex-col gap-4">
          <MilestoneCard />
          <WeeklyChecklist />
        </div>
      </div>

      <p className="text-center text-sm text-ink-400">
        Small, consistent actions build lasting trust — keep making it easy for happy customers to share their
        experience.
      </p>
    </div>
  );
}
