export const dateConverter = (timestamp) => {
  //const date = new Date(timestamp);
  //return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  return timestamp.substring(0, 10);
};
export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    label: item.category,
    amount: item.amount,
  }));
  return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    label: item.source,
    amount: item.amount,
  }));
  return chartData;
};
