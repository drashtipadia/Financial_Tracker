import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { LuDownload, LuPlus } from "react-icons/lu";
import Model from "../components/Model";
import IncomeForm from "../ui/IncomeForm";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/config";
import TransactionInfoCard from "../components/TransactionInfoCard";
import { dateConverter } from "../utils/helper";
import DeleteAlert from "../components/DeleteAlert";

const Income = () => {
  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false });
  const [updateIncome, setUpdateIncome] = useState({ show: false, data: null });
  const [selectIncomeId, setSelectIncomeId] = useState();

  //Get All Data
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

  //Add Income
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

  //Delete Income
  const deleteIncome = async () => {
    await axiosInstance
      .delete(API_PATHS.INCOME.DELETE_INCOME(selectIncomeId))
      .then((res) => {
        toast.success(res.data.message);
        setOpenDeleteAlert({ show: false });
        setSelectIncomeId(null);
        fetchIncomeDetails();
      })
      .catch((error) => {
        console.error(
          "Error deleting income:",
          error.response?.data?.message || error.message
        );
      });
  };

  const handleUpdateIncome = async (income) => {
    console.log(income);
    // income= income.filter(item => item !== id);
    await axiosInstance
      .put(API_PATHS.INCOME.UPDATE_INCOME(selectIncomeId), { income })
      .then((res) => {
        toast.success(res.data.message);
        setUpdateIncome({ show: false, data: null });
        setSelectIncomeId(null);
        fetchIncomeDetails();
      })
      .catch((err) => console.log(err));
  };
  //hanlde download income details
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("File download");
    } catch (error) {
      console.error("Error downloading income details", error);
      toast.error("Failed to download income details. Please try again");
    }
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
              <button
                className="card-btn"
                onClick={handleDownloadIncomeDetails}
              >
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
                  onDelete={() => {
                    setSelectIncomeId(income._id);
                    setOpenDeleteAlert({ show: true });
                  }}
                  onUpdate={() => {
                    setSelectIncomeId(income._id);
                    setUpdateIncome({
                      show: true,
                      data: {
                        date: dateConverter(income.date),
                        icon: income.icon,
                        source: income.source,
                        amount: income.amount,
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
          isOpen={openAddIncomeModel}
          onClose={() => setOpenAddIncomeModel(false)}
          title="Add Income"
        >
          <IncomeForm onAddIncome={handleAddIncome} />
        </Model>
        <Model
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure want to delete this income details?"
            onDelete={() => deleteIncome()}
          />
        </Model>
        <Model
          isOpen={updateIncome.show}
          onClose={() => setUpdateIncome({ show: false, data: null })}
          title="Update Income"
        >
          <IncomeForm
            onUpdateIncome={handleUpdateIncome}
            data={updateIncome.data}
          />
        </Model>
      </div>
    </DashboardLayout>
  );
};

export default Income;
