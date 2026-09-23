"use client";

import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import type { ChartPoint } from "@/lib/metrics";

const colors = {
  total: "#1a4f34",
  totalFill: "#e9f5ee",
  new: "#59a978",
  requests: "#b08a3e",
};

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-sand-200 bg-white px-3.5 py-3 text-sm shadow-popover">
      <p className="mb-1.5 font-semibold text-ink-900">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center justify-between gap-4 text-ink-600">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
            {p.name}
          </span>
          <span className="font-medium tabular-nums text-ink-900">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

export function GrowthChart({ data }: { data: ChartPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <ComposedChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
        <defs>
          <linearGradient id="totalFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colors.totalFill} stopOpacity={0.9} />
            <stop offset="100%" stopColor={colors.totalFill} stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="#e9e5d8" />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#8c9490", fontSize: 12 }}
          minTickGap={24}
        />
        <YAxis
          yAxisId="left"
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#8c9490", fontSize: 12 }}
          width={40}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#8c9490", fontSize: 12 }}
          width={32}
        />
        <Tooltip content={<ChartTooltip />} />
        <Legend
          verticalAlign="top"
          height={32}
          align="right"
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 13, color: "#566058" }}
        />
        <Area
          yAxisId="left"
          type="monotone"
          dataKey="totalReviews"
          name="Total reviews"
          stroke={colors.total}
          strokeWidth={2}
          fill="url(#totalFill)"
        />
        <Bar yAxisId="right" dataKey="newReviews" name="New reviews" fill={colors.new} radius={[3, 3, 0, 0]} barSize={10} />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="requestsSent"
          name="Requests sent"
          stroke={colors.requests}
          strokeWidth={2}
          dot={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
