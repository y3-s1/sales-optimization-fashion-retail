import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

function SingleProductSalesChart({ currentProduct }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    analyzeData();
  }, [currentProduct]);

  const analyzeData = async () => {
    try {
      const salesData = currentProduct.sales;

      // Define months for consistent rendering
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      // Filter sales data for the past two years (2023 and 2024)
      const filteredSalesData = salesData.filter((item) =>
        ["2023", "2024"].includes(item.year)
      );

      const dataArray = months.map((month) => ({
        month,
        salesCount2023: 0,
        salesCount2024: 0,
        avgPrice2023: 0,
        avgPrice2024: 0,
      }));

      filteredSalesData.forEach((item) => {
        const year = item.year;
        const month = item.month.slice(0, 3); // Shorten month names
        const count = item.count;
        const avgPrice = item.avgPrice;

        const existingEntry = dataArray.find((entry) => entry.month === month);

        if (existingEntry) {
          existingEntry[`salesCount${year}`] = count;
          existingEntry[`avgPrice${year}`] = avgPrice;
        }
      });

      setData(dataArray);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-5 flex flex-col items-center gap-5">
      {/* Chart 1: Sales Count Bar Chart */}
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis
              label={{ value: "Sales Count", angle: -90, position: "insideLeft" }}
            />
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
              labelStyle={{ display: "none" }}
              cursor={{ fill: "white" }}
            />
            <Legend />
            <Bar dataKey="salesCount2023" name="Sales Count 2023" fill="#64748B" />
            <Bar dataKey="salesCount2024" name="Sales Count 2024" fill="#CBD5E1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 2: Average Price Line Chart */}
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis
              label={{ value: "Avg Price", angle: -90, position: "insideLeft" }}
              domain={[0, (dataMax) => dataMax + 500]}
            />
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
              labelStyle={{ display: "none" }}
              cursor={{ fill: "white" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="avgPrice2023"
              name="Avg Price 2023"
              stroke="#9CA3AF"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="avgPrice2024"
              name="Avg Price 2024"
              stroke="#D1D5DB"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div
        className="flex gap-6 items-center"
        style={{ fontFamily: "inter", fontSize: "14px", fontWeight: "600" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "#64748B" }}
          />
          <div>Sales Count 2023</div>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "#CBD5E1" }}
          />
          <div>Sales Count 2024</div>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "#9CA3AF" }}
          />
          <div>Avg Price 2023</div>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "#D1D5DB" }}
          />
          <div>Avg Price 2024</div>
        </div>
      </div>
    </div>
  );
}

export default SingleProductSalesChart;
