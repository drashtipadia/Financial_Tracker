import React, { useEffect, useState } from "react";

import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MonthlySummerise = ({ data }) => {
  const [formattedData, setFormattedData] = useState([]);
  useEffect(() => {
    const processData = () => {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      // Step 1: Reduce the rawData into a grouped format by month
      const groupedData = data.reduce((acc, item) => {
        const month = item._id.month;

        // Initialize month entry if it doesn't exist
        if (!acc[month]) {
          acc[month] = { month, totalIncome: 0, totalExpense: 0 };
        }

        // Step 2: Add income and expense to the respective month
        if (item.totalIncome) {
          acc[month].totalIncome = item.totalIncome;
        }

        if (item.totalExpense) {
          acc[month].totalExpense = item.totalExpense;
        }

        return acc;
      }, {});

      // Step 3: Convert groupedData to an array
      const result = Object.values(groupedData).map((item) => ({
        month: monthNames[item.month - 1], // Convert month number to month name
        totalIncome: item.totalIncome,
        totalExpense: item.totalExpense,
      }));
      setFormattedData(result);
    };

    processData();
  }, []);

  return (
    <div className="card">
      <div className="flex items-center justify-between pb-2">
        <h5 className="text-lg">Monthly Data OverView</h5>
      </div>

      <ResponsiveContainer width="100%" height={380}>
        <AreaChart width={100} data={formattedData}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#008000" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#008000" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF2C2C" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FF2C2C" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="totalIncome"
            stroke="#008000"
            fillOpacity={1}
            fill="url(#colorUv)"
            activeDot={{ r: 6 }}
          />
          <Area
            type="monotone"
            dataKey="totalExpense"
            stroke="#FF2C2C"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySummerise;
