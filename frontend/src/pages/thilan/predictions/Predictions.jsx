import React, { useEffect, useState } from 'react'
import demandAxios from '../../../BaseURL';
import AllProducts from '../../../components/thilan/demandAnalysis/allProducts/AllProducts';
import PriceEnterForm from '../../../components/thilan/demandAnalysis/predictions/PriceEnterForm';
import AnalysisChartForPrices from '../../../components/thilan/demandAnalysis/predictions/AnalysisChartForPrices';

function Predictions({currentProduct, predictedPrice}) {

  const [analyzingPrice, setAnalyzingPrice] = useState(predictedPrice);

  // Update the analyzing price whenever the predicted price changes
  useEffect(() => {
    setAnalyzingPrice(predictedPrice);
  }, [predictedPrice]);

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
    height: "100%",
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
            <PriceEnterForm currentProduct={currentProduct} predictedPrice={predictedPrice} analyzingPrice={analyzingPrice} setAnalyzingPrice={setAnalyzingPrice}></PriceEnterForm>
          </div>
          <div
            className="box1"
            style={{...boxStyle, gridColumn: "span 4", gridRow: "span 1" }}
          >
            <AnalysisChartForPrices currentProduct={currentProduct} analyzingPrice={analyzingPrice}></AnalysisChartForPrices>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Predictions