import { Megaphone, MoreHorizontal, Send, MousePointerClick, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { campaigns } from "@/lib/demo-data";
import { campaignStatusConfig, methodLabels } from "@/lib/status";
import { formatDate } from "@/lib/utils";
import { Plus } from "lucide-react";

export default function CampaignsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Campaigns"
        description="Organise how and when you ask different groups of customers for reviews."
        actions={
          <ButtonLink href="/dashboard/campaigns/new">
            <Plus size={16} /> New Campaign
          </ButtonLink>
        }
      />

      {campaigns.length === 0 ? (
        <EmptyState
          icon={<Megaphone size={20} />}
          title="No campaigns yet"
          description="Campaigns group your review requests by audience and message, so you can see what's working."
          action={
            <ButtonLink href="/dashboard/campaigns/new">
              <Plus size={16} /> Create your first campaign
            </ButtonLink>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {campaigns.map((c) => {
            const conversionRate = c.requestsSent ? Math.round((c.completions / c.requestsSent) * 100) : null;
            return (
              <Card key={c.id} className="flex flex-col p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-ink-900">{c.name}</p>
                    <p className="mt-0.5 text-xs text-ink-500">{c.audience}</p>
                  </div>
                  <button className="flex h-7 w-7 items-center justify-center rounded-md text-ink-400 hover:bg-sand-100 cursor-pointer" aria-label="More options">
                    <MoreHorizontal size={16} />
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Badge tone={campaignStatusConfig[c.status].tone}>{campaignStatusConfig[c.status].label}</Badge>
                  <Badge tone="outline">{methodLabels[c.channel]}</Badge>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-sand-200 pt-4 text-center">
                  <Stat icon={<Send size={13} />} label="Sent" value={c.requestsSent} />
                  <Stat icon={<MousePointerClick size={13} />} label="Clicked" value={c.clicks} />
                  <Stat icon={<CheckCircle2 size={13} />} label="Reviews" value={c.completions} />
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-ink-400">
                  <span>Created {formatDate(c.createdDate, { month: "short", day: "numeric", year: "numeric" })}</span>
                  {conversionRate !== null && <span className="font-medium text-evergreen-700">{conversionRate}% conversion</span>}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-center gap-1 text-ink-400">{icon}</div>
      <p className="mt-1 text-lg font-semibold tabular-nums text-ink-900">{value}</p>
      <p className="text-[11px] text-ink-500">{label}</p>
    </div>
  );
}
