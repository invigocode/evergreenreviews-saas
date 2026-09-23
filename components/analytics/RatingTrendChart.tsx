"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import type { ChartPoint } from "@/lib/metrics";

export function RatingTrendChart({ data }: { data: ChartPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="#e9e5d8" />
        <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#8c9490", fontSize: 12 }} minTickGap={24} />
        <YAxis
          domain={[4.5, 5]}
          ticks={[4.5, 4.6, 4.7, 4.8, 4.9, 5]}
          tickFormatter={(v: number) => v.toFixed(1)}
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#8c9490", fontSize: 12 }}
          width={34}
        />
        <Tooltip
          contentStyle={{ borderRadius: 10, border: "1px solid #e9e5d8", fontSize: 13 }}
          labelStyle={{ fontWeight: 600, color: "#1c2320" }}
        />
        <Line type="monotone" dataKey="avgRating" name="Average rating" stroke="#b08a3e" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
