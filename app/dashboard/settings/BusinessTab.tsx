"use client";

import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { business } from "@/lib/demo-data";

export function BusinessTab() {
  const { show } = useToast();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        show("Business settings saved.");
      }}
      className="flex flex-col gap-5"
    >
      <Card className="p-5">
        <CardTitle>Business details</CardTitle>
        <CardDescription className="mt-0.5">This appears on your review requests and materials.</CardDescription>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-evergreen-100 text-lg font-bold text-evergreen-700">
            O&S
          </div>
          <Button type="button" variant="secondary" size="sm">
            Change logo
          </Button>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Business name" defaultValue={business.name} />
          <Field label="Category" defaultValue={business.category} />
          <Field label="Website" defaultValue={business.website} />
          <Field label="Phone" defaultValue={business.phone} />
          <Field label="Address" defaultValue={business.address} className="sm:col-span-2" />
          <Field label="Google review link" defaultValue={business.googleReviewUrl} className="sm:col-span-2" />
        </div>
      </Card>

      <div className="flex justify-end">
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  );
}

function Field({ label, defaultValue, className }: { label: string; defaultValue?: string; className?: string }) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-medium text-ink-700">{label}</label>
      <input
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-sand-300 bg-white px-3.5 py-2.5 text-[15px] focus:border-evergreen-500 focus:outline-none focus:ring-2 focus:ring-evergreen-100"
      />
    </div>
  );
}
