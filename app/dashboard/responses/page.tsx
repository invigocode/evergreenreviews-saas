import { PageHeader } from "@/components/ui/PageHeader";
import { ResponsesClient } from "./ResponsesClient";
import { reviews } from "@/lib/demo-data";

export default async function ResponsesPage({
  searchParams,
}: {
  searchParams: Promise<{ review?: string }>;
}) {
  const { review } = await searchParams;
  return (
    <div className="flex h-full flex-col gap-6">
      <PageHeader title="Review Responses" description="Draft thoughtful replies, with AI-assisted suggestions you always review first." />
      <ResponsesClient reviews={reviews} initialSelectedId={review} />
    </div>
  );
}
