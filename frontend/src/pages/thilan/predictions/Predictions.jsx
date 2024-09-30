import React, { useEffect, useState } from 'react'
import demandAxios from '../../../BaseURL';
import AllProducts from '../../../components/thilan/demandAnalysis/allProducts/AllProducts';
import PriceEnterForm from '../../../components/thilan/demandAnalysis/predictions/PriceEnterForm';
import AnalysisChartForPrices from '../../../components/thilan/demandAnalysis/predictions/AnalysisChartForPrices';

function Predictions({currentProduct, predictedPrice}) {


  // const [allProducts, setAllProducts] = useState({});

  // useEffect(() => {
  //   const fetchAllProductsData = async () => {
  //     try {
  //       const response = await demandAxios.get("api/demandAnalysis/allProducts");
  //       const processedData = response.data.map(product => {
  //         // Get the sales data
  //         const sales = product.sales;

  //         // Get the last and current month sales
  //         const now = new Date();
  //         const currentMonth = now.toLocaleString('default', { month: 'long' });
  //         const lastMonth = new Date(now.setMonth(now.getMonth() - 1)).toLocaleString('default', { month: 'long' });

  //         // Find this month's sales
  //         const thisMonthSalesData = sales.find(sale => sale.month === currentMonth && sale.year === String(now.getFullYear()));
  //         const lastMonthSalesData = sales.find(sale => sale.month === lastMonth && sale.year === String(now.getFullYear()));

  //         return {
  //           ...product,
  //           lastMonth: lastMonthSalesData ? lastMonthSalesData.count : 'N/A',
  //           lastMonthAvgPrice: lastMonthSalesData ? lastMonthSalesData.avgPrice : 'N/A',
  //           thisMonth: thisMonthSalesData ? thisMonthSalesData.count : 'N/A',
  //           thisMonthAvgPrice: thisMonthSalesData ? thisMonthSalesData.avgPrice : 'N/A',
  //         };
  //       });

  //       setAllProducts(processedData);
  //     } catch (error) {
  //       console.error("Error fetching all products", error);
  //     }
  //   };
  //   fetchAllProductsData();
  // }, []);

  const boxStyle = {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "6px",
    boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.10)",
  };

  const centeredTextStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",  // Make the div take up the full height of the box
    fontSize: "4rem",
    fontWeight: "bold"
  };

  return (
    <div className='predictions-all-content'>
      <h2>Predictions</h2>
      <div
        className="demandGrid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridAutoRows: "minmax(180px, auto)",
          gap: "20px",
          padding: "20px",
        }}
      >
        <div
          className="box1"
          style={{...boxStyle, gridColumn: "span 2", gridRow: "span 1" }}
        >
          <h4>Stock Predictions</h4>
          <div className='m-10'>
            <div className='m-10' style={centeredTextStyle}>
              <span>2499</span>
            </div>
          </div>
        </div>

        <div
          className="box1"
          style={{...boxStyle, gridColumn: "span 2", gridRow: "span 1" }}
        >
          <h4>Price Predictions</h4>
            <div className='m-10'>
              <div className='m-10' style={centeredTextStyle}>
                <span>Rs. </span><span>{predictedPrice}</span>
              </div>
            </div>
        </div>

        <div
          className="box1"
          style={{...boxStyle, gridColumn: "span 4", gridRow: "span 2" }}
        >
          <h4>Demand Analysis for predicted prices</h4>
          
          
          <div
            className="box1"
            style={{...boxStyle, gridColumn: "span 4", gridRow: "span 1" }}
          >
            <PriceEnterForm currentProduct={currentProduct} predictedPrice={predictedPrice}></PriceEnterForm>
          </div>
          <div
            className="box1"
            style={{...boxStyle, gridColumn: "span 4", gridRow: "span 1" }}
          >
            <AnalysisChartForPrices currentProduct={currentProduct}></AnalysisChartForPrices>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Predictions