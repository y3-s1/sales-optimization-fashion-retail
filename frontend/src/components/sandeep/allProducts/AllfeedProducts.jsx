import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './AllfeedProducts.css'; // Assuming you'll style it
import demandAxios from '../../../BaseURL';

function AllfeedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await demandAxios.get('/api/demandAnalysis/allProducts');
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
    navigate(`/customer/product/${id}`); // Navigate to the single product page with the product ID
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
      <div className="feed-products-grid">
        {products.map((product) => (
          <div
            className="feed-products-card"
            key={product._id}
            onClick={() => handleProductClick(product._id)} // Add click handler
          >
            <img src={product.imageUrl} alt={product.name} className="feed-products-image" />
            <h2 className="feed-products-name">{product.name}</h2>
            <p className="feed-products-category">{product.category}</p>
            <p className="feed-products-price">${product.price.toFixed(2)}</p>
            <p className="feed-products-description">{product.description}</p>
            <button className="feed-products-btn">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllfeedProducts;
