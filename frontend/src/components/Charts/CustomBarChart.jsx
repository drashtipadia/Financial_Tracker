import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomBarChart = ({ chartdata }) => {
  return (
    <ResponsiveContainer width="100%" height="95%">
      <BarChart width={500} height={300} data={chartdata}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#555" }} />
        <YAxis tick={{ fontSize: 12, fill: "#555" }} />
        <Tooltip />
        <Bar dataKey="amount" radius={[10, 10, 0, 0]} fill="#0098de" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
