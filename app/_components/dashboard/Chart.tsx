"use client";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
const aggregateData = (data: any) => {
  const aggregated = data.reduce((acc: any, curr: any) => {
    if (acc[curr.date]) {
      acc[curr.date] += curr.revenue;
    } else {
      acc[curr.date] = curr.revenue;
    }
    return acc;
  }, {});

  return Object.keys(aggregated).map((date) => ({
    date,
    revenue: aggregated[date],
  }));
};

function Chart({ result }: { result: { date: string; revenue: number }[] }) {
  const processedData = aggregateData(result);
  return (
    <ResponsiveContainer width={"100%"} height={400} className={"text-ltr"}>
      <LineChart data={processedData}>
        <CartesianGrid strokeDasharray={"3 3"} />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type={"monotone"}
          stroke="#3b82f6"
          activeDot={{ r: 8 }}
          dataKey="revenue"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Chart;
