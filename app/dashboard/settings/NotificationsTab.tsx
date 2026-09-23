"use client";

import { useState } from "react";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { Switch } from "@/components/ui/Switch";

const initial = {
  newReview: true,
  negativeReview: true,
  campaignActivity: true,
  weeklySummary: true,
  requestFailures: false,
  productUpdates: false,
};

const items: { key: keyof typeof initial; label: string; description: string }[] = [
  { key: "newReview", label: "New review received", description: "Get notified whenever a new Google review comes in." },
  { key: "negativeReview", label: "Review may need attention", description: "Immediate alert for reviews of 3 stars or fewer." },
  { key: "campaignActivity", label: "Campaign activity", description: "Updates when a campaign is sent, paused, or completed." },
  { key: "weeklySummary", label: "Weekly performance summary", description: "A short email recap every Monday morning." },
  { key: "requestFailures", label: "Failed review requests", description: "Alert if a request couldn't be delivered." },
  { key: "productUpdates", label: "Product updates", description: "Occasional news about new Evergreen Reviews features." },
];

export function NotificationsTab() {
  const [settings, setSettings] = useState(initial);

  return (
    <Card className="p-5">
      <CardTitle>Email notifications</CardTitle>
      <CardDescription className="mt-0.5">Choose what you want to hear about, and how often.</CardDescription>
      <div className="mt-2 divide-y divide-sand-100">
        {items.map((item) => (
          <Switch
            key={item.key}
            label={item.label}
            description={item.description}
            checked={settings[item.key]}
            onChange={(checked) => setSettings((prev) => ({ ...prev, [item.key]: checked }))}
          />
        ))}
      </div>
    </Card>
  );
}
