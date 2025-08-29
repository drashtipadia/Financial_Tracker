//import { User } from "../models/User.js";
import { Income } from "../models/Income.js";

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
        payload: { newIncome },
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
  const UserId = req.user.id;
  await Income.findByIdAndDelete(req.params.id)
    .then((data) => res.status(200).json({ message: "Delete successfully" }))
    .catch((error) => console.log(error));
};
export const updateIncome = async (req, res) => {
  const incomeId = req.income.id;
  const updatedData = req.body;
  await Income.findByIdAndUpdate(incomeId, updatedData, { new: true })
    .then((data) => res.status(200).json(data))
    .catch((error) => {
      console.error("Error updating item:", error);
      res.status(500).send("Server Error");
    });
};
