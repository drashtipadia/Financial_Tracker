import React, { useEffect, useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../components/TransactionInfoCard";
import CustomBarChart from "../components/Charts/CustomBarChart";
import { prepareIncomeBarChartData } from "../utils/helper";

const RecentIncome = ({ data, onSeeMore }) => {
  const [chartData, setChartData] = useState({});
  useEffect(() => {
    const result = prepareIncomeBarChartData(data);
    setChartData(result);
  }, [data]);
  return (
    <div className="card h-[450px]">
      <div className="flex items-center justify-between pb-2">
        <h5 className="text-lg">Income</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>
      <CustomBarChart chartdata={chartData} />
    </div>
  );
};

export default RecentIncome;
