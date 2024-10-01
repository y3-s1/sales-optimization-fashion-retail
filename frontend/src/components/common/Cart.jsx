import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import demandAxios from '../../BaseURL';
import { AuthContext } from '../../context/AuthContext';
import '../../pages/sandeep/customerRelationship.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    // Fetch the cart items when the component loads
    const fetchCartItems = async () => {
      try {
        const response = await demandAxios.get(`/cart/user/${user._id}`); 
        console.log(response.data)
        setCartItems(response.data);
        updateTotalPrice(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const updateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + item.totalPrice, 0);
    setTotalPrice(total);
  };

  const handleQuantityChange = async (itemId, quantity) => {
    try {
      await demandAxios.put(`/cart/update/${itemId}`, { quantity });
      const updatedItems = cartItems.map(item => 
        item.item_id === itemId ? { ...item, quantity, totalPrice: item.price * quantity } : item
      );
      setCartItems(updatedItems);
      updateTotalPrice(updatedItems);
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await demandAxios.delete(`/cart/remove/${itemId}`);
      const updatedItems = cartItems.filter(item => item.item_id !== itemId);
      setCartItems(updatedItems);
      updateTotalPrice(updatedItems);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems((prevSelected) => 
      prevSelected.includes(itemId) 
        ? prevSelected.filter(id => id !== itemId) 
        : [...prevSelected, itemId]
    );
  };

  const handleCheckout = () => {
    // Navigate to the checkout page and pass the selected items and total price
    const selectedCartItems = cartItems.filter(item => selectedItems.includes(item.item_id));
    console.log('s items', selectedCartItems)
    navigate('/customer/checkout', { state: { selectedCartItems, totalPrice } });
  };

  return (
    <div className="fashincart-container">
      <h2>Cart Items</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="fashincart-list">
          {cartItems.map((item) => (
            <li key={item.item_id} className="fashincart-item">
              <input 
                type="checkbox" 
                checked={selectedItems.includes(item.item_id)} 
                onChange={() => handleSelectItem(item.item_id)} 
              />
              <span>{item.name}</span>
              <span>Quantity: 
                <input 
                  type="number" 
                  value={item.quantity} 
                  min="1" 
                  onChange={(e) => handleQuantityChange(item.item_id, parseInt(e.target.value))} 
                />
              </span>
              <span>Price: ${item.price}</span>
              <span>Total: ${item.totalPrice}</span>
              <button onClick={() => handleRemoveItem(item.item_id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <div className="fashincart-summary">
        <h3>Total Price: ${totalPrice}</h3>
        <button onClick={handleCheckout} disabled={selectedItems.length === 0}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
