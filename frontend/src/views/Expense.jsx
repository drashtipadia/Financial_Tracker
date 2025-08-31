import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { LuPlus } from "react-icons/lu";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/config";
import Model from "../components/Model";
import AddExpenseForm from "../ui/AddExpenseForm";

const Expense = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false);

  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;
    if (!category.trim()) {
      toast.error("category is required");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be vaild number greater than 0");
      return;
    }
    if (!date) {
      toast.error("Date is required");
      return;
    }

    await axiosInstance
      .post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      })
      .then((data) => {
        console.log(data);
        setOpenAddExpenseModel(false);
        toast.success(data.data.message);
        // fetchExpenseDetails();
      })
      .catch((error) => {
        console.error(
          "Error adding Expense",
          error.response?.data?.message || error.message
        );
      });
  };

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          {" "}
          <div className="card">
            <div className="flex items-center justify-between">
              <div className="">
                <h5 className="text-lg">Expense overview</h5>
                <p className="text-xs text-gray-400 mt-0.5">
                  {" "}
                  Track your spending trends over time and gain insights into
                  where your money goes.
                </p>
              </div>
              <button
                className="add-btn"
                onClick={() => setOpenAddExpenseModel(true)}
              >
                <LuPlus className="text-lg" /> AddExpense
              </button>
            </div>
            <div className="mt-10">chart</div>
          </div>
        </div>
        <Model
          isOpen={openAddExpenseModel}
          onClose={() => setOpenAddExpenseModel(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Model>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
