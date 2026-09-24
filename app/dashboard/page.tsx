import Link from "next/link";
import {
  CheckCircle2,
  ChevronRight,
  Send,
  Sparkles,
  BarChart3,
  History,
  Building2,
  ArrowUpRight,
  Award,
  Star,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button, ButtonLink } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { GoogleIcon } from "@/components/GoogleIcon";
import { RatingRing } from "@/components/dashboard/RatingRing";
import { MiniSparkline } from "@/components/dashboard/MiniSparkline";
import {
  business,
  reviews,
  gbpChecklist,
  getMomentum,
  getNextMilestone,
  dailySeries,
  TOTAL_GOOGLE_REVIEWS,
  AVERAGE_RATING,
} from "@/lib/demo-data";
import { currentPeriodSeries, previousPeriodSeries } from "@/lib/metrics";
import { formatRelativeDate } from "@/lib/utils";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function OverviewPage() {
  const current = currentPeriodSeries("30d");
  const previous = previousPeriodSeries("30d");
  const newReviews = current.reduce((sum, d) => sum + d.newReviews, 0);
  const newReviewsPrev = previous.reduce((sum, d) => sum + d.newReviews, 0);
  const hasHistory = newReviews > 0;
  const growthPct = newReviewsPrev ? Math.round(((newReviews - newReviewsPrev) / newReviewsPrev) * 100) : null;

  const momentum = getMomentum();
  const { next: nextMilestone, previous: previousMilestone, total } = getNextMilestone();
  const milestoneSpan = nextMilestone ? nextMilestone - previousMilestone : 1;
  const milestoneProgress = nextMilestone ? total - previousMilestone : milestoneSpan;
  const milestonePct = nextMilestone ? Math.round((milestoneProgress / milestoneSpan) * 100) : 100;

  const latestReviews = [...reviews]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  const sparkData = dailySeries.slice(-30).map((d) => ({ value: d.totalReviews }));
  const ratingDelta = Math.round((current.at(-1)!.avgRating - (previous.at(-1)?.avgRating ?? current[0].avgRating)) * 10) / 10;

  const gbpDone = gbpChecklist.filter((i) => i.done).length;
  const gbpPct = Math.round((gbpDone / gbpChecklist.length) * 100);

  const quickActions = [
    { icon: Send, label: "Send Review Requests", subtitle: "Reach your recent customers", href: "/dashboard/review-requests", tone: "bg-blue-50 text-blue-600" },
    { icon: Building2, label: "Optimise Google Profile", subtitle: "Improve your visibility", href: "/dashboard/business-profile", tone: "bg-violet-50 text-violet-600" },
    { icon: BarChart3, label: "View Full Report", subtitle: "See detailed insights", href: "/dashboard/analytics", tone: "bg-evergreen-50 text-evergreen-700" },
    { icon: History, label: "See History", subtitle: "Past campaigns & results", href: "/dashboard/campaigns", tone: "bg-gold-100 text-gold-600" },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-sm text-ink-500">{greeting()},</p>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-ink-900">{business.name}</h1>
          {business.googlePlaceConnected && (
            <span title="Google Business Profile connected" className="text-evergreen-600">
              <CheckCircle2 size={20} />
            </span>
          )}
        </div>
        <p className="mt-1 text-[15px] text-ink-500">{momentum.headline}</p>
      </div>

      {/* Hero: the one number that matters, a clear next action, everything else behind a link */}
      <Card className="overflow-hidden p-0">
        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-[1fr_auto]">
          <div>
            <p className="flex items-center gap-1.5 text-sm font-medium text-ink-500">
              <GoogleIcon size={15} /> Google Reviews
            </p>

            {hasHistory ? (
              <>
                <div className="mt-2 flex items-end gap-3">
                  <span className="text-5xl font-semibold tracking-tight text-evergreen-700 tabular-nums">
                    +{newReviews}
                  </span>
                  <span className="mb-1.5 text-[15px] text-ink-500">new reviews</span>
                </div>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="text-sm text-ink-500">in the last 30 days</span>
                  {growthPct !== null && (
                    <Badge tone="green">
                      <ArrowUpRight size={12} /> {growthPct >= 0 ? "+" : ""}
                      {growthPct}% vs previous 30 days
                    </Badge>
                  )}
                </div>
              </>
            ) : (
              <p className="mt-3 text-lg font-medium text-ink-700">Your growth story starts here.</p>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <ButtonLink href="/dashboard/review-requests" variant="cta" size="lg">
                <Send size={16} /> Send Review Requests
              </ButtonLink>
              <ButtonLink href="/dashboard/analytics" variant="ghost">
                See full breakdown <ChevronRight size={15} />
              </ButtonLink>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-end">
            <RatingRing rating={AVERAGE_RATING} reviewCount={TOTAL_GOOGLE_REVIEWS} />
          </div>
        </div>

        <div className="border-t border-sand-200 bg-evergreen-50/60 px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="flex items-center gap-1.5 text-sm font-medium text-evergreen-800">
              <Award size={15} className="text-gold-500" />
              {nextMilestone ? `Next milestone: ${nextMilestone} reviews` : "All milestones reached"}
            </p>
            {nextMilestone && (
              <span className="text-xs font-medium text-evergreen-700">
                {total}/{nextMilestone}
              </span>
            )}
          </div>
          {nextMilestone && (
            <>
              <ProgressBar value={milestoneProgress} max={milestoneSpan} className="mt-2.5" />
              <p className="mt-2 text-xs text-evergreen-700">
                You&apos;re {milestonePct}% there — keep the momentum going!
              </p>
            </>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Latest reviews */}
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-1.5 font-semibold text-ink-900">
              <Star size={15} className="text-gold-500" /> Latest Reviews
            </p>
            <Link href="/dashboard/reviews" className="flex items-center gap-1 text-sm font-medium text-evergreen-700 hover:underline">
              View all reviews <ChevronRight size={14} />
            </Link>
          </div>
          <div className="mt-3 divide-y divide-sand-100">
            {latestReviews.map((review) => (
              <div key={review.id} className="flex items-start gap-3 py-3.5 first:pt-0 last:pb-0">
                <Avatar name={review.reviewerName} size={34} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <p className="text-sm font-semibold text-ink-800">{review.reviewerName}</p>
                    <StarRating rating={review.rating} size={12} />
                  </div>
                  <p className="mt-0.5 truncate text-sm text-ink-500">{review.text}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <span className="text-xs text-ink-400">{formatRelativeDate(review.date)}</span>
                  <Link href={`/dashboard/responses?review=${review.id}`}>
                    <Button size="sm" variant="secondary">
                      Reply
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex flex-col gap-5">
          {/* Quick actions */}
          <Card className="p-2">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center gap-3 rounded-xl p-3 hover:bg-sand-50"
              >
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${action.tone}`}>
                  <action.icon size={16} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-ink-800">{action.label}</span>
                  <span className="block truncate text-xs text-ink-500">{action.subtitle}</span>
                </span>
                <ChevronRight size={16} className="shrink-0 text-ink-300" />
              </Link>
            ))}
          </Card>

          {/* Review performance */}
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-ink-900">Review Performance</p>
              <Link href="/dashboard/analytics" className="text-xs font-medium text-evergreen-700 hover:underline">
                This month
              </Link>
            </div>
            <div className="mt-2 flex items-end justify-between gap-3">
              <div>
                <p className="text-2xl font-semibold tabular-nums text-ink-900">{AVERAGE_RATING.toFixed(1)}</p>
                <StarRating rating={AVERAGE_RATING} size={12} className="mt-1" />
                {ratingDelta !== 0 && (
                  <p className="mt-1 text-xs font-medium text-evergreen-700">
                    {ratingDelta > 0 ? "+" : ""}
                    {ratingDelta} vs last month
                  </p>
                )}
              </div>
              <div className="w-28">
                <MiniSparkline data={sparkData} />
              </div>
            </div>
          </Card>

          {/* GBP status */}
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-1.5 font-semibold text-ink-900">
                <GoogleIcon size={15} /> Business Profile
              </p>
              <Link href="/dashboard/business-profile" className="flex items-center gap-1 text-xs font-medium text-evergreen-700 hover:underline">
                View profile <ChevronRight size={13} />
              </Link>
            </div>
            <div className="mt-3 rounded-xl bg-evergreen-50 p-3.5">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-evergreen-800">
                <Sparkles size={14} />
                {gbpPct >= 80 ? "You're in a great spot!" : "A few things to tidy up"}
              </p>
              <p className="mt-1 text-xs text-evergreen-700">
                {gbpPct >= 80
                  ? "Your profile is performing well. Keep it up!"
                  : `Your profile is ${gbpPct}% complete — a few quick edits will help.`}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
