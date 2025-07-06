import express from "express";
import Budget from "../models/Budget.js";

const router = express.Router();

// ✅ Get budget for a specific month
router.get("/:month", async (req, res) => {
  try {
    const { month } = req.params;
    const budgets = await Budget.find({ month });
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all budgets
router.get("/", async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Create a new budget
router.post("/", async (req, res) => {
  try {
    const { category, amount, month } = req.body;
    const newBudget = new Budget({ category, amount, month });
    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Update an existing budget
router.put("/:id", async (req, res) => {
  try {
    const updatedBudget = await Budget.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBudget) return res.status(404).json({ error: "Budget not found" });
    res.json(updatedBudget);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Delete a budget
router.delete("/:id", async (req, res) => {
  try {
    const deletedBudget = await Budget.findByIdAndDelete(req.params.id);
    if (!deletedBudget) return res.status(404).json({ error: "Budget not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
