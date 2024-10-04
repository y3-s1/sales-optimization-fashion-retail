import React from 'react'
import { ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';

// Custom Tooltip component with transparent background and dynamic text color
const CustomTooltip = ({ active, payload, label, color }) => {
  if (active && payload && payload.length) {
    const { name, sales } = payload[0].payload;  // Extract month (name) and sales from the data point
    return (
      <div className="custom-tooltip" style={{ backgroundColor: "transparent", padding: "5px", borderRadius: "5px" }}>
        <p className="label" style={{ margin: 0, color }}>{`${name}: ${sales} sales`}</p>  {/* Display month and sales */}
      </div>
    );
  }

  return null;
};

function HighDemandSingleCategory({ highDemandCategory }) {
  return (
    <div className="chartBox flex h-full" style={{ fontFamily: "Inter" }}>
      <div className="boxInfo  flex flex-col justify-between" style={{ flex: "3" }}>
        <div className="title flex items-center gap-[10px]">
          <img src={highDemandCategory.icon} className="w-8 h-8" alt={highDemandCategory.category} />
          <span className="text-black">{highDemandCategory.category}</span>
        </div>
        <h1 className="text-2xl font-bold">{highDemandCategory.demand}</h1>
      </div>

      <div className="chartInfo flex flex-col justify-between" style={{ flex: "2" }}>
        <div className="chart w-full h-full flex-1">
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={highDemandCategory.salesCounts}>
              {/* Use the custom tooltip */}
              <Tooltip
                content={<CustomTooltip color={highDemandCategory.color} />}  // Pass the text color dynamically
                position={{ x: 10, y: 60 }}
              />
              <Line
                type="monotone"
                dataKey="sales"  // Use 'sales' as the dataKey
                stroke={highDemandCategory.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="texts flex flex-col text-right">
          <span className="percentage font-bold text-sm" style={{ color: highDemandCategory.salesGrowth > 0 ? "limegreen" : "tomato" }}>
            {highDemandCategory.salesGrowth}%
          </span>
          <span className="duration text-sm">This month</span>
        </div>
      </div>
    </div>
  );
}

export default HighDemandSingleCategory;
