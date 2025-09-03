import { Expense } from "../models/Expense.js";

export const addExpense = async (req, res) => {
  const userId = req.user.id;
  const { icon, category, amount, date } = req.body;
  // console.log(userId);
  // try {
  if (!category || !amount || !date) {
    return res.status(400).json({ message: "All field are required" });
  }

  const newExpense = new Expense({
    userId,
    icon,
    category,
    amount,
    date: new Date(date),
  });

  await newExpense
    .save()
    .then((data) => {
      res.status(201).send({
        status: "success",
        message: "Expense add successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Server Error" });
    });
};
export const getAllExpense = async (req, res) => {
  const userId = req.user.id;
  await Expense.find({ userId })
    .sort({ date: -1 })
    .then((data) => res.status(200).json({ data: data }))
    .catch((error) => res.status(400).json({ message: error }));
};
export const deleteExpense = async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id)
    .then((data) => res.status(200).json({ message: "Delete successfully" }))
    .catch((error) => console.log(error));
};
export const updateExpense = async (req, res) => {
  const expenseId = req.params.id;
  const updatedData = { $set: req.body.expense };
  await Expense.findByIdAndUpdate(expenseId, updatedData, { new: true })
    .then((data) => res.status(200).json({ message: "Update successfully" }))
    .catch((error) => {
      console.error("Error updating item:", error);
      res.status(500).send("Server Error");
    });
};
