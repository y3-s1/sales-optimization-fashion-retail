import React, { useEffect, useState } from 'react';
import HighDemandProducts from '../../../components/thilan/demandAnalysis/highDemandProducts/HighDemandProducts';
import demandAxios from "../../../BaseURL";
import HighDemandCategories from '../../../components/thilan/demandAnalysis/highDemandCategories/HighDemandCategories';

function DemandAnalysis() {
  const [highDemandData, setHighDemandData] = useState({ 
    highDemandProducts:[],  
    highDemandCategory1:null,  
    highDemandCategory2:null,  
    highDemandCategory3:null,  
    highDemandCategory4:null
  });

  useEffect(() => {
    const fetchHighDemandData = async () => {
      try {
        const response = await demandAxios.get("demandAnalysis/highDemandData");
        setHighDemandData(response.data); // Save the entire response object
      } catch (error) {
        console.error("Error fetching high-demand products", error);
      }
    };
    fetchHighDemandData();
  }, []);

  const boxStyle = {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "6px",
    boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.10)",
  };
  
  console.log(highDemandData);

  return (
    <div className='demandAnalysis-all-content'>
      <h3>DemandAnalysis</h3>
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
          style={{ ...boxStyle, gridColumn: "span 3", gridRow: "span 3" }}
        >
          <HighDemandCategories 
            highDemandCategory1={highDemandData.highDemandCategory1}
            highDemandCategory2={highDemandData.highDemandCategory2}
            highDemandCategory3={highDemandData.highDemandCategory3}
            highDemandCategory4={highDemandData.highDemandCategory4}
          ></HighDemandCategories>
        </div>
        
      </div>
    </div>
  );
}

export default DemandAnalysis;
