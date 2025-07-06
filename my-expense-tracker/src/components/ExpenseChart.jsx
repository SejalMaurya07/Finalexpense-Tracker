import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function ExpenseChart({ transactions }) {
  const monthlyTotals = Array(12).fill(0);

  transactions.forEach((t) => {
    const month = new Date(t.date).getMonth();
    monthlyTotals[month] += t.amount;
  });

  const data = monthlyTotals.map((amt, idx) => ({
    name: new Date(0, idx).toLocaleString('default', { month: 'short' }),
    amount: amt
  }));

  return (
    <div className="bg-white p-4 rounded shadow h-[300px]">
      <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#6366f1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseChart;
