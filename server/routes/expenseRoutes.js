import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addExpense,
  getAllExpense,
  deleteExpense,
  updateExpense,
} from "../controller/expenseController.js";

const route = Router();

route.post("/add", protect, addExpense);
route.get("/get", protect, getAllExpense);
route.put("/:id", protect, updateExpense);
route.delete("/:id", protect, deleteExpense);

export default route;
