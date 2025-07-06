
import React from "react";

function DashboardCards({ transactions }) {
  const total = transactions.reduce((sum, t) => sum + t.amount, 0);

  const byCategory = {};
  transactions.forEach((t) => {
    byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
  });

  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <div className="grid sm:grid-cols-3 gap-4 mt-10">
      <div className="bg-blue-100 p-4 rounded-lg shadow">
        <h3 className="font-semibold text-blue-900">💰 Total Spent</h3>
        <p className="text-xl font-bold">₹{total}</p>
      </div>

      <div className="bg-green-100 p-4 rounded-lg shadow">
        <h3 className="font-semibold text-green-900">📊 Category Breakdown</h3>
        {Object.entries(byCategory).map(([cat, amt]) => (
          <p key={cat}>{cat}: ₹{amt}</p>
        ))}
      </div>

      <div className="bg-yellow-100 p-4 rounded-lg shadow">
        <h3 className="font-semibold text-yellow-900">🕒 Recent Transactions</h3>
        {recent.map((t) => (
          <p key={t.id}>{t.description} - ₹{t.amount}</p>
        ))}
      </div>
    </div>
  );
}

export default DashboardCards;
