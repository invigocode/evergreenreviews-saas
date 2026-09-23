"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { dateRangeOptions } from "@/lib/metrics";
import type { DateRangeKey } from "@/lib/types";

export function RangeSelector({ current }: { current: DateRangeKey }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setRange = (value: DateRangeKey) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("range", value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <SegmentedControl
      options={dateRangeOptions.map((o) => ({ label: o.label, value: o.value }))}
      value={current}
      onChange={setRange}
    />
  );
}
