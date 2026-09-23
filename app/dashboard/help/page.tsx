import { PageHeader } from "@/components/ui/PageHeader";
import { HelpClient } from "./HelpClient";

export default function HelpPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Help & Support" description="Answers, guidance, and a direct line to our team." />
      <HelpClient />
    </div>
  );
}
