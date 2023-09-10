"use client";
import { ResponsiveContainer, Bar, BarChart, XAxis, YAxis, Tooltip } from "recharts";

export function PositionBarChart({
  data,
}: {
  data: { position: string; value: number }[];
}) {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <BarChart data={data}>
        <XAxis className="hidden lg:block" dataKey={'position'} color="#888888" fontSize={12}></XAxis>
        <Tooltip contentStyle={{backgroundColor: "#888888", borderColor: 'transparent'}}></Tooltip>
        <YAxis color="#888888" fontSize={12}></YAxis>
        <Bar dataKey={"value"} fill="#adfa1d" radius={[4, 4, 0, 0]}></Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
