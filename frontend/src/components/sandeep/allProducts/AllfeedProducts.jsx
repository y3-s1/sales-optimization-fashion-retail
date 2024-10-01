import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './AllfeedProducts.css';
import demandAxios from '../../../BaseURL';
import { AuthContext } from '../../../context/AuthContext';

function AllfeedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartMessage, setCartMessage] = useState(''); // State to hold success/error messages
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const userId = user._id; // Replace this with actual user ID (could be from user context or localStorage)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await demandAxios.get('/product/products');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleProductClick = (id) => {
    navigate(`/customer/product/${id}`);
  };

  const handleAddToCart = async (product) => {
    try {
      const response = await demandAxios.post(`/cart/add/${product._id}`, {
        userId: userId,
        quantity: 1, // Default to 1 for now
        price: product.price,
      });
      setCartMessage(`Added ${product.name} to cart!`);
    } catch (err) {
      setCartMessage(`Failed to add ${product.name} to cart`);
    }
  };

  if (loading) {
    return <div className="feed-products-loading">Loading...</div>;
  }

  if (error) {
    return <div className="feed-products-error">{error}</div>;
  }

  return (
    <div className="feed-products-container">
      <h1 className="feed-products-title">Fashion Collection</h1>
      {cartMessage && <div className="cart-message">{cartMessage}</div>} {/* Display success/error messages */}
      <div className="feed-products-grid">
        {products.map((product) => (
          <div
            className="feed-products-card"
            key={product._id}
            onClick={() => handleProductClick(product._id)}
          >
            <img src={product.imageUrl} alt={product.name} className="feed-products-image" />
            <h2 className="feed-products-name">{product.name}</h2>
            <p className="feed-products-category">{product.category}</p>
            <p className="feed-products-price">${product.price.toFixed(2)}</p>
            <p className="feed-products-description">{product.description}</p>
            <button
              className="feed-products-btn"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the click on the card
                handleAddToCart(product); // Call the function to add to cart
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllfeedProducts;
