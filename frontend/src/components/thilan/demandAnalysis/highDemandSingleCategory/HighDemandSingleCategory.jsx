import React from 'react'
import { Link } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';


function HighDemandSingleCategory({highDemandCategory}) {
  return (
    <div className="chartBox flex h-full" style={{ fontFamily: "Inter" }}>
      <div
        className="boxInfo  flex flex-col justify-between"
        style={{ flex: "3" }}
      >
        <div className="title flex items-center gap-[10px]">
          <img src={highDemandCategory.icon} className="w-8 h-8" />
          <span className="">{highDemandCategory.title}</span>
        </div>
        <h1 className="text-2xl font-bold">{highDemandCategory.number}</h1>
        <Link to="/" style={{ color: highDemandCategory.color }}>
          View all
        </Link>
      </div>

      <div
        className="chartInfo  flex flex-col justify-between "
        style={{ flex: "2" }}
      >
        <div className="chart w-full h-full flex-1">
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={highDemandCategory.chartData}>
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 10, y: 60 }}
              />
              <Line
                type="monotone"
                dataKey={highDemandCategory.dataKey}
                stroke={highDemandCategory.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="texts flex flex-col text-right">
          <span
            className="percentage font-bold text-sm"
            style={{ color: highDemandCategory.percentage > 0 ? "limegreen" : "tomato" }}
          >
            {highDemandCategory.percentage}%
          </span>
          <span className="duration text-sm">This month</span>
        </div>
      </div>
    </div>
  )
}

export default HighDemandSingleCategory