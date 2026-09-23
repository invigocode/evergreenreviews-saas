import { Award } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getNextMilestone, MILESTONES } from "@/lib/demo-data";

export function MilestoneCard() {
  const { next, previous, total } = getNextMilestone();
  const remaining = next ? next - total : 0;
  const span = next ? next - previous : 1;
  const progressWithinSpan = next ? total - previous : span;

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2">
        <Award size={16} className="text-gold-500" />
        <CardTitle>Your next milestone</CardTitle>
      </div>

      {next ? (
        <>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-ink-900">
            You&apos;re <span className="text-evergreen-700">{remaining} reviews</span> away from {next}.
          </p>
          <ProgressBar value={progressWithinSpan} max={span} className="mt-4" />
          <div className="mt-2 flex justify-between text-xs text-ink-400">
            <span>{previous} reviews</span>
            <span>{next} reviews</span>
          </div>
        </>
      ) : (
        <p className="mt-3 text-[15px] text-ink-600">
          You&apos;ve passed every milestone we track ({MILESTONES.at(-1)}+ reviews) — that&apos;s a genuine achievement.
        </p>
      )}
    </Card>
  );
}
