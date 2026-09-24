import { PageHeader } from "@/components/ui/PageHeader";
import { CustomersClient } from "./CustomersClient";
import { customers, business } from "@/lib/demo-data";

export default function CustomersPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Customers" description="A simple record of who you've served and whether they've been asked for a review." />
      <CustomersClient customers={customers} cap={business.reviewRequestCap} />
    </div>
  );
}
