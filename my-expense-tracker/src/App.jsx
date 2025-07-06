import React, { useState, useEffect } from "react";
import axios from "axios";

import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import ExpenseChart from "./components/ExpenseChart";
import DashboardCards from "./components/DashboardCards";
import CategoryPieChart from "./components/CategoryPieChart";
import BudgetForm from "./components/BudgetForm";
import BudgetChart from "./components/BudgetChart";
import BudgetList from "./components/BudgetList";

const monthsList = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function App() {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [budgets, setBudgets] = useState([]);
  const [editingBudget, setEditingBudget] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const loadTransactions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.error("Failed to load transactions:", err);
    }
  };

  const loadBudgets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/budgets");
      setBudgets(res.data);
    } catch (err) {
      console.error("Failed to load budgets", err);
    }
  };

  useEffect(() => {
    loadTransactions();
    loadBudgets();
  }, []);

  const handleAddOrUpdateTransaction = async (txn) => {
    try {
      if (editingTransaction) {
        const res = await axios.put(
          `http://localhost:5000/api/transactions/${txn._id}`,
          txn
        );
        setTransactions((prev) =>
          prev.map((t) => (t._id === txn._id ? res.data : t))
        );
        setEditingTransaction(null);
      } else {
        const res = await axios.post("http://localhost:5000/api/transactions", txn);
        setTransactions([...transactions, res.data]);
      }
    } catch (err) {
      console.error("Transaction error:", err);
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/transactions/${id}`);
      setTransactions(transactions.filter((txn) => txn._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEditTransaction = (txn) => {
    setEditingTransaction(txn);
  };

  const handleEditBudget = (budget) => {
    setEditingBudget(budget);
  };

  const handleDeleteBudget = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/budgets/${id}`);
      setBudgets((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Error deleting budget", err);
    }
  };

  // Filter helpers
  const filterByMonth = (items) => {
    return items.filter((item) => {
      const date = new Date(item.date || item.month);
      return date.getMonth() === selectedMonth;
    });
  };

  const filteredTransactions = filterByMonth(transactions);
  const filteredBudgets = filterByMonth(budgets);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 sm:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-700 dark:text-blue-400 mb-6">
        💰 Expense Tracker
      </h1>

      {/* Month Filter */}
      <div className="flex justify-center flex-wrap gap-3 mb-6">
        {monthsList.map((m, index) => (
          <button
            key={index}
            onClick={() => setSelectedMonth(index)}
            className={`px-4 py-2 rounded-lg font-medium ${
              selectedMonth === index
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-200 border"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <p className="text-center font-semibold text-lg text-gray-800 dark:text-gray-100 mb-8">
        Showing data for: <span className="text-indigo-600">{monthsList[selectedMonth]}</span>
      </p>

      {/* Form and Chart */}
      <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
        <div className="w-full md:w-1/2">
          <TransactionForm
            onAdd={handleAddOrUpdateTransaction}
            editing={editingTransaction}
          />
        </div>

        <div className="w-full md:w-1/2 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            📊 Monthly Expenses
          </h2>
          <ExpenseChart transactions={filteredTransactions} />
        </div>
      </div>

      {/* Dashboard */}
      <div className="mt-10">
        <DashboardCards transactions={filteredTransactions} />
        <CategoryPieChart transactions={filteredTransactions} />
      </div>

      {/* Transaction List */}
      <div className="mt-10">
        <TransactionList
          transactions={filteredTransactions}
          onDelete={handleDeleteTransaction}
          onEdit={handleEditTransaction}
        />
      </div>

      {/* Budget Section */}
      <div className="mt-10">
       <BudgetForm
  onSave={loadBudgets}
  editing={editingBudget}
  onClearEditing={() => setEditingBudget(null)}
  selectedMonth={selectedMonth}
/>


        <BudgetChart
  transactions={filteredTransactions}
  budgets={filteredBudgets}
/>

        <BudgetList
          budgets={filteredBudgets}
          onEdit={handleEditBudget}
          onDelete={handleDeleteBudget}
        />
      </div>
      
    </div>
  );
}

export default App;
