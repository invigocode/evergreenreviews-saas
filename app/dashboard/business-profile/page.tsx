import { ExternalLink, Building2, Star, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StarRating } from "@/components/ui/StarRating";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { GbpChecklist } from "./GbpChecklist";
import { business, businessHours, gbpChecklist, TOTAL_GOOGLE_REVIEWS, AVERAGE_RATING } from "@/lib/demo-data";

export default function BusinessProfilePage() {
  const completedCount = gbpChecklist.filter((i) => i.done).length;
  const completenessPct = Math.round((completedCount / gbpChecklist.length) * 100);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Google Business Profile"
        description="The information customers see about you on Google Search and Maps."
        actions={
          <a href={business.googleReviewUrl} target="_blank" rel="noreferrer">
            <Button>
              <ExternalLink size={15} /> Open Google Business Profile
            </Button>
          </a>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-evergreen-100 text-evergreen-700">
                <Building2 size={22} />
              </div>
              <div>
                <p className="font-semibold text-ink-900">{business.name}</p>
                <p className="text-sm text-ink-500">{business.category}</p>
              </div>
            </div>
            {business.googlePlaceConnected ? (
              <span className="flex items-center gap-1.5 rounded-full bg-evergreen-50 px-2.5 py-1 text-xs font-medium text-evergreen-700">
                <ShieldCheck size={13} /> Connected (demo)
              </span>
            ) : (
              <span className="rounded-full bg-sand-100 px-2.5 py-1 text-xs font-medium text-ink-500">Not connected</span>
            )}
          </div>

          <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Detail label="Address" value={business.address} />
            <Detail label="Phone" value={business.phone} />
            <Detail label="Website" value={business.website} />
            <Detail label="Google review link" value={business.googleReviewUrl} />
          </dl>

          <div className="mt-5 border-t border-sand-200 pt-4">
            <p className="mb-2 text-sm font-medium text-ink-700">Opening hours</p>
            <div className="grid grid-cols-1 gap-x-8 gap-y-1 text-sm text-ink-600 sm:grid-cols-2">
              {businessHours.map((h) => (
                <div key={h.day} className="flex items-center justify-between border-b border-sand-100 py-1.5 last:border-0">
                  <span>{h.day}</span>
                  <span className={h.hours === "Closed" ? "text-ink-400" : "font-medium text-ink-800"}>{h.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <CardTitle>Review summary</CardTitle>
            <DemoBadge />
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div>
              <p className="text-3xl font-semibold tabular-nums text-ink-900">{AVERAGE_RATING.toFixed(1)}</p>
              <StarRating rating={AVERAGE_RATING} className="mt-1" />
            </div>
            <div className="h-10 w-px bg-sand-200" />
            <div>
              <p className="text-3xl font-semibold tabular-nums text-ink-900">{TOTAL_GOOGLE_REVIEWS}</p>
              <p className="text-xs text-ink-500">Total reviews</p>
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-ink-400">
            Sample data shown for this demo account. Connect a real Google Business Profile to see live figures.
          </p>
        </Card>
      </div>

      <Card className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle>Profile checklist</CardTitle>
            <CardDescription className="mt-0.5">
              A complete and accurate profile helps customers find reliable information about your business.
            </CardDescription>
          </div>
          <span className="text-sm font-medium text-ink-500">{completenessPct}% complete</span>
        </div>
        <ProgressBar value={completenessPct} className="mt-3" />
        <div className="mt-3">
          <GbpChecklist items={gbpChecklist} />
        </div>
      </Card>

      <Card className="flex items-start gap-3 p-4">
        <Star size={16} className="mt-0.5 shrink-0 text-gold-500" />
        <p className="text-sm text-ink-600">
          Evergreen Reviews doesn&apos;t control Google&apos;s search or ranking algorithm, and we won&apos;t claim
          otherwise. What we can help with is keeping this information accurate, complete, and easy for customers to
          find — and helping more satisfied customers leave a genuine review.
        </p>
      </Card>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-ink-400">{label}</dt>
      <dd className="mt-0.5 text-sm text-ink-800">{value}</dd>
    </div>
  );
}
