import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../hooks/useAuthStore";
import DashboardLayout from "../components/DashboardLayout";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/config";
import InfoCard from "../components/InfoCard";
import { LuHandCoins, LuWallet } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import FinanceOverview from "../ui/FinanceOverview";
import MonthlySummerise from "../ui/MonthlySummerise";
import RecentTransactions from "../ui/RecentTransactions";
import RecentExpense from "../ui/RecentExpense";
import RecentIncome from "../ui/RecentIncome";

const Home = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(false);
  const user = useAuthStore((state) => state.user);
  const isEmptyObject = (obj) => JSON.stringify(obj) === "{}";

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance
        .get(API_PATHS.DASHBOARD.GET_DATA)
        .then();
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEmptyObject(user)) {
      navigate("/login");
    } else {
      navigate("/");
      fetchDashboardData();
    }
  }, [user, navigate]);
  return (
    <div>
      <DashboardLayout>
        <div className="my-5 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard
              icon={<IoMdCard />}
              label="Total Balance"
              value={dashboardData.totalBalance || 0}
              color="bg-primary"
            />
            <InfoCard
              icon={<LuWallet />}
              label="Total Income"
              value={dashboardData.totalIncome || 0}
              color="bg-green-600"
            />
            <InfoCard
              icon={<LuHandCoins />}
              label="Total Expense"
              value={dashboardData.totalExpense || 0}
              color="bg-red-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <FinanceOverview
              totalBalance={dashboardData.totalBalance || 0}
              totalIncome={dashboardData.totalIncome || 0}
              totalExpense={dashboardData.totalExpense || 0}
            />
            {dashboardData.recentTranscation && (
              <RecentTransactions
                transactions={dashboardData.recentTranscation.slice(0, 5)}
              />
            )}
          </div>
          {dashboardData.monthlytotal && (
            <MonthlySummerise data={dashboardData.monthlytotal || 0} />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {dashboardData.last30daysExpense && (
              <RecentExpense
                data={dashboardData.last30daysExpense.transactions || []}
                onSeeMore={() => navigate("/expense")}
              />
            )}
            {dashboardData.last30daysIncome && (
              <RecentIncome
                data={dashboardData.last30daysIncome.transactions || []}
                onSeeMore={() => navigate("/income")}
              />
            )}
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Home;
