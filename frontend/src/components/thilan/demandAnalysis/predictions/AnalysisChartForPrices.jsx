import React, { useState } from 'react'
import SingleProductSalesChart from '../singleProduct/singleProductSalesChart/SingleProductSalesChart'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Tooltip } from '@mui/material';

function AnalysisChartForPrices({currentProduct}) {
  const [data, setData] = useState([]);

  console.log("cur pro in analysischartforprices... : ", currentProduct);

  return (
    <div>

      <div>
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
              <Bar dataKey="predictedSales" name="Predicted Sales" fill="#64748B" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  )
}

export default AnalysisChartForPrices