"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import type { ChartPoint } from "@/lib/metrics";

export function ReviewGrowthChart({ data }: { data: ChartPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="reviewGrowthFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#147b28" stopOpacity={0.22} />
            <stop offset="100%" stopColor="#147b28" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="#e9e5d8" />
        <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#8c9490", fontSize: 12 }} minTickGap={24} />
        <YAxis tickLine={false} axisLine={false} tick={{ fill: "#8c9490", fontSize: 12 }} width={44} />
        <Tooltip
          contentStyle={{ borderRadius: 10, border: "1px solid #e9e5d8", fontSize: 13 }}
          labelStyle={{ fontWeight: 600, color: "#1c2320" }}
        />
        <Area type="monotone" dataKey="totalReviews" name="Total reviews" stroke="#147b28" strokeWidth={2} fill="url(#reviewGrowthFill)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
