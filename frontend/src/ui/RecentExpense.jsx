import { LuArrowRight } from "react-icons/lu";
import CustomBarChart from "../components/Charts/CustomBarChart";
import { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../utils/helper";

const RecentExpense = ({ data, onSeeMore }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);

    setChartData(result);
  }, [data]);
  return (
    <div className="card h-[450px]">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Expense</h5>
        <button className="card-btn" onClick={onSeeMore}>
          Seel All <LuArrowRight />
        </button>
      </div>
      <CustomBarChart chartdata={chartData} />
    </div>
  );
};

export default RecentExpense;
