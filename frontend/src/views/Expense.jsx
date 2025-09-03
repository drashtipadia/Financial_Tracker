import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { LuDownload, LuPlus } from "react-icons/lu";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/config";
import Model from "../components/Model";
import ExpenseForm from "../ui/ExpenseForm";
import { dateConverter } from "../utils/helper";
import DeleteAlert from "../components/DeleteAlert";
import TransactionInfoCard from "../components/TransactionInfoCard";

const Expense = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
  });
  const [updateExpense, setUpdateExpense] = useState({
    show: false,
    data: null,
  });
  const [selectExpenseId, setSelectExpenseId] = useState();
  //Get All Expense Details
  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    await axiosInstance
      .get(API_PATHS.EXPENSE.GET_ALL_EXPENSE)
      .then((res) => {
        setExpenseData(res.data.data);
      })
      .catch((error) => {
        console.log("Somethhing went wrong please try again", error);
      })
      .finally(setLoading(false));
  };

  //Add expense
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
        //  console.log(data);
        setOpenAddExpenseModel(false);
        toast.success(data.data.message);
        fetchExpenseDetails();
      })
      .catch((error) => {
        console.error(
          "Error adding Expense",
          error.response?.data?.message || error.message
        );
      });
  };

  //Delete Expense
  const deleteExpense = async () => {
    await axiosInstance
      .delete(API_PATHS.EXPENSE.DELETE_EXPENSE(selectExpenseId))
      .then((res) => {
        toast.success(res.data.message);
        setOpenDeleteAlert({ show: false, data: null });
        fetchExpenseDetails();
      })
      .catch((error) => {
        console.error(
          "Error deleting expense:",
          error.response?.data?.message || error.message
        );
      });
  };

  const handleUpdateExpense = async (expense) => {
    // console.log(expense);
    await axiosInstance
      .put(API_PATHS.EXPENSE.UPDATE_EXPENSE(selectExpenseId), { expense })
      .then((res) => {
        toast.success(res.data.message);
        setUpdateExpense({ show: false, data: null });
        setSelectExpenseId(null);
        fetchExpenseDetails();
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchExpenseDetails();
    return () => {};
  }, []);

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
        <div>
          {" "}
          <div className="card">
            <div className="flex  justify-between">
              <h5 className="text-lg ">Expense Sources</h5>
              <button className="card-btn">
                {/* onClick={onDownload} */}
                <LuDownload className="text-base" /> Download
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              {expenseData.map((expense) => (
                <TransactionInfoCard
                  key={expense._id}
                  title={expense.category}
                  icon={expense.icon}
                  date={dateConverter(expense.date)}
                  amount={expense.amount}
                  type="expense"
                  onDelete={() => {
                    setSelectExpenseId(expense._id);
                    setOpenDeleteAlert({ show: true });
                  }}
                  onUpdate={() => {
                    setSelectExpenseId(expense._id);
                    setUpdateExpense({
                      show: true,
                      data: {
                        date: dateConverter(expense.date),
                        icon: expense.icon,
                        category: expense.category,
                        amount: expense.amount,
                      },
                    });
                    // console.log(income);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <Model
          isOpen={openAddExpenseModel}
          onClose={() => setOpenAddExpenseModel(false)}
          title="Add Expense"
        >
          <ExpenseForm onAddExpense={handleAddExpense} />
        </Model>
        <Model
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure want to delete this Expense details?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Model>
        <Model
          isOpen={updateExpense.show}
          onClose={() => setUpdateExpense({ show: false, data: null })}
          title="Update Expense"
        >
          <ExpenseForm
            onUpdateExpense={handleUpdateExpense}
            data={updateExpense.data}
          />
        </Model>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
