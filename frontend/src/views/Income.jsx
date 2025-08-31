import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { LuPlus } from "react-icons/lu";
import Model from "../components/Model";
import AddIncomeForm from "../ui/AddIncomeForm";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/config";

const Income = () => {
  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);
  const handleAddIncome = async (income) => {
    //console.log(income);
    // alert("In Function");
    const { source, amount, date, icon } = income;
    if (!source.trim()) {
      toast.error("Source is required");
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
      .post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      })
      .then((data) => {
        // console.log(data);
        setOpenAddIncomeModel(false);
        toast.success(data.data.message);
        // fetchIncomeDetails();
      })
      .catch((error) => {
        console.error(
          "Error adding income",
          error.response?.data?.message || error.message
        );
      });
  };
  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="card">
            <div className="flex items-center justify-between">
              <div className="">
                <h5 className="text-lg">Income overview</h5>
                <p className="text-xs text-gray-400 mt-0.5">
                  {" "}
                  Track your earnings over time and analyze your income trends.{" "}
                </p>
              </div>
              <button
                className="add-btn"
                onClick={() => setOpenAddIncomeModel(true)}
              >
                <LuPlus className="text-lg" /> AddIncome
              </button>
            </div>
          </div>
        </div>
        <Model
          isOpen={openAddIncomeModel}
          onClose={() => setOpenAddIncomeModel(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Model>
      </div>
    </DashboardLayout>
  );
};

export default Income;
