import React, { useState, useEffect } from 'react';
import './AllfeedProducts.css'; // Assuming you'll style it
import demandAxios from '../../../BaseURL';

function AllfeedProducts() {
  // State to hold the list of products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from the backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await demandAxios.get('/api/allProducts'); // Fetching from your API route
        setProducts(response.data); // Set products to the data received from the API
        setLoading(false);
      } catch (err) {
        setError('Error fetching products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Loading state
  if (loading) {
    return <div className="feed-products-loading">Loading...</div>;
  }

  // Error handling
  if (error) {
    return <div className="feed-products-error">{error}</div>;
  }

  // Rendering the products
  return (
    <div className="feed-products-container">
      <h1 className="feed-products-title">Fashion Collection</h1>
      <div className="feed-products-grid">
        {products.map((product) => (
          <div className="feed-products-card" key={product._id}>
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
