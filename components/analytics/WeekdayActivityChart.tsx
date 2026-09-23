"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export function WeekdayActivityChart({ data }: { data: { label: string; requestsSent: number; newReviews: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }} barGap={4}>
        <CartesianGrid vertical={false} stroke="#e9e5d8" />
        <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#8c9490", fontSize: 12 }} />
        <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: "#8c9490", fontSize: 12 }} width={36} />
        <Tooltip
          contentStyle={{ borderRadius: 10, border: "1px solid #e9e5d8", fontSize: 13 }}
          cursor={{ fill: "#f5f3ec" }}
        />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, color: "#566058" }} />
        <Bar dataKey="requestsSent" name="Requests sent" fill="#b08a3e" radius={[3, 3, 0, 0]} barSize={14} />
        <Bar dataKey="newReviews" name="Reviews received" fill="#1a4f34" radius={[3, 3, 0, 0]} barSize={14} />
      </BarChart>
    </ResponsiveContainer>
  );
}
