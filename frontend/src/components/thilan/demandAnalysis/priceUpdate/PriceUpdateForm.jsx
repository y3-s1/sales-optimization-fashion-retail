import React, { useState, useEffect } from 'react';
import demandAxios from '../../../../BaseURL';

function PriceUpdateForm({ predictedPrice, newPriceInput, setNewPriceInput, currentProduct, currentProductId, setCurrentProduct }) {
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [validationError, setValidationError] = useState('');

  const fetchProductData = async () => {
    try {
      const res = await demandAxios.get(`api/demandAnalysis/product/${currentProductId}`);
      setCurrentProduct(res.data);
    } catch (error) {
      console.log("Error fetching product data:", error);
    }
  };

  // Handle input change
  const handlePriceInputChange = (e) => {
    const inputValue = e.target.value;

    // Allow only numeric values with optional decimal point
    if (/^\d*\.?\d*$/.test(inputValue)) {
      setNewPriceInput(inputValue);  // Update the local price input state
    }
  };

  // Handle update button click
  const handleUpdateClick = async () => {
    try {
      const numericPrice = parseFloat(newPriceInput);  // Ensure price is a number

      // Validations
      if (!newPriceInput) {
        return setValidationError('Price cannot be empty.');
      }

      if (isNaN(numericPrice)) {
        return setValidationError('Please enter a valid number for the price.');
      }

      if (numericPrice <= 0) {
        return setValidationError('Price must be greater than zero.');
      }

      if (newPriceInput.split('.')[1]?.length > 2) {
        return setValidationError('Price cannot have more than two decimal places.');
      }

      // Clear validation errors
      setValidationError('');

      // Make the PUT request to update the price in the backend
      const response = await demandAxios.put(`/api/fashionProducts/updatePrice/${currentProduct._id}`, {
        newPrice: numericPrice,  // Ensure user is sending a number
      });

      if (response.status === 200) {
        // Update the currentProduct price in the frontend
        currentProduct.price = numericPrice;
        
        fetchProductData();

        // Display the confirmation message
        setConfirmationMessage('Price updated successfully!');
      }
    } catch (error) {
      console.error('Error updating price:', error);
      setConfirmationMessage('Error updating price.');
    }
  };

  // Make the confirmation message disappear after 3 seconds
  useEffect(() => {
    if (confirmationMessage) {
      const timer = setTimeout(() => {
        setConfirmationMessage('');
      }, 3000);  // 3 seconds delay

      // Cleanup the timer when the component unmounts or confirmationMessage changes
      return () => clearTimeout(timer);
    }
  }, [confirmationMessage]);

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
            value={newPriceInput}
            onChange={handlePriceInputChange}  // Ensure proper handling of numeric input
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
            onClick={handleUpdateClick}  // Call the update function when clicked
          >
            <b>Update</b>
          </button>
        </div>
      </div>

      {/* Display validation errors */}
      {validationError && <div className="mt-3 text-red-500">{validationError}</div>}

      {/* Display confirmation message */}
      {confirmationMessage && <div className="mt-3 text-green-500">{confirmationMessage}</div>}
    </div>
  );
}

export default PriceUpdateForm;
