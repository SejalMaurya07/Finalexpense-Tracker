// src/components/MonthlyComparisonChart.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const monthsList = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function MonthlyComparisonChart({ transactions, budgets }) {
  const monthlyData = Array.from({ length: 12 }, (_, i) => ({
    month: monthsList[i],
    Budget: 0,
    Actual: 0,
  }));

  budgets.forEach((b) => {
    const month = new Date(b.month).getMonth();
    monthlyData[month].Budget += b.amount;
  });

  transactions.forEach((t) => {
    const month = new Date(t.date).getMonth();
    monthlyData[month].Actual += t.amount;
  });

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md mt-10 w-full">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        📆 All-Month Budget vs Actual Comparison
      </h2>
      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Budget" fill="#8884d8" />
            <Bar dataKey="Actual" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MonthlyComparisonChart;
