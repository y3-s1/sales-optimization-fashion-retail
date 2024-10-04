import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import demandAxios from '../../../BaseURL';
import './orderHistory.css'
import { AuthContext } from '../../../context/AuthContext';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate(); // Use navigate to handle redirection
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Fetch customer orders (this would be an API call in a real app)
    const fetchOrders = async () => {
      try {
        const response = await demandAxios.get(`/order/getCompleteOrdersForUser/${user._id}`); 
        setOrders(response.data); 
        console.log('ORDERHISTORY',response.data)
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleReviewClick = (productId) => {
    // Navigate to the AddReviewForm with the productId as a query parameter
    navigate(`/customer/profile/addReview?productId=${productId}`);
  };

  return (
    <div className="cus-order-his-container p-4">
      <h4 className="cus-order-his-title">Order History</h4>
      <br />
      {orders.length > 0 ? (
        <ul className="cus-order-his-list-group list-group">
          {orders.map((order) => (
            <li key={order.id} className="cus-order-his-list-group-item list-group-item mb-3">
              <h5 className="cus-order-his-order-id">Order ID: {order.id}</h5>
              <p className="cus-order-his-date">Date: {new Date(order.date).toLocaleDateString()}</p>
              <p className="cus-order-his-total">Total: ${order.price}</p>
              <ul className="cus-order-his-item-list">
                {order.products.map((product) => (
                  <li key={product.id} className="cus-order-his-product">
                    {product.productName} - Quantity: {product.quantity}
                    <br />
                    <button 
                      className="cus-order-his-review-btn btn btn-primary mt-2" 
                      onClick={() => handleReviewClick(product.id)}
                    >
                      Write a Review
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p className="cus-order-his-no-orders">No orders found.</p>
      )}
    </div>
  );
}

export default OrderHistory;
