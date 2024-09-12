import React, { useEffect, useState } from 'react';
import HighDemandProducts from '../../../components/thilan/demandAnalysis/highDemandProducts/HighDemandProducts';
import demandAxios from "../../../BaseURL";
import HighDemandCategories from '../../../components/thilan/demandAnalysis/highDemandCategories/HighDemandCategories';
import AllProducts from '../../../components/thilan/demandAnalysis/allProducts/AllProducts';
import SingleProduct from '../../../components/thilan/demandAnalysis/singleProduct/SingleProduct';

function DemandAnalysis() {

  const [highDemandData, setHighDemandData] = useState({ 
    highDemandProducts:[],  
    highDemandCategory1:null,  
    highDemandCategory2:null,  
    highDemandCategory3:null,  
    highDemandCategory4:null
  });
  const [allProducts, setAllProducts] = useState({});
  const [currentProduct, setCurrentProduct] = useState("");

  useEffect(() => {
    const fetchHighDemandData = async () => {
      try {
        const response = await demandAxios.get("api/demandAnalysis/highDemandData");
        setHighDemandData(response.data); // Save the entire response object

        // Set the initial currentProduct to a random product _id
        if (response.data.length > 0) {
          const randomIndex = Math.floor(Math.random() * response.data.length);
          setCurrentProduct(response.data[randomIndex]._id);
        }
      } catch (error) {
        console.error("Error fetching high-demand products", error);
      }
    };
    fetchHighDemandData();
  }, []);


  
  useEffect(() => {
    const fetchAllProductsData = async () => {
      try {
        const response = await demandAxios.get("api/demandAnalysis/allProducts");
        const processedData = response.data.map(product => {
          // Get the sales data
          const sales = product.sales;

          // Get the last and current month sales
          const now = new Date();
          const currentMonth = now.toLocaleString('default', { month: 'long' });
          const lastMonth = new Date(now.setMonth(now.getMonth() - 1)).toLocaleString('default', { month: 'long' });

          // Find this month's sales
          const thisMonthSalesData = sales.find(sale => sale.month === currentMonth && sale.year === String(now.getFullYear()));
          const lastMonthSalesData = sales.find(sale => sale.month === lastMonth && sale.year === String(now.getFullYear()));

          return {
            ...product,
            lastMonth: lastMonthSalesData ? lastMonthSalesData.count : 'N/A',
            lastMonthAvgPrice: lastMonthSalesData ? lastMonthSalesData.avgPrice : 'N/A',
            thisMonth: thisMonthSalesData ? thisMonthSalesData.count : 'N/A',
            thisMonthAvgPrice: thisMonthSalesData ? thisMonthSalesData.avgPrice : 'N/A',
          };
        });

        setAllProducts(processedData);
      } catch (error) {
        console.error("Error fetching all products", error);
      }
    };
    fetchAllProductsData();
  }, []);


  const boxStyle = {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "6px",
    boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.10)",
  };
  
  console.log("current product ; ", currentProduct);

  return (
    <div className='demandAnalysis-all-content'>
      <h2>DemandAnalysis</h2>
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
          style={{ ...boxStyle, gridColumn: "span 1", gridRow: "span 3" }}
        >
          <HighDemandProducts highDemandProducts={highDemandData.highDemandProducts} />
        </div>

        <div
          className="box2"
          style={{ ...boxStyle, gridColumn: "span 3", gridRow: "span 3"}}
        >
          <HighDemandCategories 
            highDemandCategory1={highDemandData.highDemandCategory1}
            highDemandCategory2={highDemandData.highDemandCategory2}
            highDemandCategory3={highDemandData.highDemandCategory3}
            highDemandCategory4={highDemandData.highDemandCategory4}
          ></HighDemandCategories>
        </div>

        <div
          className="box1"
          style={{ ...boxStyle, gridColumn: "span 4", gridRow: "span 3.5" }}
        >
          <AllProducts 
            allProducts={allProducts} 
            setCurrentProduct={setCurrentProduct}
            currentProduct={currentProduct}
          />
        </div>

        <div
          className="box1"
          style={{ ...boxStyle, gridColumn: "span 4", gridRow: "span 3.5" }}
        >
          <SingleProduct currentProduct={currentProduct} />
        </div>
        
      </div>
    </div>
  );
}

export default DemandAnalysis;
