import React from "react";

function BudgetList({ budgets, onEdit, onDelete }) {
  if (!budgets || budgets.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-300 mt-4">
        No budgets set.
      </p>
    );
  }

  return (
    <div className="mt-6 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-300 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400 mb-4">
        📋 Budget List
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm sm:text-base">
          <thead>
            <tr className="bg-gradient-to-r from-purple-100 to-indigo-200 dark:from-purple-800 dark:to-indigo-700 text-gray-900 dark:text-gray-100">
              <th className="p-3 text-left">Month</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Amount (₹)</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((budget) => (
              <tr
                key={budget._id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <td className="p-3">{budget.month}</td>
                <td className="p-3">{budget.category}</td>
                <td className="p-3">₹{budget.amount}</td>
                <td className="p-3 space-x-3">
                  <button
                    onClick={() => onEdit(budget)}
                    className="text-yellow-600 dark:text-yellow-400 hover:underline font-semibold"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => onDelete(budget._id)}
                    className="text-red-600 dark:text-red-400 hover:underline font-semibold"
                  >
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BudgetList;