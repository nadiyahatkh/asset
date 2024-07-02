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
  if (value >= 1000000) {
    return `${value / 1000000} Juta`; // Mengonversi ke jutaan
  } else if (value >= 1000) {
    return `${value / 1000} Ribu`; // Mengonversi ke ribuan
  } else {
    return `${value}`;
  }
};

export default function BarChart({ data }) {
  const formattedData = data.map(item => ({
    name: item.category,
    total: item.total_price,
  }));

  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <BarGraph data={formattedData}>
        <XAxis
          dataKey={"name"}
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
          tickFormatter={formatYAxisTick}
          domain={[0, 'auto']}
        />
        <Bar dataKey={"total"} radius={[4, 4, 0, 0]} fill="#F9B421" />
      </BarGraph>
    </ResponsiveContainer>
  );
}
