"use client";
import React from "react";
import {
  BarChart as BarGraph,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar
} from "recharts";

const data = [
  {
    name: "Kategori",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Kategori",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Kategori",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Kategori",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Kategori",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Kategori",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Kategori",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Kategori",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Kategori",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Kategori",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Kategori",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Kategori",
    total: Math.floor(Math.random() * 5000) + 1000
  }
];

export default function BarChart() {
  // Function to format ticks on YAxis
  const formatYAxisTick = (value) => {
    if (value >= 100000000) {
      return `${value / 1000000}M`; // Convert to millions
    } else if (value >= 10000000) {
      return `${value / 1000000}M`;
    } else if (value >= 1000000) {
      return `${value / 1000000}M`;
    } else if (value >= 100000) {
      return `${value / 1000}K`; // Convert to thousands
    } else if (value >= 10000) {
      return `${value / 1000}K`;
    } else if (value >= 1000) {
      return `${value / 1000}K`;
    } else {
      return `${value}`;
    }
  };

  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <BarGraph data={data}>
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
          domain={[0, 'auto']} // Adjust the domain as per your data
        />
        <Bar dataKey={"total"} radius={[4, 4, 0, 0]} fill="#F9B421" />
      </BarGraph>
    </ResponsiveContainer>
  );
}
