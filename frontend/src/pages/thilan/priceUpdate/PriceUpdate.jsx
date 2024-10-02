import React, { useEffect, useState } from 'react'
import PriceUpdateHeader from '../../../components/thilan/demandAnalysis/priceUpdate/PriceUpdateHeader';
import PriceUpdateForm from '../../../components/thilan/demandAnalysis/priceUpdate/PriceUpdateForm';

function PriceUpdate({ predictedPrice, currentProduct, currentProductId, setCurrentProduct }) {

  const [newPriceInput, setNewPriceInput] = useState(predictedPrice);

  // Update the price input whenever the predicted price changes
  useEffect(() => {
    setNewPriceInput(predictedPrice);
  }, [predictedPrice]);

  
  const boxStyle = {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "6px",
    boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.10)",
  };

  return (
    <div className='priceUpdate-all-content'>
      <h2>Price Update</h2>

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
          style={{...boxStyle, gridColumn: "span 3", gridRow: "span 1" }}
        >
          <PriceUpdateHeader currentProduct={currentProduct}></PriceUpdateHeader>
        </div>
        <div
          className="box1"
          style={{...boxStyle, gridColumn: "span 1", gridRow: "span 1" }}
        >
          <PriceUpdateForm 
            predictedPrice={predictedPrice} 
            currentProduct={currentProduct}
            newPriceInput={newPriceInput}
            setNewPriceInput={setNewPriceInput}
            currentProductId={currentProductId} 
            setCurrentProduct={setCurrentProduct}
            >
          </PriceUpdateForm>
        </div>
      </div>

    </div>
  )
}

export default PriceUpdate