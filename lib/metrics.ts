import { dailySeries, reviewRequests, reviews, TOTAL_GOOGLE_REVIEWS, AVERAGE_RATING } from "@/lib/demo-data";
import type { DateRangeKey } from "@/lib/types";

export const dateRangeOptions: { value: DateRangeKey; label: string; days: number }[] = [
  { value: "7d", label: "Last 7 days", days: 7 },
  { value: "30d", label: "Last 30 days", days: 30 },
  { value: "90d", label: "Last 90 days", days: 90 },
  { value: "ytd", label: "This year", days: 365 },
];

function daysFor(range: DateRangeKey) {
  return dateRangeOptions.find((o) => o.value === range)?.days ?? 30;
}

export function currentPeriodSeries(range: DateRangeKey) {
  const days = daysFor(range);
  return dailySeries.slice(-days);
}

export function previousPeriodSeries(range: DateRangeKey) {
  const days = daysFor(range);
  return dailySeries.slice(-days * 2, -days);
}

function sum(nums: number[]) {
  return nums.reduce((a, b) => a + b, 0);
}

export function getDashboardMetrics(range: DateRangeKey) {
  const current = currentPeriodSeries(range);
  const previous = previousPeriodSeries(range);

  const newReviews = sum(current.map((d) => d.newReviews));
  const newReviewsPrev = sum(previous.map((d) => d.newReviews));
  const requestsSent = sum(current.map((d) => d.requestsSent));
  const requestsSentPrev = sum(previous.map((d) => d.requestsSent));

  const avgRatingCurrent = current.length ? current[current.length - 1].avgRating : AVERAGE_RATING;
  const avgRatingPrev = previous.length ? previous[previous.length - 1].avgRating : avgRatingCurrent;

  const periodRequests = reviewRequests.filter(
    (r) => new Date(r.dateRequested) >= new Date(current[0]?.date ?? Date.now())
  );
  const completed = periodRequests.filter((r) => r.completed).length;
  const clicked = periodRequests.filter((r) => r.clicked || r.completed).length;
  const conversionRate = periodRequests.length ? Math.round((completed / periodRequests.length) * 100) : 0;

  const needingResponse = reviews.filter((r) => !r.responded);
  const respondedRecently = reviews.filter((r) => r.responded);
  const responseRate = reviews.length
    ? Math.round((respondedRecently.length / reviews.length) * 100)
    : 0;

  return {
    totalReviews: TOTAL_GOOGLE_REVIEWS,
    reviewsDeltaThisPeriod: newReviews,
    avgRating: avgRatingCurrent,
    avgRatingDelta: Math.round((avgRatingCurrent - avgRatingPrev) * 10) / 10,
    requestsSent: periodRequests.length || requestsSent,
    requestsSentDelta: requestsSentPrev
      ? Math.round(((requestsSent - requestsSentPrev) / requestsSentPrev) * 100)
      : 0,
    requestsClicked: clicked,
    requestsCompleted: completed,
    conversionRate,
    newReviews,
    newReviewsDelta: newReviewsPrev ? Math.round(((newReviews - newReviewsPrev) / Math.max(newReviewsPrev, 1)) * 100) : newReviews > 0 ? 100 : 0,
    newReviewsPrevCount: newReviewsPrev,
    reviewsNeedingResponse: needingResponse.length,
    reviewsResponded: respondedRecently.length,
    responseRate,
  };
}

export type ChartPoint = {
  date: string;
  label: string;
  totalReviews: number;
  newReviews: number;
  requestsSent: number;
  avgRating: number;
};

export function chartSeriesForRange(range: DateRangeKey): ChartPoint[] {
  const series = currentPeriodSeries(range);

  if (range === "7d" || range === "30d") {
    return series.map((d) => ({
      date: d.date,
      label: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      totalReviews: d.totalReviews,
      newReviews: d.newReviews,
      requestsSent: d.requestsSent,
      avgRating: d.avgRating,
    }));
  }

  // Aggregate into weekly (90d) or monthly (ytd) buckets for readability.
  const bucketSize = range === "90d" ? 7 : 30;
  const buckets: ChartPoint[] = [];
  for (let i = 0; i < series.length; i += bucketSize) {
    const chunk = series.slice(i, i + bucketSize);
    if (!chunk.length) continue;
    const last = chunk[chunk.length - 1];
    buckets.push({
      date: last.date,
      label: new Date(last.date).toLocaleDateString("en-US", { month: "short", day: range === "90d" ? "numeric" : undefined }),
      totalReviews: last.totalReviews,
      newReviews: sum(chunk.map((d) => d.newReviews)),
      requestsSent: sum(chunk.map((d) => d.requestsSent)),
      avgRating: last.avgRating,
    });
  }
  return buckets;
}
