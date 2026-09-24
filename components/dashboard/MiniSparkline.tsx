"use client";

import { ResponsiveContainer, AreaChart, Area, YAxis } from "recharts";

export function MiniSparkline({ data }: { data: { value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={44}>
      <AreaChart data={data} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="miniSparkFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#35835a" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#35835a" stopOpacity={0} />
          </linearGradient>
        </defs>
        {/* Zoom into the data's own range instead of the default 0-based axis,
            so a tightly clustered metric still reads as a visible trend. */}
        <YAxis hide domain={["dataMin", "dataMax"]} />
        <Area type="monotone" dataKey="value" stroke="#226844" strokeWidth={2} fill="url(#miniSparkFill)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
