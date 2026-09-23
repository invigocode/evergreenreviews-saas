import { PageHeader } from "@/components/ui/PageHeader";
import { CampaignBuilder } from "./CampaignBuilder";

export default function NewCampaignPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Create a review campaign"
        description="Build a thoughtful, well-timed request that feels personal — not needy."
      />
      <CampaignBuilder />
    </div>
  );
}
