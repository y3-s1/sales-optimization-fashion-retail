import React from 'react'

function PriceUpdateHeader({currentProduct}) {
  return (
    <div>
      <div className="demandChartHeader flex justify-between gap-10 p-8 pb-0 font-tinos">
        <div className="demandDetails w-full flex flex-col">
          <h2 className="font-tinos mb-6 text-left text-lg">Product Description</h2>
          <div className="productDetails flex justify-between gap-14 font-bold mt-7">
            <div className="flex flex-col w-full">
              <span className="text-gray-500">Product Id - {currentProduct?.productId}</span>
              <span className="text-base">{currentProduct?.name}</span><br />
              <span className="text-base">
                Current Price: Rs. {currentProduct?.price ? currentProduct.price.toFixed(2) : '0.00'}
              </span>
            </div>
            <div className="flex flex-col w-full">
              <span className="text-gray-500">Manufacture</span>
              <span className="text-base">{currentProduct?.manufacture}</span><br />
              <span>Current Stock: {currentProduct?.currentStock ?? 'N/A'}</span>
            </div>
          </div>
        </div>
        <div className="demandDetails6">
          <img src={currentProduct?.imageUrl} alt="" className="w-[250px]" />
        </div>
      </div>
    </div>
  )
}

export default PriceUpdateHeader
