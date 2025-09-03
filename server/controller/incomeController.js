import { Income } from "../models/Income.js";
import * as XLSX from "xlsx";

export const addIncome = async (req, res) => {
  const userId = req.user.id;
  const { icon, source, amount, date } = req.body;
  if (!source || !amount || !date) {
    return res.status(400).json({ message: "All field are required" });
  }
  const newIncome = new Income({
    userId,
    icon,
    source,
    amount,
    date: new Date(date),
  });
  await newIncome
    .save()
    .then((data) => {
      res.status(201).send({
        status: "success",
        message: "Income add successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Server Error" });
    });
};
export const getAllIncome = async (req, res) => {
  const userId = req.user.id;
  await Income.find({ userId })
    .sort({ date: -1 })
    .then((data) => res.status(200).json({ data: data }))
    .catch((error) => res.status(400).json({ message: error }));
};
export const deleteIncome = async (req, res) => {
  await Income.findByIdAndDelete(req.params.id)
    .then((data) => res.status(200).json({ message: "Delete successfully" }))
    .catch((error) => console.log(error));
};
export const updateIncome = async (req, res) => {
  const incomeId = req.params.id;
  const updatedData = { $set: req.body.income };
  await Income.findByIdAndUpdate(incomeId, updatedData, { new: true })
    .then((data) => res.status(200).json({ message: "Update successfully" }))
    .catch((error) => {
      console.error("Error updating item:", error);
      res.status(500).send("Server Error");
    });
};

export const downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Income");
    XLSX.writeFile(wb, "income_details.xlsx");
    res.download("income_details.xlsx");
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};