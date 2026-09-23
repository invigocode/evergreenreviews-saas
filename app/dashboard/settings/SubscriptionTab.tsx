"use client";

import { Check } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";

const plans = [
  { name: "Starter", price: "$39/mo", features: ["Up to 100 requests/mo", "1 campaign", "Email support"] },
  { name: "Growth", price: "$99/mo", features: ["Up to 500 requests/mo", "Unlimited campaigns", "SMS + Email", "Priority support"], current: true },
  { name: "Pro", price: "$199/mo", features: ["Unlimited requests", "Multiple locations", "Team accounts", "Dedicated support"] },
];

export function SubscriptionTab() {
  const { show } = useToast();

  return (
    <div className="flex flex-col gap-5">
      <Card className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle>Current plan</CardTitle>
            <CardDescription className="mt-0.5">Billed monthly · Next invoice on the 1st</CardDescription>
          </div>
          <Badge tone="green">Active</Badge>
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium text-ink-700">Review requests used this month</p>
          <ProgressBar value={186} max={500} className="mt-2" />
          <p className="mt-1.5 text-xs text-ink-500">186 of 500 requests used</p>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className={`flex flex-col p-5 ${plan.current ? "border-evergreen-500 ring-1 ring-evergreen-500" : ""}`}>
            <div className="flex items-center justify-between">
              <p className="font-semibold text-ink-900">{plan.name}</p>
              {plan.current && <Badge tone="green">Current</Badge>}
            </div>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-ink-900">{plan.price}</p>
            <ul className="mt-4 flex-1 space-y-2 text-sm text-ink-600">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check size={14} className="text-evergreen-600" /> {f}
                </li>
              ))}
            </ul>
            <Button
              variant={plan.current ? "secondary" : "primary"}
              className="mt-4"
              disabled={plan.current}
              onClick={() => show(`Switched to the ${plan.name} plan.`)}
            >
              {plan.current ? "Current plan" : "Switch plan"}
            </Button>
          </Card>
        ))}
      </div>

      <Card className="flex items-center justify-between p-5">
        <div>
          <p className="text-sm font-medium text-ink-800">Cancel subscription</p>
          <p className="text-sm text-ink-500">You&apos;ll keep access until the end of your billing period.</p>
        </div>
        <Button variant="danger" onClick={() => show("Cancellation flow would start here.")}>
          Cancel plan
        </Button>
      </Card>
    </div>
  );
}
