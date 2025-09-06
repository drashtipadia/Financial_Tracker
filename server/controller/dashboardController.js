import { Income } from "../models/Income.js";
import { Expense } from "../models/Expense.js";
import { isValidObjectId, Types } from "mongoose";

export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const last30dayIncomeTranscation = await Income.find({
      userId,
      date: { $gte: new Date(new Date() - 30 * 60 * 60 * 24 * 1000) },
    }).sort({ date: -1 });
    // console.log(last30dayIncomeTranscation);

    const incomeLast30days = last30dayIncomeTranscation.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    const last30daysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: new Date(new Date() - 30 * 60 * 60 * 24 * 1000) },
    }).sort({ date: -1 });

    const expensesLast30days = last30daysExpenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    const lastTranscation = [
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({ ...txn.toObject(), type: "income" })
      ),
      ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({ ...txn.toObject(), type: "expense" })
      ),
    ].sort((a, b) => b.date - a.date);

    const monthlySummery = [
      ...(await Income.aggregate([
        {
          $group: {
            _id: { year: { $year: "$date" }, month: { $month: "$date" } },
            totalIncome: {
              $sum: "$amount",
            },
          },
        },
      ])),
      ...(await Expense.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$date" },
              month: { $month: "$date" },
            },
            totalExpense: { $sum: "$amount" },
          },
        },
      ])),
    ];
    //  console.log(monthlySummery);

    res.json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last30daysExpense: {
        total: expensesLast30days || 0,
        transactions: last30daysExpenseTransactions || 0,
      },
      last30daysIncome: {
        total: incomeLast30days || 0,
        transactions: last30dayIncomeTranscation || 0,
      },
      recentTranscation: lastTranscation || 0,
      monthlytotal: monthlySummery || 0,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
