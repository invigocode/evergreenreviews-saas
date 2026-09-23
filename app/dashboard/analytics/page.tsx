import { Download, Info } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { MetricCard } from "@/components/ui/MetricCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { RangeSelector } from "@/components/dashboard/RangeSelector";
import { ReviewGrowthChart } from "@/components/analytics/ReviewGrowthChart";
import { RatingTrendChart } from "@/components/analytics/RatingTrendChart";
import { RatingDistributionChart } from "@/components/analytics/RatingDistributionChart";
import { WeekdayActivityChart } from "@/components/analytics/WeekdayActivityChart";
import { chartSeriesForRange, dateRangeOptions, getDashboardMetrics } from "@/lib/metrics";
import { campaigns, ratingDistribution, activityByWeekday, AVG_RESPONSE_TIME_HOURS, reviews } from "@/lib/demo-data";
import { methodLabels, campaignStatusConfig } from "@/lib/status";
import type { DateRangeKey } from "@/lib/types";

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const { range: rangeParam } = await searchParams;
  const range = (dateRangeOptions.some((o) => o.value === rangeParam) ? rangeParam : "90d") as DateRangeKey;

  const chartData = chartSeriesForRange(range);
  const metrics = getDashboardMetrics(range);
  const weekday = activityByWeekday();
  const needingResponse = reviews.filter((r) => !r.responded).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <PageHeader title="Analytics" description="A clear look at what's driving your review growth." />
        <div className="flex items-center gap-2">
          <RangeSelector current={range} />
          <Button variant="secondary" size="md">
            <Download size={15} /> Export
          </Button>
        </div>
      </div>

      <Card className="p-5">
        <CardTitle>Review growth</CardTitle>
        <CardDescription className="mt-0.5">Total published Google reviews over time.</CardDescription>
        <div className="mt-3">
          <ReviewGrowthChart data={chartData} />
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <CardTitle>Rating trend</CardTitle>
          <CardDescription className="mt-0.5">Average Google rating over the selected period.</CardDescription>
          <div className="mt-3">
            <RatingTrendChart data={chartData} />
          </div>
        </Card>
        <Card className="p-5">
          <CardTitle>Rating distribution</CardTitle>
          <CardDescription className="mt-0.5">All-time breakdown of star ratings.</CardDescription>
          <div className="mt-3">
            <RatingDistributionChart distribution={ratingDistribution} />
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>Request performance</CardTitle>
            <CardDescription className="mt-0.5">Directly measured outcomes for requests sent in this period.</CardDescription>
          </div>
          <span className="flex items-center gap-1 text-xs text-ink-400">
            <Info size={12} /> Clicks are measured; review attribution is estimated.
          </span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <MetricCard label="Requests sent" value={metrics.requestsSent.toString()} />
          <MetricCard label="Link clicks" value={metrics.requestsClicked.toString()} deltaLabel="Measured directly" />
          <MetricCard label="Reviews attributed" value={metrics.requestsCompleted.toString()} deltaLabel="Estimated by timing & channel" />
          <MetricCard label="Conversion rate" value={`${metrics.conversionRate}%`} accent="green" />
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <CardTitle>Activity by day of week</CardTitle>
          <CardDescription className="mt-0.5">Requests sent vs. reviews received, last 90 days.</CardDescription>
          <div className="mt-3">
            <WeekdayActivityChart data={weekday} />
          </div>
        </Card>

        <Card className="p-5">
          <CardTitle>Response analytics</CardTitle>
          <CardDescription className="mt-0.5">How quickly and consistently you respond to reviews.</CardDescription>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <MetricCard label="Response rate" value={`${metrics.responseRate}%`} accent="green" />
            <MetricCard label="Avg. response time" value={`${AVG_RESPONSE_TIME_HOURS}h`} />
            <MetricCard label="Responded" value={metrics.reviewsResponded.toString()} />
            <MetricCard label="Outstanding" value={needingResponse.toString()} />
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="p-5 pb-0">
          <CardTitle>Campaign comparison</CardTitle>
          <CardDescription className="mt-0.5">Compare measurable results across every campaign.</CardDescription>
        </div>
        <div className="mt-4 overflow-x-auto scrollbar-thin">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-y border-sand-200 bg-sand-50 text-left text-xs font-medium uppercase tracking-wide text-ink-500">
                <th className="px-5 py-3">Campaign</th>
                <th className="px-5 py-3">Channel</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Sent</th>
                <th className="px-5 py-3">Clicked</th>
                <th className="px-5 py-3">Reviews</th>
                <th className="px-5 py-3">Conversion</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => {
                const base = c.requestsSent || c.clicks;
                const rate = base ? Math.round((c.completions / base) * 100) : 0;
                return (
                  <tr key={c.id} className="border-b border-sand-100 last:border-0">
                    <td className="px-5 py-3 font-medium text-ink-800">{c.name}</td>
                    <td className="px-5 py-3 text-ink-600">{methodLabels[c.channel]}</td>
                    <td className="px-5 py-3">
                      <Badge tone={campaignStatusConfig[c.status].tone}>{campaignStatusConfig[c.status].label}</Badge>
                    </td>
                    <td className="px-5 py-3 tabular-nums text-ink-600">{c.requestsSent || "—"}</td>
                    <td className="px-5 py-3 tabular-nums text-ink-600">{c.clicks}</td>
                    <td className="px-5 py-3 tabular-nums text-ink-600">{c.completions}</td>
                    <td className="px-5 py-3 font-medium tabular-nums text-evergreen-700">{rate}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="border-t border-sand-100 px-5 py-3 text-xs text-ink-400">
          Reviews are attributed to a campaign when a customer clicks that campaign&apos;s link shortly before leaving a
          review — this is a best estimate, not a guarantee, since Google doesn&apos;t confirm which link a reviewer used.
        </p>
      </Card>
    </div>
  );
}
