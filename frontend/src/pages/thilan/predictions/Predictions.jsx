import React, { useEffect, useState } from 'react'
import demandAxios from '../../../BaseURL';
import AllProducts from '../../../components/thilan/demandAnalysis/allProducts/AllProducts';

function Predictions({currentProduct}) {

  const [product, setProduct] = useState({});


  useEffect(() => {
    fetchData();
  }, [currentProduct]);

  const fetchData = async () => {
    try {
      const res = await demandAxios.get(`api/demandAnalysis/product/${currentProduct}`);
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <div className='demandAnalysis-all-content'>
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
        {/* <div
          className="box1"
          style={{ ...boxStyle, gridColumn: "span 4", gridRow: "span 3.5" }}
        >
          <AllProducts 
            allProducts={allProducts} 
            setCurrentProduct={setCurrentProduct}
            currentProduct={currentProduct}
          />
        </div> */}
        <div
          className="box1"
          style={{...boxStyle, gridColumn: "span 2", gridRow: "span 2" }}
        >
          <h4>Stock Predictions</h4>
          <p>current product is <span>{product.name}</span></p>
        </div>

        <div
          className="box1"
          style={{...boxStyle, gridColumn: "span 2", gridRow: "span 2" }}
        >
          <h4>Price Predictions</h4>
          <p>current product is <span>{product.name}</span></p>
        </div>

        <div
          className="box1"
          style={{...boxStyle, gridColumn: "span 4", gridRow: "span 2" }}
        >
          <h4>Demand Analysis for predicted prices</h4>
          <p>current product is <span>{product.name}</span></p>
        </div>
      </div>
    </div>
  )
}

export default Predictions