import React from 'react'
import HighDemandSingleCategory from '../highDemandSingleCategory/HighDemandSingleCategory';

function HighDemandCategories({ highDemandCategory1, highDemandCategory2, highDemandCategory3, highDemandCategory4 }) {

  if (!highDemandCategory1) {
    return <div>Loading...</div>;
  }

  const boxStyle = {
    padding: "20px",
    backgroundColor: "#f7f7f7",
    borderRadius: "6px",
    boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.10)",
  };

  return (
    <div className='highDemandCategories-all font-tinos'>
        <h2 className="font-tinos mb-6 text-left text-lg">High Demanding Categories</h2>
        <div className="demandGrid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridAutoRows: "minmax(180px, auto)",
          gap: "20px",
          padding: "20px",
          rowGap: "50px"
        }}>
          <div style={boxStyle}>
            <HighDemandSingleCategory highDemandCategory={highDemandCategory1}></HighDemandSingleCategory>
          </div>
          <div style={boxStyle}>
            <HighDemandSingleCategory highDemandCategory={highDemandCategory2}></HighDemandSingleCategory>
          </div>
          <div style={boxStyle}>
            <HighDemandSingleCategory highDemandCategory={highDemandCategory3}></HighDemandSingleCategory>
          </div>
          <div style={boxStyle}>
            <HighDemandSingleCategory highDemandCategory={highDemandCategory4}></HighDemandSingleCategory>
          </div>
        </div>
    </div>
  )
}

export default HighDemandCategories