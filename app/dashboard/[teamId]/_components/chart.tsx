"use client";
import { ResponsiveContainer, Bar, BarChart, XAxis, YAxis } from "recharts";

export function PositionBarChart({
  data,
}: {
  data: { position: string; value: number }[];
}) {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <BarChart data={data}>
        <XAxis dataKey={'position'} color="#888888" fontSize={12}></XAxis>
        <YAxis color="#888888" fontSize={12}></YAxis>
        <Bar dataKey={"value"} fill="#adfa1d" radius={[4, 4, 0, 0]}></Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
