import React from 'react'

function PriceUpdateForm({ predictedPrice }) {
  return (
    <div className='flex-row my-2'>
      <div className='mb-3'>
        <div className="flex flex-row w-[100%]">
          <label htmlFor="predictedPrice" className="text-[15px] w-[70%]">
            <b>Predicted Price (Rs.)</b>
          </label>
          <input
            type="text"
            name="predictedPrice"
            id="predictedPrice"
            value={predictedPrice}
            readOnly
            className="p-1 w-[30%]"
            style={{
              border: "2px #D9D9D9 solid",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          />
        </div>
      </div>
      <div className="dDox1 flex gap-3">
        <div className="flex flex-col w-[55%]">
          <label htmlFor="newPrice" className="text-[15px]">
            <b>New Price (Rs.)</b>
          </label>
          <input
            type="text"
            name="newPrice"
            id="newPrice"
            value={predictedPrice}
            className="border-4 p-2 w-[100%]"
            style={{
              border: "2px #D9D9D9 solid",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          />
        </div>

        <div className="flex flex-col items-center justify-end w-[40%]">
          <button
            className="py-[12px] px-[20px] w-[100%] rounded-md text-black transition-all hover:brightness-105"
            style={{ backgroundColor: "#E0B50F" }}
            // onClick={handleClick}
          >
            <b>Update</b>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PriceUpdateForm
