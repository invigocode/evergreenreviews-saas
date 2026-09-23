"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";

export function RatingDistributionChart({ distribution }: { distribution: Record<number, number> }) {
  const data = [5, 4, 3, 2, 1].map((star) => ({ star: `${star}★`, count: distribution[star] ?? 0, rating: star }));
  const colors: Record<number, string> = { 5: "#1a4f34", 4: "#35835a", 3: "#b08a3e", 2: "#a35b13", 1: "#ab2a20" };

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} layout="vertical" margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid horizontal={false} stroke="#e9e5d8" />
        <XAxis type="number" tickLine={false} axisLine={false} tick={{ fill: "#8c9490", fontSize: 12 }} />
        <YAxis type="category" dataKey="star" tickLine={false} axisLine={false} width={30} tick={{ fill: "#566058", fontSize: 12 }} />
        <Tooltip
          contentStyle={{ borderRadius: 10, border: "1px solid #e9e5d8", fontSize: 13 }}
          cursor={{ fill: "#f5f3ec" }}
        />
        <Bar dataKey="count" name="Reviews" radius={[0, 4, 4, 0]} barSize={16}>
          {data.map((d) => (
            <Cell key={d.rating} fill={colors[d.rating]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
