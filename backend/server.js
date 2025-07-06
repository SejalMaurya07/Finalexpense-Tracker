import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import budgetRoutes from "./routes/budgetRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";




dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Budget Route
app.use("/api/budgets", budgetRoutes);
app.use("/api/transactions", transactionRoutes);

// ✅ Root route (optional)
app.get("/", (req, res) => {
  res.send("Backend running...");
});

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
