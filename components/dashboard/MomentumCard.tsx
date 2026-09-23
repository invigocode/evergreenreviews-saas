import { TrendingUp, Activity, Sprout } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { getMomentum } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const config = {
  strong: { icon: TrendingUp, tone: "bg-evergreen-700 text-white" },
  steady: { icon: Activity, tone: "bg-evergreen-50 text-evergreen-700" },
  starting: { icon: Sprout, tone: "bg-sand-100 text-ink-600" },
};

export function MomentumCard() {
  const momentum = getMomentum();
  const { icon: Icon, tone } = config[momentum.level];

  return (
    <Card className="flex items-start gap-4 p-5">
      <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl", tone)}>
        <Icon size={20} />
      </div>
      <div>
        <p className="font-semibold text-ink-900">{momentum.headline}</p>
        <p className="mt-1 text-sm leading-relaxed text-ink-500">{momentum.detail}</p>
      </div>
    </Card>
  );
}
