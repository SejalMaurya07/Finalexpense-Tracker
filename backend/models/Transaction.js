import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  amount: Number,
  date: String,
  description: String,
  category: String,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
