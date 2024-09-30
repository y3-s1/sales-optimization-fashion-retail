import React from 'react';

function PriceEnterForm({currentProduct, predictedPrice}) {
  return (
    <div>
      <div className="dDox1 flex gap-3">
        <div className="flex flex-col w-[30%]">
          <label htmlFor="price" className="text-[15px]">
            <b>Price (Rs.)</b>
          </label>
          <input
            type="text"
            name="price"
            id="price"
            value={predictedPrice}
            className="border-4 p-3 w-[100%]"
            style={{
              border: "2px #D9D9D9 solid",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          />
        </div>

        <div className="flex flex-col items-center justify-end w-[10%]">
          <button
            className="py-[12px] px-[20px] w-[100%] rounded-md text-black transition-all hover:brightness-105"
            style={{ backgroundColor: "#E0B50F" }}
            // onClick={handleClick}
          >
            <b>Analyze</b>
          </button>
        </div>
      

        <div className="grid grid-cols-2 gap-2 ml-auto w-[50%]">
          <div className="flex flex-col w-[60%]">
            <span className="text-gray-500">product Id - {currentProduct.productId}</span>
            <span className="text-base">{currentProduct.name}</span>
          </div>
          <div className="flex flex-col w-[30%]">
            <img src={currentProduct.imageUrl} alt="" className="w-[70px]" />
          </div>
        </div>



      </div>

    </div>
  );
}

export default PriceEnterForm;
