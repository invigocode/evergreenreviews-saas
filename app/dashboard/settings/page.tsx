import { PageHeader } from "@/components/ui/PageHeader";
import { SettingsNav } from "./SettingsNav";
import { BusinessTab } from "./BusinessTab";
import { TeamTab } from "./TeamTab";
import { NotificationsTab } from "./NotificationsTab";
import { IntegrationsTab } from "./IntegrationsTab";
import { SubscriptionTab } from "./SubscriptionTab";
import { PrivacyTab } from "./PrivacyTab";

const validTabs = ["business", "team", "notifications", "integrations", "subscription", "privacy"] as const;

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab: tabParam } = await searchParams;
  const tab = (validTabs as readonly string[]).includes(tabParam ?? "") ? tabParam! : "business";

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Settings" description="Manage your business, team, and account." />
      <SettingsNav active={tab} />
      <div className={tab === "integrations" || tab === "subscription" ? "max-w-4xl" : "max-w-2xl"}>
        {tab === "business" && <BusinessTab />}
        {tab === "team" && <TeamTab />}
        {tab === "notifications" && <NotificationsTab />}
        {tab === "integrations" && <IntegrationsTab />}
        {tab === "subscription" && <SubscriptionTab />}
        {tab === "privacy" && <PrivacyTab />}
      </div>
    </div>
  );
}
