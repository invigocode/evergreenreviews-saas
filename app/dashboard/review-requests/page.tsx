import { PageHeader } from "@/components/ui/PageHeader";
import { RequestsClient } from "./RequestsClient";
import { reviewRequests, customers } from "@/lib/demo-data";

export default function ReviewRequestsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Review Requests" description="Ask customers for genuine feedback, and track what happens next." />
      <RequestsClient requests={reviewRequests} customers={customers} />
    </div>
  );
}
