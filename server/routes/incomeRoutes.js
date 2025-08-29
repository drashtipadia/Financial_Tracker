import { Router } from "express";
import { protect } from "../middleware/authMiddlewar.js";
import {
  addIncome,
  getAllIncome,
  deleteIncome,
  updateIncome,
} from "../controller/incomeController.js";
const route = Router();
route.post("/add", protect, addIncome);
route.get("/get", protect, getAllIncome);
route.delete("/:id", protect, deleteIncome);
route.put("/:id", protect, updateIncome);
//route.get("/downloadexcel", protect, downloadIncomeExcel);

export default route;
