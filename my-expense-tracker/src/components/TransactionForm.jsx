import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Pencil } from "lucide-react";
import { BASE_URL } from "../config";

function TransactionForm({ onAdd, editing, setEditing }) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editing) {
      setAmount(editing.amount.toString());
      setDate(editing.date);
      setDescription(editing.description);
      setCategory(editing.category);
    }
  }, [editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !date || !description || !category) {
      setError("All fields are required.");
      return;
    }

    const transaction = {
      amount: parseFloat(amount),
      date,
      description: description.trim(),
      category: category.trim(),
      _id: editing?._id, // needed for update
    };

    try {
      await onAdd(transaction); // call parent handler (App.jsx)
      // Clear form
      setAmount("");
      setDate("");
      setDescription("");
      setCategory("");
      setError("");
      setEditing?.(null);
    } catch (err) {
      console.error("❌ Submission failed:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 mb-6 space-y-4"
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
        {editing ? "✏️ Edit Transaction" : "➕ Add Transaction"}
      </h2>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input"
        >
          <option value="">Select Category</option>
          <option value="Food">🍔 Food</option>
          <option value="Utilities">💡 Utilities</option>
          <option value="Entertainment">🎮 Entertainment</option>
          <option value="Transport">🚗 Transport</option>
          <option value="Other">📦 Other</option>
        </select>
      </div>

      <div className="flex gap-4 items-center">
        <button
          type="submit"
          className={`w-full flex justify-center items-center gap-2 ${
            editing ? "bg-yellow-500" : "bg-blue-600"
          } hover:opacity-90 text-white py-2 px-4 rounded-lg font-medium`}
        >
          {editing ? <Pencil size={18} /> : <Plus size={18} />}
          {editing ? "Update Transaction" : "Add Transaction"}
        </button>

        {editing && (
          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setAmount("");
              setDate("");
              setDescription("");
              setCategory("");
              setError("");
            }}
            className="text-sm text-gray-600 hover:underline"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TransactionForm;
