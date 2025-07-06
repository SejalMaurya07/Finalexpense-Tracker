import React from "react";

function TransactionList({ transactions, onDelete, onEdit }) {
  if (transactions.length === 0) {
    return (
      <p className="mt-6 text-center text-gray-500 dark:text-gray-300">
        No transactions yet.
      </p>
    );
  }

  return (
    <div className="mt-10 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300">
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
        <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
          📋 Transaction List
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm sm:text-base">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-100 to-purple-200 dark:from-indigo-800 dark:to-purple-700 text-gray-900 dark:text-gray-100">
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr
                key={t._id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-800 transition"
              >
                <td className="p-3 text-gray-800 dark:text-gray-200 font-medium">
                  ₹{t.amount}
                </td>
                <td className="p-3 text-gray-700 dark:text-gray-300">
                  {t.description}
                </td>
                <td className="p-3 text-gray-700 dark:text-gray-300">
                  {t.category || "N/A"}
                </td>
                <td className="p-3 text-gray-600 dark:text-gray-400">{t.date}</td>
                <td className="p-3 space-x-3">
                  <button
                    onClick={() => onEdit(t)}
                    className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(t._id)}
                    className="text-red-600 dark:text-red-400 hover:underline font-semibold"
                  >
                    Delete
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

export default TransactionList;
