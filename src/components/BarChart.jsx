"use client";
import React from "react";
import {
  BarChart as BarGraph,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar
} from "recharts";

const formatYAxisTick = (value) => {
  return value.toString(); // Mengembalikan angka apa adanya
};

export default function BarChart({ data }) {
  const formattedData = data.map(item => ({
    name: item.category,
    total: item.total_category,
  }));

  // const truncateLabel = (name) => {
  //   return name.length > 10 ? `${name.substring(0, 10)}...` : name;
  // };

  return (
    <ResponsiveContainer width={"100%"} height={400}>
      <BarGraph data={formattedData} margin={{ bottom: 50 }}>
      <XAxis
          dataKey={"name"}
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
          interval={0} // Ensures all labels are shown
          tick={({ x, y, payload }) => {
            return (
              <text
                x={x}
                y={y + 10} // Adjust vertical position
                textAnchor="middle"
                fill="#888888"
                fontSize={12}
              >
                {payload.value.split(" ").map((line, index) => (
                  <tspan x={x} dy={index === 0 ? 0 : 12} key={index}>
                    {line}
                  </tspan>
                ))}
              </text>
            );
          }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
          tickFormatter={formatYAxisTick}
          domain={[0, 'auto']}
          allowDecimals={false}
        />
        <Bar dataKey={"total"} radius={[5, 5, 0, 0]} fill="#F9B421" />
      </BarGraph>
    </ResponsiveContainer>
  );
}
