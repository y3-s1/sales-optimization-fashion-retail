import React, { useState, useEffect } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Tooltip } from '@mui/material';
import demandAxios from '../../../../BaseURL'; // Axios instance

function AnalysisChartForPrices({ currentProduct, analyzingPrice }) {
  const [data, setData] = useState([]);

  // Fetch the predicted sales when the analyzingPrice or currentProduct changes
  useEffect(() => {
    const fetchPredictedSales = async () => {
      try {
        const response = await demandAxios.post('/api/predictions/predictSales', {
          productId: currentProduct._id,
          analyzingPrice,
        });
        setData(response.data.predictions);  // Save the predicted sales data for the chart
      } catch (error) {
        console.error("Error fetching predicted sales:", error);
      }
    };

    if (currentProduct.productId && analyzingPrice) {
      fetchPredictedSales();  // Call API to fetch predictions
    }
  }, [currentProduct, analyzingPrice]);

  console.log("sales predict data", data);
  console.log("product id :", currentProduct._id, "  analyzingPrice: ", analyzingPrice);

  return (
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
            <YAxis label={{ value: "Sales Count", angle: -90, position: "insideLeft" }} />
            <Tooltip contentStyle={{ background: "white", borderRadius: "5px" }} labelStyle={{ display: "none" }} cursor={{ fill: "white" }} />
            <Legend />
            <Bar dataKey="predictedSales" name="Predicted Sales" fill="#64748B" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AnalysisChartForPrices;
