import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import {
  addExpense,
  getAllExpense,
  deleteExpense,
  updateExpense,
} from "../controller/expenseController";

const route = Router();

route.post("/add", protect, addExpense);
route.get("/get", protect, getAllExpense);
route.put("/:id", protect, updateExpense);
route.delete("/:id", protect, deleteExpense);

export default route;
