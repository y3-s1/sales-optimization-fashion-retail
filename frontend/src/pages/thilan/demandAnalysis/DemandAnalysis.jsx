import React, { useEffect, useState } from 'react';
import HighDemandProducts from '../../../components/thilan/demandAnalysis/highDemandProducts/HighDemandProducts';
import demandAxios from "../../../BaseURL";
import HighDemandCategories from '../../../components/thilan/demandAnalysis/highDemandCategories/HighDemandCategories';
import AllProducts from '../../../components/thilan/demandAnalysis/allProducts/AllProducts';
import SingleProduct from '../../../components/thilan/demandAnalysis/singleProduct/SingleProduct';
import Predictions from '../predictions/Predictions';
import PriceUpdate from '../priceUpdate/PriceUpdate';

function DemandAnalysis({currentProduct, setCurrentProduct, currentProductId, setCurrentProductId, topDemandProducts, topDemandCategories}) {

  const [highDemandData, setHighDemandData] = useState({ 
    highDemandProducts:[],  
    highDemandCategory1:null,  
    highDemandCategory2:null,  
    highDemandCategory3:null,  
    highDemandCategory4:null
  });
  const [allProducts, setAllProducts] = useState({});

  const [topCategory1, setTopCategory1] = useState({});
  const [topCategory2, setTopCategory2] = useState({});
  const [topCategory3, setTopCategory3] = useState({});
  const [topCategory4, setTopCategory4] = useState({});

  useEffect(() => {
    saveTopCategories();
  }, [topDemandCategories]);

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


  const saveTopCategories = async () => {
    try {
      if (topDemandCategories && topDemandCategories.length >= 4) {
        // Assign each top category with its respective color and dataKey
        setTopCategory1({ ...topDemandCategories[0], color: "#872323", dataKey: "sales" });
        setTopCategory2({ ...topDemandCategories[1], color: "#453AC8", dataKey: "sales" });
        setTopCategory3({ ...topDemandCategories[2], color: "#1c2866", dataKey: "sales" });
        setTopCategory4({ ...topDemandCategories[3], color: "#9fab2e", dataKey: "sales" });
      }
    } catch (error) {
      console.log(error);
    }
  };



  const boxStyle = {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "6px",
    boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.10)",
  };


  console.log("high demand data: ", highDemandData);
  console.log("top demand products: ", topDemandProducts);
  console.log("high demand categories: ", topDemandCategories);
  console.log("high demand category 1 : ", topCategory1);
  

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
          <HighDemandProducts highDemandProducts={topDemandProducts} />
        </div>

        <div
          className="box2"
          style={{ ...boxStyle, gridColumn: "span 3", gridRow: "span 3"}}
        >
          <HighDemandCategories 
            highDemandCategory1={topCategory1}
            highDemandCategory2={topCategory2}
            highDemandCategory3={topCategory3}
            highDemandCategory4={topCategory4}
          ></HighDemandCategories>
        </div>

        <div
          className="box1"
          style={{ ...boxStyle, gridColumn: "span 4", gridRow: "span 3.5" }}
        >
          <AllProducts 
            allProducts={allProducts} 
            setCurrentProductId={setCurrentProductId}
            currentProductId={currentProductId}
          />
        </div>

        <div
          className="box1"
          style={{ ...boxStyle, gridColumn: "span 4", gridRow: "span 6" }}
        >
          <SingleProduct currentProduct={currentProduct} />
        </div>

        
      </div>
    </div>
  );
}

export default DemandAnalysis;
