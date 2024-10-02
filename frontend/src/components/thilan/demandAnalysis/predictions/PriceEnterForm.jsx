import React, { useEffect, useState } from 'react';

function PriceEnterForm({currentProduct, predictedPrice, analyzingPrice, setAnalyzingPrice}) {

  const [priceInput, setPriceInput] = useState(predictedPrice);
  const [validationError, setValidationError] = useState('');

  // Update the price input whenever the predicted price changes
  useEffect(() => {
    setPriceInput(predictedPrice);
  }, [predictedPrice]);

  // Handle input change
  const handlePriceInputChange = (e) => {
    const inputValue = e.target.value;

    // Allow only numeric values with optional decimal point
    if (/^\d*\.?\d*$/.test(inputValue)) {
      setPriceInput(inputValue);  // Update the local price input state
    }
  };

  // Handle Analyze button click
  const handleAnalyzeClick = () => {

    const numericPrice = parseFloat(priceInput);  // Ensure price is a number

    // Validations
    if (!priceInput) {
      return setValidationError('Price cannot be empty.');
    }

    if (isNaN(numericPrice)) {
      return setValidationError('Please enter a valid number for the price.');
    }

    if (numericPrice <= 0) {
      return setValidationError('Price must be greater than zero.');
    }

    if (priceInput.split('.')[1]?.length > 2) {
      return setValidationError('Price cannot have more than two decimal places.');
    }

    // Clear validation errors
    setValidationError('');

    setAnalyzingPrice(priceInput);  // Only update the analyzing price when the button is clicked
  };


  // Make the validationError message disappear after 3 seconds
  useEffect(() => {
    if (validationError) {
      const timer = setTimeout(() => {
        setValidationError('');
      }, 3000);  // 3 seconds delay

      // Cleanup the timer when the component unmounts or validationError changes
      return () => clearTimeout(timer);
    }
  }, [validationError]);


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
            value={priceInput}  // Use the local input state value
            onChange={handlePriceInputChange}  // Allow the user to change the value
            className="border-4 p-3 w-[100%]"
            style={{
              border: "2px #D9D9D9 solid",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          />
          {/* Display validation errors */}
          {validationError && <div className="mt-3 text-red-500">{validationError}</div>}
        </div>

        <div className="flex flex-col items-center justify-end w-[10%]">
          <button
            className="py-[12px] px-[20px] w-[100%] rounded-md text-black transition-all hover:brightness-105"
            style={{ backgroundColor: "#E0B50F" }}
            onClick={handleAnalyzeClick}  // Update the analyzing price when clicked
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
