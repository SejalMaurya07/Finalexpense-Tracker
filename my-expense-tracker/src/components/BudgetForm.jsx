import React, { useState, useEffect } from "react";
import axios from "axios";

function BudgetForm({ onSave, editing, selectedMonth, onClearEditing }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [month, setMonth] = useState("");
  const [budgets, setBudgets] = useState([]);
  const [error, setError] = useState("");

  // 🗓️ Set default month based on selectedMonth
  useEffect(() => {
    const defaultMonth = new Date(new Date().setMonth(selectedMonth))
      .toISOString()
      .substr(0, 7);
    setMonth(defaultMonth);
  }, [selectedMonth]);

  // 📥 Load all budgets for duplicate check
  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/budgets");
        setBudgets(res.data);
      } catch (err) {
        console.error("Failed to load budgets", err);
      }
    };
    fetchBudgets();
  }, []);

  // ✏️ Pre-fill form when editing
  useEffect(() => {
    if (editing) {
      setAmount(editing.amount);
      setCategory(editing.category);
      setMonth(editing.month);
    }
  }, [editing]);

  // 🧹 Reset form
  const resetForm = () => {
    setAmount("");
    setCategory("");
    const defaultMonth = new Date(new Date().setMonth(selectedMonth))
      .toISOString()
      .substr(0, 7);
    setMonth(defaultMonth);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!amount || !category || !month) {
      setError("All fields are required.");
      return;
    }

    const payload = {
      amount: parseFloat(amount),
      category,
      month,
    };

    try {
      if (editing) {
        await axios.put(`http://localhost:5000/api/budgets/${editing._id}`, payload);
        onClearEditing();  // ✅ Exit editing mode
      } else {
        const alreadyExists = budgets.some(
          (b) =>
            b.category.toLowerCase() === category.toLowerCase() &&
            b.month === month
        );

        if (alreadyExists) {
          setError("Budget for this category already exists this month.");
          return;
        }

        await axios.post("http://localhost:5000/api/budgets", payload);
      }

      onSave();     // reload updated list
      resetForm();  // clear inputs and restore month
    } catch (err) {
      console.error("Error saving budget:", err);
      setError("Something went wrong!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-300 dark:border-gray-700 mt-10 mb-6 space-y-4"
    >
      <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-400">
        {editing ? "✏️ Update Budget" : "📅 Set Monthly Budget"}
      </h2>

      {error && <p className="text-red-500 font-medium">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="input"
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input"
        />

        <input
          type="number"
          placeholder="Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input"
        />
      </div>

      <button
        type="submit"
        className={`w-full ${
          editing ? "bg-yellow-500" : "bg-blue-600"
        } hover:opacity-90 text-white py-2 px-4 rounded-lg font-medium`}
      >
        {editing ? "Update Budget" : "Save Budget"}
      </button>
    </form>
  );
}

export default BudgetForm;
