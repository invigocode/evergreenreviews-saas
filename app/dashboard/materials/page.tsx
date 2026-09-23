import { PageHeader } from "@/components/ui/PageHeader";
import { MaterialsClient } from "./MaterialsClient";

export default function MaterialsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Review Materials" description="Everything you need to make it easy for happy customers to leave a review." />
      <MaterialsClient />
    </div>
  );
}
