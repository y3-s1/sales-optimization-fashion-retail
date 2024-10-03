import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Axios for making API requests
import '../../pages/sandeep/customerRelationship.css';
import demandAxios from '../../BaseURL';
import { AuthContext } from '../../context/AuthContext';

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate(); // For navigation after placing an order
  const { selectedCartItems, totalPrice } = location.state || { selectedCartItems: [], totalPrice: 0 };

  const [redeemAmount, setRedeemAmount] = useState(0); // Amount in LKR
  const [finalTotalPrice, setFinalTotalPrice] = useState(totalPrice); // Final price after applying redeem
  const [availablePoints, setAvailablePoints] = useState(1000); // User's total points (example: 1000 points)
  const [paymentMethod, setPaymentMethod] = useState(''); // New state to track payment method
  const [address, setAddress] = useState(''); // New state for shipping address
  const [contactNumber, setContactNumber] = useState(''); // New state for contact number
  const [promoCode, setPromoCode] = useState('');
  const [redeemError, setRedeemError] = useState('');
  const { user } = useContext(AuthContext);

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState({}); // Track form errors

  const pointsToLKR = 20; // 20 points = 1 LKR
  const maxRedeemableAmount = Math.min(availablePoints / pointsToLKR, totalPrice); // Max amount user can redeem

  // Handle redeem slider change
  const handleRedeemChange = (e) => {
    const selectedRedeemAmount = e.target.value;
    setRedeemAmount(selectedRedeemAmount); // Set redeem amount in LKR
  };

  // Apply redeem amount to reduce the total price
  const applyRedeem = () => {
    const usedPoints = redeemAmount * pointsToLKR; // Calculate how many points would be used
  
    if (usedPoints > availablePoints) {
      setRedeemError("You cannot redeem more points than you have available.");
      return; // Exit the function early
    }
  
    setRedeemError(''); // Clear any previous error
    setFinalTotalPrice(totalPrice - redeemAmount); // Update final total price after redeem
    setAvailablePoints(availablePoints - usedPoints); // Deduct the points from user's balance
  };
  

  useEffect(() => {
    // Update the available points when redeemAmount changes while sliding
    const usedPoints = redeemAmount * pointsToLKR; // Calculate points used based on redeem amount
    setAvailablePoints(1000 - usedPoints); // Dynamically update available points as the slider moves
  }, [redeemAmount]);

  // Handlers to update payment method state
  const handleCardPaymentClick = () => setPaymentMethod('card');
  const handleCashOnDeliveryClick = () => setPaymentMethod('cod');

  // Function to place order
  const placeOrder = async () => {
    try {
      console.log(selectedCartItems)
      const orderData = {
        user: {
          totalPrice: finalTotalPrice,
          payment: paymentMethod === 'card' ? 'Card Payment' : 'Cash on Delivery',
          address,
          contactNumber,
        },
        products: selectedCartItems.map(item => ({
          productId: item._id,
          quantity: item.quantity,
          pricePerItem: item.totalPrice,
        })),
      };

      console.log('oder data', orderData)
      // Send POST request to the backend
      const response = await demandAxios.post(`/order/placeOrder/${user._id}`, orderData);

      // Navigate to success page or show success message
      if (response.status === 200) {
        alert('Order placed successfully!');
        navigate('/customer/AllFProducts'); // Redirect to order success page (create this route)
      }
    } catch (error) {
      console.error('Failed to place order', error);
      alert('Failed to place the order. Please try again.');
    }
  };

  // Handle card payment submission
  const handleCardPayment = (e) => {
    e.preventDefault();
    const errors = {};

    // Basic validations for card payment form
    const validateCardNumber = (cardNumber) => /^[0-9]{16}$/.test(cardNumber);
    const validateExpiryDate = (expiryDate) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate);
    const validateCvv = (cvv) => /^[0-9]{3}$/.test(cvv);

    if (!validateCardNumber(cardNumber)) errors.cardNumber = 'Invalid card number. Must be 16 digits.';
    if (!validateExpiryDate(expiryDate)) errors.expiryDate = 'Invalid expiry date. Use MM/YY format.';
    if (!validateCvv(cvv)) errors.cvv = 'Invalid CVV. Must be 3 digits.';
    if (!address) errors.address = 'Shipping address is required.';
    if (!contactNumber) errors.contactNumber = 'Contact number is required.';

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Proceed with placing the order after validation
      placeOrder();
    }
  };

  // Handle COD submission
  const handleCodOrder = (e) => {
    e.preventDefault();
    if (!address) {
      setErrors({ address: 'Shipping address is required.' });
      return;
    }
    if (!contactNumber) {
      setErrors({ contactNumber: 'Contact number is required.' });
      return;
    }

    // Proceed with placing the order for COD
    placeOrder();
  };

  const applyPromoCode = async () => {
    try {
      const userId = user._id
      const response = await demandAxios.post('/loyalty/apply-promo-code', { promoCode, userId });
  
      if (response.data.isValid) {
        const { discountType, discountAmount } = response.data;
        
        // Apply the discount based on the discount type
        if (discountType === 'percentage') {
          // Calculate the percentage discount
          const discountValue = (finalTotalPrice * discountAmount) / 100;
          setFinalTotalPrice(finalTotalPrice - discountValue); // Apply percentage discount
        } else if (discountType === 'flat') {
          // Apply flat discount amount
          setFinalTotalPrice(finalTotalPrice - discountAmount); // Apply flat discount
        }
  
      } else {
        alert('Invalid promo code');
      }
    } catch (error) {
      console.error('Error applying promo code:', error);
    }
  };
  
  

  return (
    <div className="checkout-container">
      <div className="checkout-left">
        <img src={require('../../image/Screenshot 2024-09-11 091052.png')} alt="User" className="checkout-logo" />
        <h2>Choose Payment Method</h2>
        <p>Select one of the options below to proceed with your payment:</p>
        <div className="payment-options">
          <button className="payment-btn amazon-pay" onClick={handleCardPaymentClick}>
            Card Payment
          </button>
          <button className="payment-btn google-pay" onClick={handleCashOnDeliveryClick}>
            Cash on Delivery
          </button>
        </div>

        {paymentMethod === 'card' && (
          <div className="checkout-order-payment-form checkout-order-card-payment-form">
            <h3>Card Payment</h3>
            <form onSubmit={handleCardPayment}>
              <label>
                Card Number:
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className={`checkout-order-input-field ${errors.cardNumber && 'checkout-order-input-error'}`}
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
                {errors.cardNumber && <span className="checkout-order-error-message">{errors.cardNumber}</span>}
              </label>

              <label>
                Expiry Date:
                <input
                  type="text"
                  placeholder="MM/YY"
                  className={`checkout-order-input-field ${errors.expiryDate && 'checkout-order-input-error'}`}
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
                {errors.expiryDate && <span className="checkout-order-error-message">{errors.expiryDate}</span>}
              </label>

              <label>
                CVV:
                <input
                  type="text"
                  placeholder="123"
                  className={`checkout-order-input-field ${errors.cvv && 'checkout-order-input-error'}`}
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
                {errors.cvv && <span className="checkout-order-error-message">{errors.cvv}</span>}
              </label>

              <label>
                Shipping Address:
                <input
                  type="text"
                  placeholder="123 Street, City"
                  className={`checkout-order-input-field ${errors.address && 'checkout-order-input-error'}`}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {errors.address && <span className="checkout-order-error-message">{errors.address}</span>}
              </label>

              <label>
                Contact Number:
                <input
                  type="text"
                  placeholder="123-456-7890"
                  className={`checkout-order-input-field ${errors.contactNumber && 'checkout-order-input-error'}`}
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
                {errors.contactNumber && <span className="checkout-order-error-message">{errors.contactNumber}</span>}
              </label>

              <button type="submit" className="checkout-order-proceed-btn checkout-order-card-proceed-btn">
                Proceed Payment
              </button>
            </form>
          </div>
        )}

        {paymentMethod === 'cod' && (
          <div className="checkout-order-cod-summary checkout-order-cash-on-delivery-section">
            <h3>Cash on Delivery</h3>
            <form onSubmit={handleCodOrder}>
              <label>
                Shipping Address:
                <input
                  type="text"
                  placeholder="123 Street, City"
                  className={`checkout-order-input-field ${errors.address && 'checkout-order-input-error'}`}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {errors.address && <span className="checkout-order-error-message">{errors.address}</span>}
              </label>

              <label>
                Contact Number:
                <input
                  type="text"
                  placeholder="123-456-7890"
                  className={`checkout-order-input-field ${errors.contactNumber && 'checkout-order-input-error'}`}
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
                {errors.contactNumber && <span className="checkout-order-error-message">{errors.contactNumber}</span>}
              </label>

              <p>Total Amount to be Paid: <strong>${finalTotalPrice.toFixed(2)}</strong></p>
              <button type="submit" className="checkout-order-proceed-btn checkout-order-cod-proceed-btn">Proceed Order</button>
            </form>
          </div>
        )}
        <p className="divider-text">or</p>
        <p>Pay with a credit or debit card:</p>
        <div className="contact-info">
          <h3>Contact Information</h3>
          <div className="user-info">
            <img src="https://via.placeholder.com/50" alt="User" className="user-avatar" />
            <div>
              <span className="user-name">Zoe Bennett</span>
              <span className="user-email">(zoetest@loyaltylion.co)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side order summary and redeem logic */}
      <div className="checkout-right">
        <div className="order-summary">
          <h3>Order Summary</h3>
          <ul className="checkout-list">
            {selectedCartItems.map((item) => (
              <li key={item.item_id} className="checkout-item">
                <img src="https://via.placeholder.com/50" alt="User" className="user-avatar" />
                <span>{item.name}</span>
                <span>Total: ${item.totalPrice.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="redeem-section">
  <p>Redeem Loyalty Credit</p>
  <p>Use the slider to apply your available credit towards this purchase.</p>
  <div className="redeem-display">
    <span>{availablePoints.toFixed(0)} Points</span>
    <span>Redeem for: <strong>{redeemAmount} LKR</strong></span>
  </div>
  <input
    type="range"
    min="0"
    max={maxRedeemableAmount}
    value={redeemAmount}
    onChange={handleRedeemChange}
    className="slider"
  />
  <button
    className="redeem-btn"
    onClick={applyRedeem}
    disabled={redeemAmount > availablePoints * pointsToLKR} // Disable button conditionally
  >
    Apply Redeem
  </button>
  <br />
  {redeemError && <span className="error-message">{redeemError}</span>} {/* Display error message */}
</div>


        <div className="discount-section">
        <h4>Apply Promo Code</h4>
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Enter promo code"
          />
          <button onClick={applyPromoCode} className="checkout-promo-btn">Apply Promo</button>
        </div>

        <div className="summary-totals">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Calculated at next step</span>
          </div>
          <div className="summary-total-row">
            <span>Total</span>
            <strong>${finalTotalPrice.toFixed(2)}</strong> {/* Updated total price after redeem */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
