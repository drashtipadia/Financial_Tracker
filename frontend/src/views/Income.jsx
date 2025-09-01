import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { LuDownload, LuPlus } from "react-icons/lu";
import Model from "../components/Model";
import AddIncomeForm from "../ui/AddIncomeForm";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/config";
import TransactionInfoCard from "../components/TransactionInfoCard";
import { dateConverter } from "../utils/helper";

const Income = () => {
  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    await axiosInstance
      .get(API_PATHS.INCOME.GET_ALL_INCOME)
      .then((data) => {
        setIncomeData(data.data.data);
        //console.log(data);
      })
      .catch((error) => {
        console.log("Somethhing went wrong please try again", error);
      })
      .finally(setLoading(false));
  };

  const handleAddIncome = async (income) => {
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
        fetchIncomeDetails();
      })
      .catch((error) => {
        console.error(
          "Error adding income",
          error.response?.data?.message || error.message
        );
      });
  };
  useEffect(() => {
    fetchIncomeDetails();

    return () => {};
  }, []);

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
        <div>
          <div className="card">
            <div className="flex  justify-between">
              <h5 className="text-lg ">Income Sources</h5>
              <button className="card-btn">
                {/* onClick={onDownload} */}
                <LuDownload className="text-base" /> Download
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              {incomeData.map((income) => (
                <TransactionInfoCard
                  key={income._id}
                  title={income.source}
                  icon={income.icon}
                  date={dateConverter(income.date)}
                  amount={income.amount}
                  type="income"
                  // onDelete={() => onDelete(income._id)}
                />
              ))}
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
