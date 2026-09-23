"use client";

import { Building2, Mail, MessageSquare, Send, Webhook, Users } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

const integrations = [
  {
    icon: Building2,
    name: "Google Business Profile",
    description: "Sync reviews and profile details using Google's official API.",
    status: "connected" as const,
    note: "Demo connection — showing sample data.",
  },
  {
    icon: Mail,
    name: "Email provider",
    description: "Send review requests and notifications by email.",
    status: "connected" as const,
  },
  {
    icon: Send,
    name: "SMS provider",
    description: "Send review requests by text message.",
    status: "connected" as const,
  },
  {
    icon: MessageSquare,
    name: "WhatsApp Business",
    description: "Send review requests over WhatsApp.",
    status: "not_connected" as const,
  },
  {
    icon: Users,
    name: "CRM integrations",
    description: "Sync customers automatically from your CRM.",
    status: "not_connected" as const,
  },
  {
    icon: Webhook,
    name: "Webhooks",
    description: "Send Evergreen Reviews events to your own systems.",
    status: "not_connected" as const,
  },
];

export function IntegrationsTab() {
  const { show } = useToast();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {integrations.map((integration) => (
        <Card key={integration.name} className="flex flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sand-100 text-ink-600">
              <integration.icon size={18} />
            </div>
            {integration.status === "connected" ? (
              <Badge tone="green">Connected</Badge>
            ) : (
              <Badge tone="neutral">Not connected</Badge>
            )}
          </div>
          <p className="mt-3 font-semibold text-ink-900">{integration.name}</p>
          <p className="mt-1 flex-1 text-sm text-ink-500">{integration.description}</p>
          {integration.note && <p className="mt-1 text-xs text-gold-600">{integration.note}</p>}
          <Button
            variant={integration.status === "connected" ? "secondary" : "primary"}
            size="sm"
            className="mt-4 self-start"
            onClick={() => show(integration.status === "connected" ? `Managing ${integration.name}.` : `Connect ${integration.name} — coming soon in this demo.`)}
          >
            {integration.status === "connected" ? "Manage" : "Connect"}
          </Button>
        </Card>
      ))}
    </div>
  );
}
