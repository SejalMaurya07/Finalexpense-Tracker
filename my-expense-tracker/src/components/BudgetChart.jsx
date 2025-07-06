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

function BudgetChart({ transactions, budgets }) {
  const actuals = {};

  // Calculate actual expenses per category
  transactions.forEach((txn) => {
    const cat = txn.category || "Uncategorized";
    actuals[cat] = (actuals[cat] || 0) + txn.amount;
  });

  // Build chart data
  const data = budgets.map((b) => ({
    category: b.category,
    Budget: b.amount,
    Actual: actuals[b.category] || 0,
  }));

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md mt-6 w-full">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
        📉 Budget vs Actual
      </h2>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="category" />
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

export default BudgetChart;
